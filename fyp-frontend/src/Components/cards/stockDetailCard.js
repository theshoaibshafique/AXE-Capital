import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 140,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  detail: {
    display: "flex",
    flexDirection: "column",
  },
});

function StockDetailCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={classes.detail}>
            <Typography variant="subtitle1">Open</Typography>
            <Typography variant="subtitle1">Change</Typography>
            <Typography variant="subtitle1">Change Percent</Typography>
          </div>
          <div className={classes.detail}>
            <Typography variant="subtitle1" color="textSecondary">
              {props.open}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.change}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.changePercent}
            </Typography>
          </div>
          <div className={classes.detail}>
            <Typography variant="subtitle1">Previous Close</Typography>
            <Typography variant="subtitle1">High</Typography>
          </div>
          <div className={classes.detail}>
            <Typography variant="subtitle1" color="textSecondary">
              {props.close}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.high}
            </Typography>
          </div>
          <div className={classes.detail}>
            <Typography variant="subtitle1">Volume</Typography>
            <Typography variant="subtitle1">Low</Typography>
          </div>
          <div className={classes.detail}>
            <Typography variant="subtitle1" color="textSecondary">
              {props.volume}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.low}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StockDetailCard;
