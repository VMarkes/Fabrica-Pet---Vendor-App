import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../pages/contexts/auth"
import CountCart from "./CountCart";
import './header.css';
import { Button } from 'react-bootstrap';

const Header = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("users_bd"))[0]);

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));
    setCarrinho(carrinhoSalvo || []);
  }, []);

  const drawerWidth = 240;

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
      
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const { logOut } = useContext(AuthContext);

    async function handleLogout(){
      await logOut();
    }

  return (
    <nav className="navbar">
      <div className={`nav-elements`}>
        <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar position="fixed" open={open} sx={{ backgroundColor: "#1e9ac7" }}>
                <Toolbar>
                  <Box sx={{ flexGrow: 0}}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ flexGrow: 1, display: {md: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
                    <Typography variant="h6" noWrap component="div" sx={{ marginLeft: 1 }}>
                      <Link className='logo-name' to="/Home">Fábrica Pet</Link>
                    </Typography>
                  </Box>
                  <Box className="count" sx={{ marginRight: 3 }}>
                    <CountCart className="countCart"/>
                    <IconButton aria-label="cart">
                      <Link to="/Carrinho">
                        <ShoppingCartIcon className="cartIcon" />
                      </Link>
                    </IconButton>
                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorOrigin={{ horizontal: 'right', }}
                      keepMounted
                      transformOrigin={{ horizontal: 'right', }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Link onClick={handleDrawerClose} className="menuItem" to="/Home">Perfil</Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Link onClick={handleDrawerClose} className="menuItem" to="/Home">Configurações</Link>
                        </MenuItem>
                    </Menu>
                  </Box>
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    boxShadow: "5px 8px 12px #888888",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader sx={{ display: {md: 'flex', justifyContent: 'space-between'}}}>
                  <img className='header-img' src='https://static.wixstatic.com/media/f60e49_bd710830fc8745e2854486f48b235c43~mv2.png/v1/fill/w_140,h_96,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo-f%25C3%25A1brica-pet-01_edited.png' />
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  <ListItem>
                    <LocalOfferRoundedIcon sx={{ marginRight: 2, color: "#1e9ac7"}} /><Link onClick={handleDrawerClose} className="menuItem" to="/Shop">Produtos</Link>
                  </ListItem>
                  <ListItem>
                    <ShoppingCartIcon sx={{ marginRight: 2, color: "#1e9ac7"}} /><Link onClick={handleDrawerClose} className="menuItem" to="/Carrinho">Carrinho</Link>
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem sx={{ marginTop: -2 }}>
                    <h4>{user.email.split('@')[0]}</h4>
                  </ListItem>
                  <ListItem sx={{ marginTop: -2 }}>
                    <DashboardCustomizeRoundedIcon sx={{ marginRight: 2, color: "#1e9ac7"}} /><Link onClick={handleDrawerClose} className="menuItem" to="/Home">Dashboard</Link>
                  </ListItem>
                  <ListItem>
                    <AttachMoneyRoundedIcon sx={{ marginRight: 2, color: "#1e9ac7"}} /><Link onClick={handleDrawerClose} className="menuItem" to="/meus-pedidos">Meus Pedidos</Link>
                  </ListItem>
                  <ListItem>
                    <GroupRoundedIcon sx={{ marginRight: 2, color: "#1e9ac7"}} /><Link onClick={handleDrawerClose} className="menuItem" to="/Clientes">Clientes</Link>
                  </ListItem>
                  <ListItem>
                    <PersonAddAlt1Icon sx={{ marginRight: 2, color: "#1e9ac7"}} /><Link onClick={handleDrawerClose} className="menuItem" to="/newClient">Cadastrar Cliente</Link>
                  </ListItem>
                  <ListItem>
                    <Button className='logOut-btn' onClick={handleLogout}>Sair</Button>
                  </ListItem>
                </List>
              </Drawer>
        </Box>
      </div>
    </nav>
  )
}

export default Header;