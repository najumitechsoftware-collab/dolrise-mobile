import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/care/login";

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || "Login failed" },
      { status: res.status }
    );
  }

  // 🔐 Store token securely in cookie
  const response = NextResponse.json({ success: true });

  response.cookies.set("care_token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });

  return response;
}
