"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/states";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const authStore = useAuthStore() as any;

  useEffect(() => {
    if (!authStore.user && !pathName.includes("sign-in"))
      router.push("sign-in");
  }, [authStore.user]);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
