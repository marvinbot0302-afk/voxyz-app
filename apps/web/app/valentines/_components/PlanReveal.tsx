import Link from "next/link";

export const DINNER_PLAN = {
  place: "Camino Alto",
  dateLabel: "this Saturday (Feb 14, 2026)",
  // Intentionally no time.
} as const;

export function PlanReveal({
  janine = true,
  className = "",
  compact = false,
}: {
  janine?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        "mt-7 overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-sm " +
        className
      }
    >
      <div className={compact ? "p-5" : "p-6"}>
        <p className="text-xs font-medium uppercase tracking-widest opacity-90">
          plan reveal
        </p>
        <p className={compact ? "mt-2 text-lg font-semibold" : "mt-2 text-2xl font-semibold"}>
          {janine ? "Janine — will you be my Valentine?" : "Will you be my Valentine?"}
        </p>
        <p className="mt-2 text-sm opacity-90">This Saturday: {DINNER_PLAN.place} dinner.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href="/valentines"
            className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20"
          >
            More pages
          </Link>
          <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold ring-1 ring-white/25">
            I hope you say yes
          </span>
        </div>
      </div>
    </div>
  );
}
