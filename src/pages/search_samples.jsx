import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FiocruzLogo from "../logo-fiocruz.png";
import Avatar from "@material-ui/core/Avatar";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  large: {
    width: theme.spacing(14),
    height: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  containerSpace: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
  },
}));

export default function SearchSamples() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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

      <Container className={classes.containerSpace}>
        <MaterialTable
          localization={{
            toolbar: {
              searchPlaceholder: "Procurar amostra",
            },
            header: {
              actions: "Ações",
            },
            body: {
              emptyDataSourceMessage: "Sem amostras disponíveis",
            },
          }}
          columns={[
            { title: "ID da amostra", field: "name" },
            { title: "Nome do Arquivo", field: "surname" },
            { title: "Tipo", field: "birthYear" },
            { title: "Comorbidade", field: "birthYear" },
            { title: "Tecido", field: "birthYear" },
            { title: "Data criação", field: "birthYear" },
          ]}
          data={[
            {
              name: "Mehmet",
              surname: "Baran",
              birthYear: 1987,
              birthCity: 63,
            },
          ]}
          actions={[
            {
              icon: "download",
              iconProps: { color: "primary" },
              tooltip: "Baixar amostra",
              onClick: (event, rowData) => console.log("wee"),
            },
            (rowData) => ({
              icon: "compare_arrows",
              iconProps: { color: "primary" },
              tooltip: "Transferir para o servidor",
              onClick: (event, rowData) => console.log("wee"),
            }),
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          title="Dados processados no LNCC"
        />
      </Container>
    </div>
  );
}