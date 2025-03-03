import { middleware as paraglide } from "@/lib/i18n";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return paraglide(request);
}
