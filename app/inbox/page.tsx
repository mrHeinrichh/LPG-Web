"use client";
import { Sidenav, Button } from "@/components";
import { SOCKET } from "@/config";
import {
  useCustomerStore,
  useItemStore,
  useMessageStore,
  useWalkInStore,
} from "@/states";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function WalkIn({}: any) {
  const { messages, getMessages, addMessage } = useMessageStore() as any;
  const { customers, getCustomer } = useCustomerStore() as any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    getCustomer();

    if (id) getMessages(id);

    function onCreatedMssage(data: any) {
      addMessage(data.data[0]);
    }

    SOCKET.on(`createdMessage/${id}`, onCreatedMssage);
    return () => {
      SOCKET.off(`createdMessage/${id}`, onCreatedMssage);
    };
  }, [id]);

  return (
    <>
      <Sidenav>
        <div className="flex gap-2 ">
          <div className="w-2/3 flex flex-col gap-3 bg-white-50 p-2">
            {messages.map((e: any) => {
              return (
                <div className="" key={e._id}>
                  <div className="w-fit p-3 bg-slate-200 rounded-md">
                    <p>{e.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-1/3 bg-white-50 p-3">
            {customers.map((e: any) => {
              return (
                <div
                  className="rounded p-2 bg-slate-400"
                  key={e._id}
                  onClick={() => {
                    router.push(`/inbox?id=${e._id}`);
                  }}
                >
                  <p>{e.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Sidenav>
    </>
  );
}
