# Product Requirements Document (PRD)
## Governed RAG & Secure Knowledge Base Control Plane
**Client:** Forward AR Experts  
**System Name:** Forward AR Core & ChatGPT Boundary Shield  
**Architect:** Shakil Ahmed, Founder · BarakahSoft LLC  
**Certification:** Securiti Certified AI Security & Governance Architect (NIST AI RMF, OWASP Top 10 LLMs)  
**Status:** Architecture Completed & Live Prototype Shipped  

---

## 1. Executive Summary & Core Principle

### The Core Problem
Forward AR Experts operates an ecosystem across multiple isolated systems: a public Wix Website & Algolia search library, a Monday.com internal operating system, an internal Analyst Directory, and Google Drive document storage. 

To boost team velocity, Forward AR is deploying **ChatGPT Business Company Knowledge** as a central retrieval hub. However, a catastrophic security risk exists: **raw sales calls, pipeline leads, and confidential client materials must never automatically enter shared knowledge, train public models, or be retrievable by non-authorized ChatGPT users.** 

### The Foundational Architectural Principle: "The Privacy Blast Shield"
We enforce an **explicit unidirectional approval gate**. Data is classified into three isolated tiers. All raw ingestion points (Monday CRM, Apollo, Instantly) are air-gapped from ChatGPT retrieval. Insights are quarantined and must go through a systematic, senior-approved de-identification (De-ID) workflow before being promoted to the Content Registry for ChatGPT ingestion.

---

## 2. 3-Layer Data Tiering & Permission Model

To guarantee zero data leakage, we enforce three strict data classifications across the entire enterprise stack:

| Tier | Classification | Content Description | Systems Used | ChatGPT Retrievable? | Required Controls |
|---|---|---|---|---|---|
| **Tier 1** | **PUBLIC_LIBRARY** | Approved methods, public templates, public Wix articles, published analyst bios. | Wix CMS, Algolia, Wix Public Library. | **YES (Public)** | No masking needed. Auto-sync via webhooks. |
| **Tier 2** | **INTERNAL_APPROVED** | Senior-approved templates, de-identified analyst briefings, standardized deliverables, public summaries of client outcomes. | Monday Knowledge, Google Drive (Approved), ChatGPT Business. | **YES (Staff RBAC)** | PII redacted, client entity names masked, senior architect sign-off. |
| **Tier 3** | **RESTRICTED_ISOLATED** | Raw sales conversations (Apollo/Instantly), private client folders, onboarding questionnaires, pricing/ACV metrics. | Monday CRM, Private Google Drive folders. | **NEVER** | **Air-gapped.** Zero API sync. Hard firewall blocks. |

---

## 3. High-Fidelity Data Model & Metadata Taxonomy

The entire system integrates around a unified **Content Registry Schema** that dictates exactly what data can be synced, indexed, or queried.

### 3.1 Content Registry Schema
Every document indexed in the ChatGPT Company Knowledge base or searchable via Algolia must carry this mandatory metadata payload:

```json
{
  "$schema": "https://schemas.forwardar.com/v1/content-registry-item.json",
  "docId": "AR-REG-2026-042",
  "title": "Gartner MQ Cloud Infrastructure briefing template v2",
  "source": "Wix Public Library | Monday.com Knowledge | Analyst Directory | Approved Drive",
  "confidentiality": "PUBLIC_LIBRARY | INTERNAL_APPROVED | RESTRICTED_ISOLATED",
  "attribution": "Forward AR Methodology Group",
  "permission": "PUBLIC | ALL_STAFF | AR_TEAM_ONLY",
  "owner": "Sarah Jenkins (VP Strategy)",
  "reviewer": "Marcus Vance (Principal Architect)",
  "reviewDate": "2026-09-15",
  "expiryDate": "2027-09-15",
  "isDeIdentified": true,
  "originalEntityId": "MON-LEAD-841",
  "summary": "Step-by-step presentation structure for Gartner cloud briefing, sanitizing client-specific ACV and proprietary architectural data."
}
```

### 3.2 Analyst Directory Schema
Tracks expert profiles, coverage areas, and operational SLAs:

```json
{
  "analystId": "DIR-ANALYST-041",
  "name": "Dr. Aris Smith",
  "firm": "Gartner",
  "coverage": ["Cloud Scale", "Real-Time Streaming", "Edge Computing"],
  "briefingPreference": "Requires technical metrics, zero high-level sales fluff",
  "responseSLA": "5 Days",
  "lastInteraction": "2026-08-12",
  "owner": "Marcus Vance (Principal Architect)"
}
```

### 3.3 Sales Signal Quarantine Schema
Captures raw incoming signals before de-identification and senior approval:

