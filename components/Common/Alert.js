import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { IconButton, Collapse } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function Alert({ alert, setAlert }) {
  return (
    <>
      <Collapse in={alert.open} className="mt-4 w-100">
        <MuiAlert
          // action={
          //   <IconButton
          //     aria-label="close"
          //     color="inherit"
          //     onClick={() => {
          //       setAlert({ open: false, message: "" });
          //     }}
          //     size="small"
          //   >
          //     <CloseIcon fontSize="inherit" />
          //   </IconButton>
          // }
          severity={alert.severity}
          color={alert.severity}
        >
          {alert.message}
        </MuiAlert>
      </Collapse>
    </>
  );
}

export default Alert;
