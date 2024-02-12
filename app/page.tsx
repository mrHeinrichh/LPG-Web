"use client";
import { Sidenav, Card } from "@/components";
import {
  useCustomerStore,
  useDashboardStore,
  useTransactionStore,
} from "@/states";
import { useEffect, useMemo, useState } from "react";

import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  Rectangle,
} from "recharts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  PendingCustomerList,
  PendingDeliveryList,
  RiderAppointmentsList,
} from "./components";

export default function Home() {
  const dashboardStore = useDashboardStore() as any;

  useEffect(() => {}, []);

  return (
    <main>
      <Sidenav>
        <div className="grid grid-cols-3 gap-2 w-full mb-4">
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Total Revenue Today</p>
              <p className="text-2xl">{20000}.00</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Pending Deliveries</p>
              <p className="text-2xl">{1}</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Completed Deliveries</p>
              <p className="text-2xl">{1}</p>
            </div>
          </Card>
        </div>
        {/* <Stats /> */}
        <RiderAppointmentsList />
        <div className="grid grid-cols-2 gap-2 w-full my-5">
          <PendingCustomerList />
          <PendingDeliveryList />
        </div>
      </Sidenav>
    </main>
  );
}

function Stats() {
  const dashboardStore = useDashboardStore() as any;
  const itemCounts = useMemo(() => {
    const temp = dashboardStore.transactions.map(
      (transaction: any) => transaction.items
    );
    const items = [].concat.apply([], temp);
    const names = [...new Set(items.map((e: any) => e.name))];
    return names.map((e: any) => ({
      name: e,
      value: items.reduce((acc: any, curr: any) => {
        return curr.name == e ? curr.quantity + acc : acc;
      }, 0),
    }));
  }, [dashboardStore.transactions]);
  const deliveryCounts = useMemo(() => {
    return [
      {
        name: "Pending",
        value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.status == "Pending" ? acc + 1 : acc;
        }, 0),
      },
      {
        name: "Approved",
        value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.status == "Approved" ? acc + 1 : acc;
        }, 0),
      },
      {
        name: "Declined",
        value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.status == "Declined" ? acc + 1 : acc;
        }, 0),
      },
      {
        name: "Completed",
        value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.status == "Completed" ? acc + 1 : acc;
        }, 0),
      },
      {
        name: "On Going",
        value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.status == "On Going" ? acc + 1 : acc;
        }, 0),
      },
      {
        name: "Cancelled",
        value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.status == "Cancelled" ? acc + 1 : acc;
        }, 0),
      },
    ];
  }, [dashboardStore.transactions]);
  const deliveryTypeCounts = useMemo(() => {
    return [
      {
        name: "Online",
        num: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.__t == "Delivery" ? acc + 1 : acc;
        }, 0),
      },
      {
        name: "Walk In",
        num: dashboardStore.transactions.reduce((acc: any, curr: any) => {
          return curr.__t == null ? acc + 1 : acc;
        }, 0),
      },
    ];
  }, [dashboardStore.transactions]);

  const itemTypeCounts = useMemo(() => {
    const temp = dashboardStore.transactions.map(
      (transaction: any) => transaction.items
    );
    const items = [].concat.apply([], temp);
    return [
      {
        name: "Product",
        value: items.reduce((acc: any, curr: any) => {
          return curr.type == "Product" ? acc + 1 : acc;
        }, 0),
      },
      {
        name: "Accessories",
        value: items.reduce((acc: any, curr: any) => {
          return curr.type == "Accessories" ? acc + 1 : acc;
        }, 0),
      },
    ];
  }, [dashboardStore.transactions]);
  return (
    <div className="w-full flex justify-between items-center gap-2">
      <Card>
        <div className="flex flex-col items-center">
          <p>Walkins and Online</p>
          <BarChart
            width={400}
            height={200}
            data={deliveryTypeCounts}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <XAxis dataKey="name" />
            <Bar
              dataKey="num"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </div>
      </Card>
      {/* <Card>
        <div className="flex flex-col items-center">
          <p>Item Types</p>
          <PieChart width={200} height={200}>
           

            <Tooltip />
          </PieChart>
        </div>
      </Card> */}
      <Card>
        <div className="flex flex-col items-center">
          <p>Products Sold</p>
          <PieChart width={300} height={300}>
            <Tooltip />
            <Legend />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={itemTypeCounts}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={110}
              fill="#123534"
              label
            />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={itemCounts}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label
            />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={itemCounts}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col items-center">
          <p>Delivery Statuses</p>
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={deliveryCounts}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label
            />

            <Tooltip />
          </PieChart>
        </div>
      </Card>
    </div>
  );
}
