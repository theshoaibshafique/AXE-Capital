import {
  Paper,
  TableCell,
  TableRow,
  Typography,
  TableHead,
  Table,
  makeStyles,
  TableContainer,
  TablePagination,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Usertable from "../tables/usertable";
import TableBody from "@material-ui/core/TableBody";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import $ from "jquery";
const Width = $(window).width() - 300;

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: "#3c44b126",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
  searchInput: {
    width: "75%",
  },
  actionbtn: {
    minWidth: 0,
    margin: theme.spacing(0.5),
    backgroundColor: "#f8324526",
    "& .MuiButton-label": {
      color: "#f83245",
    },
  },
}));

function Users() {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await Axios.get("http://localhost:4000/users/all");

      setUsers(req.data);
    }

    fetchData();
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.displayName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const recordsAfterpaging = () => {
    users.shift();
    return filterFn
      .fn(users)
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  const removeUser = async (id) => {
    await Axios.delete(`http://localhost:4000/users/delete/${id}`);
  };
  return (
    <>
      <Typography variant="h6">Users</Typography>

      <Paper
        style={{
          maxWidth: Width,
        }}
      >
        <Toolbar>
          <div
            style={{
              marginTop: 10,
            }}
          >
            <TextField
              variant="outlined"
              label="Search Users"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </div>
        </Toolbar>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Role</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recordsAfterpaging().map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.displayName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Button
                      className={classes.actionbtn}
                      onClick={async (e) => {
                        e.preventDefault();
                        if (window.confirm("Are you sure to delete this user"))
                          await Axios.delete(
                            `http://localhost:4000/users/delete/${item._id}`
                          );
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={users.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default Users;
