"use client";
import { Sidenav, Button, InputField } from "@/components";
import { SOCKET } from "@/config";
import { useAuthStore, useCustomerStore, useMessageStore } from "@/states";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WalkIn({}: any) {
  const { messages, getMessages, addMessage, addNewMessage } =
    useMessageStore() as any;
  
  const { user } = useAuthStore() as any;
  const { customers, getCustomers } = useCustomerStore() as any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [message, setmessage] = useState<string>("");

  useEffect(() => {
    getCustomers();  // Corrected function name
  }, []);
  
  useEffect(() => {
    if (id) getMessages(id);
    function onCreatedMssage(data: any) {
      addNewMessage(data.data[0]);
    }

    SOCKET.on(`createdMessage/${id}`, onCreatedMssage);
    return () => {
      SOCKET.off(`createdMessage/${id}`, onCreatedMssage);
    };
  }, [id, addNewMessage, getMessages]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setmessage(value);
  };

  const sendMessage = () => {
    addMessage({ to: id, content: message });
  };

  return (
    <>
      <Sidenav>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-2/3 flex flex-col gap-3 bg-white-50 p-2" style={{ height: '600px' }}>
              {messages.map((e: any) => {
                return (
                  <div
                    className={`flex ${
                      e.from == user?.id ? "justify-end" : "justify-start"
                    } `}
                    key={e._id}
                  >
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
          <div className="flex items-center">
            {" "}
            <div className="w-2/3">
              <InputField onChange={handleChange}></InputField>
            </div>{" "}
            <div className="w-1/3">
              <Button
                onClick={() => {
                  sendMessage();
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </Sidenav>
    </>
  );
}
