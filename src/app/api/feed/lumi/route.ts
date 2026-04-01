import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * 🔥 Edge Cache Window
 * Next internal revalidation window
 */
export const revalidate = 15;

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.dolrise.com";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const mode =
      searchParams.get("mode") || "flow";
    const limit =
      searchParams.get("limit") || "30";
    const cursor =
      searchParams.get("cursor");

    const targetUrl = new URL(
      `${BACKEND_URL}/api/feed/lumi`
    );

    targetUrl.searchParams.set(
      "mode",
      mode
    );

    targetUrl.searchParams.set(
      "limit",
      limit
    );

    if (cursor) {
      targetUrl.searchParams.set(
        "cursor",
        cursor
      );
    }

    /**
     * 🧠 Abort controller (prevents hanging connections)
     */
    const controller =
      new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 8000); // 8s safety

    const backendRes = await fetch(
      targetUrl.toString(),
      {
        headers: {
          cookie:
            req.headers.get("cookie") ||
            "",
        },
        signal: controller.signal,
        next: {
          revalidate: 15,
        },
      }
    );

    clearTimeout(timeout);

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: "Backend error" },
        { status: backendRes.status }
      );
    }

    const data =
      await backendRes.json();

    /**
     * 🌍 Stale-While-Revalidate Layer
     */
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control":
          "public, s-maxage=15, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    if ((error as any)?.name === "AbortError") {
      return NextResponse.json(
        { error: "Upstream timeout" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Feed proxy failed" },
      { status: 500 }
    );
  }
}
