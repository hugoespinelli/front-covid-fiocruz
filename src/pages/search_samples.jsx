import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FiocruzLogo from "../logo-fiocruz.png";
import Avatar from "@material-ui/core/Avatar";
import MaterialTable from "material-table";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { get_samples } from "../utils";

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

  const submit = (rowData) => {
    confirmAlert({
      title: 'Confirmação de transfêrencia de arquivos',
      message: `Você tem certeza que deseja transferir o arquivo ${rowData.numero} do SDummont para a fiocruz?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'Não',
        }
      ]
    });
  };

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
            { title: "ID da amostra", field: "numero" },
            { title: "Gravidade", field: "gravidade" },
            { title: "Doenca", field: "doenca" },
            { title: "Tecido", field: "tecido" },
            { title: "Está Infectado", field: "estaInfectado", render: rowData => rowData ? "Sim": "Não"},
          ]}
          data={query =>
            new Promise(async (resolve, reject) => {
              const samples = await get_samples(query);
              resolve({
                  data: samples, // your samples array
                  page: 0, // current page number
                  totalCount: samples.length, // total row number
              });
            })
        }
          actions={[
            {
              icon: "download",
              iconProps: { color: "primary" },
              tooltip: "Baixar amostra",
              onClick: (event, rowData) => alert(`Baixar amostra ${rowData.numero}`),
            },
            (rowData) => ({
              icon: "compare_arrows",
              iconProps: { color: "primary" },
              tooltip: "Transferir para o servidor",
              onClick: (event, rowData) => submit(rowData),
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
