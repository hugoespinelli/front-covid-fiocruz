import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faVial } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey'
import Typography from "@material-ui/core/Typography";
import {
  ProSidebar,
  Menu,
  SubMenu,
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
          <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
          Página Inicial
          <Link to="/" />
          </MenuItem>
          <SubMenu title="Amostras" icon={<FontAwesomeIcon icon={faVial} />}>
            
            <MenuItem>
              <Link to="/lncc" />
              <Typography variant="caption">Arquivos LNCC</Typography>
            </MenuItem>

            <MenuItem>
              <Link to="/servidor" />
              <Typography variant="caption">Arquivos Servidor Fiocruz</Typography>
            </MenuItem>

            <MenuItem>
              <Link to="/cadastrar" />
              <Typography variant="caption">Cadastrar Amostra</Typography>
            </MenuItem>
            
          </SubMenu>
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
