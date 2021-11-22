import React, { useState } from "react";
import {
  Dialog,
  Button,
  Slide,
  CssBaseline,
  Grid,
  Container,
  makeStyles,
  TextField,
} from "@material-ui/core";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Head from "./Head";
import Foot from "./Foot";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#43a047",
    marginBottom: theme.spacing(2),
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Forgot({ open, setOpenForgot }) {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
  });
  const [error, setError] = useState({
    email: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={(e, reason) => {
          if (reason !== "backdropClick") setOpenForgot(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={`mt-0 ${classes.paper}`}>
            <Head
              handleClick={() => setOpenForgot(false)}
              icon={<VpnKeyRoundedIcon fontSize="large" />}
              title="Forgot Password ?"
            />

            <form className={classes.form} noValidate>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <EmailRoundedIcon />
                    </Grid>
                    <Grid item sm={10} xs={10}>
                      <TextField
                        autoComplete="email"
                        name="email"
                        variant="standard"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        error={error.email}
                        helperText={
                          error.email ? "Please enter a valid email" : ""
                        }
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => e.preventDefault()}
              >
                Send Email
              </Button>
            </form>
          </div>
          <Foot />
        </Container>
      </Dialog>
    </>
  );
}

export default Forgot;
