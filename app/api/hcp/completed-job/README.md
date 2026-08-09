Production webhook receiver for Housecall Pro completed-job Zap payloads.

Live URL:
https://stanley-systems.com/api/hcp/completed-job

Durable storage:
- Appends JSONL records to `/home/jaden/.openclaw/data/hcp-completed-jobs/YYYY-MM-DD.jsonl`

n8n forward target:
- `https://n8n.stanley-systems.com/webhook/s4XTGHZII1QhPZti/webhook/hcp-job-completed`
- Override with `STANLEY_HCP_COMPLETED_JOB_WEBHOOK_URL` if needed

Expected source:
- Zapier Webhooks by Zapier POST action
- JSON payload based on Housecall Pro New Completed Job trigger
