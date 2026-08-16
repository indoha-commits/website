-- Wipe all data for demo recording reset
-- Keeps schema intact, removes all rows

BEGIN;

-- Disable trigger temporarily for clean truncation
SET session_replication_role = 'replica';

-- Single-company (legacy) tables
TRUNCATE TABLE
  public.tenants,
  public.payment_intents,
  public.invoices,
  public.subscriptions,
  public.provisioning_jobs,
  public.notifications,
  public.calendar_events,
  public.audit_log,
  public.webhook_events,
  public.user_roles,
  public.cargo_items,
  public.pricing_tiers,
  public.plan_upgrade_requests
CASCADE;

-- Multi-tenant tables
TRUNCATE TABLE
  public.mt_audit_log,
  public.mt_billing_cycles,
  public.mt_cargo,
  public.mt_cargo_approvals,
  public.mt_cargo_events,
  public.mt_cargo_groups,
  public.mt_cargo_items,
  public.mt_clients,
  public.mt_client_users,
  public.mt_documents,
  public.mt_invoices,
  public.mt_leads,
  public.mt_oauth_connections,
  public.mt_payment_intents,
  public.mt_payments,
  public.mt_plan_upgrade_requests,
  public.mt_pricing_tiers,
  public.mt_request_on_validation,
  public.mt_storage_jobs,
  public.mt_subscriptions,
  public.mt_tenant_data_sources,
  public.mt_tenants,
  public.mt_tenant_users,
  public.mt_webhook_events
CASCADE;

-- AutoEvolve tables
TRUNCATE TABLE
  public.plans,
  public.profiles,
  public.analyses,
  public.usage,
  public.prompt_versions,
  public.published_clips,
  public.api_keys,
  public.activity_log,
  public.jobs,
  public.clip_feedback,
  public.user_learning_context
CASCADE;

-- Re-enable triggers
SET session_replication_role = 'origin';

COMMIT;
