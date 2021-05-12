import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import { css, app } from "./utils";
import { withRouter } from "react-router-dom";
import userContext from "../../context/userContext";
import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import { useHistory } from "react-router-dom";
import Axios from "axios";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    borderRightWidth: 1,
  },
  content: {
    width: "100%",
    height: "100%",
    position: "absolute",
    //backgroundColor: app.colorThree,
    //padding: app.padding,
    paddingTop: app.padding + 70,
    paddingLeft: drawerWidth + app.padding,
    [theme.breakpoints.down("xs")]: {
      padding: 20,
      paddingTop: app.padding + 50,
    },
  },
  active: {
    borderLeft: "5px solid " + app.colorOne,
    backgroundColor: "#3c44b126",
    "& span": {
      fontWeight: 600,
      color: "app.colorOne",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 50,
      color: app.colorOne,
    },
  },
  noActive: {
    "& .MuiListItemIcon-root": {
      marginLeft: 5,
      minWidth: 50,
    },
  },
  pro: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 30,
    backgroundColor: "#e5e5ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
    borderRadius: 30,
    boxShadow: "0px 0px 50px 5px rgba(0,0,0,0.1)",
    flexDirection: "column",
  },
}));

function ResponsiveDrawer(props) {
  const { userData, setUserData } = useContext(userContext);
  const history = useHistory();
  let itemsList = [];
  if (!userData.user) {
    history.push("/");
  }
  if (userData.user.role === "user") {
    itemsList = [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => history.push("/home"),
        route: "/home",
      },
      {
        text: "Watchlist",
        icon: <FeaturedPlayListIcon />,
        onClick: () => history.push("/watchlist"),
        route: "/watchlist",
      },
      {
        text: "Companies",
        icon: <BusinessIcon />,
        onClick: () => history.push("/companies"),
        route: "/companies",
      },
    ];
  }
  if (userData.user.role === "admin") {
    itemsList = [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => history.push("/home"),
        route: "/home",
      },
      {
        text: "Companies",
        icon: <BusinessIcon />,
        onClick: () => history.push("/companies"),
        route: "/companies",
      },
      {
        text: "Users",
        icon: <PeopleOutlineIcon />,
        onClick: () => history.push("/users"),
        route: "/users",
      },
    ];
  }
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} style={css.justify}>
        <img
          onClick={() => {
            history.push("/home");
          }}
          alt="Logo"
          src="./axe.svg"
          style={{
            width: 175,
          }}
        />
      </div>
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick, route } = item;
          return (
            <ListItem
              button
              key={text}
              className={
                props.history.location.pathname == route
                  ? classes.active
                  : classes.noActive
              }
              onClick={onClick}
            >
              {icon && <ListItemIcon> {icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar onClick={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{props.body}</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
