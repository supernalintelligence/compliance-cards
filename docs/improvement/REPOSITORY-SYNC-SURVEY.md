---
title: Compliance Cards Repository Sync Survey
type: documentation
created: 2025-12-17
updated: 2025-12-17
---

# Compliance Cards Repository Sync Survey

**Date**: 2025-12-13  
**Status**: 🚨 SYNC NEEDED

## Current State: Cards in 3 Places

### 1. **Standalone Repo (CANONICAL SOURCE)** ✅
- **Location**: `standalone/compliance-cards/`
- **Status**: Git submodule of main repo
- **Remote**: `git@github.com:supernalintelligence/compliance-cards.git`
- **EN18031 Cards**: 44 total
  - ✅ **8 High-Quality** (~241KB): 001, 002, 003, 004, 009, 010, 011, 017
  - ⚠️ **33 Boilerplate** (~4.7-4.8KB each): 005-008, 012-016, 018-040

### 2. **Supernal-Code-Package** ⚠️
- **Location**: `supernal-code-package/documentation/docs/compliance/en18031/templates/`
- **EN18031 Cards**: 40 total
- **Status**: OUT OF SYNC - Missing cards 001-004, has old versions
- **Issue**: Should consume from published `@supernal/compliance-cards` package

### 3. **Main Repo docs/** ⚠️
- **Location**: `docs/compliance/frameworks/en18031/templates/`
- **EN18031 Cards**: 43 total
- **Status**: OUT OF SYNC - Duplicate of standalone
- **Issue**: Should reference submodule, not duplicate files

---

## Architecture Goal

```
┌─────────────────────────────────────────────────┐
│ standalone/compliance-cards/                    │
│ (git submodule, publishable npm package)        │
│                                                  │
│ frameworks/                                      │
│   ├── en18031/templates/*.md (44 cards)        │
│   ├── hipaa/templates/*.md                      │
│   └── ...                                        │
│                                                  │
│ Published as: @supernal/compliance-cards        │
└─────────────────────────────────────────────────┘
           ▲                          ▲
           │ git submodule            │ npm install
           │                          │
    ┌──────┴─────┐          ┌────────┴──────────┐
    │            │          │                    │
    │  Main Repo │          │ supernal-code-     │
    │            │          │ package/           │
    │ (references│          │                    │
    │  submodule)│          │ (installs package) │
    └────────────┘          └────────────────────┘
```

---

## EN18031 Cards Status

### ✅ Complete (8 cards, ~241KB)
1. ✅ `comp-en18031-001-ai-governance-framework.md` (23KB)
2. ✅ `comp-en18031-002-ai-risk-management.md` (24KB)
3. ✅ `comp-en18031-003-ai-ethics-board.md` (33KB)
4. ✅ `comp-en18031-004-ai-incident-response.md` (38KB)
9. ✅ `comp-en18031-009-training-data-quality.md` (29KB)
10. ✅ `comp-en18031-010-data-bias-detection.md` (28KB)
11. ✅ `comp-en18031-011-data-labeling-quality.md` (30KB)
17. ✅ `comp-en18031-017-model-validation.md` (36KB)

### 🔄 Remaining Boilerplate (33 cards, ~4.7-4.8KB each)

#### Data Governance (4 cards)
- [ ] `comp-en18031-005-ai-documentation-standards.md`
- [ ] `comp-en18031-006-ai-transparency-requirements.md`
- [ ] `comp-en18031-007-ai-audit-trail.md`
- [ ] `comp-en18031-008-ai-stakeholder-engagement.md`

#### Data Management (6 cards)
- [ ] `comp-en18031-011-data-provenance.md`
- [ ] `comp-en18031-012-data-privacy-for-ai.md`
- [ ] `comp-en18031-013-synthetic-data-generation.md`
- [ ] `comp-en18031-014-data-versioning.md`
- [ ] `comp-en18031-015-data-poisoning-prevention.md`
- [ ] `comp-en18031-016-model-development-lifecycle.md`

