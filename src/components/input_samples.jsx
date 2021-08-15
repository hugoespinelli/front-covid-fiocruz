import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function InputSamples(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="label-native-helper">{props.label}</InputLabel>
      <NativeSelect
        value={props.value}
        onChange={props.onChange}
        inputProps={{
          name: props.name,
          id: "label-native-helper",
        }}
      >
        <option aria-label="None" value="" />
        {props.options.map(({ key, value }) => (
          <option value={value} key={value}>{key}</option>
        ))}
      </NativeSelect>
      <FormHelperText>{props.help}</FormHelperText>
    </FormControl>
  );
}

InputSamples.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
}
