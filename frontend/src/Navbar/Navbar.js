import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./Navbar.css";
import { Link, Route, Router, NavLink } from "react-router-dom";
import { Switch } from "formik-material-ui";

const pages = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "About us",
    path: "/aboutus",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Admin",
    path: "/adminlogin",
  },
];

// const routes = [
//   {
//     name: "home",
//     path: "/",
//   },
//   {
//     name: "blog",
//     path: "/blog",
//   },
// ];

// const routeComponents = routes.map(({ name, path }) => (
//   <Route key={name} exact path={path}>
//     <h1>{name}</h1>
//   </Route>
// ));

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
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

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "hsl(203deg 100% 50%)" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ backgroundColor: "hsl(203deg 100% 50%)", padding: 0 }}
        >
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGIGBEE
          </Typography> */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              className="sidemenu1"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", fontFamily: "poopins" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  className="tracking-nav-link1"
                >
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            className="logicbee"
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "poopins",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "14px",
              marginLeft: "-70%",
            }}
          >
            LOGICBEE
          </Typography>

          <Box
            className="sidemenu"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
            onClick={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <nav>
                <NavLink
                  to={page.path}
                  className={({ isActive }) =>
                    isActive
                      ? "tracking-nav-link1 active"
                      : "tracking-nav-link1"
                  }
                >
                  {page.name}
                </NavLink>
              </nav>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            <Link
              to="/emploe"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                onClick={handleCloseNavMenu}
                className="temple-nav-link1"
                sx={{
                  position: "relative",
                  right: "150px",
                  fontSize: "17px",
                  color: "white",
                }}
              >
                Login
              </Button>
            </Link> */}
          {/* </Tooltip> */}
          {/* <Menu
              sx={{ mt: "35px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          {/* </Box> */}

          {/* <Box sx={{ flexGrow: 0 }}>
            <Link to="/emee" style={{ textDecoration: "none", color: "white" }}>
              <Button
                onClick={handleCloseNavMenu}
                className="temple-nav-link1"
                sx={{
                  position: "relative",
                  right: "100px",
                  fontSize: "17px",
                  color: "white",
                }}
              >
                Admin
              </Button>
            </Link> */}
          {/* </Tooltip>
            <Menu
              sx={{ mt: "35px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          {/* </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
