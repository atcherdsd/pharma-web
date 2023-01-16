import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from './MenuItem';

const drawerWidth = 240;

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

export default function Menu({ open, toggleDrawer }) {
  return (
    <CustomDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <MenuItem text="Add a context" icon={<DashboardIcon />} route="/dashboard/add-context" />
        <MenuItem text="New customer" icon={<DashboardIcon />} route="/dashboard/add-customer" />
        <MenuItem text="NFT creation" icon={<DashboardIcon />} route="/dashboard/nft-creation" />
        <MenuItem
          text="Request NFT Burn"
          icon={<DashboardIcon />}
          route="/dashboard/nft-req-burn"
        />
        <MenuItem text="NFT burning" icon={<DashboardIcon />} route="/dashboard/nft-burning" />
      </List>
    </CustomDrawer>
  );
}
