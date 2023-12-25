import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAuth } from "../contexts/AuthContextProvder";
import { NavLink } from "react-router-dom";
import Search from "./products/Search";
import style from "./main.module.css";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [product, setProduct] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProductClose = () => {
    setProduct(null);
  };

  const { currentUser, setCurrentUser, handleLogout, checkAuth } = useAuth();
  React.useEffect(() => {
    checkAuth();
    setCurrentUser(localStorage.getItem("email"));
  }, []);

  React.useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 90 }}>
          <Toolbar sx={{ gap: 2 }}>
            <MenuItem onClick={handleProductClose}>
              <NavLink className={style.sub} to={"/"}>
                PRODUCTS
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleProductClose}>
              <NavLink className={style.sub} to={"/add"}>
                ADD
              </NavLink>
            </MenuItem>
          </Toolbar>
          <Toolbar sx={{ gap: 2 }}>
            <div>{currentUser ? currentUser : "No active user"}</div>
            <Search />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle sx={{ width: 45, height: 45 }} />
            </IconButton>
            <Menu
              sx={{ marginTop: "30px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <NavLink className={style.sup} to={"/login"}>
                  Sign in
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink className={style.sup} to={"/register"}>
                  Sign up
                </NavLink>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
