"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ refreshKey = 0 }: { refreshKey?: number }) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  async function fetchCount() {
    try {
      const res = await fetch("/api/progress", {
        cache: "no-store",
      });

      const data = await res.json();

      if (res.ok) {
        setCount(data.count ?? 0);
      }
    } catch {
      setCount(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCount();

    const interval = setInterval(fetchCount, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, [refreshKey]);

  const percent = Math.min((count / 100) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-center text-sm mt-2 text-gray-300">
        {loading ? "Loading..." : `${count} / 100 initiates`}
      </div>
    </div>
  );
}
