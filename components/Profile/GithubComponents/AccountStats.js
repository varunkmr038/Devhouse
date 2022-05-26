import React from "react";

import { ContextData } from "../../../utils/githubContextData";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupIcon from "@mui/icons-material/Group";
import AccountStatsProps from "../Props/AccountStatsProps";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CodeIcon from "@mui/icons-material/Code";

// Material UI components
import { Grid } from "@material-ui/core";
// import styles

const AccountStats = () => {
  const { user } = React.useContext(ContextData);
  const { id, public_repos, followers, following, public_gists } = user;

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "1rem" }} key={id}>
        <AccountStatsProps
          icon={<BusinessCenterIcon />}
          number={public_repos}
          writings="Repos"
          color="rgb(255,165,0.5)"
          backgroundColor="rgb(255,165,0,0.2)"
        />
        <AccountStatsProps
          icon={<GroupIcon />}
          number={followers}
          writings="Followers"
          color="rgb(63,81,181,0.5)"
          backgroundColor="rgb(63,81,181,0.2)"
        />
        <AccountStatsProps
          icon={<PersonAddIcon />}
          number={following}
          writings="Following"
          color="rgb(238,17, 41, 0.5)"
          backgroundColor="rgb(238,17, 41,0.2)"
        />
        <AccountStatsProps
          icon={<CodeIcon />}
          number={public_gists}
          writings="Gists"
          color="rgb(62, 201, 196,0.5)"
          backgroundColor="rgb(62, 201, 196,0.2)"
        />
      </Grid>
    </>
  );
};

export default AccountStats;
