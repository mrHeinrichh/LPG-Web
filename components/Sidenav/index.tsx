import React from "react";
import style from "./style.module.css";

import { Button, Navbar } from "@/components";

function Sidenav({ children }: any) {
  return (
    <>
      <div className={style.sidenav}></div>
      <div className={style.container}>
        <div className={style.divider}></div>
        <div>
          <Navbar />
          <div className={style.children}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default Sidenav;
