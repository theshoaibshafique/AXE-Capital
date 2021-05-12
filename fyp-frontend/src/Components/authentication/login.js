import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
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

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(userContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:4000/users/login",
        loginUser
      );
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
              {error && (
                // <Grid item xs={12}>
                <Alert
                  severity="error"
                  onClose={() => {
                    setError(undefined);
                  }}
                >
                  {error}
                </Alert>
                // </Grid>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
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
