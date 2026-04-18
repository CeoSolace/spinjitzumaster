async function getWaitlistCount() {
  try {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:10000";

    const res = await fetch(`${baseUrl}/api/waitlist/count`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch count");
    }

    return res.json();
  } catch {
    return {
      count: 0,
      goal: 100,
      remaining: 100,
      percent: 0,
    };
  }
}

export default async function WaitlistProgress() {
  const data = await getWaitlistCount();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
            Initiate Unlock Progress
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {data.count} / {data.goal} initiates
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            {data.remaining > 0
              ? `${data.remaining} more until full platform unlock`
              : "Platform unlocked"}
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-amber-300">
            {data.percent}%
          </div>
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            Complete
          </div>
        </div>
      </div>

      <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 transition-all duration-700"
          style={{ width: `${data.percent}%` }}
        />
      </div>
    </div>
  );
}
