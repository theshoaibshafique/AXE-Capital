import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Home from "./Components/pages/home";
import Companies from "./Components/pages/companies";
import Users from "./Components/pages/users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ResponsiveDrawer from "./Components/layout/drawer";
import { makeStyles } from "@material-ui/core/styles";
import userContext from "./context/userContext";
import Login from "./Components/authentication/login";
import Register from "./Components/authentication/register";
import WatchList from "./Components/pages/watchlist";
import Companydetail from "./Components/pages/companydetail";
import companyContext from "./context/companycontext";
import News from "./Components/pages/news";
import Layout from "./Components/layout/Layout";
const useStyles = makeStyles({
  container: {
    display: "flex",
    marginTop: 120,
  },
  temp: {
    display: "flex",
  },
});
function App() {
  const classes = useStyles();
  const [companyData, setcompanyData] = useState({
    title: "",
    ticker: "",
  });
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:4000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:4000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <userContext.Provider value={{ userData, setUserData }}>
        <companyContext.Provider value={{ companyData, setcompanyData }}>
          {/* <div className={classes.container}> */}
          <Switch>
            <Route
              exact
              from="/home"
              render={() => <Layout body={<Home />} />}
            />

            <Route
              exact
              path="/companies"
              render={() => <Layout body={<Companies />} />}
            />

            <Route
              exact
              path="/companies/companydetail"
              render={() => <Layout body={<Companydetail />} />}
            />
            <Route
              exact
              path="/companies/news"
              render={() => <Layout body={<News />} />}
            />

            <Route
              exact
              path="/users"
              render={() => <Layout body={<Users />} />}
            />
            <Route
              path="/watchlist"
              render={() => <Layout body={<WatchList />} />}
            />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={Login} />
          </Switch>
        </companyContext.Provider>
      </userContext.Provider>
    </Router>
  );
}

export default App;
