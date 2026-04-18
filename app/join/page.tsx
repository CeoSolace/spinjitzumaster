"use client";

import { FormEvent, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Error signing up");
        return;
      }

      setStatus("success");
      setMessage(data.message || "You have entered the dojo. Welcome!");

      setEmail("");
      setUsername("");

      // 🔥 forces ProgressBar to refresh instantly
      setRefreshKey((prev) => prev + 1);
    } catch {
      setStatus("error");
      setMessage("Network error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold mb-3">Join the Dojo</h1>

        <p className="text-gray-300 mb-6 text-sm">
          Enter your email to join the waitlist. The platform unlocks at 100 initiates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Username (optional)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="SenseiName"
              className="w-full px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-500 transition font-semibold disabled:opacity-60"
          >
            {isSubmitting ? "Joining..." : "Join Waitlist"}
          </button>
        </form>

        {/* Status */}
        {status !== "idle" && (
          <p
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Progress */}
        <div className="mt-6">
          <ProgressBar refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
