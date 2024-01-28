import React from "react";
import style from "./style.module.css";
import { Navbar } from "@/components";
import Link from "next/link";
import { links } from "./links";
import { useAuthStore } from "@/states";

function Sidenav({ children }: any) {
  const authStore = useAuthStore() as any;
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
        <div
          className={style.link_container}
          onClick={() => {
            authStore.signOut();
          }}
        >
          <p> Sign Out</p>
        </div>
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
