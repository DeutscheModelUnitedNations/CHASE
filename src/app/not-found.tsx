"use client";
import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";
import Link from "next/link";
import * as m from "@/paraglide/messages";

export default function Home() {
  return (
    <>
      <div className="bg-primary-950 flex flex-col items-center">
        <div className="align-center bg-primary flex h-screen w-screen justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/logo/png/chase_logo_blue_text.png"
              alt="Logo"
              width={400}
              height={128}
              className="mb-10"
            />
            <p className="mt-10 mb-3 text-9xl">404</p>
            <p className="text-1xl mb-10">{m.notFound()}</p>
            <Link href="/">
              <Button
                severity="warning"
                label={m.backToHome()}
                icon="pi pi-link"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
