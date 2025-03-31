// src/components/Sidebar.jsx
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'var(--primary-midnight-blue)',
    color: 'var(--accent-soft-white)',
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'var(--primary-electric-cyan)',
    },
  },
}));

const Sidebar = ({ menuItems }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={index} 
            className={classes.listItem} 
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
