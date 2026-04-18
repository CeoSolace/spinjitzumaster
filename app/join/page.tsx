"use client";
import { FormEvent, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMessage("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Error signing up");
      } else {
        setStatus("success");
        setMessage("You have entered the dojo. Welcome!");
        setEmail("");
        setUsername("");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Join the Dojo</h1>
      <p className="mb-4 text-gray-300">
        Enter your email to join the waitlist. We will notify you when the gates
        open.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1">Username (optional)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
            placeholder="SenseiName"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-500 rounded text-white font-semibold"
        >
          Join Waitlist
        </button>
      </form>
      {status !== "idle" && (
        <p className={`mt-4 ${status === "success" ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
      <ProgressBar />
    </div>
  );
}