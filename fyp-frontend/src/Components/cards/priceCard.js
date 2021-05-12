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
});

export default function PriceCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardContent>
          <div
            style={{
              minHeight: 106,
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <Typography variant="h5" component="h2">
              {props.price}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Current Price ($)
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
