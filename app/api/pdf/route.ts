import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TAGS = ["Urdu-Books", "Hindi-Books", "Farsi-Books"] as const;
type ReleaseTag = (typeof ALLOWED_TAGS)[number];

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file");
  const tagParam = req.nextUrl.searchParams.get("tag") ?? "Urdu-Books";

  if (!file || file.includes("/") || !file.endsWith(".pdf")) {
    return new NextResponse("Invalid file", { status: 400 });
  }
  if (!(ALLOWED_TAGS as readonly string[]).includes(tagParam)) {
    return new NextResponse("Invalid tag", { status: 400 });
  }

  const tag = tagParam as ReleaseTag;
  const BASE = `https://github.com/Mazhar-54321/qutbul-madar/releases/download/${tag}/`;

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
