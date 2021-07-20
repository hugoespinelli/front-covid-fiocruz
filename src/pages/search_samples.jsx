import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Container from "@material-ui/core/Container";
import MaterialTable from "material-table";
import { confirmAlert } from "react-confirm-alert";
import { useSnackbar } from "notistack";
import "react-confirm-alert/src/react-confirm-alert.css";

import { get_samples, transfer_files } from "../utils";
import Navbar from "../components/navbar";

const useStyles = makeStyles((theme) => ({
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
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function SearchSamples() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const transferFiles = async () => {
    try {
      const response = await transfer_files();
      enqueueSnackbar("Transferência efetuada com sucesso!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Oops! Deu algo errado durante a transferência.", {
        variant: "error",
      });
    }
  };

  const submit = (rowData) => {
    confirmAlert({
      title: "Confirmação de transfêrencia de arquivos",
      message: `Você tem certeza que deseja transferir o arquivo ${rowData.numero} do SDummont para a fiocruz?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => transferFiles(),
        },
        {
          label: "Não",
        },
      ],
    });
  };

  return (
    <Grid container>
      <Grid item sm={2}>
        <ProSidebar width={250}>
          <SidebarHeader>
            <Navbar />
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem><Typography>Amostras</Typography> </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Typography variation='caption'>
              Feito pelos alunos UERJ
            </Typography>
          </SidebarFooter>
        </ProSidebar>
      </Grid>
      <Grid item sm={10}>
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
              {
                title: "Está Infectado",
                field: "estaInfectado",
                render: (rowData) => (rowData ? "Sim" : "Não"),
              },
            ]}
            data={(query) =>
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
                onClick: (event, rowData) =>
                  alert(`Baixar amostra ${rowData.numero}`),
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
      </Grid>
    </Grid>
  );
}
