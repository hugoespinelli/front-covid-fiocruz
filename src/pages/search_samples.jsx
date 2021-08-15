import React from "react";
import MaterialTable from "material-table";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from 'react-router';
import "react-confirm-alert/src/react-confirm-alert.css";

import { get_samples, delete_sample, download_sample } from "../utils";

export default function SearchSamples() {
  const history = useHistory();

  const submit = (rowData) => {
    confirmAlert({
      title: "Confirmação de exclusão de arquivo",
      message: `Você tem certeza que deseja excluir o arquivo ${rowData.numero}?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => delete_sample(rowData.id) && history.go(0),
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
        { title: "Arquivo linkado", field: "nomeArquivo" },
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
            download_sample(rowData.id_arquivo),
        },
        (rowData) => ({
          icon: "edit",
          iconProps: { color: "primary" },
          tooltip: "Editar amostra",
          onClick: (event, rowData) => 
            history.push(`/cadastrar?id_amostra=${rowData.id}`),
        }),
        (rowData) => ({
          icon: "delete",
          iconProps: { color: "secondary" },
          tooltip: "Excluir amostra",
          onClick: (event, rowData) => submit(rowData),
        }),
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      title="Catálogo de Amostras"
    />
  );
}
