// src/Verify.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/verify-email`, {
        params: { token },
      })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dbd5c5]">
      <div className="text-center p-10 rounded-lg shadow-md bg-white">
        {status === "verifying" && <p>🔄 Verifying your email...</p>}
        {status === "success" && (
          <p className="text-green-700 font-semibold text-lg">
            ✅ Email successfully verified! You can now{" "}
            <a className="underline text-blue-700" href="/signin">
              sign in
            </a>
            .
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-semibold text-lg">
            ❌ Invalid or expired verification link.
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
