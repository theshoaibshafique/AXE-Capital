import { Typography } from "@material-ui/core";
import React from "react";
import ResponsiveDrawer from "../layout/drawer";
import { useContext } from "react";
import userContext from "../../context/userContext";
import $ from "jquery";
const Width = $(window).width() - 440;
function Home() {
  const { userData, setUserData } = useContext(userContext);
  return (
    <div>
      <div style={{ maxWidth: Width }}>
        <Typography variant="h4">Welcome</Typography>
        <Typography variant="body1" align="justify">
          Axe-Capital is a platform where user can come and easily maintain
          his/her watchlist and can see the prediction of the companies in which
          he is interested to invest in. Axe-Capital consists of S&P 500 stock
          companies forecasting. The S&P 500 stock market index, maintained by
          S&P Dow Jones Indices, comprises 505 common stocks issued by 500
          large-cap companies and traded on American stock exchanges (including
          the 30 companies that compose the Dow Jones Industrial Average), and
          covers about 80 percent of the American equity market by
          capitalization.
        </Typography>
      </div>
    </div>
  );
}

export default Home;
