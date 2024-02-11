import React from "react";
import style from "./style.module.css";

function ApprovalsList({ title, children, header }: any) {
  return (
    <div className="flex flex-col gap-2 my-4">
      {header}

      {children}
    </div>
  );
}

export default ApprovalsList;
