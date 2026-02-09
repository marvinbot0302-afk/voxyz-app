import Link from "next/link";

export function Card({
  title,
  description,
  href,
  right,
}: {
  title: string;
  description?: string;
  href?: string;
  right?: React.ReactNode;
}) {
  const inner = (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-medium text-white">{title}</div>
          {description ? (
            <div className="mt-2 text-sm text-white/70">{description}</div>
          ) : null}
        </div>
        {right ? <div className="text-white/60">{right}</div> : null}
      </div>
    </div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}
