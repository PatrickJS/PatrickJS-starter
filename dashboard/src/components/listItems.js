import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import ListIcon from '@material-ui/icons/List';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CodeIcon from '@material-ui/icons/Code';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AllInboxIcon />
      </ListItemIcon>
      <ListItemText primary="Packages" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Shared</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="Scripts" />
    </ListItem>
  </div>
);