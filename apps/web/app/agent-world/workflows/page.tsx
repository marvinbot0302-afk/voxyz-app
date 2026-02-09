import { Card } from "../../../components/aw/Card";
import { workflows } from "../../../lib/agent-world/mockData";

export default function WorkflowsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">Workflows</h2>
      <p className="mt-2 text-sm text-white/70">
        Prototype catalog (mock data). Next step: detail page + run button.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {workflows.map((w) => (
          <Card
            key={w.id}
            title={w.name}
            description={w.description}
            href={`/agent-world/workflows/${w.id}`}
            right={
              w.steps ? (
                <span className="text-xs text-white/50">{w.steps} steps</span>
              ) : null
            }
          />
        ))}
      </div>
    </div>
  );
}
