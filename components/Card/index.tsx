import React from "react";
import style from "./style.module.css";

function Card({ children }: any) {
  return (
    <>
      <div className={style.container}>{children}</div>
    </>
  );
}

export default Card;
