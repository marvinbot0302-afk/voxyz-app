import { Card } from "../../../components/aw/Card";
import { agents } from "../../../lib/agent-world/mockData";

export default function AgentsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">Agents</h2>
      <p className="mt-2 text-sm text-white/70">
        Prototype list (mock data). Next step is wiring real registry + runs.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {agents.map((a) => (
          <Card
            key={a.id}
            title={a.name}
            description={a.description}
            href={`/agent-world/agents/${a.id}`}
            right={<span className="text-xs">{a.status ?? ""}</span>}
          />
        ))}
      </div>
    </div>
  );
}
