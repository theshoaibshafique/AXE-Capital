import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

function Usertable(users, headcells) {
  const classes = useStyles();
  const tblcontainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const tblhead = (props) => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
    );
  };
  return {
    tblcontainer,
    tblhead,
  };
}

export default Usertable;
