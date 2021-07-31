import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { confirmAlert } from "react-confirm-alert";
import { useSnackbar } from "notistack";
import "react-confirm-alert/src/react-confirm-alert.css";

import { get_samples, transfer_files } from "../utils";

const useStyles = makeStyles((theme) => ({}));

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
          render: (rowData) => (rowData ? "sim" : "não"),
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
  );
}
