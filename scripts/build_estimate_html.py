#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
Forward AR Core: Governed Knowledge Base
Client: Forward AR Experts (Kennesaw, GA, USA, EST)
Two-Track Engagement Model:
- Track 1: 48-Hour Architecture Sprint @ $55.00/hr = $2,640.00
- Track 2: Ongoing Implementation Retainer @ $55.00/hr (Months 2-3)
Built to exact BarakahSoft Gold-Standard Architecture:
- 6 Direct Flex Children (Zero Middle Void)
- High-Density 6-Row Scope Table with Percentage Allocations
- Verified Upwork Partner Credentials (Never "Top Rated")
- Dual Signature Block with Formal Authorization
- Inlined Base64 Assets and Headless Chrome Single-Page PDF Audit
"""

import os
import re
import base64
import subprocess
import sys

def build_estimate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    with open(headshot_file, "rb") as f:
        headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    with open(logo_file, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope &amp; Formal Estimate - Forward AR Core</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 9.3px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      gap: 5px;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #d9730d;
      padding-bottom: 5px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #d9730d;
      margin-bottom: 2px;
      white-space: nowrap;
    }}
    h1 {{
      font-size: 13.5px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .subtitle {{
      font-size: 8.5px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
      white-space: nowrap;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #fdfcfb;
      border: 1px solid #e9e9e8;
      border-radius: 6px;
      padding: 5px 10px;
      font-size: 8.2px;
      text-align: right;
      line-height: 1.35;
      white-space: nowrap;
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #fef3c7;
      color: #b45309;
      border: 1px solid #fde68a;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope & Milestones Table */
    .scope-block {{
      margin-top: 0;
    }}
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }}
    .section-title {{
      font-size: 9.4px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-left: 3px solid #d9730d;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.2px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.1px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 3.5px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 3.5px 6px;
      font-size: 8.4px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.4px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 8.6px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.8px;
      margin-top: 1px;
      line-height: 1.2;
    }}
    .phase-0-row {{
      background: #fffbeb;
    }}
    .phase-0-badge {{
      color: #b45309;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 4px 6px;
      font-size: 8.6px;
    }}

    /* 3. 2-Column Technical & Financial Breakdown */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }}
    .card-box {{
      border: 1px solid #e9e9e8;
      border-radius: 6px;
      background: #fbfbfa;
      padding: 4.5px 8px;
    }}
    .card-box-title {{
      font-size: 8.3px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0 0 2.5px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 1.8px 0;
      font-size: 7.7px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.7px;
      color: #334155;
      margin-bottom: 1.8px;
      padding-left: 10px;
      position: relative;
      line-height: 1.2;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #d9730d;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #e9e9e8;
      border-radius: 6px;
      background: #ffffff;
      padding: 4.5px 8px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 7px;
    }}
    .term-col {{
      font-size: 7.7px;
      line-height: 1.2;
    }}
    .term-title {{
      font-weight: 800;
      color: #d9730d;
      text-transform: uppercase;
      font-size: 7.6px;
      margin-bottom: 1px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #fbfbfa;
      padding: 5px 10px;
    }}
    .auth-title {{
      font-size: 8.3px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 7.8px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.7px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 2px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 20px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 13px;
      color: #0f172a;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 85px;
      border-bottom: 1.2px solid #475569;
      min-height: 20px;
      font-family: ui-monospace, monospace;
      font-size: 7.8px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
      white-space: nowrap;
    }}
    .auth-label {{
      font-size: 6.9px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #e9e9e8;
      border-radius: 6px;
      background: #fbfbfa;
      padding: 4.5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #d9730d;
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.6px;
      color: #0f172a;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 7.8px;
      color: #334155;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.4px;
      color: #475569;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 16px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.5px;
      color: #d9730d;
      background: #fffbeb;
      border: 1px solid #fde68a;
      padding: 1px 5px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">

  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Systems Architecture • Ref #BS-2026-FARD-01</div>
      <h1>Forward AR Core • Governed Knowledge Base</h1>
      <p class="subtitle">Wix Velo Sync • Algolia Metadata Catalog • Air-Gapped Monday Ingestion • ChatGPT Business Gateways</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Forward AR Experts (Kennesaw, GA, USA)</div>
      <div><strong>Engagement:</strong> Two-Track Delivery (Discovery Sprint &amp; Retainer)</div>
      <div><strong>Investment:</strong> <strong>Track 1: 48 Capped Hours @ $55.00/hr = $2,640.00</strong></div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified &amp; Operational</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Production Scope &amp; Operating Milestone Delivery Schedule</h2>
      <div class="section-meta">Live Prototype: https://forward-rag-os.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 12%;">Milestone</th>
          <th style="width: 58%;">Architecture &amp; Production Engineering Deliverables</th>
          <th style="width: 10%; text-align: center;">Timeline</th>
          <th style="width: 8%; text-align: center;">Share</th>
          <th style="width: 12%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
          <td>
            <div class="phase-name">Deployed Forward AR Core Control Plane &amp; PRD (Delivered)</div>
            <div class="phase-desc">Living prototype: Animated n8n/Make event canvas, de-identification queue ( Apollo / CRM notes), secure Content Registry, ChatGPT retriever simulator, and developer specifications.</div>
          </td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">Live Now</td>
          <td style="text-align: center; color: #b45309; font-weight: 700;">Included</td>
          <td style="text-align: right; font-weight: 800; color: #b45309;">$0.00 (Live)</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 1</td>
          <td>
            <div class="phase-name">Knowledge Architecture &amp; Unified Source Mapping</div>
            <div class="phase-desc">Architect the data flows connecting Wix Library CMS, Algolia Catalog, Monday boards, and private document storage (Google Drive). Establish strict source-of-truth routing directories and API mappings.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">12 Hours</td>
          <td style="text-align: center; font-weight: 700;">25%</td>
          <td style="text-align: right; font-weight: 700;">$660.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 2</td>
          <td>
            <div class="phase-name">Unified Content Registry Schema &amp; Metadata Taxonomy</div>
            <div class="phase-desc">Define database schemas for the Analyst Directory and Content Registry. Wire required metadata tags: source system, attribution, permission, confidentiality (PUBLIC, INTERNAL, RESTRICTED), owner, and review date.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">8 Hours</td>
          <td style="text-align: center; font-weight: 700;">17%</td>
          <td style="text-align: right; font-weight: 700;">$440.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 3</td>
          <td>
            <div class="phase-name">Monday CRM Quarantine Board &amp; Automated De-ID Pipelines</div>
            <div class="phase-desc">Set up air-gapped Monday Board A. Configure Zapier triggers executing entity detection and financial masking (PII Scrubbing). Create one-way promotional approval webhooks pushing only approved cards to Registry Board B.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">12 Hours</td>
          <td style="text-align: center; font-weight: 700;">25%</td>
          <td style="text-align: right; font-weight: 700;">$660.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 4</td>
          <td>
            <div class="phase-name">ChatGPT Business Retrieval Custom Action API Gateway</div>
            <div class="phase-desc">Build secure OAuth gateway `/api/retrieve` parsing user credentials and dynamically applying Algolia metadata filters. Prevent raw sales materials leakage, cite source DocID references, and track API/token usage ROI.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">10 Hours</td>
          <td style="text-align: center; font-weight: 700;">21%</td>
          <td style="text-align: right; font-weight: 700;">$550.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 5</td>
          <td>
            <div class="phase-name">Developer Implementation Specifications &amp; Boundary Testing</div>
            <div class="phase-desc">Deliver turnkey technical instructions, Velo afterUpdate hooks, and Zapier payload formats for your Wix &amp; Monday developers. Run 3-part UAT security tests validating access boundaries under adversarial queries.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">6 Hours</td>
          <td style="text-align: center; font-weight: 700;">12%</td>
          <td style="text-align: right; font-weight: 700;">$330.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Track 1 Total: Architecture Sprint &amp; Interactive Prototype (48 Capped Hours)</td>
          <td style="text-align: center; font-weight: 800; white-space: nowrap;">48 Hours</td>
          <td style="text-align: center; font-weight: 800;">100%</td>
          <td style="text-align: right; font-weight: 800; font-family: ui-monospace, monospace; font-size: 9.8px;">$2,640.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Technical & Financial Breakdown -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">Operating Engagement: Two-Track Model</div>
      <div class="milestone-item">
        <span class="milestone-name">Track 1: Initial Discovery &amp; Architecture (48 Capped Hours)</span>
        <span class="milestone-val">$2,640.00</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Track 2: Ongoing Implementation Retainer (Months 2-3)</span>
        <span class="milestone-val">15 hrs/wk @ $55.00/hr</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Estimated Weekly Retainer Support (Flex Schedule)</span>
        <span class="milestone-val">$825.00 / week</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Turnkey Acceptance Auditing &amp; Oversight</span>
        <span class="milestone-val">Included in retainer</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Post-Launch Warranty Hypercare Support SLA</span>
        <span class="milestone-val">30 Days (Included)</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">Deterministic Architecture Guardrails</div>
      <div class="guardrail-item"><strong>Air-Gapped Ingestion:</strong> Monday CRM sales logs have no direct API access; data is physically isolated.</div>
      <div class="guardrail-item"><strong>Automated Redaction:</strong> Secure microservice masks corporate ACVs and client names prior to review.</div>
      <div class="guardrail-item"><strong>Manual Promotion Gate:</strong> Human-in-the-loop review on Monday Quarantine ensures 100% controlled sync.</div>
      <div class="guardrail-item"><strong>Metadata-Based RBAC:</strong> ChatGPT custom retrieval filters documents dynamically based on user role.</div>
      <div class="guardrail-item"><strong>Source Citation Integrity:</strong> All RAG syntheses cite verifiable and searchable DocIDs (e.g. WIX-LIB-AR-104).</div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Two-Track Engagement</div>
        <div class="term-body">Track 1 provides complete architecture and prototype specs at low friction. Track 2 supports your developers through the final build.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Capped Hour Guarantee</div>
        <div class="term-body">Track 1 is strictly capped at 48 hours. Any additional architectural requirements are absorbed under my risk, not yours.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% IP &amp; Code Ownership</div>
        <div class="term-body">Upon Upwork contract approval, all architectural assets, custom endpoint codes, schemas, and configurations belong 100% to you.</div>
      </div>
      <div class="term-col">
        <div class="term-title">30-Day Hypercare SLA</div>
        <div class="term-body">Free post-deployment support covering any architectural revisions, Velo hook debugging, and access auditing for 30 full days.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization &amp; Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.3px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Architect: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal AI Systems Architect &amp; Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">16 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Architect Signature</span>
          <span class="auth-label" style="width: 85px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: Forward AR Experts (Kennesaw, GA)</div>
        <div>Signatory: <strong>Forward AR Representative</strong> • Authorized Client Sign-off</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 7.8px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 85px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Principal Systems Architect &amp; Founder (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Systems Engineering &amp; AI Governance</div>
        <div class="founder-sub">Securiti Certified AI Security &amp; Governance Architect (Cert ID: 14B411BCE-14B411A3D-1451CFE76) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://forward-rag-os.vercel.app" target="_blank" class="demo-badge">forward-rag-os.vercel.app</a>
    </div>
  </div>

</div>
</body>
</html>
"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print("Saved estimate.html to:", html_path)

    # Compile with Headless Chrome using absolute file URI
    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file://{os.path.abspath(html_path)}"
    ]

    res = subprocess.run(chrome_cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
        print("File size:", os.path.getsize(pdf_path), "bytes")
    else:
        print("Chrome print-to-pdf error:", res.stderr, file=sys.stderr)
        sys.exit(1)

    # Verify page count
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
    print(f"Verified PDF page count: {len(pages)} page(s)")
    if len(pages) != 1:
        print(f"CRITICAL ERROR: Expected exactly 1 page, got {len(pages)}!", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    build_estimate()
