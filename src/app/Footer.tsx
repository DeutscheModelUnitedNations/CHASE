import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as m from "@/paraglide/messages";

export default function Footer() {
	return (
		<footer className="bg-primary-300 py-6">
			<div className="container mx-auto px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Sitemap */}
					<div>
						<h3 className="text-lg font-semibold mb-4">{m.sitemap()}</h3>
						<ul className="space-y-1">
							<li>
								<Link href="/" className="hover:underline">
									{m.home()}
								</Link>
							</li>
							<li>
								<Link href="/faq" className="hover:underline">
									{m.faq()}
								</Link>
							</li>
							<li>
								<Link href="/docs" className="hover:underline">
									{m.docs()}
								</Link>
							</li>
							<li>
								<Link href="/login" className="hover:underline">
									{m.login()}
								</Link>
							</li>
							<li>
								<Link
									href="https://www.dmun.de/impressum/"
									className="hover:underline"
								>
									{m.privacy()}
								</Link>
							</li>
						</ul>
					</div>

					{/* We disable lang picking for now */}
					{/* <div>
						<h3 className="text-lg font-semibold mb-4">
							<FAIcon icon="globe" />
						</h3>
						<ul className="space-y-1">
							<li
								onClick={() => {
									setLanguage("system");
									if (window) window.location.reload();
								}}
								onKeyDown={() => {
									setLanguage("system");
									if (window) window.location.reload();
								}}
								className={`hover:underline hover:decoration-white ${
									language === "system" && "underline decoration-slate-400"
								} cursor-pointer`}
							>
								System
							</li>
							<li
								onClick={() => {
									setLanguage("en");
									if (window) window.location.reload();
								}}
								onKeyDown={() => {
									setLanguage("en");
									if (window) window.location.reload();
								}}
								className={`hover:underline hover:decoration-white ${
									language === "en" && "underline decoration-slate-400"
								} cursor-pointer`}
							>
								English (EN)
							</li>
							<li
								onClick={() => {
									setLanguage("de");
									if (window) window.location.reload();
								}}
								onKeyDown={() => {
									setLanguage("de");
									if (window) window.location.reload();
								}}
								className={`hover:underline hover:decoration-white ${
									language === "de" && "underline decoration-slate-400"
								} cursor-pointer`}
							>
								Deutsch (DE)
							</li>
						</ul>
					</div> */}

					{/* Impressum */}
					<div>
						<h3 className="text-lg font-semibold mb-4">{m.imprint()}</h3>
						<p>Deutsche Model United Nations (DMUN) e.V.</p>
						<p>Birkenweg 1, 24235 Laboe</p>
						<p>
							<Link href="mailto:vorstand@dmun.de">vorstand@dmun.de</Link>
						</p>
						<p>
							<Link href="https://dmun.de">dmun.de</Link>
						</p>
						<Image
							src={"/dmunlogo/default.png"}
							alt="DMUN e.V. Logo"
							width={128}
							height={128}
							className="my-2"
						/>
					</div>
				</div>
			</div>
		</footer>
	);
}
