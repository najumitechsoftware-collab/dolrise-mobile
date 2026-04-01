"use client";


import { useEffect, useState } from "react";

export default function ErrorLogPage() {
  const [errorLog, setErrorLog] = useState("");

  useEffect(() => {
    const handler = (event: any) => {
      setErrorLog((prev) => prev + "\n" + event.message);
    };

    window.addEventListener("error", handler);
    window.addEventListener("unhandledrejection", (e: any) => {
      setErrorLog((prev) => prev + "\n" + e.reason);
    });

    return () => {
      window.removeEventListener("error", handler);
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Error Logs</h1>
      <pre
        style={{
          background: "#000",
          color: "#0f0",
          padding: 15,
          minHeight: "80vh",
          whiteSpace: "pre-wrap",
        }}
      >
        {errorLog || "No errors yet…"}
      </pre>
    </div>
  );
}
