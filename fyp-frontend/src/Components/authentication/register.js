import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import ResponsiveDrawer from "../layout/drawer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import $ from "jquery";
const Height = $(window).height() - 100;
const Width = $(window).width() / 5;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/login">
        AXE Capital
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 375,
    boxShadow:
      "rgba(0,0,0,0.1) 0px 2px 4px 0px, rgba(0,0,0,0.1) 0px 8px 16px 0px",
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: Height,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(-1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [displayName, setdisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(userContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:4000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:4000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <div
        style={{
          maxWidth: 700,
          marginLeft: Width,
          marginRight: 60,
        }}
      >
        <img
          alt=""
          src={"./axe.svg"}
          style={{
            width: 300,
          }}
        />
        <Typography variant="h5">
          Let's just not invest.... Let's do a smart one
        </Typography>
      </div>
      <Card className={classes.root}>
        <CardContent>
          <div>
            <form className={classes.form} onSubmit={submit}>
              <Grid container spacing={2}>
                {error && (
                  <Grid item xs={12}>
                    <Alert
                      severity="error"
                      onClose={() => {
                        setError(undefined);
                      }}
                    >
                      {error}
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="displayName"
                    variant="outlined"
                    fullWidth
                    id="displayName"
                    label="Display Name"
                    autoFocus
                    onChange={(e) => setdisplayName(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordRecheck"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={4}>
              <Copyright />
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
