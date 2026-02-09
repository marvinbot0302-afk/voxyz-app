export type Agent = {
  id: string;
  name: string;
  description?: string;
  status?: "idle" | "running" | "offline";
};

export type Workflow = {
  id: string;
  name: string;
  description?: string;
  steps?: number;
};

export type Run = {
  id: string;
  workflowId: string;
  workflowName: string;
  status: "queued" | "running" | "succeeded" | "failed";
  startedAt: string;
};
