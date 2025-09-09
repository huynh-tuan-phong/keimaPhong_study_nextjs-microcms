import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { MICROCMS_BASE_URL, MICROCMS_API_KEY } from "@/lib/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get("offset") ?? undefined;
  const limit = searchParams.get("limit") ?? undefined;
  const filters = searchParams.get("filters") ?? undefined;
  const fields = searchParams.get("fields") ?? undefined;
  const orders = searchParams.get("orders") ?? undefined;

  try {
    const res = await axios.get(`${MICROCMS_BASE_URL}/blog`, {
      headers: { "X-API-KEY": MICROCMS_API_KEY },
      params: { offset, limit, filters, fields, orders },
    });
    return NextResponse.json(res.data, { status: 200 });
  } catch (err: any) {
    const status = err?.response?.status ?? 500;
    const message = err?.response?.data ?? { message: "Upstream error" };
    return NextResponse.json(message, { status });
  }
}

