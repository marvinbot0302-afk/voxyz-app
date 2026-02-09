import { Card } from "../../components/aw/Card";

export default function AgentWorldDashboard() {
  return (
    <div>
      <p className="max-w-2xl text-sm text-white/80">
        The main app surface: agents, workflows, and reusable playbooks. This is
        an IA + navigation spine first; persistence comes later.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card
          title="Agents"
          description="Browse agent roles and capabilities."
          href="/agent-world/agents"
        />
        <Card
          title="Workflows"
          description="Reusable playbooks you can run."
          href="/agent-world/workflows"
        />
        <Card
          title="Runs"
          description="Recent workflow executions."
          href="/agent-world/runs"
        />
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-medium">Next</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
          <li>Agents list + detail pages (mock data first).</li>
          <li>Workflow catalog + a stub “Run” button.</li>
          <li>Define minimal types for Agent/Workflow/Run.</li>
        </ul>
      </div>
    </div>
  );
}
