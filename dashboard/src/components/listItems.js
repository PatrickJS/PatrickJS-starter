import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import ListIcon from '@material-ui/icons/List';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CodeIcon from '@material-ui/icons/Code';

import { Link } from "react-router-dom";

export const mainListItems = (props) => {
  const projectName = props.match.params.project || props.projectName
  return (
    <div>
      <Link to={"/dashboard/" + projectName + "/tasks"}>
        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
            <ListItemText primary="Tasks" />
        </ListItem>
      </Link>
      <Link to={"/dashboard/" + projectName + "/packages"}>
        <ListItem button>
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
            <ListItemText primary="Packages" />
        </ListItem>
      </Link>
    </div>
  )
}

export const secondaryListItems = (props) => {
  const projectName = props.match.params.project || props.projectName
  return (
    <div>
      <ListSubheader inset>Shared</ListSubheader>
      <Link to={"/dashboard/" + projectName + "/scripts"}>
        <ListItem button>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
            <ListItemText primary="Scripts" />
        </ListItem>
      </Link>
    </div>
  )
}
