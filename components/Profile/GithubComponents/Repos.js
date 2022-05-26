import React from "react";

// material UI
import { Grid } from "@material-ui/core";
//styles
import useStyles from "../GithubStyle";
// props
import RepoProps from "../Props/ReposProps";
// context
import { ContextData } from "../../../utils/githubContextData";

const Repos = () => {
  const classes = useStyles();
  const { repo } = React.useContext(ContextData);

  return (
    <Grid
      container
      spacing={2}
      style={{ marginTop: "1rem" }}
      className={classes.flexStart}
    >
      {repo.map((item) => {
        const {
          id,
          name,
          description,
          language,
          stargazers_count,
          forks_count,
          html_url,
        } = item;
        return (
          <RepoProps
            key={id}
            name={name}
            description={description}
            language={language}
            stargazers_count={stargazers_count}
            forks_count={forks_count}
            html_url={html_url}
          />
        );
      })}
    </Grid>
  );
};

export default Repos;
