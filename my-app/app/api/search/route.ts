import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const filtered = data.products
    .filter((item: any) =>
      item.title.toLowerCase().includes(q)
    )
    .slice(0, 5)
    .map((item: any) => ({
      id: item.id,
      title: item.title,
    }));

  return NextResponse.json(filtered);
}