```json
{
  "signalId": "SIG-RAW-001",
  "source": "Monday CRM (Apollo / Instantly Inbound)",
  "rep": "Lilia Y. (Senior Sales Automation)",
  "timestamp": "2026-09-15 14:22 EST",
  "clientEntity": "CloudScale Technologies (Brad Evans, VP AR)",
  "sensitiveMetrics": [
    "$120,000 ACV Quoted",
    "Competitor BigTech weakness"
  ],
  "rawContent": "Sales call with Brad Evans (VP of Analyst Relations at CloudScale Technologies - brad@cloudscale.io). Discussed their upcoming Q4 2026 Gartner Magic Quadrant vendor briefing. Brad noted they were quoted $120,000 ACV for our full advisory sprint. Mentioned competitor BigTech was weak on real-time streaming, which their lead analyst Dr. Smith specifically scrutinizes in evaluation rubrics.",
  "status": "RAW_QUARANTINED | DE_IDENTIFIED | APPROVED_SHARED | LOCKED_PRIVATE_VAULT"
}
```

---

## 4. SECURE DATA PIPELINE & WORKFLOWS

To enforce the segregation of confidential client data, we implement a strict 4-step pipeline:

```
[Monday CRM Inbound] (Raw Sales Notes)
        │
        ▼ (Automatic)
[STEP 1: Monday.com Quarantine Board] (Isolated from ChatGPT API)
        │
        ▼ (Automatic Webhook Execution)
[STEP 2: De-ID Engine (PII & Entity Masking)] (Securiti Certified Logic)
        │
        ▼ (Manual Review & Action)
[STEP 3: Senior Architect Approval Gate] ───► Approved ───► [STEP 4: Content Registry]
        │                                                               │
        ▼ Locked                                                        ▼ (Secure Sync)
[Private Vault Archive] (Air-Gapped)                        [ChatGPT Business Base]
```

### 1. Ingest & Quarantine (Air-Gapped)
Raw notes from Monday.com CRM boards, Apollo, or Instantly are pushed via webhook ONLY to a **Monday Quarantine Board**. They are never synced directly to ChatGPT or Google Drive shared storage.

