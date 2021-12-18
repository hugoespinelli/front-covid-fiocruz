import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import {
  useLocation
} from "react-router-dom";

import WithBackdrop from "../components/backdrop_hoc";
import { 
  register_sample, 
  update_sample,
  get_sample, 
} from "../utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: "400px",
  },
  switch: {
    margin: theme.spacing(0),
  },
  btn: {
    margin: theme.spacing(1),
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RegisterSamples = (props) => {
  const setBackdropOpen = props.setBackdropOpen;
  const classes = useStyles();
  const queryStringParams = useQuery();
  const sampleId = queryStringParams.get("id_amostra");
  const isEdit = sampleId !== null;
  const [state, setState] = React.useState({
    id_geo: "",
    version_crc: "",
    param_crc: "",
    filter_crc: "",
    sampleId: sampleId ? sampleId : "",
    id_biosample: queryStringParams.get("nome") ? queryStringParams.get("nome") : "",
    fileId: queryStringParams.get("id_arquivo") ? queryStringParams.get("id_arquivo") : "",
    isInfected: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => setBackdropOpen(false), [setBackdropOpen]);
  React.useEffect(() => {
    async function getOptions() {
        let sampleEdit = {};
        if (isEdit) {
          const sample = await get_sample(state.sampleId);
          sampleEdit = {
            id_geo: sample.id_geo,
            version_crc: sample.versao_crc,
            param_crc: sample.param_crc,
            filter_crc: sample.filtro_crc,
            isInfected: !!sample.celulas_infectadas,
            id_biosample: sample.id_biosample,
            fileId: sample.id_arquivo,
          };
        }
        setState({
          ...state,
          ...sampleEdit,
        });
        
    }
    getOptions();
    // eslint-disable-next-line
 }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleChangeSwitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const mapperData = (data) => {
    return {
      id_arquivo: parseInt(data.fileId),
      id_geo: data.id_geo,
      id_biosample: data.id_biosample,
      versao_crc: data.version_crc,
      param_crc: data.param_crc,
      filtro_crc: data.filter_crc,
      celulas_infectadas: data.isInfected,
    };
  };

  const translateData = (data) => {
    const translation = {
      id_geo: "Identificador banco geo",
      version_crc: "Versão do CRC",
    };
    return translation[data];
  };

  const isEmpty = (data) => {
    return data === "";
  };

  const getActionPageInfo = () => {
    return isEdit ? "Atualizar" : "Registrar";
  }

  const isDataValid = (data) => {
    const fieldsToBeChecked = ["id_geo", "version_crc"];
    return fieldsToBeChecked.every((field) => {
      if (isEmpty(state[field])) {
        enqueueSnackbar(`O campo ${translateData(field)} se encontra vazio.`, {
          variant: "error",
        });
        return false;
      }
      return true;
    });
  };

  const onclick = async (event) => {
    if (isDataValid(state)) {
      setBackdropOpen(true);
      const dataMapped = mapperData(state);
      try {
        if (isEdit) {
          await update_sample(dataMapped, state.sampleId);
        } else {
          await register_sample(dataMapped);
        }
        enqueueSnackbar("A amostra foi salva com sucesso!", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Oops! Deu algo errado ao salvar a amostra.", {
          variant: "error",
        });
      } finally {
        setBackdropOpen(false);
      }
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom={true} align="left">
        {getActionPageInfo()} nova amostra
      </Typography>
      <Grid container direction="column" alignItems="flex-start">
        <FormControlLabel
          control={
            <Switch
              checked={state.isInfected}
              onChange={handleChangeSwitch}
              name="isInfected"
              color="primary"
            />
          }
          label="Esse dataset é composto
          exclusivamente de células infectadas?"
          className={classes.switch}
        />
        <TextField
          id="fileName"
          name="fileName"
          label="BioSample"
          value={state.id_biosample}
          className={classes.textField}
          disabled={true}
        />

        <TextField
          id="identifier"
          name="id_geo"
          label="Id Geo"
          value={state.id_geo}
          onChange={handleChange}
          className={classes.textField}
        />

        <TextField
          id="identifier"
          name="version_crc"
          label="Versão Cellranger count"
          value={state.version_crc}
          onChange={handleChange}
          className={classes.textField}
        />

        <TextField
          id="identifier"
          name="param_crc"
          label="Paramêtros do Cellranger Count"
          value={state.param_crc}
          onChange={handleChange}
          className={classes.textField}
        />

        <TextField
          id="identifier"
          name="filter_crc"
          label="Filtros do Cellranger Count"
          value={state.filter_crc}
          onChange={handleChange}
          className={classes.textField}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onclick}
        >
          {getActionPageInfo()}
        </Button>
      </Grid>
    </Paper>
  );
};

export default WithBackdrop(RegisterSamples);
