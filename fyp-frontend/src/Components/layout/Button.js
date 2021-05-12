import * as React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { css, app } from "./utils";
const useStyles = makeStyles(css);
export default function ThemeButton({
  title,
  icon,
  active,
  width,
  height,
  iconR,
  onClick,
  disable,
}) {
  const classess = useStyles();
  var back = "linear-gradient(#fff,#fff)";
  var color = app.colorOne;
  var wid = "auto";
  var hig = "auto";
  if (active) {
    back = "linear-gradient(90deg,#5F75D8,#8F78ED)";
    color = "#fff";
  }
  if (wid) {
    wid = width;
  }
  if (hig) {
    hig = height;
  }
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className={classess.btn}
      startIcon={icon}
      endIcon={iconR}
      style={{
        backgroundImage: back,
        color: color,
        width: wid,
        height: hig,
      }}
      disabled={disable}
    >
      {title}
    </Button>
  );
}
