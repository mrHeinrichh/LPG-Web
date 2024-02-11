import React from "react";
import style from "./style.module.css";
import { Card } from "@/components";

function StatsCard({ title, value, net }: any) {
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
