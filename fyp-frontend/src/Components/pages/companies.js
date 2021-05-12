import Cards from "../cards/card";
import React, { useState, useEffect } from "react";
import { Button, Typography, InputAdornment } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useContext } from "react";
import userContext from "../../context/userContext";
import SearchIcon from "@material-ui/icons/Search";

function Companies() {
  const { userData } = useContext(userContext);
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await Axios.get("http://localhost:4000/companies");

      setCompanies(req.data);
    }

    fetchData();
  });
  const [open, setOpen] = React.useState(false);
  const [opensnack, setOpensnack] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSnackbar = () => {
    setOpensnack(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [title, setTitle] = useState();
  const [ticker, setTicker] = useState();
  const [domain, setDomain] = useState();
  const [error, setError] = useState();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const newCompany = { title, ticker, domain };
      await Axios.post("http://localhost:4000/companies/add", newCompany);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      return;
    }
    if (error == undefined) {
      {
        handleClose();
      }
      {
        handleSnackbar();
      }
    }
  };
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.title.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const recordsAftersearching = () => {
    return filterFn.fn(companies);
  };
  return (
    <>
      {/* <ResponsiveDrawer /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: 50,
        }}
      >
        <div>
          <Snackbar
            open={opensnack}
            autoHideDuration={6000}
            onClose={() => setOpensnack(false)}
          >
            <Alert onClose={() => setOpensnack(false)} severity="success">
              Company Added Successfully
            </Alert>
          </Snackbar>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Company</DialogTitle>
            <DialogContent>
              <form onSubmit={submit}>
                {error && (
                  // <Grid item xs={12}>
                  <Alert
                    severity="error"
                    onClose={() => {
                      setError(undefined);
                    }}
                  >
                    {error}
                  </Alert>
                  // </Grid>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Company title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Company ticker"
                  name="ticker"
                  autoComplete="ticker"
                  autoFocus
                  onChange={(e) => setTicker(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="doamin"
                  label="Company doamin"
                  name="doamin"
                  autoComplete="doamin"
                  autoFocus
                  onChange={(e) => setDomain(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add Company
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 60,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6">Companies</Typography>
          <TextField
            variant="outlined"
            label="Search Companies"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />

          {userData.user.role === "admin" ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Add
            </Button>
          ) : (
            ""
          )}
          {/* <IconButton>
          <AddIcon fontSize="large" />
        </IconButton> */}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {recordsAftersearching().map((company) => {
            return (
              <Cards
                id={company._id}
                title={company.title}
                ticker={company.ticker}
                domain={company.domain}
                status={company.status}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Companies;
