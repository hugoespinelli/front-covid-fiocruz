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

import InputSamples from "../components/input_samples";
import WithBackdrop from "../components/backdrop_hoc";
import { 
  register_sample, 
  get_diseases, 
  get_comorbidities, 
  get_tissues, 
  get_severities, 
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
  const [state, setState] = React.useState({
    severity: "",
    severityOptions: [],
    disease: "",
    diseaseOptions: [],
    tissue: "",
    tissueOptions: [],
    comorbidity: "",
    comorbidityOptions: [],
    sampleId: "",
    fileName: useQuery().get("nome"),
    fileId: useQuery().get("arquivo_id"),
    isInfected: true,
  });
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => setBackdropOpen(false), [setBackdropOpen]);
  React.useEffect(() => {
    async function getOptions() {
        const diseases = await get_diseases();
        const comorbidites = await get_comorbidities();
        const tissues = await get_tissues();
        const severities = await get_severities();
        setState({
          ...state, 
          diseaseOptions: mapKeyValueOptions(diseases, "id_doenca"),
          comorbidityOptions: mapKeyValueOptions(comorbidites, "id_comorbidade"),
          tissueOptions: mapKeyValueOptions(tissues, "id_tecido"),
          severityOptions: mapKeyValueOptions(severities, "id_gravidade"),
        });
    }
    getOptions();
    // eslint-disable-next-line
 }, [])


 const mapKeyValueOptions = (options, value, key = "nome") => {
   return options.map(option => ({key: option[key], value: option[value]}))
 }

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
      id_arquivo: data.fileId,
      gravidade: data.severity,
      doenca: data.disease,
      tecido: data.tissue,
      numero: data.sampleId,
      estaInfectado: data.isInfected,
    };
  };

  const translateData = (data) => {
    const translation = {
      sampleId: "id da amostra",
      severity: "gravidade",
      disease: "doença",
      tissue: "tecido",
      comorbidity: "comorbidade",
    };
    return translation[data];
  };

  const isEmpty = (data) => {
    return data === "";
  };

  const isDataValid = (data) => {
    const fieldsToBeChecked = ["sampleId", "severity", "disease", "tissue", "comorbidty"];
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
        await register_sample(dataMapped);
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
      <Typography variant="h6" gutterBottom="true" align="left">
        Registrar nova amostra
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
          label="Está infectado?"
          className={classes.switch}
        />
        <TextField
          id="fileName"
          name="fileName"
          label="Identificador arquivo"
          value={state.fileName}
          className={classes.textField}
          disabled={true}
        />

        <TextField
          id="sampleId"
          name="sampleId"
          label="Identificador amostra"
          value={state.sampleId}
          onChange={handleChange}
          className={classes.textField}
        />

        <InputSamples
          label="Gravidade"
          name="severity"
          value={state.severity}
          onChange={handleChange}
          options={state.severityOptions}
          help="A gravidade do paciente"
        />
        <InputSamples
          label="Doença"
          value={state.disease}
          name="disease"
          onChange={handleChange}
          options={state.diseaseOptions}
          help="Doença do paciente"
        />
        <InputSamples
          label="Comorbidade"
          value={state.comorbidity}
          name="comorbidity"
          onChange={handleChange}
          options={state.comorbidityOptions}
          help="Comorbidade do paciente"
        />
        <InputSamples
          label="Tecido"
          name="tissue"
          value={state.tissue}
          onChange={handleChange}
          options={state.tissueOptions}
          help="Tecido da amostra"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onclick}
        >
          Registrar
        </Button>
      </Grid>
    </Paper>
  );
};

export default WithBackdrop(RegisterSamples);
