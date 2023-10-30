import React from "react";
import style from "./style.module.css";

function Datatable({ header }: any) {
  return (
    <>
      <table className={style.styled_table}>
        <thead>
          <tr>
            {header.map((e: any) => (
              <th>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dom</td>
            <td>6000</td>
          </tr>
          <tr className="active-row">
            <td>Melissa</td>
            <td>5150</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Datatable;
