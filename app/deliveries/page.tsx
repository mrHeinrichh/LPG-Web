"use client";
import {
  Datatable,
  DeliveryDetailsModal,
  SelectField,
  Sidenav,
} from "@/components";
import { useTransactionStore } from "@/states";
import { useEffect, useMemo, useState } from "react";
import {
  ApprovedDeliveryList,
  OnGoingDeliveryList,
  PendingDeliveryList,
} from "./components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TABLE_HEADERS } from "./data";
import CsvDownloadButton from "react-json-to-csv";

export default function Transactions() {
  const { getTransactions, transactions, getFeedbacks, feedbacks } =
    useTransactionStore() as any;
  const [current, setcurrent] = useState<any>({});
  const [open, setopen] = useState<boolean>(false);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(100);

  useEffect(() => {
    getTransactions(0, 0, `{"__t": "Delivery"}`);
  });

  useEffect(() => {
    getFeedbacks(page, limit);
  }, [page, limit, getFeedbacks]);

  const data = useMemo(
    () =>
      transactions.filter(
        (e: any) =>
          e.status == "Approved" ||
          e.status == "Pending" ||
          e.status == "On Going"
      ),
    [transactions]
  );

  const feedbackHeaders = useMemo(() => {
    let headers: any[] = [];
    const questions = feedbacks.map((e: any) =>
      e.feedback.map((qna: any) => qna.question)
    );
    questions.forEach((element: any) => {
      headers = [...new Set<any>([...headers, ...element])];
    });
    return headers;
  }, [feedbacks]);

  const parsedFeedback = useMemo(() => {
    const mockData: any[] = [];
    let temp: any = {};
    feedbacks.forEach((element: any) => {
      element.feedback.forEach((e: any) => {
        temp[e.question] = e.answer ?? "";
      });
      mockData.push(temp);
      temp = {};
    });

    return mockData;
  }, [feedbacks]);

  const downloadFeedbackData = () => {
    // Extract the array data from the feedback column and remove curly braces
    const feedbackArrayData = feedbacks.map((feedback: any) => {
      const formattedFeedback = feedback.feedback.map((item: any) => JSON.stringify(item)).join(',');
      return formattedFeedback;
    });

    // Convert the array data to a CSV string with a different separator
    const csvString =
      'Feedback\n' +
      feedbackArrayData.join('\n');

    // Create a Blob and create a download link
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedback_data.csv';

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };


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
        <p className="text-2xl font-bold">Delivery Feedbacks</p>
        <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
          <div className=""></div>
          <div className="flex justify-end mt-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={downloadFeedbackData}
            >
              Download Datatable Data
            </button>
          </div>

        </div>
        <div className="w-full flex justify-between py-2 px-3 bg-white-50">
          <div className="flex items-center gap-4 ">
            <SelectField
              options={[
                { title: "100", value: 100 },
                { title: "20", value: 20 },
                { title: "10", value: 10 },
                { title: "5", value: 5 },
                { title: "1", value: 1 },
              ]}
              name={""}
              title={""}
              onChange={(e: any) => {
                setlimit(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-4 ">
            <FaChevronLeft
              onClick={() => {
                if (page > 0) if (page > 1) setpage((prev: number) => prev - 1);
              }}
            />
            {page}
            <FaChevronRight
              onClick={() => {
                setpage((prev: number) => prev + 1);
              }}
            />
          </div>
        </div>
        <Datatable header={TABLE_HEADERS}>
          {feedbacks.map((e: any) => (
            <tr key={e._id}>
              <td>{e._id}</td>
              <td>{e.feedback}</td>
              <td>{e.updatedAt}</td>
            </tr>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
