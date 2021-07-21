import React from "react";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Navbar from "./navbar";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "fixed"
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
          <MenuItem icon={<EcoOutlinedIcon />}>
            <Typography>Amostras</Typography>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu iconShape="square">
          <MenuItem>
            <Typography variation="overline">
              Feito pelos alunos UERJ
            </Typography>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
