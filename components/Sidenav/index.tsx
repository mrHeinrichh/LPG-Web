import React from "react";
import style from "./style.module.css";

import { Button, Navbar } from "@/components";

function Sidenav() {
  return (
    <>
      <div className={style.sidenav}>
        <h3>LPG ADMIN</h3>
      </div>
      <div className={style.container}>
        <div className={style.divider}></div>
        <div>
          <Navbar />
          <h1>asd</h1>
        </div>
      </div>
    </>
  );
}

export default Sidenav;
