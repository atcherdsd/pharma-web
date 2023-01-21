import { useState, useEffect } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import removeUserDataFromLS from '../helpers/utils';
import useFetchReducer from '../hooks/FetchReducer';
import { enumReqType } from '../helpers/EnumReqType';

const drawerWidth = 240;

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBar({ open, toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const [dataForBody, setDataForBody] = useState({ content: '', body: { refreshToken: '' } });
  const { isSuccsessReq } = useFetchReducer(dataForBody, enumReqType.logout);
  const { setOpen } = useAlert();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    setDataForBody({ content: refreshToken, body: { refreshToken } });
    removeUserDataFromLS();
    handleClose();
    setOpen(true);
  };

  useEffect(() => {
    if (isSuccsessReq) {
      navigate('/');
    }
  }, [isSuccsessReq]);

  return (
    <CustomAppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton
          sx={{
            marginLeft: '12px',
          }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="dialog"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </CustomAppBar>
  );
}
