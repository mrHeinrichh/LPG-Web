"use client";
import { Sidenav, Card, SelectField, InputField } from "@/components";
import { useCustomerStore, useTransactionStore } from "@/states";
import { useEffect, useMemo, useState } from "react";
import {
  PendingCustomerList,
  PendingDeliveryList,
  RiderAppointmentsList,
} from "./components";
import {
  getDates,
  getEndDayDate,
  getMutiplier,
  getStartDayDate,
} from "@/utils";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import { TimeFilter } from "@/interfaces";
import { TIME_FILTERS } from "@/constants";

export default function Home() {
  const {
    getDeliveriesByStatuses,
    deliveries,
    total,
    getTotal,
    getSolds,
    solds,
  } = useTransactionStore() as any;
  const { getVerifiedCustomer, verifiedCustomers } = useCustomerStore() as any;
  const [units, setunits] = useState(20);
  const [timeFilter, settimeFilter] = useState<TimeFilter>("Daily");

  const pending = useMemo(
    () => deliveries.filter((e: any) => e.status == "Pending").length,
    [deliveries]
  );

  const completed = useMemo(
    () => deliveries.filter((e: any) => e.status == "Completed").length,
    [deliveries]
  );

  const data = useMemo(() => {
    const parsedStartDay = getDates(timeFilter, units).map((e: Date) =>
      getStartDayDate(e)
    );
    const multiplier = getMutiplier(timeFilter);
    return parsedStartDay.map((e: Date) => {
      const transactionsTemp = solds.filter((sold: any) => {
        return (
          e.getTime() <= getStartDayDate(new Date(sold.createdAt)).getTime() &&
          e.getTime() + 86399999 * multiplier >=
            getStartDayDate(new Date(sold.createdAt)).getTime()
        );
      });

      const completed = transactionsTemp.reduce((acc: any, curr: any) => {
        return curr.__t == "Delivery" && curr.status == "Completed"
          ? acc + 1
          : acc;
      }, 0);
      const cancelled = transactionsTemp.reduce((acc: any, curr: any) => {
        return curr.__t == "Delivery" && curr.status == "Cancelled"
          ? acc + 1
          : acc;
      }, 0);
      const declined = transactionsTemp.reduce((acc: any, curr: any) => {
        return curr.__t == "Delivery" && curr.status == "Declined"
          ? acc + 1
          : acc;
      }, 0);
      const walkin = transactionsTemp.reduce((acc: any, curr: any) => {
        return curr.__t ? acc + 1 : acc;
      }, 0);

      const delivery = transactionsTemp.reduce((acc: any, curr: any) => {
        return curr.__t == "Delivery" ? acc + 1 : acc;
      }, 0);

      const accessories = transactionsTemp.reduce((acc: any, curr: any) => {
        return (
          curr.items.filter((item: any) => item.type == "Accessory").length +
          acc
        );
      }, 0);

      const products = transactionsTemp.reduce((acc: any, curr: any) => {
        return (
          curr.items.filter((item: any) => item.type == "Product").length + acc
        );
      }, 0);

      return {
        name: e.toDateString(),
        accesories: accessories,
        products: products,
        walkin,
        delivery,
        completed,
        cancelled,
        declined,
      };
    });
  }, [solds, units, timeFilter]);

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
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - units * getMutiplier(timeFilter));
    getSolds(0, 0, startDate, endDate);
    getVerifiedCustomer(startDate, endDate);
  }, []);

  useEffect(() => {
    getTotal(
      0,
      0,
      `{"createdAt": {"$gte": "${getStartDayDate(
        new Date()
      ).toISOString()}", "$lte": "${getEndDayDate(new Date()).toISOString()}"}}`
    );
    getDeliveriesByStatuses(0, 0, ["Pending", "Completed"]);
  }, []);

  return (
    <main>
      <Sidenav>
        <div className="grid grid-cols-3 gap-2 w-full mb-4">
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Total Revenue Today</p>
              <p className="text-2xl">₱ {total}.00</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Pending Deliveries</p>
              <p className="text-2xl">{pending}</p>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-evenly h-full p-4">
              <p className="text-2xl font-bold">Completed Deliveries</p>
              <p className="text-2xl">{completed}</p>
            </div>
          </Card>
        </div>
        {/* <Stats /> */}
        <SelectField
          options={TIME_FILTERS}
          name={"Time Filter"}
          title={"Time Filter"}
          onChange={function (e: any): void {
            const { name, value } = e.target;
            settimeFilter(value);
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
        <LineChart
          width={1000}
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
        <LineChart
          width={1000}
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
        <BarChart
          width={1000}
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
        <BarChart
          width={1000}
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
        <RiderAppointmentsList />
        <div className="grid grid-cols-2 gap-2 w-full my-5">
          <PendingCustomerList />
          <PendingDeliveryList />
        </div>
      </Sidenav>
    </main>
  );
}

// function Stats() {
//   const dashboardStore = useDashboardStore() as any;
//   const itemCounts = useMemo(() => {
//     const temp = dashboardStore.transactions.map(
//       (transaction: any) => transaction.items
//     );
//     const items = [].concat.apply([], temp);
//     const names = [...new Set(items.map((e: any) => e.name))];
//     return names.map((e: any) => ({
//       name: e,
//       value: items.reduce((acc: any, curr: any) => {
//         return curr.name == e ? curr.quantity + acc : acc;
//       }, 0),
//     }));
//   }, [dashboardStore.transactions]);
//   const deliveryCounts = useMemo(() => {
//     return [
//       {
//         name: "Pending",
//         value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.status == "Pending" ? acc + 1 : acc;
//         }, 0),
//       },
//       {
//         name: "Approved",
//         value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.status == "Approved" ? acc + 1 : acc;
//         }, 0),
//       },
//       {
//         name: "Declined",
//         value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.status == "Declined" ? acc + 1 : acc;
//         }, 0),
//       },
//       {
//         name: "Completed",
//         value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.status == "Completed" ? acc + 1 : acc;
//         }, 0),
//       },
//       {
//         name: "On Going",
//         value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.status == "On Going" ? acc + 1 : acc;
//         }, 0),
//       },
//       {
//         name: "Cancelled",
//         value: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.status == "Cancelled" ? acc + 1 : acc;
//         }, 0),
//       },
//     ];
//   }, [dashboardStore.transactions]);
//   const deliveryTypeCounts = useMemo(() => {
//     return [
//       {
//         name: "Online",
//         num: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.__t == "Delivery" ? acc + 1 : acc;
//         }, 0),
//       },
//       {
//         name: "Walk In",
//         num: dashboardStore.transactions.reduce((acc: any, curr: any) => {
//           return curr.__t == null ? acc + 1 : acc;
//         }, 0),
//       },
//     ];
//   }, [dashboardStore.transactions]);

//   const itemTypeCounts = useMemo(() => {
//     const temp = dashboardStore.transactions.map(
//       (transaction: any) => transaction.items
//     );
//     const items = [].concat.apply([], temp);
//     return [
//       {
//         name: "Product",
//         value: items.reduce((acc: any, curr: any) => {
//           return curr.type == "Product" ? acc + 1 : acc;
//         }, 0),
//       },
//       {
//         name: "Accessories",
//         value: items.reduce((acc: any, curr: any) => {
//           return curr.type == "Accessories" ? acc + 1 : acc;
//         }, 0),
//       },
//     ];
//   }, [dashboardStore.transactions]);
//   return (
//     <div className="w-full flex justify-between items-center gap-2">
//       <Card>
//         <div className="flex flex-col items-center">
//           <p>Walkins and Online</p>
//           <BarChart
//             width={400}
//             height={200}
//             data={deliveryTypeCounts}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <Tooltip />
//             <Legend />
//             <XAxis dataKey="name" />
//             <Bar
//               dataKey="num"
//               fill="#8884d8"
//               activeBar={<Rectangle fill="pink" stroke="blue" />}
//             />
//           </BarChart>
//         </div>
//       </Card>
//       {/* <Card>
//         <div className="flex flex-col items-center">
//           <p>Item Types</p>
//           <PieChart width={200} height={200}>

//             <Tooltip />
//           </PieChart>
//         </div>
//       </Card> */}
//       <Card>
//         <div className="flex flex-col items-center">
//           <p>Products Sold</p>
//           <PieChart width={300} height={300}>
//             <Tooltip />
//             <Legend />
//             <Pie
//               dataKey="value"
//               isAnimationActive={false}
//               data={itemTypeCounts}
//               cx="50%"
//               cy="50%"
//               innerRadius={100}
//               outerRadius={110}
//               fill="#123534"
//               label
//             />
//             <Pie
//               dataKey="value"
//               isAnimationActive={false}
//               data={itemCounts}
//               cx="50%"
//               cy="50%"
//               outerRadius={60}
//               fill="#8884d8"
//               label
//             />
//             <Pie
//               dataKey="value"
//               isAnimationActive={false}
//               data={itemCounts}
//               cx="50%"
//               cy="50%"
//               innerRadius={70}
//               outerRadius={90}
//               fill="#8884d8"
//               label
//             />
//             <Tooltip />
//           </PieChart>
//         </div>
//       </Card>

//       <Card>
//         <div className="flex flex-col items-center">
//           <p>Delivery Statuses</p>
//           <PieChart width={200} height={200}>
//             <Pie
//               dataKey="value"
//               isAnimationActive={false}
//               data={deliveryCounts}
//               cx="50%"
//               cy="50%"
//               outerRadius={50}
//               fill="#8884d8"
//               label
//             />

//             <Tooltip />
//           </PieChart>
//         </div>
//       </Card>
//     </div>
//   );
// }
