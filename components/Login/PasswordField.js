import React, { useState } from "react";
import {
  Grid,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import IconButton from "@material-ui/core/IconButton";

function PasswordField({ error, handleChange }) {
  const [values, setValues] = useState({
    showPassword: false,
  });

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <VpnKeyRoundedIcon />
          </Grid>
          <Grid item sm={11} xs={10}>
            <FormControl fullWidth>
              <InputLabel required htmlFor="password" error={error}>
                Password
              </InputLabel>
              <Input
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setValues({
                          ...values,
                          showPassword: !values.showPassword,
                        })
                      }
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                error={error}
                onChange={handleChange}
              />
              <FormHelperText error={error}>
                Password should contain atleast one lowercase, uppercase letter,
                number and special character. Length between 8 to 30
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PasswordField;
