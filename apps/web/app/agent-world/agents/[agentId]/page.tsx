import Link from "next/link";
import { agents } from "../../../../lib/agent-world/mockData";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = agents.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/70">Unknown agent: {agentId}</div>
        <Link
          href="/agent-world/agents"
          className="mt-4 inline-flex text-sm text-white/70 hover:text-white"
        >
          Back to Agents
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{agent.name}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            {agent.description}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/60">
          status: {agent.status ?? "unknown"}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-medium">Capabilities</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
            <li>Generate specs and break work into PR-sized tasks</li>
            <li>Keep modules small and interactive-first</li>
            <li>Store state as minimal TS types first, then persistence</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-medium">Next</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
            <li>Add “Recent runs” for this agent</li>
            <li>Add config + model info (read-only)</li>
            <li>Add a “Run workflow” entrypoint</li>
          </ul>
        </section>
      </div>

      <Link
        href="/agent-world/agents"
        className="mt-10 inline-flex text-sm text-white/70 hover:text-white"
      >
        ← Back to Agents
      </Link>
    </div>
  );
}
