import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddchartIcon from '@mui/icons-material/Addchart';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import SellIcon from '@mui/icons-material/Sell';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from './MenuItem';
import menuItemNames from '../../helpers/menuItemNames';

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
        <MenuItem
          text={menuItemNames.addAContext}
          icon={<AddchartIcon />}
          route="/dashboard/add-context"
        />
        <MenuItem
          text={menuItemNames.newCustomer}
          icon={<GroupAddIcon />}
          route="/dashboard/add-customer"
        />
        <MenuItem
          text={menuItemNames.nftCreation}
          icon={<AddBoxIcon />}
          route="/dashboard/nft-creation"
        />
        <MenuItem
          text={menuItemNames.transferIngredient}
          icon={<DriveFileMoveIcon />}
          route="/dashboard/transfer-ingredient"
        />
        <MenuItem
          text={menuItemNames.nftSelling}
          icon={<SellIcon />}
          route="/dashboard/nft-selling"
        />
        <MenuItem
          text={menuItemNames.nftRequestBurn}
          icon={<AcUnitIcon />}
          route="/dashboard/nft-req-burn"
        />
        <MenuItem
          text={menuItemNames.nftBurning}
          icon={<LocalFireDepartmentIcon />}
          route="/dashboard/nft-burning"
        />
      </List>
    </CustomDrawer>
  );
}
