import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import InputSamples from "../components/input_samples";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function RegisterSamples() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    severity: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom="true" align="left">
        Registrar nova amostra
      </Typography>
      <Grid container alignItems="flex-start">

        <Grid item>
        <InputSamples 
          label="Gravidade"
          value={state.severity}
          onChange={handleChange}
          options={[{key: "leve", value: "leve"}]}
          help="A gravidade que o paciente se encontra"
        />
        <InputSamples 
          label="Doença"
          value={state.disease}
          onChange={handleChange}
          options={[{key: "leve", value: "leve"}]}
          help="Comorbidade do paciente"
        />
        <InputSamples 
          label="Tecido"
          value={state.tissue}
          onChange={handleChange}
          options={[{key: "leve", value: "leve"}]}
          help="Tecido da amostra"
        />
        </Grid>

      </Grid>
    </Paper>
  );
}