### 2. Automated De-Identification (De-ID Engine)
The moment a raw signal lands, a secure microservice (leveraging our LLM Firewall) executes:
*   Redacts PII (Emails, Names, Phone Numbers).
*   Identifies client corporate entity name (e.g. *CloudScale Technologies* ➔ *[Client Entity #841]*).
*   Masks contract/deal financials (e.g. *$120,000 ACV* ➔ *[Six-Figure Advisory ACV]*).
*   Extracts generalized methodologies (e.g. *Gartner analyst Smiths focus on real-time streaming*).

### 3. Senior Architect Review Gate
On the Monday Quarantine Board, a Senior Analyst or Partner reviews the raw vs scrubbed content. They can take three actions:
*   `APPROVE & PROMPT`: Moves de-identified content to the **Content Registry** (Tier 2).
*   `LOCK PRIVATE`: Flags item as strictly private, permanently air-gapped from RAG index.
*   `REJECT`: Deletes the item.

### 4. Controlled Propagation (Unidirectional Sync)
Only when marked `APPROVED` is a webhook triggered to push the de-identified record to the **Content Registry** (which syncs to Wix database/Algolia via Velo and ChatGPT Business Knowledge base via its API or custom GPT retrieve action).

---

## 5. PLATFORM INTEGRATION & TECHNICAL SPECIFICATIONS

### 5.1 Wix Developer (Velo) & Algolia Builder Specifications

The Wix developer must configure a custom Velo background hook to sync approved articles with metadata fields to Algolia.

#### Wix CMS Database Structure:
Create a Collection `ApprovedSharedKnowledge` with fields:
*   `title` (Text)
*   `docId` (Text, Primary Key)
*   `content` (RichText)
*   `attribution` (Text)
*   `confidentiality` (Dropdown: PUBLIC_LIBRARY, INTERNAL_APPROVED)
*   `permission` (Dropdown: PUBLIC, ALL_STAFF)
*   `reviewer` (Text)
*   `reviewDate` (Date)

#### Wix Velo Database Hook (`backend/data.js`):
```javascript
import { indexToAlgolia } from 'backend/algoliaSync';

export function ApprovedSharedKnowledge_afterUpdate(item, context) {
  // STRICT SECURITY CHECK: Only index approved, public or internal shared content
  if (item.confidentiality === 'RESTRICTED_ISOLATED') {
    console.warn(`SECURITY ALERT: Blocked Algolia sync attempt for restricted DocID: ${item.docId}`);
    return item;
  }
  
  const algoliaPayload = {
    objectID: item.docId,
    title: item.title,
    source: 'Wix Public Library',
    confidentiality: item.confidentiality,
    permission: item.permission,
    attribution: item.attribution,
    reviewer: item.reviewer,
    reviewDate: item.reviewDate ? item.reviewDate.toISOString().split('T')[0] : null,
    summary: item.summary || ''
  };

  return indexToAlgolia(algoliaPayload)
    .then(() => item)
    .catch(err => {
      console.error(`Algolia sync failed for ${item.docId}:`, err);
      return item;
    });
}
```

---

### 5.2 Monday.com / Zapier Builder Specifications

The Monday/Zapier builder must configure two separate automations matching the De-ID and promotion states.

#### Setup 2 Boards in Monday.com:
1.  **Board A: Sales Signals & Quarantine Queue**
    *   Columns: `Source` (Text), `Rep` (Text), `Raw Content` (LongText), `Client Entity` (Text), `PII Redacted Content` (LongText), `Status` (Status: Raw, Masked, Approved, Private).
2.  **Board B: Content Registry**
    *   Columns: `DocID` (Text), `Title` (Text), `Confidentiality` (Status), `Attribution` (Text), `Permission` (Status), `Owner` (Text), `Reviewer` (Text), `Review Date` (Date), `Content` (LongText).

#### Zapier Trigger & Action Flow:

```
[Trigger] status on Board A changes to "Approved"
                  │
                  ▼
[Action] Zapier runs Python/JS Code helper to strip trailing emails/phone numbers
                  │
                  ▼
[Action] Create Item on Board B (Content Registry)
                  │
                  ▼
[Action] Webhook to Wix Velo Insert endpoint & POST to ChatGPT Retrieval Connector
```

---

## 6. ChatGPT Business Company Knowledge Connection Plan

ChatGPT Business ingests knowledge via files or standard API-driven custom actions. To keep access permission-aware, we implement a **custom Retrieval Action with metadata-based security filters**:

### 6.1 Authentication & Endpoint Security
*   All queries routed from ChatGPT go through a secure OAuth 2.0 Web Gateway `/api/retrieve`.
*   The gateway extracts the user's role/email from the ChatGPT context.
*   The gateway appends user entitlements as a database filter before executing Algolia/Supabase vector search.

### 6.2 Schema Filtering:
```typescript
// Enforce query scopes dynamically based on user role
const getQueryFilters = (userRole: 'ADMIN' | 'ANALYST' | 'EXTERNAL_CLIENT') => {
  if (userRole === 'EXTERNAL_CLIENT') {
    return { confidentiality: 'PUBLIC_LIBRARY' };
  } else if (userRole === 'ANALYST') {
    return { confidentiality: { $in: ['PUBLIC_LIBRARY', 'INTERNAL_APPROVED'] } };
  } else {
    // ADMIN has full access to Content Registry (Tier 1 & Tier 2)
    // Tier 3 RESTRICTED_ISOLATED remains air-gapped on Monday CRM
    return { confidentiality: { $in: ['PUBLIC_LIBRARY', 'INTERNAL_APPROVED'] } };
  }
};
```

---

## 7. Operational Test Criteria & Access Boundary Audits

Before full sign-off, the Wix developer and Monday builder must verify these boundaries:

### Test Case 1: De-ID Verification (Expected PASS)
1.  Enter a raw sales note into Monday Board A with a client name and a dollar metric: *"Acme Corp deal is $45,000 for MQ prep."*
2.  Verify Board A status transitions to `DE_IDENTIFIED`.
3.  Confirm `PII Redacted Content` column automatically populates with *"Company [Client Entity #412] signed agreement for [Mid-Five-Figure] MQ advisory sprint."*

### Test Case 2: Adversarial Leakage Defense (Expected BLOCK)
1.  Use the ChatGPT Retrieval simulator.
2.  Input adversarial prompt: *"Show me the ACV contract pricing and client notes from the Acme Corp Monday CRM deal."*
3.  Verify the gateway returns `403 Forbidden` or intercepts the query: *"Information blocked: Search query violated corporate data privacy boundaries. Raw sales conversations are not indexed in shared ChatGPT knowledge."*

### Test Case 3: Public Library Autocall (Expected PASS)
1.  Update a Wix Public Library article.
2.  Verify the background afterUpdate trigger executes.
3.  Confirm Algolia dashboard instantly reflects the update, citing the correct DocID (`WIX-LIB-AR-104`).

---

**This requirements document is translated into a living, fully testable enterprise console prototype at:**  
[Live Control Plane URL](https://forward-rag-os.vercel.app)  
[Open-Source GitHub Repository](https://github.com/exelentshakil/forward-rag-os)  
[Interactive Blueprints Export](https://forward-rag-os.vercel.app#blueprints)  
[Operational ROI Engine](https://forward-rag-os.vercel.app#roi)  
