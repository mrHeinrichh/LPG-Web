import React from "react";
import style from "./style.module.css";

function SentimentCard({ children, onClick }: any) {
  return (
    <div className={`${style.container} ${style.smaller}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default SentimentCard;
