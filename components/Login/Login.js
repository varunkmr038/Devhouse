import React, { useState } from "react";
import {
  Dialog,
  Button,
  Slide,
  CssBaseline,
  Grid,
  Container,
  makeStyles,
  Link,
} from "@material-ui/core";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { toast } from "react-toastify";
import Head from "./Head";
import Foot from "./Foot";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import regex from "../../utils/regex";
import Forgot from "./Forgot";
import { loginUser } from "../../utils/authUser";

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
  return <Slide direction="up" ref={ref} {...props} />;
});

function Login({ open, setOpenLogin }) {
  const classes = useStyles();

  const [openForgot, setOpenForgot] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "username") {
      if (regex.username.test(value)) {
        setError({ ...error, username: false });
      } else {
        setError({ ...error, username: true });
      }
    } else if (name == "password") {
      if (regex.password.test(value)) {
        setError({ ...error, password: false });
      } else {
        setError({ ...error, password: true });
      }
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let flag = 0;
    //  Checking that All fields are filled and correctly
    for (const key in user) {
      if (user[key] == "" || error[key] == true) {
        if (!flag) toast.error("All Fields are Required !!");
        setError((prev) => ({ ...prev, [key]: true }));
        flag = 1;
      }
    }
    if (flag) return;

    //  otherwise all fields are validated send it to backend.
    await loginUser(user);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenLogin(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ zIndex: 1400 }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={`mt-0 ${classes.paper}`}>
            <Head
              handleClick={() => setOpenLogin(false)}
              icon={<PersonRoundedIcon fontSize="large" />}
              title="Log In"
            />

            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <InputField
                  icon={<VerifiedUserRoundedIcon />}
                  autoComplete="username"
                  name="username"
                  required={true}
                  id="username"
                  label="Username"
                  error={error.username}
                  helperText={error.username ? "Invalid Username" : ""}
                  handleChange={handleChange}
                />

                <PasswordField
                  error={error.password}
                  handleChange={handleChange}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      variant="body2"
                      onClick={() => {
                        setOpenLogin(false);
                        setOpenForgot(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
          <Foot />
        </Container>
      </Dialog>
      <Forgot open={openForgot} setOpenForgot={setOpenForgot} />
    </>
  );
}

export default Login;
