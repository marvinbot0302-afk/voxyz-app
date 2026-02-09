import Link from "next/link";

const items = [
  { href: "/agent-world", label: "Dashboard" },
  { href: "/agent-world/agents", label: "Agents" },
  { href: "/agent-world/workflows", label: "Workflows" },
  { href: "/agent-world/runs", label: "Runs" },
];

export function AgentWorldNav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
