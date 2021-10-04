import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@material-ui/core/Grid";
import { passwordUpdate } from "../../utils/profileActions";

function Settings() {
  const [userPasswords, setUserPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPasswords((prev) => ({ ...prev, [name]: value }));
  };

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
              name="currentPassword"
              id="currentPassword"
              label="Current Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              fullWidth
              size="small"
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              name="newPassword"
              id="newPassword"
              label="New Password"
              type="password"
              autoComplete="new-password"
              variant="outlined"
              required
              fullWidth
              size="small"
              helperText="Password should contain atleast one lowercase, uppercase letter,
              number and special character. Length between 8 to 30"
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<LockIcon />}
              fullWidth
              onClick={async (e) => {
                e.preventDefault();
                await passwordUpdate(userPasswords);
              }}
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
