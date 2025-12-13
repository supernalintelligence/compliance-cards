# @supernal/compliance-cards

[![npm version](https://badge.fury.io/js/@supernal%2Fcompliance-cards.svg)](https://www.npmjs.com/package/@supernal/compliance-cards)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Open-source compliance requirement cards for HIPAA, ISO 27001, SOC 2, GDPR, and more.**

300+ modular, testable compliance cards with cross-framework mapping to eliminate duplicate compliance effort.

## Why Compliance Cards?

Traditional compliance approaches treat each framework in isolation—duplicate documentation, duplicate evidence collection, duplicate audits. But **60-80% of compliance requirements overlap**.

Compliance Cards solve this by:

- **Breaking down** regulations into atomic, reusable requirements
- **Mapping overlap** between frameworks (implement once, satisfy many)
- **Using Gherkin** for testable acceptance criteria
- **Specifying evidence** requirements upfront
- **Enabling community updates** as regulations evolve

## Installation

```bash
npm install @supernal/compliance-cards
```

## Quick Start

### CLI Usage

```bash
# List available frameworks
npx compliance-cards list

# List cards in a framework
npx compliance-cards list hipaa

# Get a specific card
npx compliance-cards get comp-hipaa-043-access-control

# Search across all cards
npx compliance-cards search "encryption"

# Analyze framework overlap
npx compliance-cards overlap hipaa iso27001

# Validate cards against schema
npx compliance-cards validate
```

### Programmatic Usage

```javascript
const { getFramework, getCard, getOverlap } = require('@supernal/compliance-cards');

// Get all HIPAA cards
const hipaaCards = getFramework('hipaa');
console.log(`Found ${hipaaCards.length} HIPAA cards`);

// Get specific card
const accessControl = getCard('comp-hipaa-043-access-control');
console.log(accessControl.title);
console.log(accessControl.acceptanceCriteria); // Gherkin scenarios

// Analyze overlap between frameworks
const overlap = getOverlap('hipaa', 'iso27001');
console.log(`Full equivalence: ${overlap.full.length} controls`);
console.log(`Partial overlap: ${overlap.partial.length} controls`);
```

## Available Frameworks

| Framework | Cards | Description |
|-----------|-------|-------------|
| `hipaa` | 63 | HIPAA Security Rule |
| `iso27001` | 93 | ISO 27001:2022 Information Security |
| `soc2` | 19 | SOC 2 Trust Service Criteria |
| `gdpr` | 21 | GDPR Data Protection |
| `iso27701` | 62 | ISO 27701 Privacy Management |
| `fda21cfr11` | 14 | FDA 21 CFR Part 11 Electronic Records |
| `iso13485` | 16 | ISO 13485 Medical Devices |
| `en18031` | 40 | EN 18031 AI Systems |

**Total: 328 compliance cards**

## Card Structure

Each card contains:

```markdown
# COMP-HIPAA-043: Access Control

## Overview
- Purpose, framework reference, priority

## Acceptance Criteria (Gherkin)
Feature: Access Control
  Scenario: User authentication required
    Given a user attempts to access ePHI
    When they have not authenticated
    Then access shall be denied

## Technical Context
- Implementation interfaces
- Architecture considerations

## Evidence Requirements
- Required documentation for audits

## Related Controls
- Cross-framework mappings (ISO 27001 A.9.x, SOC 2 CC6.1, etc.)
```

## Cross-Framework Mapping

The real power is overlap detection:

```bash
$ npx compliance-cards overlap hipaa soc2

┌─────────────────────────────────────────────────────────────┐
│ HIPAA ↔ SOC 2 Overlap Analysis                              │
├─────────────────────────────────────────────────────────────┤
│ Full Equivalence:     34 controls (54%)                     │
│ Partial Overlap:      18 controls (29%)                     │
│ HIPAA-only:           11 controls (17%)                     │
├─────────────────────────────────────────────────────────────┤
│ Implement HIPAA properly and you've covered 83% of SOC 2    │
└─────────────────────────────────────────────────────────────┘
```

## Fork for Customization

Organizations can fork and customize while staying synced with upstream:

```bash
# Create organization fork
npx compliance-cards fork --org=acme-health --output=./.compliance/

# Sync upstream updates
npx compliance-cards sync

# Sync with merge strategy (preserves your overrides)
npx compliance-cards sync --strategy=merge
```

## Quality Status

### Template Quality Audit (2025-12-13)

We've audited all 328 compliance cards for quality:

- ✅ **HIPAA, ISO 27001, SOC 2, GDPR, ISO 27701, ISO 13485, FDA 21 CFR 11**: High-quality templates with specific guidance
- 🔧 **EN 18031 (AI Systems)**: 40 templates identified as boilerplate, improvement in progress

See [AUDIT-SUMMARY.md](./AUDIT-SUMMARY.md) for full details and [IMPROVEMENT-GUIDE.md](./IMPROVEMENT-GUIDE.md) to contribute.

### EN 18031 Improvement Campaign

We're actively improving all 40 EN 18031 AI compliance cards. Track progress:

- **[EN18031-IMPROVEMENT-PLAN.md](./EN18031-IMPROVEMENT-PLAN.md)** - Strategy and approach
- **[EN18031-IMPROVEMENT-PROGRESS.md](./EN18031-IMPROVEMENT-PROGRESS.md)** - Live progress tracker
- **[IMPROVEMENT-GUIDE.md](./IMPROVEMENT-GUIDE.md)** - How to contribute

**Target**: Complete by Week 8 (5 cards/week)  
**Status**: 📝 Planning Complete, Implementation Starting

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Contribution types:**
- 🐛 Bug fixes (incorrect control references)
- 📝 Evidence requirement improvements
- 🔗 Cross-framework mapping additions
- 📚 New framework cards
- 🧪 Gherkin scenario improvements
- 🤖 **EN 18031 improvements** - Help us improve AI compliance cards ([Guide](./IMPROVEMENT-GUIDE.md))

## Automated Updates (Pro)

**Free tier** gives you all 328 cards and CLI tools.

**[Supernal Compliance Manager](https://supernal.ai/compliance)** (paid) adds:
- 🔔 Regulatory change monitoring and alerts
- 🤖 AI-assisted card generation
- 📊 Compliance dashboard
- 🔄 Automated sync notifications
- 🏢 Enterprise fork management

## API Reference

### `listFrameworks(): Framework[]`

Returns all available frameworks.

### `getFramework(id: string): Card[]`

Returns all cards for a framework.

### `getCard(cardId: string): Card`

Returns a specific card by ID.

### `searchCards(query: string, options?): Card[]`

Search cards by content.

### `getOverlap(fw1: string, fw2: string): OverlapAnalysis`

Analyze overlap between two frameworks.

### `validateCard(card: unknown): ValidationResult`

Validate a card against the schema.

## Documentation

- [White Paper: Compliance Cards Architecture](https://supernal.ai/docs/compliance-cards-white-paper)
- [Card Format Specification](./docs/card-format.md)
- [Framework Guides](../../docs/requirements/compliance/frameworks.md)
- [Contributing Guide](./CONTRIBUTING.md)

## License

MIT © [Supernal AI](https://supernal.ai)

---

**Built by [Supernal AI](https://supernal.ai)** — AI-powered development workflows for regulated industries.

