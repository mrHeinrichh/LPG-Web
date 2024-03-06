"use client";
import React from 'react';
import { Sidenav } from "@/components";
import Iframe from 'react-iframe';

export default function Transactions() {
  // Sample link to a Wikipedia page
  const linkToDisplay = 'https://lpg-excel-webapp-streamlit.onrender.com';

  return (
    <>
      <Sidenav />
      <Iframe url={linkToDisplay} width="100%" height="900px" />
    </>
  );
}

