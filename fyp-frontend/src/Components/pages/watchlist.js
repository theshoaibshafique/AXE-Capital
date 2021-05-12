import Cards from "../cards/watchlistcard";
import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Axios from "axios";
import { useContext } from "react";
import userContext from "../../context/userContext";
import ResponsiveDrawer from "../layout/drawer";

function Watchlist() {
  let token = localStorage.getItem("auth-token");
  const { userData, setUserData } = useContext(userContext);
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await Axios.get("http://localhost:4000/watchlists/all", {
        headers: { "x-auth-token": token },
      });

      setCompanies(req.data);
    }

    fetchData();
  });
  return (
    <>
      {/* <ResponsiveDrawer /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: 60,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6">Watchlist</Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {companies.map((company) => {
            return (
              <Cards
                id={company._id}
                title={company.title}
                ticker={company.ticker}
                domain={company.domain}
                status={company.status}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Watchlist;
