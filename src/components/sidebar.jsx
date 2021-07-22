import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVial } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey'
import Typography from "@material-ui/core/Typography";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import "react-pro-sidebar/dist/css/styles.css";

import Navbar from "./navbar";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "fixed"
  },
  footer: {
    color: grey[700]
  }
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <ProSidebar width={250} className={classes.sidebar}>
      <SidebarHeader>
        <Navbar />
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem icon={<FontAwesomeIcon icon={faVial} />}>
            <Link to="/" />
            <Typography>Amostras</Typography>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu iconShape="square">
          <MenuItem>
            <Typography variant="caption" className={classes.footer}>
              Feito pelos alunos UERJ
            </Typography>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
