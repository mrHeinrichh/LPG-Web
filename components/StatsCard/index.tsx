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
        <h4>{value}</h4>
      </Card>
    </>
  );
}

export default StatsCard;
