import React from "react";
import MaterialTable from "material-table";
import { TablePagination } from '@material-ui/core';
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from 'react-router';
import "react-confirm-alert/src/react-confirm-alert.css";

import { get_samples, delete_sample, download_sample } from "../utils";

function PatchedPagination(props) {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  return (
    <TablePagination
      {...tablePaginationProps}
      // @ts-expect-error onChangePage was renamed to onPageChange
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        return (
          // @ts-expect-error ActionsComponent is provided by material-table
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
          />
        );
      }}
    />
  );
}

export default function SearchSamples() {
  const history = useHistory();

  const submit = (rowData) => {
    confirmAlert({
      title: "Confirmação de exclusão de arquivo",
      message: `Você tem certeza que deseja excluir o arquivo ${rowData.id_biosample}?`,
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
      components={{
        Pagination: PatchedPagination,
      }}
      onChangePage={(page) => ({page: page + 1})}
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
        { title: "Id geo", field: "id_geo" },
        { title: "Biosample", field: "id_biosample" },
        { title: "Versao crc", field: "versao_crc" },
        { title: "Param crc", field: "param_crc" },
        { title: "Filtro crc", field: "filtro_crc" },
        {
          title: "Infectado",
          field: "celulas_infectadas",
          render: (rowData) => (rowData.celulas_infectadas ? "sim" : "não"),
        },
      ]}
      data={(query) =>
        new Promise(async (resolve, reject) => {
          const samples = await get_samples(query);
          resolve({
            data: samples, // your samples array
            page: 0, // current page number
            pageSize: samples.length,
            totalCount: samples.length, // total row number
          });
        })
      }
      actions={[
        // Deixar on hold essa parte de download
        // {
        //   icon: "download",
        //   iconProps: { color: "primary" },
        //   tooltip: "Baixar amostra",
        //   onClick: (event, rowData) =>
        //     download_sample(rowData.id_arquivo),
        // },
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
        paging: false,
      }}
      title="Catálogo de Amostras"
    />
  );
}
