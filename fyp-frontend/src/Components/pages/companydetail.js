import { Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import companyContext from "../../context/companycontext";
import NewsCard from "../cards/newsCard";
import PriceCard from "../cards/priceCard";
import Axios from "axios";
import $ from "jquery";
import StockChart from "../Charts/timeserieschart";
import CandleChart from "../Charts/candlestickchart";
import StockDetailCard from "../cards/stockDetailCard";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const Width = $(window).width() - 340;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Companydetail() {
  const { companyData, setcompanyData } = useContext(companyContext);
  const [stockData, setstockData] = useState([]);
  const [currentData, setcurrentData] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  var ticker = companyData.ticker;
  const apikey = "F9D24TUFO3WGIOBW";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const req = await Axios.get("http://127.0.0.1:5000/stockdata/" + ticker);
      setstockData(req.data);
      await $.getJSON(
        "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
          ticker +
          "&outputsize=full&apikey=" +
          apikey
      ).done(function (response) {
        const temp = Object.values(response);
        const temp2 = Object.values(temp[0]);
        setcurrentData(temp2);
        console.log(currentData);
        setLoading(false);
      });
    }
    fetchData();
  }, []);
  console.log(stockData);
  if (loading == true) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <div
        style={{
          maxWidth: Width,
        }}
      >
        <Typography variant="h6">{companyData.title}</Typography>
        <div
          style={{
            display: "flex",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              marginRight: 40,
            }}
          >
            <PriceCard price={currentData[4]} />
          </div>
          <div>
            <NewsCard />
          </div>
        </div>
        <div>
          <CandleChart data={stockData} />
        </div>
        <div>
          <StockDetailCard
            open={currentData[1]}
            close={currentData[7]}
            high={currentData[2]}
            low={currentData[3]}
            volume={currentData[5]}
            change={currentData[8]}
            changePercent={currentData[9]}
          />
        </div>
      </div>
    );
  }
}

export default Companydetail;
