import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CustomizedListItemButton = styled(ListItemButton)`
  :hover {
    background-color: #d3d3d3;
  }

  &.active {
    background: #c0c0c0;
  }
`;

export default function MenuItem({ text, route, icon }) {
  return (
    <CustomizedListItemButton component={NavLink} to={route}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </CustomizedListItemButton>
  );
}
