import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from 'react-router-dom';
import { useSnackbar } from "notistack";
import "react-confirm-alert/src/react-confirm-alert.css";

import { get_files } from "../utils";

const useStyles = makeStyles((theme) => ({}));

export default function LinkSamples() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

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
          emptyDataSourceMessage: "Sem arquivos disponíveis",
        },
      }}
      columns={[
        { title: "ID arquivo", field: "nomeArquivo" },
        { title: "Criado em", field: "criado" },
      ]}
      data={(query) =>
        new Promise(async (resolve, reject) => {
          const samples = await get_files(query);
          resolve({
            data: samples, // your samples array
            page: 0, // current page number
            totalCount: samples.length, // total row number
          });
        })
      }
      actions={[
        {
          icon: "link",
          iconProps: { color: "primary" },
          tooltip: "Linkar amostra",
          onClick: (event, rowData) =>
          history.push(`/cadastrar?arquivo_id=${rowData.nomeArquivo}`),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      title="Arquivos transferidos no servidor"
    />
  );
}
