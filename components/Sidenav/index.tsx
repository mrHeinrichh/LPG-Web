import React from "react";
import style from "./style.module.css";

import { Button, Navbar } from "@/components";
import Link from "next/link";

function Sidenav({ children }: any) {
  const links: any[] = [
    {
      link: "/",
      title: "Dashboard",
    },
    {
      link: "/transactions",
      title: "Transactions",
    },
    {
      link: "/",
      title: "Feedbacks",
    },
    {
      link: "/",
      title: "Chats",
    },
    {
      link: "/",
      title: "Order History",
    },
    {
      link: "/",
      title: "Appointment",
    },
    {
      link: "/items",
      title: "Items",
    },
    {
      link: "/customers",
      title: "Customers",
    },
    {
      link: "/retailers",
      title: "Retailers",
    },
    {
      link: "/riders",
      title: "Riders",
    },
  ];

  return (
    <>
      <div className={style.sidenav}>
        <div className={style.header}></div>
        {links.map((e: any) => (
          <Link key={e.title} href={e.link}>
            <div className={style.link_container}>
              <p> {e.title}</p>
            </div>
          </Link>
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
