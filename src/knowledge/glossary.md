# Glossary

## RAG (Retrieval‑Augmented Generation)
Large‑language‑model approach that retrieves relevant chunks from a knowledge base and provides them to the model for grounded answers.

## Embedding
Numerical vector representation of text. This site uses OpenAI `text-embedding-3-small` (1536 dimensions).

## Pinecone Index
A vector database collection that stores embeddings for similarity search. Queried with the user question vector.

## Namespace (Pinecone)
A logical partition within a Pinecone index (e.g., `default`) used to scope vectors.

## Chunk
A small block of text created during ingestion. Defaults: ~1000 characters with ~200 characters of overlap to preserve context.

## TOP_K
Number of most similar vectors returned from Pinecone. Set to 12.

## MIN_SCORE
Similarity threshold (0–1) to accept a match. Set to 0.6; if nothing crosses, best few results are used.

## OpenAI Chat Completions
API that streams model tokens to the client for fast, incremental responses.

## Upstash Redis Ratelimit
Server‑side rate limiting used here (10/min and 200/day per IP). On limit, API returns 429 with headers `Retry-After`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset`.

## EmailJS
Client‑side email service used by the contact form. Requires service ID, template ID, and a public key.

## MX Record
DNS record that indicates which mail servers accept email for a domain. The site verifies deliverability by checking MX (and falls back to A) records.

## Honeypot (Form)
Hidden field that real users don’t fill. If it contains text, the submission is treated as a bot and blocked.

## DGA (Domain Generation Algorithm)
Malware technique that generates many domains for command‑and‑control. Investigated/contained in the DGA incident project.

## IOC (Indicator of Compromise)
Observable evidence of intrusion (malicious domains, hashes, IPs, etc.).

## EDR / XDR
Endpoint Detection & Response / Extended Detection & Response. Tooling for threat detection, investigation, and response across endpoints (and beyond for XDR).

## MDM (Mobile Device Management)
Centralized mobile endpoint control (policies, restrictions, automation). Implemented with VMware Workspace ONE.

## NAC (Network Access Control)
Controls which devices can connect to the network and under what conditions.

## Active Directory (AD)
Microsoft’s identity and directory service used for users, groups, and policy (GPO) management.

## Microsoft Intune
Cloud MDM/UEM platform used for device compliance and application policy.

## DLP (Data Loss Prevention)
Policies and tooling to detect/prevent unauthorized data disclosure. Example: Symantec DLP.

## WAF (Web Application Firewall)
Layer 7 filtering/protection for HTTP(S) apps. Example tools: F5, Nginx WAF modules.

## Zscaler ZIA
Zscaler Internet Access: cloud secure web gateway/service edge used for visibility and threat protection on outbound traffic.

## Workspace ONE (AirWatch)
VMware’s MDM/UEM suite used for Android/iOS management, app control, and automation.

## Glassmorphism
UI style with translucent surfaces, blur, and subtle borders. Used by the chat panel and inputs.

## Accent Color
Primary highlight color used across the site: `#9CB7C9` (hover `#8BA5B7`).

