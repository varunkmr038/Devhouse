import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Collapse } from "@material-ui/core";

function Alert({ message }) {
  return (
    <>
      <Collapse in={true} className="mt-4 w-100">
        <MuiAlert severity="info" color="info">
          {message}
        </MuiAlert>
      </Collapse>
    </>
  );
}

export default Alert;
