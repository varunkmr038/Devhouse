import React, { useState } from "react";
import { Link, Box, Typography } from "@material-ui/core";

function Foot() {
  return (
    <>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit">Clubhouse</Link> {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
}

export default Foot;
