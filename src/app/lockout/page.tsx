"use client";
import Button from "@/lib/components/Button";
import { useRouter } from "next/router";

export default function Lockout() {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Locked out</h1>
        <Button onClick={() => router.push("/")} className="mt-4">
          Back Home
        </Button>
      </div>
    </>
  );
}
