import React from "react";

// Material UI components
import { Paper, Grid, Typography } from "@material-ui/core";
// import styles
import useStyles from "../GithubStyle";

const AccountStatsProps = (props) => {
  const classes = useStyles();
  const { icon, number, writings } = props;
  return (
    <>
      <Grid item lg={3} sm={6} xs={12}>
        <Paper
          className={classes.flexColumn}
          style={{ paddingTop: "0.6rem", paddingBottom: "0.6rem" }}
        >
          {icon}
          <Typography variant="h5" style={{ marginTop: "0.5rem" }}>
            {number}
          </Typography>
          <Typography variant="h6" style={{ color: "gray", fontSize: "1rem" }}>
            {writings}
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default AccountStatsProps;
