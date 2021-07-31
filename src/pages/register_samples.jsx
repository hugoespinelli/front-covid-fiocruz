import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import InputSamples from "../components/input_samples";

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

export default function RegisterSamples() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    severity: "",
    disease: "",
    tissue: "",
    sampleId: "",
    isInfected: false,
  });

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
        <Button variant="contained" color="primary" className={classes.btn}>
          Registrar
        </Button>
      </Grid>
    </Paper>
  );
}
