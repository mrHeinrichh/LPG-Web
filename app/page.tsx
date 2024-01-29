"use client";
import { StatsCard, Sidenav, Button } from "@/components";
import {
  useCustomerStore,
  useDashboardStore,
  useTransactionStore,
} from "@/states";
import { PureComponent, useEffect, useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Rectangle,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
function Example() {
  return (
    <BarChart
      width={500}
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
        dataKey="pv"
        fill="#8884d8"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="uv"
        fill="#82ca9d"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
  );
}

export default function Home() {
  const dashboardStore = useDashboardStore() as any;
  const { getCustomer, customers, toggleVerify } = useCustomerStore() as any;

  const unverified = useMemo(
    () => customers.filter((e: any) => !e.verified),
    [customers]
  );

  const pendingDeliveries = useMemo(
    () => dashboardStore.transactions.filter((e: any) => e.status == "Pending"),
    [dashboardStore.transactions]
  );

  const completedDeliveries = useMemo(
    () =>
      dashboardStore.transactions.filter((e: any) => e.status == "Completed"),
    [dashboardStore.transactions]
  );

  const total = useMemo(() => {
    console.log(completedDeliveries);

    return completedDeliveries.reduce(
      (acc: any, curr: any) => acc + curr.total,
      0
    );
  }, [completedDeliveries]);

  useEffect(() => {
    getCustomer();
    dashboardStore.getTransactionsByStatus(["Pending", "Completed"]);
  }, []);

  return (
    <main>
      <Sidenav>
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
        <div className="w-full">
          <Example />
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
