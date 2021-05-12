import React, { Component } from "react";
import { useContext, useEffect, useState } from "react";
import companyContext from "../../context/companycontext";
import Chart from "react-apexcharts";
import aapl from "./aapl_historical.json";
import Axios from "axios";

//let data = aapl.slice(0, 200);
//data = data.reverse();

class CandleChart extends React.Component {
  constructor(props) {
    super(props);

    let chartdata = props.data;
    chartdata = chartdata.slice(-200, -1);
    this.state = {
      series: [
        {
          data: chartdata.map((item) => {
            return {
              x: item.Date,
              y: [item.Open, item.High, item.Low, item.Close],
            };
          }),
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        xaxis: {
          type: "string",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={600}
        />
      </div>
    );
  }
}

export default CandleChart;
