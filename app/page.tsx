"use client";
import { Sidenav, Card, SelectField, InputField } from "@/components";
import { useHomeStore, usePriceStore, useTransactionStore } from "@/states";
import { useEffect, useMemo, useState } from "react";
import {
  AccessoriesChart,
  BrandNewTanksChart,
  CustomerPriceChangesChart,
  PendingCustomerList,
  PendingDeliveryList,
  PriceChangesChart,
  PricesTable,
  RefillTanksChart,
  RetailerPriceChangesChart,
  RiderAppointmentsList,
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

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { TimeFilter } from "@/interfaces";
import { BARANGGAYS, TIME_FILTERS } from "@/constants";

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
  } = useHomeStore();
  const [units, setunits] = useState(20);
  const [timeFilter, settimeFilter] = useState<TimeFilter>("Daily");
  const [baranggay, setbaranggay] = useState<String>("All");
  const { getPrices } = usePriceStore() as any;

  const BARANGGAY_FILTERS = BARANGGAYS.map((e: any) => ({
    value: e,
    title: e,
  }));

  // const data = useMemo(() => {
  //   const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
  //     getStartDayDate(e)
  //   );
  //   const multiplier = getMutiplier(timeFilter);
  //   return parsedStartDay.map((e: Date) => {
  //     let transactionsTemp: any[] = [];
  //     transactionsTemp = solds.filter((sold: any) => {
  //       return (
  //         e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
  //         e.getTime() + 86399999 * multiplier >=
  //           getStartDayDate(new Date(sold.createdAt)).getTime()
  //       );
  //     });

  //     if (baranggay != "All") {
  //       transactionsTemp = transactionsTemp.filter((sold: any) => {
  //         return sold.__t == "Delivery" && sold.barangay == baranggay;
  //       });
  //     }

  // const data = useMemo(() => {
  //   const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
  //     getStartDayDate(e)
  //   );
  //   const multiplier = getMutiplier(timeFilter);
  //   return parsedStartDay.map((e: Date) => {
  //     let transactionsTemp: any[] = [];
  //     transactionsTemp = solds.filter((sold: any) => {
  //       return (
  //         e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
  //         e.getTime() + 86399999 * multiplier >=
  //         getStartDayDate(new Date(sold.createdAt)).getTime()
  //       );
  //     });

  //     const delivery = transactionsTemp.reduce((acc: any, curr: any) => {
  //       return curr.__t == "Delivery" ? acc + 1 : acc;
  //     }, 0);

  //     const accessories = transactionsTemp.reduce((acc: any, curr: any) => {
  //       return (
  //         curr.items.filter((item: any) => item.type == "Accessory").length +
  //         acc
  //       );
  //     }, 0);

  //     const products = transactionsTemp.reduce((acc: any, curr: any) => {
  //       return (
  //         curr.items.filter((item: any) => item.type == "Product").length + acc
  //       );
  //     }, 0);

  //     return {
  //       name: e.toDateString(),
  //       accesories: accessories,
  //       products: products,
  //       walkin,
  //       delivery,
  //       completed,
  //       cancelled,
  //       declined,
  //     };
  //   });
  // }, [solds, units, timeFilter, baranggay]);

  const parsedCustomers = useMemo(() => {
    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );

    const multiplier = getMutiplier(timeFilter);
    return parsedStartDay.map((e: Date) => {
      const customersTemp = verifiedCustomers.filter((sold: any) => {
        return (
          e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
          e.getTime() + 86399999 * multiplier >=
            getStartDayDate(new Date(sold.createdAt)).getTime()
        );
      });

      return {
        name: e.toDateString(),
        customers: customersTemp.length,
      };
    });
  }, [verifiedCustomers, units, timeFilter]);
  useEffect(() => {
    getPendingDeliveries({});
  }, [getPendingDeliveries]);

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    getVerifiedCustomers();

    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    getPrices(
      0,
      0,
      `{"$and": [{"createdAt": {"$gte": "${startDate.toISOString()}", "$lte": "${endDate.toISOString()}"}}]}`,
      "item"
    );
  }, [units, timeFilter, getPrices, getVerifiedCustomers]);

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

  useEffect(() => {
    getTotalRevenueToday({});
  }, [getTotalRevenueToday]);

  useEffect(() => {
    getCompletedDeliveries({});
  }, [getCompletedDeliveries]);

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
            settimeFilter(value);
          }}
        />
        <SelectField
          options={BARANGGAY_FILTERS}
          name={"Time Filter"}
          title={"Time Filter"}
          onChange={function (e: any): void {
            const { name, value } = e.target;
            setbaranggay(value);
          }}
        />
        <InputField
          type="number"
          placeholder="Units"
          value={units}
          onChange={function (e: any): void {
            const { name, value } = e.target;
            setunits(value);
          }}
        ></InputField>

        <PriceChangesChart>
          <RetailerPriceChangesChart timeFilter={timeFilter} units={units} />
          <CustomerPriceChangesChart timeFilter={timeFilter} units={units} />
        </PriceChangesChart>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={downloadAsPDF2}
        >
          Download as PDF
        </button>
        <div id="pdf-content2">
          {/* <BrandNewTanksChart
            baranggay={baranggay}
            timeFilter={timeFilter}
            units={units}
          />
          <RefillTanksChart
            baranggay={baranggay}
            timeFilter={timeFilter}
            units={units}
          />
          <AccessoriesChart
            baranggay={baranggay}
            timeFilter={timeFilter}
            units={units}
          /> */}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={downloadAsPDF3}
        >
          Download as PDF
        </button>
        <div id="pdf-content3">
          {/* <Card style={{ background: "white" }}>
            <p className="text-2xl font-black">Verified Customers</p>

            <LineChart
              width={1200}
              height={300}
              data={parsedCustomers}
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
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Card> */}
          {/* <Card style={{ background: 'white' }}>

            <p className="text-2xl font-black">Orders Accomplishments</p>
            <LineChart
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
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="cancelled" stroke="#86ca9d" />
              <Line type="monotone" dataKey="declined" stroke="#83ca9d" />
            </LineChart>
          </Card>
          <Card style={{ background: 'white' }}>
            <p className="text-2xl font-black">Walkin and Delivery Orders</p>
            <BarChart
              width={1200}
              height={300}
              data={data}
              margin={{
                top: 20,
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
              <Bar dataKey="walkin" stackId="a" fill="#8884d8" />
              <Bar dataKey="delivery" stackId="a" fill="#82ca9d" />
            </BarChart>
          </Card>
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
