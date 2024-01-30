"use client";
import { StatsCard, Sidenav, Button, InputField } from "@/components";
import {
  useCustomerStore,
  useDashboardStore,
  useTransactionStore,
} from "@/states";
import { PureComponent, useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  Rectangle,
} from "recharts";

const data01 = [
  { name: "Group A", value: 1000000 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];
export default function Home() {
  const dashboardStore = useDashboardStore() as any;
  const { getCustomer, customers, toggleVerify } = useCustomerStore() as any;
  const [startDate, setstartDate] = useState("01/22/2023");
  const unverified = useMemo(
    () => customers.filter((e: any) => !e.verified),
    [customers]
  );

  const pendingDeliveries = useMemo(
    () => dashboardStore.transactions.filter((e: any) => e.status == "Pending"),
    [dashboardStore.transactions]
  );
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

  const completedDeliveries = useMemo(
    () =>
      dashboardStore.transactions.filter((e: any) => e.status == "Completed"),
    [dashboardStore.transactions]
  );

  const total = useMemo(() => {
    return completedDeliveries.reduce(
      (acc: any, curr: any) => acc + curr.total,
      0
    );
  }, [completedDeliveries]);

  useEffect(() => {
    getCustomer();
    // dashboardStore.getTransactionsByStatus(["Pending", "Completed"]);
    dashboardStore.getTransactions();
  }, []);

  const startDateChange = () => {};
  return (
    <main>
      <Sidenav>
        <p>{startDate}</p>

        <input type="date" id="start" defaultValue={"03/22/2023"} />
        {/* <InputField
          type="date"
          onChange={startDateChange}
          defaultValue={startDate}
        /> */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <StatsCard title="Total Revenue Today" value={total} net={-0.0} />
          <StatsCard
            title="Pending Deliveries"
            value={pendingDeliveries.length}
            net={1.7}
          />
          <StatsCard
            title="Completed Deliveries"
            value={completedDeliveries.length}
            net={1.7}
          />
        </div>
        <div className="w-full flex items-center">
          <div className="flex flex-col items-center">
            <p>Walkins and Online</p>
            <BarChart
              width={400}
              height={300}
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

          <div className="flex flex-col items-center">
            <p>Item Types</p>
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={itemTypeCounts}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />

              <Tooltip />
            </PieChart>
          </div>
          <div className="flex flex-col items-center">
            <p>Products Sold</p>
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={itemCounts}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />

              <Tooltip />
            </PieChart>
          </div>
          <div className="flex flex-col items-center">
            <p>Delivery Statuses</p>
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={deliveryCounts}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />

              <Tooltip />
            </PieChart>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="flex flex-col gap-2">
            {unverified.map((e: any) => {
              return (
                <div key={e._id} className=" bg-slate-800 p-3 rounded">
                  <p className="text-white-100">{e.name}</p>
                  <p className="text-white-100">{e.email}</p>

                  <Button
                    onClick={() => {
                      toggleVerify(e._id, true);
                    }}
                  >
                    <p className="text-white-100">Approve</p>
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            {pendingDeliveries.map((e: any) => {
              return (
                <div key={e._id} className=" bg-slate-800 p-3 rounded">
                  <p className="text-white-100">{e.name}</p>
                  <p className="text-white-100">{e.status}</p>
                  <p className="text-white-100">Items: {e.items.length}</p>
                  <p className="text-white-100">Total: {e.total}PHP</p>
                  <Button
                    onClick={() => {
                      dashboardStore.updateStatus(e._id, "Approved");
                    }}
                  >
                    <p className="text-white-100">Approve</p>
                  </Button>
                  <Button
                    onClick={() => {
                      dashboardStore.updateStatus(e._id, "Declined");
                    }}
                  >
                    <p className="text-white-100">Decline</p>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2"></div>
      </Sidenav>
    </main>
  );
}
