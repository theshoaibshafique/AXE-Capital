import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { useHistory } from "react-router-dom";

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

export default function NewsCard() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardContent>
          <div
            style={{
              display: "flex",
              minHeight: 106,
              paddingTop: 20,
            }}
          >
            <div
              style={{
                marginRight: 10,
              }}
            >
              <AssignmentOutlinedIcon fontSize="large" />
            </div>
            <div>
              <Typography variant="h5" component="h2">
                News
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Related Articles
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
