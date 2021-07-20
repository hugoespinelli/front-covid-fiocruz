import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FiocruzLogo from "../logo-fiocruz.png";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(14),
    height: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
      <AppBar position="static">
        <Toolbar variant="regular">
          <Grid container>
            <Grid container item md={4} justifyContent="left">
              <Avatar
                alt="logo fiocruz"
                variant="rounded"
                src={FiocruzLogo}
                className={classes.large}
              />
            </Grid>

            <Grid
              container
              item
              md={4}
              justifyContent="center"
              alignContent="center"
            >
              <Typography variant="h4" color="inherit">
                Portal Fiocruz
              </Typography>
            </Grid>

            <Grid item md={4}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
}
