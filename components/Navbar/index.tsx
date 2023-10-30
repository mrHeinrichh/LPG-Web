import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components";

function Navbar() {
  return (
    <>
      <div className={style.container}>
        <h3>LPG ADMIN</h3>

        <div className={style.links_container}>
          <p>Marketplace</p>
          <p>Community</p>
          <p>Events</p>
        </div>

        <div className={style.links_container}>
          <Button outlined>Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
      <div className={style.divider}></div>
    </>
  );
}

export default Navbar;
