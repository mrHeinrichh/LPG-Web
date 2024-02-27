import React from "react";
import style from "./style.module.css";

function Card({ children, onClick }: any) {
  return (
    <div className={style.container} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
