import Link from "next/link";
import { runs, workflows } from "../../../../lib/agent-world/mockData";

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  const workflow = workflows.find((w) => w.id === workflowId);
  const recentRuns = runs.filter((r) => r.workflowId === workflowId);

  if (!workflow) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/70">Unknown workflow: {workflowId}</div>
        <Link
          href="/agent-world/workflows"
          className="mt-4 inline-flex text-sm text-white/70 hover:text-white"
        >
          Back to Workflows
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {workflow.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            {workflow.description}
          </p>
        </div>
        <button className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
          Run
        </button>
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-medium">Recent runs</h3>
        {recentRuns.length === 0 ? (
          <div className="mt-3 text-sm text-white/60">None yet.</div>
        ) : (
          <div className="mt-4 grid gap-2">
            {recentRuns.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
              >
                <div className="text-white/80">{r.id}</div>
                <div className="text-white/60">{r.status}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Link
        href="/agent-world/workflows"
        className="mt-10 inline-flex text-sm text-white/70 hover:text-white"
      >
        ← Back to Workflows
      </Link>
    </div>
  );
}
