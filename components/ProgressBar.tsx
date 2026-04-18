"use client";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [count, setCount] = useState<number>(0);

  async function fetchCount() {
    try {
      const res = await fetch("/api/count");
      if (res.ok) {
        const data = await res.json();
        setCount(data.count ?? 0);
      }
    } catch (err) {
      // ignore
    }
  }

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const percent = Math.min((count / 100) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-3 bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="text-center text-sm mt-1">{count} / 100 initiates</div>
    </div>
  );
}