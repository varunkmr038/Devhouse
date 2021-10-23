import React, { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import styles from "./index.module.css";
import Login from "../components/Login/Login";
import Signup from "../components/Login/Signup";

function Index() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSign, setOpenSign] = useState(false);

  const handleClickOpen = (val) => {
    // Handling open dialog for  login signup
    if (val === 1) setOpenLogin(true);
    else setOpenSign(true);
  };

  //
  useEffect(() => {
    setTimeout(() => {
      document.title = `Devhouse - Social App for Developers`;
    }, 0);
  });

  return (
    <>
      <section id={styles.header} className="d-flex align-items-center ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <h4>
                    Make the strongest connections with
                    <span className={styles.brandName}>DEVHOUSE </span>
                  </h4>
                  <h2 className="my-3">Join the Community Now</h2>
                  <div className="mt-3">
                    <button
                      className={` mt-3 mx-4 ${styles.mybtn}`}
                      onClick={() => handleClickOpen(1)}
                    >
                      Log In
                      <LoginIcon />
                    </button>
                    {/*  Sending setOpenlogin to child component to change open value  Props always pass by reference  */}
                    <Login open={openLogin} setOpenLogin={setOpenLogin} />

                    <button
                      className={` mt-3 mx-4 ${styles.mybtn}`}
                      onClick={() => handleClickOpen(2)}
                    >
                      Sign Up
                      <AppRegistrationRoundedIcon />
                    </button>
                    <Signup open={openSign} setOpenSign={setOpenSign} />
                  </div>
                </div>

                <div
                  className={`col-lg-6 order-1 order-lg-2 ${styles.headerImg}`}
                >
                  <img
                    src="img/meet.png"
                    className={`img-fluid ${styles.animated}`}
                    alt="Commom img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
