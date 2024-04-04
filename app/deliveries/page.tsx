'use client'
import {
  Datatable,
  DeliveryDetailsModal,
  SelectField,
  Sidenav,
} from "@/components";
import { useDeliveriesStore } from "@/states";
import { useEffect, useMemo, useState } from "react";
import {
  ApprovedDeliveryList,
  OnGoingDeliveryList,
  PendingDeliveryList,
} from "./components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TABLE_HEADERS } from "./data";
import CsvDownloadButton from "react-json-to-csv";
import axios from "axios";

export default function Deliveries() {
  const {
    pendingDeliveries,
    approvedDeliveries,
    onGoingDeliveries,
    getPendingDeliveries,
    getApprovedDeliveries,
    getOnGoingDeliveries,
    getFeedbacks,
    page,
    limit,
    setLimit,
    nextPage,
    previousPage,
    feedbacks,
  } = useDeliveriesStore();
  const [current, setcurrent] = useState<any>({});
  const [open, setopen] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPendingDeliveries({});
    getApprovedDeliveries({});
    getOnGoingDeliveries({});
    getFeedbacks({ page, limit });
  }, [getPendingDeliveries, getApprovedDeliveries, getOnGoingDeliveries]);

useEffect(() => {
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://lpg-api-06n8.onrender.com/api/v1/transactions/');
      setTransactions(response.data.data);
      setLoading(false);
    } catch (error) {
      setError((error as unknown as Error).message); // Type assertion to Error
      setLoading(false);
    }
  };
  fetchTransactions();
}, []);

  
  const data = useMemo(
    () => [...pendingDeliveries, ...approvedDeliveries, ...onGoingDeliveries],
    [pendingDeliveries, approvedDeliveries, onGoingDeliveries]
  );

  const downloadFeedbackData = () => {
    const feedbackArrayData = feedbacks.map((feedback: any) => {
      const formattedFeedback = feedback.feedback.map((item: any) => JSON.stringify(item)).join(',');
      return formattedFeedback;
    });

    const csvString = 'Feedback\n' + feedbackArrayData.join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedback_data.csv';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <DeliveryDetailsModal isOpen={open} setIsOpen={setopen} data={current} />
      <Sidenav>
        <p className="text-4xl font-bold">
          Deliveries <span className="font-light">({data.length})</span>
        </p>
        <div className="grid grid-cols-3 gap-2 w-full my-5">
        <PendingDeliveryList setcurrent={setcurrent} setopen={setopen} />
          <ApprovedDeliveryList setcurrent={setcurrent} setopen={setopen} />
          <OnGoingDeliveryList setcurrent={setcurrent} setopen={setopen} />
        </div>

      
      </Sidenav>
    </>
  );
}