#### Model Security (8 cards)
- [ ] `comp-en18031-018-model-versioning.md`
- [ ] `comp-en18031-019-model-adversarial-testing.md`
- [ ] `comp-en18031-020-model-explainability.md`
- [ ] `comp-en18031-021-model-fairness-testing.md`
- [ ] `comp-en18031-022-model-security-scanning.md`
- [ ] `comp-en18031-023-model-drift-detection.md`
- [ ] `comp-en18031-024-model-backdoor-prevention.md`
- [ ] `comp-en18031-025-model-supply-chain-security.md`

#### Operations & Monitoring (7 cards)
- [ ] `comp-en18031-026-ai-system-monitoring.md`
- [ ] `comp-en18031-027-inference-security.md`
- [ ] `comp-en18031-028-model-serving-infrastructure.md`
- [ ] `comp-en18031-029-ai-system-performance-monitoring.md`
- [ ] `comp-en18031-030-prompt-injection-prevention.md`
- [ ] `comp-en18031-031-output-validation.md`
- [ ] `comp-en18031-032-rate-limiting-abuse-prevention.md`

#### Safety & Testing (8 cards)
- [ ] `comp-en18031-033-ai-system-rollback.md`
- [ ] `comp-en18031-034-safety-requirements.md`
- [ ] `comp-en18031-035-fail-safe-mechanisms.md`
- [ ] `comp-en18031-036-human-oversight.md`
- [ ] `comp-en18031-037-continuous-learning-safety.md`
- [ ] `comp-en18031-038-ai-system-testing.md`
- [ ] `comp-en18031-039-robustness-testing.md`
- [ ] `comp-en18031-040-emergency-stop-procedures.md`

---

## Sync Actions Required

### 1. **Complete EN18031 Cards in Standalone** 
- [ ] Implement remaining 33 boilerplate cards following pattern from cards 001-004, 009-011, 017
- [ ] Each card needs ~25-35KB (vs current ~4.7KB)
- [ ] Add Gherkin scenarios, code examples, cross-framework mappings

### 2. **Publish Updated Package**
```bash
cd standalone/compliance-cards
npm version patch  # or minor/major
npm publish
git tag v1.x.x
git push --tags
```

### 3. **Update supernal-code-package**
```bash
cd supernal-code-package
npm install @supernal/compliance-cards@latest
# Update imports to use package instead of local files
# Remove old files from documentation/docs/compliance/
```

### 4. **Clean Main Repo Duplication**
```bash
cd /path/to/main-repo
# Remove duplicate docs/compliance/frameworks/
# Keep only submodule reference at standalone/compliance-cards/
# Update documentation to reference submodule
```

---

## Package Installation Pattern

### In supernal-code-package

**Current (wrong)**:
```javascript
// Reading from local duplicated files
const cards = readDir('./documentation/docs/compliance/en18031/templates/');
```

**Target (correct)**:
```javascript
// Import from published package
const { getFramework, getCard } = require('@supernal/compliance-cards');
const en18031Cards = getFramework('en18031');
```

---

## Quality Metrics

| Metric | Current | Target |
|--------|---------|--------|
| EN18031 cards complete | 8/44 (18%) | 44/44 (100%) |
| Avg card quality (KB) | ~6.7KB | ~25-30KB |
| Cards in sync locations | 3 places | 1 canonical |
| Package consumers | 0 | 2+ (main repo, supernal-code-package) |

---

## Next Steps (Priority Order)

1. ✅ **DONE**: Identify sync issue and document current state
2. 🔄 **IN PROGRESS**: Complete remaining 33 EN18031 cards (8 of 44 done)
3. ⏳ **NEXT**: Test and validate all 44 cards
4. ⏳ **NEXT**: Publish updated `@supernal/compliance-cards@1.1.0`
5. ⏳ **NEXT**: Update supernal-code-package to consume package
6. ⏳ **NEXT**: Remove duplication from main repo docs/
7. ⏳ **NEXT**: Update all documentation references

---

## Testing Checklist

Before publishing:
- [ ] All 44 EN18031 cards pass schema validation
- [ ] Audit script shows 0 boilerplate cards
- [ ] CLI tools work correctly
- [ ] Cross-framework mappings are accurate
- [ ] Package.json metadata is correct
- [ ] README reflects accurate card counts
- [ ] Tests pass in standalone repo
- [ ] Tests pass in supernal-code-package after upgrade

---

**Last Updated**: 2025-12-13  
**Next Review**: After completing cards 012, 016 (next batch)

