import React from "react";

// icon
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <div className="loader">
        <Loader type="Bars" color="blanchedalmond" height={100} width={100} />
      </div>
    </>
  );
};

export default Loading;
