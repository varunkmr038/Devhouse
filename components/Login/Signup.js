import React, { useState } from "react";
import {
  Dialog,
  Button,
  Slide,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
  makeStyles,
} from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import { toast } from "react-toastify";
import axios from "axios";
import Head from "./Head";
import Foot from "./Foot";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import baseUrl from "../../utils/baseUrl";
import { registerUser } from "../../utils/authUser";

//  Styling
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
  return <Slide direction="down" ref={ref} {...props} />;
});

function Login({ open, setOpenSign }) {
  const classes = useStyles();
  // Hooks
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    username: false,
    phone: false,
    password: false,
  });
  const [usernameMsg, setUsernameMsg] = useState("");

  //  Check username is available or not
  const checkUsername = async (username) => {
    try {
      const res = await axios.get(`${baseUrl}/api/signup/${username}`);
      //  If i get user in db
      if (res.data === "Available") {
        setUsernameMsg("Seems good");
      }
    } catch (error) {
      setUsernameMsg("Username is already taken");
      setError({ ...error, username: true });
    }
  };

  //  Input change
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value.trim();

    if (name === "username") {
      checkUsername(value); // checking username in database also
    }

    if (value != "") setError((prev) => ({ ...prev, [name]: false }));

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  //  Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let flag = 0;
    //  Checking that All fields are filled and correctly
    for (const key in user) {
      if (user[key] === "") {
        if (!flag) toast.error("All Fields are Required !!");

        setError((prev) => ({ ...prev, [key]: true }));
        flag = 1;
      }
    }
    if (flag) return;

    //  otherwise all fields are validated send it to backend.
    await registerUser(user);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenSign(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ zIndex: 1500 }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={`mt-0  ${classes.paper}`}>
            <Head
              handleClick={() => setOpenSign(false)}
              icon={<PersonAddIcon fontSize="large" />}
              title="Sign Up"
            />

            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <InputField
                  icon={<AccountBoxRoundedIcon />}
                  autoComplete="name"
                  name="name"
                  required={true}
                  id="name"
                  label="Name"
                  error={error.name}
                  handleChange={handleChange}
                />

                <InputField
                  icon={<EmailRoundedIcon />}
                  autoComplete="email"
                  name="email"
                  required={true}
                  id="email"
                  label="Email"
                  error={error.email}
                  handleChange={handleChange}
                />

                <InputField
                  icon={<VerifiedUserRoundedIcon />}
                  autoComplete="username"
                  name="username"
                  required={true}
                  id="username"
                  label="Username"
                  error={error.username}
                  helperText={usernameMsg}
                  handleChange={handleChange}
                />

                <InputField
                  icon={<PhoneIphoneRoundedIcon />}
                  autoComplete="phone"
                  name="phone"
                  required={true}
                  id="phone"
                  label="Phone No"
                  handleChange={handleChange}
                  error={error.phone}
                />

                <PasswordField
                  error={error.password}
                  handleChange={handleChange}
                />

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Terms and Conditions"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          </div>
          <Foot />
        </Container>
      </Dialog>
    </>
  );
}

export default Login;
