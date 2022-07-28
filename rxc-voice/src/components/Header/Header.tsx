import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/icons/logo_1.svg";
import { createStyles, Theme } from '@material-ui/core/styles';
import "./Header.scss";
import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
  IconButton,
  withStyles,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";

import { AccountCircleRounded } from "@material-ui/icons";


const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
});

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "black",
    fontFamily: "Bungee",
    fontWeight: "bold",
    cursor: "pointer",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
 

}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#2eb8b8",
    },
    type: "light",
  },
});

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();


  const history = useHistory();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="fixed">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push("/")}
              className={classes.title}
            >
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                style={{ left: 0 , maxWidth: 160,}}
                
              />
            </Typography>
            <Button component={Link} to="/" color = "inherit" variant="contained"
             style={{
              color: "yellow",
              backgroundColor: "black",
              fontFamily: "suisse_intlbook_italic",
              width: 100,
              height: 40,
              marginRight: 15,
            }}           
            >
              HOME
              </Button>
              <Button  component={Link} to="/about"  color = "inherit" variant="contained"
             style={{
              color: "yellow",
              backgroundColor: "black",
              fontFamily: "suisse_intlbook_italic",
              width: 100,
              height: 40,
              marginRight: 15,
            }}           
            >
              ABOUT
              </Button>
              <Button component={Link} to="/manage-events" color = "inherit" variant="contained"
             style={{
              color: "yellow",
              backgroundColor: "black",
              fontFamily: "suisse_intlbook_italic",
              width: 100,
              height: 40,
              marginRight: 15,
            }}           
            >
              ADMIN
              </Button>
              <Button component={Link} to="/help" color = "inherit" variant="contained"
             style={{
              color: "yellow",
              backgroundColor: "black",
              fontFamily: "suisse_intlbook_italic",
              width: 100,
              height: 40,
              marginRight: 15,
            }}           
            >
              HELP
              </Button>

              <IconButton component={Link} to="/account"
              style={{ width: 50,
                height: 20,}}
              
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircleRounded />
              </IconButton>
              
            
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;