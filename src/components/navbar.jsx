import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FiocruzLogo from "../logo-fiocruz-branca.png";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6),
    height: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
      <AppBar position="static" color="transparent">
        <Toolbar variant="regular">
          <Grid container>
            <Grid container item justifyContent="center">
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
              justifyContent="center"
              alignContent="center"
            >
              <Typography variant="h5" color="inherit">
                Portal Fiocruz
              </Typography>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
  );
}
