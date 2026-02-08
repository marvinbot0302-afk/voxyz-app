-- Seed default policies
insert into ops_policy(key, value) values
  ('auto_approve', '{"enabled":true,"allowed_step_kinds":["crawl_url","write_content","post_tweet"]}'::jsonb),
  ('worker_policy', '{"executor":"vps","enabled":true}'::jsonb),
  ('caps', '{"post_tweet":{"daily_limit":8},"write_content":{"daily_limit":20}}'::jsonb),
  ('reaction_matrix', '{"patterns":[]}'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();
