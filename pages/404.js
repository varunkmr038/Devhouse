import React, { useEffect } from "react";

function PageNotFound() {
  useEffect(() => {
    setTimeout(() => {
      document.title = `Devhouse | Page Not Found`;
    }, 0);
  });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Page Not Found 🤕</h1>
      <h3 style={{ textAlign: "center", marginTop: 30 }}>
        <a href="/">Home</a>
      </h3>
    </>
  );
}

export default PageNotFound;
