import React from "react";

// material UI components
import { Paper, Grid, Typography } from "@material-ui/core";
//global styles
import useStyles from "../GithubStyle";
// icons
import CodeIcon from "@material-ui/icons/Code";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import StarIcon from "@material-ui/icons/Star";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

const RepoProps = (props) => {
  const classes = useStyles();
  const {
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    html_url,
  } = props;

  return (
    <>
      <Grid item lg={4} sm={6} xs={12}>
        <Paper
          className={classes.flexCAlign}
          style={{ padding: "1rem", height: "170px" }}
          onClick={() => window.open(html_url, "_blank")}
          id="repos"
        >
          <Grid container className={classes.flexStart}>
            {name ? (
              <BusinessCenterIcon
                style={{
                  marginRight: "0.4rem",
                  position: "relative",
                  top: "4px",
                  color: "gray",
                }}
              />
            ) : (
              ""
            )}
            {name ? <Typography variant="h6"> {name} </Typography> : ""}
          </Grid>

          <Typography
            variant="body1"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              textAlign: "left",
              height: "50px",
              color: "rgb(88, 96, 105)",
            }}
          >
            {description && description.length > 90 ? (
              <Typography> {description.slice(0, 90) + "..."} </Typography>
            ) : (
              <Typography> {description} </Typography>
            )}
          </Typography>

          <Grid container spacing={2}>
            {language ? (
              <Grid item xs={4} sm={4} className={classes.flexStart}>
                <CodeIcon style={{ color: "rgb(88, 96, 105)" }} />
                <Typography> {language} </Typography>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={4} sm={4} className={classes.flexStart}>
              <StarIcon style={{ color: "rgb(88, 96, 105)" }} />
              {stargazers_count ? (
                <Typography> {stargazers_count} </Typography>
              ) : (
                "0"
              )}
            </Grid>
            <Grid item xs={4} sm={4} className={classes.flexStart}>
              <AccountTreeIcon style={{ color: "rgb(88, 96, 105)" }} />
              {forks_count ? <Typography> {forks_count} </Typography> : "0"}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default RepoProps;
