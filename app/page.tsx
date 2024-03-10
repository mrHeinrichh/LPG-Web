"use client";
import { Sidenav, Card, SelectField, InputField } from "@/components";
import { useHomeStore, usePriceStore } from "@/states";
import { useEffect } from "react";
import {
  AccessoriesChart,
  BrandNewTanksChart,
  DeliveryStatusesChart,
  PendingCustomerList,
  PricesTable,
  RefillTanksChart,
  RiderAppointmentsList,
  TransactionTypeChart,
  VerifiedCustomersChart,
  RetailerPriceChangesChart,
  PriceChangesChart,
  CustomerPriceChangesChart,
} from "./components";
import { parseToFiat } from "@/utils";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Baranggay, TimeFilter } from "@/interfaces";
import { BARANGGAYS, TIME_FILTERS } from "@/constants";
import PendingRetailerList from "./components/PendingRetailerList";

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
    getPrices(
      0,
      0,
      `{"createdAt": {"$gte": "${start.toISOString()}", "$lte": "${end.toISOString()}"}}`,
      "item"
    );
  }, [units, timeFilter, getPrices]);

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

        <PriceChangesChart>
          <RetailerPriceChangesChart
            units={units}
            timeFilter={timeFilter}
          ></RetailerPriceChangesChart>
          <CustomerPriceChangesChart
            units={units}
            timeFilter={timeFilter}
          ></CustomerPriceChangesChart>
        </PriceChangesChart>

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
        </div>
        <div className="grid grid-cols-2 gap-2 w-full my-5">
          <RiderAppointmentsList />
          <PendingCustomerList />
          <PendingRetailerList />
          
        </div>
      </Sidenav>
    </main>
  );
}
