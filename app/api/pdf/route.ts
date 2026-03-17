import { NextRequest, NextResponse } from "next/server";

const BASE =
  "https://github.com/Mazhar-54321/qutbul-madar/releases/download/Urdu-Books/";

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file");
  if (!file || file.includes("/") || !file.endsWith(".pdf")) {
    return new NextResponse("Invalid file", { status: 400 });
  }

  const upstream = await fetch(`${BASE}${encodeURIComponent(file)}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!upstream.ok) {
    return new NextResponse("PDF not found", { status: 404 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
