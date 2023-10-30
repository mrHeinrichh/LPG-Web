import React from "react";
import style from "./style.module.css";

import { Button, Navbar } from "@/components";

function Sidenav({ children }: any) {
  const links: any[] = [
    {
      title: "Dashboard",
    },
    {
      title: "Transactions",
    },
    {
      title: "Feedbacks",
    },
    {
      title: "Chats",
    },
    {
      title: "Order History",
    },
    {
      title: "Appointment",
    },
    {
      title: "Products",
    },
    {
      title: "Customers",
    },
    {
      title: "Retailers",
    },
    {
      title: "Riders",
    },
  ];
  return (
    <>
      <div className={style.sidenav}>
        <div className={style.header}></div>
        {links.map((e: any) => (
          <div key={e.title} className={style.link_container}>
            <p>{e.title} </p>
          </div>
        ))}
      </div>
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
