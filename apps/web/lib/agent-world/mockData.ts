import type { Agent, Run, Workflow } from "./types";

export const agents: Agent[] = [
  {
    id: "agent-world",
    name: "Agent World",
    description: "Main app surface + navigation spine.",
    status: "idle",
  },
  {
    id: "nfl-tutor",
    name: "NFL Tutor",
    description: "Interactive modules: downs, drives, scoring decisions.",
    status: "idle",
  },
  {
    id: "poker-tutor",
    name: "Poker Tutor",
    description: "Interactive modules: rankings, actions, street flow.",
    status: "idle",
  },
];

export const workflows: Workflow[] = [
  {
    id: "ship-landing",
    name: "Ship a landing page",
    description: "Generate copy + layout + deployment checklist.",
    steps: 6,
  },
  {
    id: "build-tutor-module",
    name: "Build tutor module",
    description: "Create a micro-lesson + quiz + scaffolding route.",
    steps: 5,
  },
];

export const runs: Run[] = [
  {
    id: "run_001",
    workflowId: "build-tutor-module",
    workflowName: "Build tutor module",
    status: "succeeded",
    startedAt: "2026-02-08T15:44:00-08:00",
  },
  {
    id: "run_002",
    workflowId: "ship-landing",
    workflowName: "Ship a landing page",
    status: "queued",
    startedAt: "2026-02-08T15:58:00-08:00",
  },
];
