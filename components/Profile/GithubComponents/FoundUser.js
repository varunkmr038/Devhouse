import React from "react";
// material UI
import { Typography } from "@material-ui/core";
// context
import { ContextData } from "../../../utils/githubContextData";

const FoundUser = () => {
  const { foundNoUser } = React.useContext(ContextData);

  return (
    <>
      {foundNoUser ? (
        <Typography variant="h6" style={{ color: "red" }}>
          {" "}
          There is no user with that username. Please search again{" "}
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};

export default FoundUser;
