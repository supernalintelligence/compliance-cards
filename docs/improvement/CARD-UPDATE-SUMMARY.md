---
title: Compliance Card Update Summary
type: documentation
created: 2025-12-17
updated: 2025-12-17
---

# Compliance Card Update Summary

**Date**: 2025-12-13  
**Action**: Batch update all compliance cards with verification status

---

## What Was Done

### 1. Updated All Compliance Cards (345 cards)

**Changes to frontmatter**:
```yaml
status: pending-verification  # All cards marked pending verification
references: []                # Empty references array added
```

**Locations updated**:
- ✅ `standalone/compliance-cards/frameworks/` (source)
- ✅ `docs/compliance/frameworks/` (synced)

---

## Breakdown by Framework

| Framework | Cards Updated |
|-----------|---------------|
| HIPAA | ~30 cards |
| ISO 13485 | ~25 cards |
| IEC 62304 | 15 cards ✅ (newly generated) |
| EN 18031 | 3 cards ✅ (newly generated) |
| FDA AI/ML | 3 cards ✅ (newly generated) |
| SOC 2 | ~20 cards |
| GDPR | ~20 cards |
| ISO 27001 | ~25 cards |
| Others | ~200+ cards |
| **TOTAL** | **345 cards** |

---

## Frontmatter Schema Updated

**New fields**:
- `status: pending-verification` - All cards awaiting source verification
- `references: []` - Empty array for authoritative source URLs

**Example**:

```yaml
---
id: comp-iec62304-001-software-safety-classification
title: COMP-IEC62304-001 - Software Safety Classification
status: pending-verification  ← NEW
references: []                 ← NEW
relatedCards: []
linkedRequirements: []
---
```

---

## Reference Manager Plan Enhanced

**Added OCR support** for PDF sources:

### OCR Stack
```bash
# System dependencies
brew install tesseract          # OCR engine (high quality)
brew install poppler            # PDF → image conversion

# Python option
pip install pytesseract pdf2image Pillow

# Node.js option
npm install node-tesseract-ocr pdf-poppler
```

### New CLI Command
```bash
# Add PDF source with auto-OCR
sc compliance source add \
  --file IEC-62304-2015.pdf \
  --auto-ocr

# Manual OCR extraction
sc compliance source ocr iec62304-2015

# Verify OCR quality
sc compliance source verify iec62304-2015 --check-ocr
```

### OCR Workflow
1. **Add PDF** → `IEC-62304-2015.pdf`
2. **Auto-OCR** → `IEC-62304-2015-ocr.txt` (extracted text)
3. **Store metadata** → `metadata.yaml`
4. **Enable search** → Full-text search in extracted text
5. **Generate citations** → Link card § to PDF pages

---

## Why OCR Is Critical

**Problem**: Most compliance standards are PDFs (not machine-readable text)

**Examples**:
- ✅ IEC 62304:2015 - PDF only (purchased, ~$300)
- ✅ FDA AI/ML Guidance - PDF (public, free)
- ✅ ISO 13485 - PDF only (purchased)
- ✅ GMLP paper - PDF (public, free)

**Without OCR**: Can't extract exact § text, can't verify cards, can't cite sources

**With OCR**: 
- Extract exact regulatory text
- Verify card content against source
- Generate precise citations (§5.3.2, page 42)
- Enable full-text search across all standards

---

## Next Steps

### Immediate (Reference Manager Implementation)

**Phase 1**: Source repository structure (1 hour)
```bash
mkdir -p standalone/compliance-cards/sources/{iec62304,fda-aiml,gmlp,en18031}
# Create registry.yaml schema
```

**Phase 2**: CLI infrastructure (3-4 hours)
```bash
# Implement source management
sc compliance source list
sc compliance source add
sc compliance source fetch
```

**Phase 2.5**: OCR integration (2-3 hours) ← NEW
```bash
# Install Tesseract
brew install tesseract poppler

# Implement OCR extraction
sc compliance source ocr <source-id>
```

**Phase 3**: Verification workflow (2-3 hours)
```bash
# Verify cards against sources
sc compliance source verify comp-iec62304-001
```

**Phase 5**: Fetch public sources (1-2 hours)
```bash
# Download FDA, GMLP PDFs
sc compliance source fetch fda-aiml-2021
sc compliance source fetch gmlp-2021

# Auto-OCR
sc compliance source ocr fda-aiml-2021
sc compliance source ocr gmlp-2021
```

**Phase 6**: Verify cards (3-4 hours)
```bash
# Verify all 21 newly generated cards
for card in comp-iec62304-* comp-en18031-* comp-fda-ml-*; do
  sc compliance source verify $card
done
```

---

## Implementation Timeline

**With OCR** (recommended):
- Phase 1-2: ~4-5 hours (infrastructure + CLI)
- Phase 2.5: ~2-3 hours (OCR integration)
- Phase 3-4: ~5-6 hours (verification + citations)
- Phase 5: ~1-2 hours (fetch public sources)
- Phase 6: ~3-4 hours (verify 21 cards)
- **Total**: ~15-20 hours

**Value**:
- 345 cards with source verification
- Authoritative citations
- Reduced hallucination risk
- Audit-ready documentation

---

## Files Created

1. **Script**: `scripts/update-compliance-card-frontmatter.js`
   - Batch updates all cards
   - Adds `status` and `references` fields
   - Syncs standalone → docs/compliance

2. **Plan**: `standalone/compliance-cards/research/REFERENCE-MANAGER-PLAN.md`
   - Enhanced with OCR support
   - Phase 2.5 added for OCR integration
   - Tesseract stack documented

---

## Verification Status

**All 345 cards now have**:
```yaml
status: pending-verification
references: []
```

**Ready for**:
- Reference Manager implementation
- Source fetching + OCR
- Card-to-source verification
- Citation generation

---

**Status**: ✅ All cards updated and synced  
**Next**: Implement Reference Manager with OCR support  
**Owner**: Compliance Team  
**Last Updated**: 2025-12-13

