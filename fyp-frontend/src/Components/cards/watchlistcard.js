import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import userContext from "../../context/userContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import companyContext from "../../context/companycontext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
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
  const history = useHistory();
  let token = localStorage.getItem("auth-token");
  const [opensnack, setOpensnack] = React.useState(false);
  const { companyData, setcompanyData } = useContext(companyContext);

  const handleSnackbar = () => {
    setOpensnack(true);
  };
  const { userData, setUserData } = useContext(userContext);
  // const history = useHistory();
  const classes = useStyles();
  const logo = `https://logo.clearbit.com/${props.domain}`;

  const removeFromWatchlist = async (e) => {
    e.preventDefault();
    await Axios.delete(`http://localhost:4000/watchlists/${props.id}`, {
      headers: { "x-auth-token": token },
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
          <Button
            size="medium"
            variant="contained"
            color="primary.light"
            startIcon={<DeleteForeverIcon />}
            onClick={removeFromWatchlist}
          >
            Remove Company
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
