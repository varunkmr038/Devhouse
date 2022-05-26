import React from "react";
import { ContextData } from "../../utils/githubContextData";
import useStyles from "./GithubStyle";
import { CssBaseline, Container, Paper, Grid } from "@material-ui/core";
import AccountStats from "./GithubComponents/AccountStats";
import FilterRepos from "./GithubComponents/FilterRepos";
import Profile from "./GithubComponents/Profile";
import Repos from "./GithubComponents/Repos";
import FoundUser from "./GithubComponents/FoundUser";
import Loading from "./GithubComponents/Loading";
import Filter from "./GithubComponents/Filter";
import dynamic from "next/dynamic.js";
const ReposChart = dynamic(() => import("./GithubComponents/ReposChart"), {
  ssr: false,
});

function Github({ username }) {
  const classes = useStyles();
  const { loading, setPerson, foundNoUser } = React.useContext(ContextData);

  React.useEffect(() => {
    setPerson(username);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (foundNoUser) {
    return <FoundUser />;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AccountStats />
        <Grid container spacing={2}>
          <Profile />
          <ReposChart />
        </Grid>
        <Paper container className={classes.repos}>
          <Filter />
          <FilterRepos />
          <Repos />
        </Paper>
      </Container>
    </>
  );
}

export default Github;
