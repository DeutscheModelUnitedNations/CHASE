"use client"
import Image from "next/image";
import { Button } from "primereact/button";
import Link from "next/link";
import * as m from "@/paraglide/messages.js";

export default function Err() {
	return (
		<>
			<div className="flex flex-col bg-primary-950 items-center">
				<div className="flex align-center justify-center h-screen w-screen bg-primary">
					<div className="flex flex-col items-center justify-center">
						<Image
							src="/logo/png/chase_logo_white_text.png"
							alt="Logo"
							width={400}
							height={128}
							className="mb-10"
						/>
						<p className="text-white text-9xl mb-3 mt-10">500</p>
						<p className="text-white text-1xl mb-10">{m.error()}</p>
						<Link href="/">
							<Button
								severity="warning"
								label={m.notFound()}
								icon="pi pi-link"
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
