import React from "react";

// material UI
import {
  MenuItem,
  FormControl,
  Select,
  Grid,
  InputLabel,
} from "@material-ui/core";
// context
import { ContextData } from "../../../utils/githubContextData";

const FilterRepos = () => {
  const { handleChange, sortBy } = React.useContext(ContextData);

  return (
    <Grid item sm={6}>
      <FormControl variant="filled" style={{ width: "300px" }}>
        <InputLabel id="demo-simple-select-filled-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sortBy}
          onChange={handleChange}
        >
          <MenuItem value="forks">Forks</MenuItem>
          <MenuItem value="stargazers_count">Stars</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default FilterRepos;
