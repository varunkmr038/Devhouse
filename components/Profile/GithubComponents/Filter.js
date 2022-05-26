import React from "react";

// material UI
import { Typography, Grid } from "@material-ui/core";
// icons
import StarIcon from "@material-ui/icons/Star";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
// context
import { ContextData } from "../../../utils/githubContextData";

const Filter = () => {
  const { sortBy } = React.useContext(ContextData);

  return (
    <Grid item sm={6}>
      <Typography variant="h6">
        Sort Repos By : {sortBy === "forks" ? "Forks" : "Stars"}{" "}
        {sortBy === "forks" ? (
          <AccountTreeIcon style={{ paddingTop: "0.5rem" }} />
        ) : (
          <StarIcon style={{ paddingTop: "0.5rem" }} />
        )}
      </Typography>
    </Grid>
  );
};

export default Filter;
