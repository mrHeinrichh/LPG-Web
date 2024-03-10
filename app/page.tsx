"use client";
import { Sidenav, Card, SelectField, InputField } from "@/components";
import { useHomeStore, usePriceStore, useTransactionStore } from "@/states";
import { useEffect, useMemo, useState } from "react";
import {
  AccessoriesChart,
  BrandNewTanksChart,
  CustomerPriceChangesChart,
  DeliveryStatusesChart,
  PendingCustomerList,
  PendingDeliveryList,
  PriceChangesChart,
  PricesTable,
  RefillTanksChart,
  RetailerPriceChangesChart,
  RiderAppointmentsList,
  TransactionTypeChart,
  VerifiedCustomersChart,
} from "./components";
import {
  getDates,
  getEndDayDate,
  getMutiplier,
  getStartDayDate,
  parseToFiat,
} from "@/utils";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Baranggay, TimeFilter } from "@/interfaces";
import { BARANGGAYS, TIME_FILTERS } from "@/constants";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export default function Home() {
  const downloadAsPDF2 = async () => {
    const element = document.getElementById("pdf-content2");

    if (element) {
      try {
        const canvas = await html2canvas(element);
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 15, 15, 150, 150);

        // Create a Blob from the PDF data
        const pdfBlob = pdf.output("blob");

        // Create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new window or tab
        window.open(pdfUrl, "_blank");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Element not found");
    }
  };

  const downloadAsPDF3 = async () => {
    const element = document.getElementById("pdf-content3");

    if (element) {
      try {
        const canvas = await html2canvas(element);
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 15, 15, 150, 150);

        // Create a Blob from the PDF data
        const pdfBlob = pdf.output("blob");

        // Create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new window or tab
        window.open(pdfUrl, "_blank");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Element not found");
    }
  };

  const {
    getTotalRevenueToday,
    revenueToday,
    getVerifiedCustomers,
    verifiedCustomers,
    getPendingDeliveries,
    pendingDeliveries,
    getCompletedDeliveries,
    completedDeliveries,
    getSoldTransactions,
    units,
    setUnit,
    timeFilter,
    setTimeFilter,
    setDates,
    start,
    end,
    setBaranggay,
    getOrderAccomplishments,
    getTransactionTypes,
  } = useHomeStore();
  const { getPrices } = usePriceStore() as any;

  const BARANGGAY_FILTERS = BARANGGAYS.map((e: any) => ({
    value: e,
    title: e,
  }));

  useEffect(() => {
    getTransactionTypes(start, end);
  }, [getTransactionTypes, start, end]);

  useEffect(() => {
    getOrderAccomplishments(start, end);
  }, [getOrderAccomplishments, start, end]);

  useEffect(() => {
    getSoldTransactions(start, end);
  }, [getSoldTransactions, start, end]);

  useEffect(() => {
    getPendingDeliveries({});
  }, [getPendingDeliveries]);

  useEffect(() => {
    getTotalRevenueToday({});
  }, [getTotalRevenueToday]);

  useEffect(() => {
    setDates(timeFilter, units);
  }, [timeFilter, units, setDates]);

  useEffect(() => {
    getCompletedDeliveries({});
  }, [getCompletedDeliveries]);

  useEffect(() => {
    getVerifiedCustomers();
  }, [getVerifiedCustomers]);

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    getPrices(
      0,
      0,
      `{"$and": [{"createdAt": {"$gte": "${startDate.toISOString()}", "$lte": "${endDate.toISOString()}"}}]}`,
      "item"
    );
  }, [units, timeFilter, getPrices]);

  // useEffect(() => {
  //   const startDate = new Date();
  //   const endDate = new Date();
  //   startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
  //   getSolds(0, 0, startDate, endDate);
  // }, [units, timeFilter, baranggay, getSolds]);

  // useEffect(() => {
  //   getTotal(
  //     0,
  //     0,
  //     `{"createdAt": {"$gte": "${getStartDayDate(
  //       new Date()
  //     ).toISOString()}", "$lte": "${getEndDayDate(new Date()).toISOString()}"}}`
  //   );
  //   getDeliveriesByStatuses(0, 0, ["Pending", "Completed"]);
  // }, [getDeliveriesByStatuses, getTotal]);

  return (
    <main>
      <Sidenav>
        <div className="grid grid-cols-3 gap-2 w-full mb-4">
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Total Revenue Today</p>
              <p className="text-2xl"> {parseToFiat(revenueToday)}</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Pending Deliveries</p>
              <p className="text-2xl">{pendingDeliveries.length}</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Completed Deliveries</p>
              <p className="text-2xl">{completedDeliveries.length}</p>
            </div>
          </Card>
        </div>
        <PricesTable />
        <SelectField
          options={TIME_FILTERS}
          name={"Time Filter"}
          title={"Time Filter"}
          onChange={function (e: any): void {
            const { name, value } = e.target;
            setTimeFilter(value as TimeFilter);
          }}
        />
        <SelectField
          options={BARANGGAY_FILTERS}
          name={"Time Filter"}
          title={"Time Filter"}
          onChange={function (e: any): void {
            const { name, value } = e.target;
            setBaranggay(value as Baranggay);
          }}
        />
        <InputField
          type="number"
          placeholder="Units"
          value={units}
          onChange={function (e: any): void {
            const { name, value } = e.target;
            setUnit(Number(value));
          }}
        ></InputField>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={downloadAsPDF2}
        >
          Download as PDF
        </button>
        <div id="pdf-content2">
          <BrandNewTanksChart />
          <RefillTanksChart />
          <AccessoriesChart />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={downloadAsPDF3}
        >
          Download as PDF
        </button>
        <div id="pdf-content3">
          <VerifiedCustomersChart />
          <DeliveryStatusesChart />
          <TransactionTypeChart />
          {/* 

          <Card style={{ background: 'white' }}>
            <p className="text-2xl font-black">Accessories and Products</p>

            <BarChart
              width={1200}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="accesories"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="products"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </Card> */}
        </div>
        {/* <RiderAppointmentsList />
        <div className="grid grid-cols-2 gap-2 w-full my-5">
          <PendingCustomerList />
          <PendingDeliveryList />
        </div> */}
        <PendingCustomerList />
      </Sidenav>
    </main>
  );
}
