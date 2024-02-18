"use client";
import { Datatable, SelectField, Sidenav } from "@/components";
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
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(100);

  useEffect(() => {
    getTransactions(0, 0);
  }, []);

  useEffect(() => {
    getFeedbacks(page, limit);
  }, [page, limit]);

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
  }, [feedbackHeaders]);

  return (
    <>
      <Sidenav>
        <p className="text-4xl font-bold">
          Deliveries <span className="font-light">({data.length})</span>
        </p>

        <div className="grid grid-cols-3 gap-2 w-full my-5">
          <PendingDeliveryList />
          <ApprovedDeliveryList />
          <OnGoingDeliveryList />
        </div>

        <p className="text-2xl font-bold">Delivery Feedbacks</p>
        <div className="flex justify-between items-center w-full mt-5 mb-2 bg-white-100 rounded-md px-4 py-2">
          <div className=""></div>
          <div className="rounded-lg bg-black-50 p-2">
            <CsvDownloadButton
              data={parsedFeedback}
              headers={feedbackHeaders}
            />
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
                setpage((prev: number) => prev - 1);
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
              <td>{e.feedback.length}</td>
              <td>{e.name}</td>
              <td>{e.updatedAt}</td>
            </tr>
          ))}
        </Datatable>
      </Sidenav>
    </>
  );
}
