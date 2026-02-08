-- VoxYZ-style closed-loop schema (Supabase Postgres)
-- Notes:
-- - Uses UUIDs
-- - Stores policies as JSONB
-- - Emits events for everything

create extension if not exists "pgcrypto";

-- Enums
create type ops_proposal_status as enum ('pending','accepted','rejected');
create type ops_mission_status as enum ('queued','running','succeeded','failed','canceled');
create type ops_step_status as enum ('queued','running','succeeded','failed','canceled');

-- Proposals: idea candidates (human/API/trigger/reaction)
create table if not exists ops_mission_proposals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status ops_proposal_status not null default 'pending',
  source text not null, -- 'api' | 'trigger' | 'reaction' | 'manual'
  title text not null,
  description text,
  requested_step_kinds text[] not null default '{}',
  input jsonb not null default '{}'::jsonb,
  decision jsonb not null default '{}'::jsonb,
  decided_at timestamptz,
  decided_by text
);

-- Missions: accepted proposals become missions
create table if not exists ops_missions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status ops_mission_status not null default 'queued',
  proposal_id uuid references ops_mission_proposals(id) on delete set null,
  title text not null,
  description text,
  tags text[] not null default '{}',
  input jsonb not null default '{}'::jsonb,
  result jsonb not null default '{}'::jsonb,
  last_error text
);

-- Steps: executable units
create table if not exists ops_mission_steps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  mission_id uuid not null references ops_missions(id) on delete cascade,
  idx int not null,
  kind text not null,
  status ops_step_status not null default 'queued',
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  reserved_at timestamptz,
  reserved_by text,
  started_at timestamptz,
  finished_at timestamptz,
  attempts int not null default 0,
  last_error text,
  unique(mission_id, idx)
);

create index if not exists idx_ops_steps_status_kind on ops_mission_steps(status, kind);
create index if not exists idx_ops_steps_reserved_at on ops_mission_steps(reserved_at);

-- Event stream: append-only audit log
create table if not exists ops_agent_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null, -- worker|api|trigger|reaction|system
  type text not null,   -- e.g. proposal.created, step.started
  tags text[] not null default '{}',
  entity jsonb not null default '{}'::jsonb,
  payload jsonb not null default '{}'::jsonb
);
create index if not exists idx_ops_events_created_at on ops_agent_events(created_at desc);
create index if not exists idx_ops_events_type on ops_agent_events(type);

-- Policy storage
create table if not exists ops_policy (
  key text primary key,
  updated_at timestamptz not null default now(),
  value jsonb not null default '{}'::jsonb
);

-- Trigger rules: evaluated by heartbeat
create table if not exists ops_trigger_rules (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  enabled boolean not null default true,
  name text not null,
  cooldown_seconds int not null default 0,
  last_fired_at timestamptz,
  spec jsonb not null default '{}'::jsonb
);

-- Reaction queue
create table if not exists ops_agent_reactions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'queued', -- queued|running|done|failed
  reason text,
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  last_error text
);
create index if not exists idx_ops_reactions_status on ops_agent_reactions(status);

-- Action run logs (per tool/service call)
create table if not exists ops_action_runs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  step_id uuid references ops_mission_steps(id) on delete set null,
  provider text,
  action text,
  status text not null default 'started',
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  error text
);
