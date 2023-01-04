import * as React from 'react';
// import { Titles } from "../../wordBank/Titles";
import { useAtom } from 'jotai';
import { sideNavState } from '../State';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

const Drawer = ({ switchDeck }: { switchDeck: any }) => {
  const [sideNav, setSideNav] = useAtom(sideNavState);
  return (
    <MuiDrawer
      open={sideNav}
      onClose={() => setSideNav(false)}
      variant="temporary"
      sx={{ background: 'none' }}
      PaperProps={{
        elevation: 0,
      }}
    >
      <List>
        {['words'].map((text, index) => (
          <ListItem
            key={index}
            sx={{ padding: '0 55px' }}
            onClick={() => {
              switchDeck(text);
              setSideNav(false);
            }}
          >
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="caption">{text}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
