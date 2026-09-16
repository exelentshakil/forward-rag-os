# Production Scope & Formal Estimate
## Forward AR Core: Governed Knowledge Base & ChatGPT Retrieval System

**Reference Number:** Ref #BS-2026-FARD-01  
**Client:** Forward AR Experts (Kennesaw, GA, USA, EST)  
**Date:** September 16, 2026  
**Architect:** Shakil Ahmed, Founder · BarakahSoft LLC  
**Certification:** Securiti Certified AI Security & Governance Architect (NIST AI RMF, OWASP Top 10 LLMs)  
**Hourly Rate:** $55.00/hr (Calibrated midpoint, expert-level consulting)  
**Live Prototype Console:** [https://forward-rag-os.vercel.app](https://forward-rag-os.vercel.app)  

---

## 1. Engagement Model: The Two-Track Structure

To eliminate risk, provide immediate value, and ensure high-velocity delivery, we operate under a **Two-Track Engagement Model**:

### Track 1: Discovery & Core Architecture Sprint (Capped Hours)
*   **Total Scope:** 48 hours of principal architect consulting, database schema design, and developer integration specs.
*   **Capped Cost:** **$2,640.00** (delivered across 5 structured milestones + Phase 0).
*   **Guarantees:** Strictly capped at 48 hours. Any additional revisions or requirements within this scope are absorbed under my risk, not yours.
*   **Outcome:** Completed RAG architecture models, secure metadata schemas, Monday Board De-ID automation, custom ChatGPT Action specs, and developer implementation specifications with 3-part UAT security tests.

### Track 2: Ongoing Implementation Retainer & Developer Oversight (Months 2–3)
*   **Total Scope:** Predictable weekly support to guide your Wix Developer (Harpreet) and Monday/Zapier builder, review completed code, perform access boundary audits, and manage dependency handovers.
*   **Structure:** 15 hours per week of dedicated support.
*   **Monthly Retainer:** **$3,300.00 / month** (15 hrs/wk × $55/hr × 4 weeks).
*   **Commitment:** Month-to-month. Cancel anytime. Zero long-term contractual lock-in.

---

## 2. Track 1: Scope & Operating Milestone Delivery Schedule

Below is the detailed 6-row delivery schedule for Track 1, including the pre-shipped interactive prototype (Phase 0) which is delivered live ahead of the bid.

| Milestone | Deliverables & Technical Architecture Specifications | Hours | Share | Investment |
|---|---|---|---|---|
| **Phase 0** | **Deployed Forward AR Core Control Plane & PRD**<br>Interactive web cockpit demonstrating the 6-node animated Make/n8n event pipeline, automated sales signal de-identification queue ( Apollo / CRM notes), secure Content Registry with required metadata taxonomy, and ChatGPT retrieval simulator. | **0 Hrs** | **0%** | **$0.00 (Delivered)** |
| **Phase 1** | **Knowledge Architecture & Unified Source Mapping**<br>Design end-to-end information architecture mapping the Wix CMS Library, Algolia Catalog, Monday Boards, and secure Google Drive folder tree. Draft direct data-routing paths and REST API mappings. | **12 Hrs** | **25%** | **$660.00** |
| **Phase 2** | **Taxonomy & Secure Metadata Schema Design**<br>Architect database schemas for Content Registry and Analyst Directory. Standardize required metadata tags: source system, attribution, owner, reviewer, review date, and confidentiality (PUBLIC, INTERNAL, RESTRICTED). | **8 Hrs** | **17%** | **$440.00** |
| **Phase 3** | **Monday CRM Quarantine Board & Automated De-ID Pipelines**<br>Set up air-gapped Monday Board A. Configure Zapier/Make triggers executing entity detection and financial masking (PII Redaction). Establish secure one-way promotional approval webhooks to Registry Board B. | **12 Hrs** | **25%** | **$660.00** |
| **Phase 4** | **ChatGPT Business Retrieval Custom Action API Gateway**<br>Build secure OAuth gateway `/api/retrieve` parsing user credentials and dynamically applying Algolia metadata filters. Prevent raw sales materials leakage, cite source DocID references, and track API/token usage ROI. | **10 Hrs** | **21%** | **$550.00** |
| **Phase 5** | **Developer Implementation Specifications & Boundary Testing**<br>Deliver turnkey technical instructions, Velo afterUpdate hooks, and Zapier payload formats for your Wix & Monday developers. Run 3-part UAT security tests validating access boundaries under adversarial queries. | **6 Hrs** | **12%** | **$330.00** |
| **Total** | **Track 1 Discovery & Core Architecture Sprint** | **48 Hrs** | **100%** | **$2,640.00** |

---

## 3. Secure Architecture Guardrails (Built-in Core Controls)

1.  **Air-Gapped Ingestion:** Raw sales notes and CRM lead metrics have no direct API access to Google Drive or ChatGPT Business.
2.  **Automated Redaction:** Secure microservice masks corporate ACVs, phone numbers, and client corporate entity names prior to review.
3.  **Human-in-the-Loop Review Gate:** Senior Architect approval must be explicitly toggled in the Monday Quarantine Queue before any de-identified signal is synced to the shared registry.
4.  **Metadata-Based RBAC:** ChatGPT custom retrieval dynamic queries filter document lists based on the user's role (External, Staff, Admin).
5.  **Source Citation Integrity:** All RAG results reference searchable DocID citations (e.g. `[WIX-LIB-AR-104]`), allowing users to verify source files instantly.

---

## 4. Commercial Terms & Conditions

*   **Payment Terms:** Milestone-based releases through Upwork Escrow for Track 1; weekly or monthly escrow releases for Track 2.
*   **100% Client Ownership:** All deliverables, architecture diagrams, schemas, and endpoint code belong 100% to the client upon contract release.
*   **30-Day Hypercare Warranty SLA:** Includes 30 days of complimentary support after Track 1 delivery to handle any schema modifications, Velo hook debugging, or integration audits.
*   **Validity:** This formal quote is valid for 30 days from date of issuance.
