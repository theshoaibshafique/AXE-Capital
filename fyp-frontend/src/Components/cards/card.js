import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import userContext from "../../context/userContext";
import companyContext from "../../context/companycontext";
const useStyles = makeStyles({
  root: {
    maxWidth: 255,
    minWidth: 255,
    margin: 20,
    maxHeight: 300,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
  },
  actionarea: {
    minHeight: 210,
  },
});

export default function Cards(props) {
  let token = localStorage.getItem("auth-token");
  const [opensnack, setOpensnack] = useState(false);
  const [opensnack2, setOpensnack2] = useState(false);
  const [error, setError] = useState();
  const { companyData, setcompanyData } = useContext(companyContext);

  const history = useHistory();

  const handleSnackbar = () => {
    setOpensnack(true);
  };
  const handleSnackbar2 = () => {
    setOpensnack2(true);
  };
  const { userData, setUserData } = useContext(userContext);
  // const history = useHistory();
  const classes = useStyles();
  const logo = `https://logo.clearbit.com/${props.domain}`;

  const addToWatchlist = async (e) => {
    e.preventDefault();
    try {
      const newWatchlistItem = {
        title: props.title,
        ticker: props.ticker,
        domain: props.domain,
        status: props.status,
      };
      await Axios.post(
        "http://localhost:4000/watchlists/add",
        newWatchlistItem,
        { headers: { "x-auth-token": token } }
      );
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      handleSnackbar2();
      return;
    }
    {
      handleSnackbar();
    }
  };

  const removeCompany = async (e) => {
    e.preventDefault();
    await Axios.delete(`http://localhost:4000/companies/${props.id}`);
    await Axios.delete("http://localhost:4000/watchlists/admindelete", {
      data: { ticker: props.ticker },
    });
  };
  const companydetail = () => {
    setcompanyData({
      title: props.title,
      ticker: props.ticker,
    });
    history.push("/companies/companydetail");
  };
  return (
    <Card className={classes.root}>
      <Snackbar
        open={opensnack}
        autoHideDuration={6000}
        onClose={() => setOpensnack(false)}
      >
        <Alert onClose={() => setOpensnack(false)} severity="success">
          Company Added To your Watchlist
        </Alert>
      </Snackbar>
      <Snackbar
        open={opensnack2}
        autoHideDuration={6000}
        onClose={() => setOpensnack2(false)}
      >
        <Alert onClose={() => setOpensnack2(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <CardActionArea className={classes.actionarea} onClick={companydetail}>
        {/* <CardMedia
          component="img"
          alt="CocaCola"
          width="auto"
          height="50"
          image="https://logo.clearbit.com/coca-cola.com"
          title="CocaCola"
        /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <img src={logo} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Divider variant="middle" light="true" />
        </CardContent>
      </CardActionArea>
      <CardContent>
        <CardActions>
          {userData.user.role === "admin" ? (
            <>
              {/* <Button
                id="hide"
                size="medium"
                variant="contained"
                color="primary.light"
              >
                Hide
              </Button>
              <Button
                id="show"
                size="medium"
                variant="contained"
                color="primary.light"
              >
                Show
              </Button> */}
              <Button
                id="show"
                size="medium"
                variant="contained"
                color="primary.light"
                startIcon={<DeleteForeverIcon />}
                onClick={removeCompany}
              >
                Remove Company
              </Button>
            </>
          ) : (
            // <Button
            //   size="medium"
            //   variant="contained"
            //   color="primary.light"
            //   startIcon={<AddIcon />}
            //   onClick={addToWatchlist}
            // >
            //   Add to WatchList
            // </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Typography variant="subtitle1">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "170px",
                  }}
                >
                  <TrendingUpIcon
                    style={{
                      marginRight: "10px",
                      color: "lime",
                    }}
                  />{" "}
                  50.1(10%)
                </div>
              </Typography>
              <IconButton onClick={addToWatchlist}>
                <AddIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}
