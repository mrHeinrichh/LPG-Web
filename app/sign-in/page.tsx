"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Button, InputField } from "@/components";
import { post } from "@/config";
import { useAuthStore } from "@/states";
import { useRouter } from "next/navigation";
function SignIn() {
  const router = useRouter();
  const authStore = useAuthStore() as any;
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authStore.user) router.push("/");
  }, [authStore.user, router]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    authStore.authenticate(formData);
  };

  return (
    <main className="min-h-screen flex">
      <div className="w-1/3 flex items-center justify-center">
        <div className="flex flex-col gap-3">
          <InputField
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <InputField
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
      <div className="w-2/3 bg-slate-500"></div>
    </main>
  );
}

export default SignIn;
