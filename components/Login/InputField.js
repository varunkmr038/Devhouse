import React from "react";
import { TextField, Grid } from "@material-ui/core";

function InputField({
  icon,
  autoComplete,
  name,
  required,
  id,
  label,
  error,
  helperText,
  handleChange,
}) {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Grid
          container
          spacing={1}
          alignItems={helperText ? "center" : "flex-end"}
        >
          <Grid item>{icon}</Grid>
          <Grid item sm={11} xs={10}>
            <TextField
              autoComplete={autoComplete}
              name={name}
              variant="standard"
              required={required}
              fullWidth
              id={id}
              label={label}
              error={error}
              helperText={helperText}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default InputField;
