import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@material-ui/core/Grid";

function Settings() {
  return (
    <>
      <Container maxWidth="sm" className="mt-5">
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12}>
            <Typography variant="h4" align="center">
              Change Password
            </Typography>
          </Grid>

          <Grid item sm={12} xs={12}>
            <TextField
              id="outlined-password-input"
              label="Current Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              id="outlined-password-input"
              label="New Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              fullWidth
              size="small"
              helperText="Password should contain atleast one lowercase, uppercase letter,
              number and special character. Length between 8 to 30"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<LockIcon />}
              fullWidth
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Settings;
