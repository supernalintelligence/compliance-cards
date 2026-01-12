# Compliance Cards Documentation

## Overview

This directory contains comprehensive compliance documentation and templates for multiple frameworks.

## Structure

### `frameworks/` - Compliance Card Templates
Individual compliance cards organized by framework:
- HIPAA (63 cards)
- ISO 27001 (93 cards)
- ISO 27701 (62 cards)
- SOC 2 (19 cards)
- GDPR (21 cards)
- ISO 13485 (15 cards)
- FDA 21 CFR 11 (14 cards)
- EN 18031 (40 cards)
- IEC 62304 (11 cards)
- GMLP (10 cards)
- FDA AI/ML (7 cards)

### `process-and-stakeholders/` - Implementation Guidance
Comprehensive guide to compliance process flows and stakeholder management:
- **Phases**: 9-phase compliance workflow
- **Stakeholders**: Internal and external roles
- **Frameworks**: Framework-specific guidance
- **Timelines**: Cost estimates and engagement schedules

[→ View Process & Stakeholders Guide](process-and-stakeholders/index.md)

### `guides/` - How-To Documentation
- [Improvement Guide](guides/IMPROVEMENT-GUIDE.md) - How to improve cards

### `improvement/` - Quality Campaign
Documentation of the compliance card improvement campaign:
- Audit results and progress tracking
- EN 18031 improvement plan (8-week strategy)
- Session summaries

## Improvement Campaign

### Status
- **Total Cards**: 328 across 11 frameworks
- **Boilerplate Identified**: 40 EN 18031 cards
- **Completed**: 1/40 (EN18031-001)
- **Remaining**: 39/40

### Quick Links
- [Improvement Guide](guides/IMPROVEMENT-GUIDE.md) - How to improve cards
- [Audit Summary](improvement/AUDIT-SUMMARY.md) - Full audit results
- [Improvement Plan](improvement/EN18031-IMPROVEMENT-PLAN.md) - 8-week strategy
- [Progress Tracker](improvement/EN18031-IMPROVEMENT-PROGRESS.md) - Live progress

## Tools

```bash
# Audit templates for boilerplate
node scripts/audit-templates.js

# Get improvement guidance for specific card
node scripts/improve-template.js comp-en18031-XXX-card-name

# Generate template starter
node scripts/improve-template.js comp-en18031-XXX-card-name --generate
```

## Framework Quality Status

| Framework | Cards | Status |
|-----------|-------|--------|
| HIPAA | 63 | ✅ High Quality |
| ISO 27001 | 93 | ✅ High Quality |
| ISO 27701 | 62 | ✅ High Quality |
| SOC 2 | 19 | ✅ High Quality |
| GDPR | 21 | ✅ High Quality |
| ISO 13485 | 15 | ✅ High Quality |
| FDA 21 CFR 11 | 14 | ✅ High Quality |
| IEC 62304 | 11 | ✅ High Quality |
| GMLP | 10 | ✅ High Quality |
| FDA AI/ML | 7 | ✅ High Quality |
| EN 18031 | 40 | 🔧 1/40 Improved |

## For Implementation Teams

Start with the **Process & Stakeholders Guide** to understand:
- How to run a compliance project from start to finish
- Who does what (internal and external stakeholders)
- Timeline expectations (6-36 months depending on framework)
- Cost estimates ($75K-$410K+ first year)
- Framework-specific requirements

Then use the **Framework Templates** to implement specific controls and documentation.
