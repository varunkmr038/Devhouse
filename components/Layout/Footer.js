import React from "react";

function Footer() {
  return (
    <>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
        crossOrigin="anonymous"
      ></script>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
      <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
      <script src="http://localhost/socket.io/socket.io.js"></script>
      <script src="https://social-clubhouse.herokuapp.com/socket.io/socket.io.js"></script>
      <script src="/js/script.js" defer></script>
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>
    </>
  );
}

export default Footer;
