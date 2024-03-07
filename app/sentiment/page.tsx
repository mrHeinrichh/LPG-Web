"use client";
import React from 'react';
import { Sidenav } from "@/components";
import Iframe from 'react-iframe';

interface TransactionsProps {
  // Add any specific props if needed
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  margin: '10px', // Adjust margin as needed
};

const iframeStyle: React.CSSProperties = {
  flex: 1,
  border: 'none',
  margin: '10px', // Adjust margin as needed
  paddingLeft: '300px', 
};

const Transactions: React.FC<TransactionsProps> = () => {
  const iframeUrl = 'http://localhost:8501'; // Change to the appropriate URL

  return (
    <div style={containerStyle}>
      <Sidenav />
      <div style={iframeStyle}>
        <Iframe url={iframeUrl} width="100%" height="100%" />
      </div>
    </div>
  );
}

export default Transactions;
