import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from "notistack";

import InputSamples from "../components/input_samples";
import WithBackdrop from "../components/backdrop_hoc";
import { register_sample } from "../utils";

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

function RegisterSamples({ toggleBackdrop })  {
  const classes = useStyles();
  const [state, setState] = React.useState({
    severity: "",
    disease: "",
    tissue: "",
    sampleId: "",
    isInfected: false,
  });
  const { enqueueSnackbar } = useSnackbar();

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
      gravidade: data.severity,
      doenca: data.disease,
      tecido: data.tissue,
      idAmostra: data.sampleId,
      estaInfectado: data.isInfected,
    };
  };

  const translateData = (data) => {
    const translation = {
      sampleId: "id da amostra",
      severity: "gravidade",
      disease: "doença",
      tissue: "tecido",
    };
    return translation[data];
  };

  const isEmpty = (data) => {
    return data === "";
  };

  const isDataValid = (data) => {
    const fieldsToBeChecked = ["sampleId", "severity", "disease", "tissue"];
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
      const dataMapped = mapperData(state);
      const response = await register_sample(dataMapped);
      enqueueSnackbar("A amostra foi salva com sucesso!", {
        variant: "success",
      });
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
          options={[{ key: "leve", value: "leve" }]}
          help="A gravidade do paciente"
        />
        <InputSamples
          label="Doença"
          value={state.disease}
          name="disease"
          onChange={handleChange}
          options={[{ key: "diabetes", value: "diabetes" }]}
          help="Comorbidade do paciente"
        />
        <InputSamples
          label="Tecido"
          name="tissue"
          value={state.tissue}
          onChange={handleChange}
          options={[{ key: "pulmao", value: "pulmao" }]}
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
}

export default WithBackdrop(RegisterSamples);
