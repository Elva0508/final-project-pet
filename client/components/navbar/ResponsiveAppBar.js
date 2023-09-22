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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";

//logo-icon
import catLogo from "@/assets/catLogo.svg";
import McatLogo from "@/assets/McatLogo.svg"
//shoppingCart
import ShoppingCart from "@/assets/shoppingCart.svg";

const theme = createTheme({
  // 在这里定义您的自定义主题属性
  palette: {
    primary: {
      main: "#f8cb9f", // 主色调
    },
    secondary: {
      main: "#f50057", // 次要色调
    },
  },
  typography: {
    fontFamily: "Noto Sans TC", // 设置全局字体
    fontWeight: 700,
    color:"#f8cb9f",
    // 在这里定义其他文本样式
  },
  // 添加其他自訂樣式
  components: {
    MuiContainer: {
      root: {
        maxWidth: "1440px",
      },
      maxWidthMd: {
        maxWidth: 320,
      },
      maxWidthLg: {
        maxWidth: "1440px!important",
      },
    },
  },
});

const pages = ["品牌介紹", "全部商品", "小貓上工", "小貓兩三知", "常見問題"];
const settings = ["註冊", "登入"];

function ResponsiveAppBar() {
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
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth={false} sx={{ maxWidth: "1440px" }}>
          <Toolbar disableGutters>
            {/*     
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon fontSize="large" sx={{ color: "#512f10"}}/>
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
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    sx={{width: "330px" , background:"#f8cb9f", fontSize: "16px",
                    fontWeight:"700",my: 2,}}
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Button >
              <Image  src={McatLogo} alt="logo" />
              </Button>
        
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

            {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            小貓兩三隻
            
          </Typography> */}

            {/* navbar log nav-li cat mumber */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Image src={catLogo} alt="logo" />
              {/* {pages.map((page) => (

              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 3.5, color: '#512f10', display: 'block',fontSize: '20px', }}
              >
                {page}
              </Button>
            ))} */}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3.5,
                    paddingRight: "30px",
                    color: "#512f10",
                    display: "block",
                    fontSize: "20px",
                    fontWeight:"700"
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                < AccountCircleIcon style={{ fontSize: 40 }}  sx={{ display: { xs: 'flex', md: 'flex' }, mr: 2, }} />
                </IconButton>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Image src={ShoppingCart} alt="shoppingCart" />
                  {/* <Avatar alt="Remy Sharp" src="@/assets/shoppingCart.svg" /> */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
