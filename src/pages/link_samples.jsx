import React from "react";
import MaterialTable from "material-table";
import { useHistory } from 'react-router-dom';
import "react-confirm-alert/src/react-confirm-alert.css";

import { get_files } from "../utils";

export default function LinkSamples() {
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
        { title: "ID arquivo", field: "nome" },
        { title: "Criado em", field: "data_criacao" },
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
          history.push(`/cadastrar?id_arquivo=${rowData.id_arquivo}&nome=${rowData.nome}`),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      title="Arquivos transferidos no servidor"
    />
  );
}
