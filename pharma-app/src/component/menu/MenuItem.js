import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { menuButtonColors } from '../helpers/menuButtonColors';

const CustomizedListItemButton = styled(ListItemButton)`
  border-radius: 1rem 0 0 1rem;
  :hover {
    color: ${menuButtonColors.actionsColor};
    background-color: ${menuButtonColors.hoverBackgroundColor};
    transition: 0.3s;
  }
  &.active {
    color: ${menuButtonColors.actionsColor};
    background: linear-gradient(
      45deg,
      ${menuButtonColors.activePrimaryBackground},
      ${menuButtonColors.activeSecondaryBackground}
    );
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
