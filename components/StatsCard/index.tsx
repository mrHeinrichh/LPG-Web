import React from "react";
import style from "./style.module.css";
import { Card } from "@/components";

function StatsCard({ title, value, net }: any) {
  const isLoss = (value: number) => {
    return value < 0;
  };

  const parseNet = (value: number) => {
    return isLoss(value) ? value * -1 : value;
  };

  return (
    <>
      <Card>
        <h5>{title ?? "Untitled"}</h5>
        <h4>₱ {value}.00</h4>
        <p className={isLoss(net) ? style.loss : style.gain}>
          {isLoss(net) ? "- " : "+ "}
          {parseNet(net)}
        </p>
      </Card>
    </>
  );
}

export default StatsCard;
