# Live smoke report: pricing deployment

Generated: 2026-05-05T01:41:55+00:00
Host: srv1430965
Repo: /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page

## Constraints
- No deploy performed.
- No PM2 restart performed.

## HTTP proof
### https://stanley-systems.com/
- status: 200
- bytes: 218812
- title: Stanley Systems | Backend Bottleneck Removal for Service Businesses
- saved_html: artifacts/kanban-overnight/live_home.html

### https://stanley-systems.com/pricing
- status: 200
- bytes: 88955
- title: Pricing | Workflow Audit | Stanley Systems
- saved_html: artifacts/kanban-overnight/live_pricing.html

## PM2 status (read-only)
```
┌────┬────────────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                               │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ [1m[36m2[39m[22m  │ fb-webhook                         │ default     │ 1.0.0   │ [7m[1mfork[22m[27m    │ N/A      │ 0      │ 0    │ [31m[1mstopped[22m[39m   │ 0%       │ 0b       │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m5[39m[22m  │ gmail-watch-register               │ default     │ 1.0.0   │ [7m[1mfork[22m[27m    │ 0        │ 0      │ 0    │ [31m[1mstopped[22m[39m   │ 0%       │ 0b       │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m4[39m[22m  │ gmail-webhook                      │ default     │ 1.0.0   │ [7m[1mfork[22m[27m    │ 2690041  │ 42D    │ 0    │ [32m[1monline[22m[39m    │ 0%       │ 138.4mb  │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m41[39m[22m │ hyperframes-preview                │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 1234014  │ 14D    │ 2    │ [32m[1monline[22m[39m    │ 0%       │ 126.7mb  │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m3[39m[22m  │ marineflow-poc                     │ default     │ N/A     │ [7m[1mfork[22m[27m    │ N/A      │ 0      │ 11   │ [31m[1mstopped[22m[39m   │ 0%       │ 0b       │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m38[39m[22m │ mcgough-preview                    │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 2864447  │ 0s     │ 404… │ [32m[1monline[22m[39m    │ 0%       │ 69.1mb   │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m40[39m[22m │ n8n-main                           │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 1823073  │ 12D    │ 10   │ [32m[1monline[22m[39m    │ 0%       │ 529.8mb  │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m37[39m[22m │ openclaw-auto-compact              │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 2754200  │ 41D    │ 2    │ [32m[1monline[22m[39m    │ 0%       │ 75.5mb   │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m1[39m[22m  │ openclaw-dashboard                 │ default     │ 1.0.0   │ [7m[1mfork[22m[27m    │ N/A      │ 0      │ 0    │ [31m[1mstopped[22m[39m   │ 0%       │ 0b       │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m6[39m[22m  │ stanley-brilliance                 │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 2690042  │ 42D    │ 0    │ [32m[1monline[22m[39m    │ 0%       │ 89.8mb   │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m39[39m[22m │ stanley-landing                    │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 2736813  │ 46m    │ 168  │ [32m[1monline[22m[39m    │ 0%       │ 110.0mb  │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m7[39m[22m  │ stanley-landing-preview            │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 2690043  │ 42D    │ 0    │ [32m[1monline[22m[39m    │ 0%       │ 105.4mb  │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m45[39m[22m │ stanley-persistence-server         │ default     │ 1.0.0   │ [7m[1mfork[22m[27m    │ 4175646  │ 12D    │ 3    │ [32m[1monline[22m[39m    │ 0%       │ 71.1mb   │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m36[39m[22m │ stanley-phone-assistant-backend    │ default     │ N/A     │ [7m[1mfork[22m[27m    │ 2716535  │ 42D    │ 1    │ [32m[1monline[22m[39m    │ 0%       │ 74.9mb   │ [1mjaden[22m    │ [90mdisabled[39m │
│ [1m[36m0[39m[22m  │ stanley-website                    │ default     │ 1.0.0   │ [7m[1mfork[22m[27m    │ N/A      │ 0      │ 2    │ [31m[1mstopped[22m[39m   │ 0%       │ 0b       │ [1mjaden[22m    │ [90mdisabled[39m │
└────┴────────────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

## git diff --check
```
PASS: git diff --check exited 0
```
