import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { withRouter } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../context/userContext";
import Header from "./header";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { userData, setUserData } = useContext(userContext);

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { history } = props;
  let itemsList = [];
  if (!userData.user) {
    itemsList = [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => history.push("/"),
      },
    ];
  } else {
    if (userData.user.role === "user") {
      itemsList = [
        {
          text: "Home",
          icon: <HomeIcon />,
          onClick: () => history.push("/"),
        },
        {
          text: "Watchlist",
          icon: <FeaturedPlayListIcon />,
          onClick: () => history.push("/watchlist"),
        },
        {
          text: "Companies",
          icon: <BusinessIcon />,
          onClick: () => history.push("/companies"),
        },
      ];
    }
    if (userData.user.role === "admin") {
      itemsList = [
        {
          text: "Home",
          icon: <HomeIcon />,
          onClick: () => history.push("/"),
        },
        {
          text: "Companies",
          icon: <BusinessIcon />,
          onClick: () => history.push("/companies"),
        },
        {
          text: "Users",
          icon: <PeopleOutlineIcon />,
          onClick: () => history.push("/users"),
        },
      ];
    }
  }
  const drawer = (
    <div>
      <div
        style={{
          display: "block",
          textAlign: "center",
        }}
      >
        <img
          alt=""
          src={"./axe.svg"}
          style={{
            width: 135,
            padding: 10,
          }}
        />
      </div>
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
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
      <Header onClick={handleDrawerToggle} />
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
      <main className={classes.content}></main>
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
