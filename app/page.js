"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [status, setStatus] = useState("Mengecek koneksi...");

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase
        .from("test_connection")
        .select("*")
        .limit(1);

      if (error && error.code === "42P01") {
        setStatus("Supabase terhubung ✅");
      } else if (error) {
        setStatus("Supabase terhubung, tapi ada error: " + error.message);
      } else {
        setStatus("Supabase terhubung ✅");
      }
    }

    testConnection();
  }, []);

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Undangan Digital</h1>
      <p>{status}</p>
    </main>
  );
}
