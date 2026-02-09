import Link from "next/link";
import { runs } from "../../../lib/agent-world/mockData";

export default function RunsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">Runs</h2>
      <p className="mt-2 text-sm text-white/70">Recent workflow executions.</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-2">
          {runs.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
            >
              <div className="text-white/80">
                {r.id} • {r.workflowName}
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span>{r.status}</span>
                <span>{r.startedAt}</span>
                <Link
                  href={`/agent-world/workflows/${r.workflowId}`}
                  className="text-white/70 hover:text-white"
                >
                  workflow
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
