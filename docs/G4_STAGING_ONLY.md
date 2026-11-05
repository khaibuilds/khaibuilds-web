# G4 staging only

This branch is reserved for preview verification. It uses `public/robots.txt` and the `X-Robots-Tag` header to prevent indexing. Do not merge it into `main`; its robots and headers are intentionally different from production.

Baseline main candidate: `7746e4fb6442e45ef505e1deea86a274a7ba540d`.

This commit requests a non-production Cloudflare Pages preview build after GitHub permissions were connected. It does not change production, custom domains, or DNS.
