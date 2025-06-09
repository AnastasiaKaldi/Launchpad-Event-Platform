import { useState } from "react";
import axios from "axios";

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleResend = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/send-verification-email`,
        { email }
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="p-6">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 border p-2 rounded"
      />
      <button
        onClick={handleResend}
        className="bg-[#620808] text-white px-4 py-2 rounded"
      >
        Resend Verification Email
      </button>
      {status === "success" && (
        <p className="text-green-600 mt-2">Email sent!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2">Failed to send. Try again.</p>
      )}
    </div>
  );
};

export default ResendVerification;
