import React from "react";
import { ContextData } from "../../../utils/githubContextData";

// material UI components
import { Paper, Grid, Typography } from "@material-ui/core";
//styles
import useStyles from "../GithubStyle";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ReposChart = () => {
  const classes = useStyles();

  const { user, repo, stats } = React.useContext(ContextData);

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  let statArray = [];

  let show = stats.forEach(function (each) {
    //  push all langauges into setArray
    statArray.push(each.language);
  });

  // console.log(statArray)

  let joe = statArray.filter(function (item) {
    return item !== null; //  filters array from nulls
  });

  let yaw = statArray.filter(function (item) {
    return item !== null; //  array to be checked for duplicates
  });

  let newSet = [...new Set(joe)]; // removes repeated languauges from array

  let newSetSet = []; // about to hold objects for fusion charts data

  for (const [key, value] of Object.entries(newSet)) {
    // pushes values into newSetSet
    newSetSet.push(value);
  }

  let kkk = newSetSet.map(function (item) {
    return { label: item, value: countOccurrences(joe, item) };
  });

  // console.log([kkk])

  const chartConfigs = {
    type: "pie3d", // The chart type
    maxWidth: "100%", // Width of the chart
    height: "300", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Top Languages",
        theme: "fusion",
      },
      // Chart Data
      data: kkk,
    },
  };
  return (
    <Grid item lg={7} sm={6} xs={12}>
      <Paper className={classes.flexColumn}>
        <Grid item xs>
          <ReactFC {...chartConfigs} />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ReposChart;
