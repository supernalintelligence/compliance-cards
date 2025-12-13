# Reference Manager System - Design Plan

**Date**: 2025-12-13  
**Purpose**: Systematic management of authoritative sources for compliance cards  
**Status**: Planning

---

## Problem Statement

**Current State**:
- ❌ Compliance cards generated from implicit memory (hallucination risk)
- ❌ Sources scattered (URLs in markdown, PDFs unknown location)
- ❌ No systematic way to fetch, store, verify sources
- ❌ No traceability from card → source § reference

**Desired State**:
- ✅ Authoritative sources fetched, stored, versioned
- ✅ Cards reference exact source sections (§5.3.2, etc.)
- ✅ Source verification workflow built into card generation
- ✅ CLI tools to manage sources (`sc compliance source`)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Reference Manager System                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Source Repository                                   │  │
│  │  standalone/compliance-cards/sources/                │  │
│  │    ├── iec62304/                                    │  │
│  │    │   ├── IEC-62304-2015.pdf (if purchased)       │  │
│  │    │   ├── IEC-62304-2015-ocr.txt (extracted)      │  │
│  │    │   ├── FDA-IEC62304-interpretation.pdf         │  │
│  │    │   └── metadata.yaml                            │  │
│  │    ├── fda-aiml/                                    │  │
│  │    │   ├── FDA-AIML-Guidance-2021.pdf              │  │
│  │    │   ├── FDA-AIML-Guidance-2021-ocr.txt          │  │
│  │    │   ├── FDA-Change-Control-2023.pdf             │  │
│  │    │   └── metadata.yaml                            │  │
│  │    ├── gmlp/                                        │  │
│  │    │   ├── GMLP-npj-2021.pdf                       │  │
│  │    │   ├── GMLP-npj-2021-ocr.txt                   │  │
│  │    │   └── metadata.yaml                            │  │
│  │    └── registry.yaml (central source registry)      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  OCR Processing Module                               │  │
│  │  - Tesseract OCR (open source, high quality)        │  │
│  │  - pdf2image (convert PDF → images)                 │  │
│  │  - pytesseract (Python wrapper)                     │  │
│  │  - Automatic text extraction on source add          │  │
│  │  - Store extracted text alongside PDF               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Reference Manager CLI                               │  │
│  │  sc compliance source <command>                      │  │
│  │    - list: Show all sources                          │  │
│  │    - add: Register new source                        │  │
│  │    - fetch: Download public sources                  │  │
│  │    - ocr: Extract text from PDF (Tesseract)          │  │
│  │    - verify: Check card → source traceability        │  │
│  │    - cite: Generate citation for card                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Card Generation Workflow (Enhanced)                 │  │
│  │    1. Load source (PDF, metadata)                    │  │
│  │    2. OCR if needed → extract text                   │  │
│  │    3. Extract relevant sections                      │  │
│  │    4. Generate card with source citations            │  │
│  │    5. Add source verification to frontmatter         │  │
│  │    6. Link card ← → source in registry               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Source Registry Schema

**File**: `standalone/compliance-cards/sources/registry.yaml`

```yaml
version: 1.0.0
lastUpdated: '2025-12-13'

sources:
  - id: iec62304-2015
    framework: iec62304
    title: "Medical device software — Software life cycle processes"
    standardNumber: "IEC 62304:2006+AMD1:2015"
    publisher: IEC
    publicationDate: '2015-06-01'
    status: current
    
    # Acquisition info
    access: purchased  # or 'public', 'subscription'
    cost: $300
    purchaseDate: '2025-12-13'
    license: single-user
    
    # Files
    files:
      - path: iec62304/IEC-62304-2015.pdf
        format: pdf
        size: 2.5MB
        checksum: sha256:abc123...
      - path: iec62304/metadata.yaml
        format: yaml
    
    # Metadata
    sections:
      - section: "§5.1"
        title: "Software Development Planning"
        pages: [10, 12]
      - section: "§5.2"
        title: "Software Requirements Analysis"
        pages: [12, 15]
      # ... more sections
    
    # Cards using this source
    cards:
      - comp-iec62304-001
      - comp-iec62304-002
      - comp-iec62304-003
    
    # Verification
    lastVerified: '2025-12-13'
    verifiedBy: compliance-team
  
  - id: fda-aiml-2021
    framework: fda-aiml
    title: "Artificial Intelligence and Machine Learning in Software as a Medical Device"
    standardNumber: N/A
    publisher: FDA
    publicationDate: '2021-10-01'
    status: current
    
    # Acquisition info
    access: public
    cost: $0
    
    # Files
    files:
      - path: fda-aiml/FDA-AIML-Guidance-2021.pdf
        format: pdf
        url: https://www.fda.gov/.../AI-ML-Guidance.pdf
        fetchedDate: '2025-12-13'
        checksum: sha256:def456...
    
    # Metadata
    sections:
      - section: "Introduction"
        pages: [1, 5]
      - section: "GMLP Principles"
        pages: [6, 15]
    
    # Cards using this source
    cards:
      - comp-fda-ml-001
      - comp-fda-ml-002
    
    lastVerified: '2025-12-13'
```

---

## Card Frontmatter Enhancement

Add source verification metadata:

```yaml
---
id: comp-iec62304-002
framework: iec62304
title: Software Development Planning
# ... existing fields ...

# NEW: Source verification
sourceVerification:
  primarySource: iec62304-2015
  sections:
    - "§5.1.1"
    - "§5.1.2"
    - "§5.1.3"
  verifiedDate: '2025-12-13'
  verifiedBy: compliance-team
  confidence: high  # high, medium, low
  notes: "Direct quotes from IEC 62304:2015"

# NEW: Citations
citations:
  - sourceId: iec62304-2015
    section: "§5.1.1"
    text: "The manufacturer shall document a software development plan..."
    page: 10
  - sourceId: iec62304-2015
    section: "§5.1.2"
    text: "The manufacturer shall keep the software development plan current..."
    page: 11
---
```

---

## CLI Commands

### `sc compliance source list`

```bash
$ sc compliance source list

Available Sources:
┌────────────────┬──────────┬──────────┬────────┬────────────┐
│ ID             │ Framework│ Publisher│ Access │ Status     │
├────────────────┼──────────┼──────────┼────────┼────────────┤
│ iec62304-2015  │ iec62304 │ IEC      │ ✅ Local│ Current   │
│ fda-aiml-2021  │ fda-aiml │ FDA      │ ✅ Local│ Current   │
│ gmlp-2021      │ gmlp     │ npj      │ ✅ Local│ Current   │
└────────────────┴──────────┴──────────┴────────┴────────────┘

Legend:
  ✅ Local - Source file available locally
  ⚠️ Remote - Source available via URL (not downloaded)
  ❌ Missing - Source registered but not available
```

### `sc compliance source add`

```bash
$ sc compliance source add \
  --id iec62304-2015 \
  --framework iec62304 \
  --title "IEC 62304:2015" \
  --publisher IEC \
  --file ./downloads/IEC-62304-2015.pdf \
  --access purchased \
  --cost 300

✅ Source registered: iec62304-2015
✅ File copied to: standalone/compliance-cards/sources/iec62304/
✅ Checksum: sha256:abc123...
✅ Updated registry.yaml

Next steps:
  - Extract metadata: sc compliance source extract iec62304-2015
  - Verify cards: sc compliance source verify --source iec62304-2015
```

### `sc compliance source fetch`

```bash
$ sc compliance source fetch fda-aiml-2021

Fetching FDA AI/ML Guidance...
  URL: https://www.fda.gov/.../AI-ML-Guidance.pdf
  ⬇️  Downloading... [████████████████] 100% (2.3MB)
  ✅ Saved to: standalone/compliance-cards/sources/fda-aiml/FDA-AIML-Guidance-2021.pdf
  ✅ Checksum verified
  ✅ Updated registry.yaml

Source ready: fda-aiml-2021
```

### `sc compliance source verify`

```bash
$ sc compliance source verify comp-iec62304-002

Verifying COMP-IEC62304-002: Software Development Planning
  Primary source: iec62304-2015 (IEC 62304:2015)
  
  Checking sections:
    ✅ §5.1.1 - Referenced correctly
    ✅ §5.1.2 - Referenced correctly
    ✅ §5.1.3 - Referenced correctly
  
  Citations:
    ✅ 3 citations found
    ✅ All citations have page numbers
  
  Confidence: HIGH
  Last verified: 2025-12-13
  
✅ Card verification complete
```

### `sc compliance source cite`

```bash
$ sc compliance source cite iec62304-2015 --section "§5.1.1"

Citation:
  Standard: IEC 62304:2006+AMD1:2015
  Section: §5.1.1
  Title: Software Development Planning
  Publisher: International Electrotechnical Commission (IEC)
  Page: 10
  
  Text:
  "The manufacturer shall document a software development plan that 
   addresses software development activities, deliverables, software 
   development standards, methods and tools..."
  
Copy to clipboard? [y/N] y
✅ Citation copied to clipboard
```

---

## Implementation Plan

### Phase 1: Basic Infrastructure (2-3 hours)

**Goal**: Set up source storage and registry

**Tasks**:
1. ✅ Create `standalone/compliance-cards/sources/` structure
2. Create `registry.yaml` schema
3. Add `.gitignore` for large PDFs (track metadata only)
4. Create source metadata templates

**Deliverables**:
- `sources/` folder structure
- `registry.yaml` with schema
- `.gitignore` updates

---

### Phase 2: CLI - Basic Commands (3-4 hours)

**Goal**: Implement core source management commands

**Tasks**:
1. Implement `sc compliance source list`
2. Implement `sc compliance source add`
3. Implement `sc compliance source fetch` (for public URLs)
4. Add source validation (checksums, file existence)

**Deliverables**:
- `supernal-code-package/lib/compliance/SourceManager.js`
- `supernal-code-package/cli/commands/compliance/source.js`
- Tests for source management

---

### Phase 2.5: OCR Integration (2-3 hours) ← NEW

**Goal**: Extract text from PDF sources using OCR

**Tasks**:
1. Install Tesseract OCR engine (`brew install tesseract` on macOS)
2. Install Python dependencies (`pytesseract`, `pdf2image`, `Pillow`)
3. Create OCR extraction module
4. Implement `sc compliance source ocr <source-id>`
5. Auto-OCR on source add (configurable)

**Deliverables**:
- `supernal-code-package/lib/compliance/OcrExtractor.js` (or `.py`)
- Extracted text files (`-ocr.txt`)
- OCR quality validation

**OCR Stack**:
```bash
# System dependencies
brew install tesseract          # OCR engine
brew install poppler            # PDF → image conversion

# Python dependencies (optional: use Node.js wrapper)
pip install pytesseract pdf2image Pillow

# Or Node.js alternative
npm install node-tesseract-ocr pdf-poppler
```

**Example usage**:
```bash
# Add PDF source (auto-OCR if configured)
sc compliance source add \
  --file IEC-62304-2015.pdf \
  --auto-ocr

# Manual OCR
sc compliance source ocr iec62304-2015

# Check OCR quality
sc compliance source verify iec62304-2015 --check-ocr
```

---

### Phase 3: Source Verification (2-3 hours)

**Goal**: Enable card → source verification

**Tasks**:
1. Implement `sc compliance source verify <card-id>`
2. Add `sourceVerification` to card frontmatter schema
3. Create verification report generator
4. Add verification to card generation workflow

**Deliverables**:
- `sc compliance source verify` command
- Updated frontmatter schema
- Verification reports

---

### Phase 4: Citation Management (2-3 hours)

**Goal**: Easy citation generation and management

**Tasks**:
1. Implement `sc compliance source cite <source-id> --section <§>`
2. Create citation formatter (APA, IEEE, custom)
3. Add citations to card frontmatter
4. Generate bibliography for cards

**Deliverables**:
- `sc compliance source cite` command
- Citation templates
- Bibliography generator

---

### Phase 5: Fetch Public Sources (1-2 hours)

**Goal**: Download FDA, GMLP, public sources

**Tasks**:
1. Fetch FDA AI/ML Guidance (2021) PDF
2. Fetch FDA Change Control Guidance (2023) PDF
3. Fetch GMLP paper (npj Digital Medicine, 2021)
4. Register all sources in registry

**Deliverables**:
- All public sources downloaded and registered
- Checksums verified
- Metadata extracted

---

### Phase 6: Verify Existing Cards (3-4 hours)

**Goal**: Verify 10 existing cards against sources

**Tasks**:
1. Add source references to existing 10 cards
2. Extract relevant § text from sources
3. Add citations to cards
4. Run verification checks
5. Fix any inaccuracies found

**Deliverables**:
- All 10 cards source-verified
- Verification reports
- Updated card frontmatter

---

## Total Timeline

**Phase 1-4**: ~10-13 hours (build system)  
**Phase 5-6**: ~4-6 hours (use system)  
**Total**: ~14-19 hours

---

## Benefits

### Immediate
- ✅ Reduces hallucination risk
- ✅ Adds credibility to compliance cards
- ✅ Enables audit trail (card → source → §)

### Long-term
- ✅ Reusable for other frameworks (ISO 42001, ISO 23053)
- ✅ Community can contribute sources
- ✅ Version control for standard updates
- ✅ Export to compliance management platforms

---

## Integration with Compliance Manager

### Option A: Standalone CLI

Reference Manager as separate CLI tool:
```bash
sc compliance source <command>  # Source management
sc compliance card <command>    # Card management
sc compliance verify <command>  # Verification
```

### Option B: Integrated Module

Reference Manager as module in compliance manager:
```typescript
import { SourceManager } from './compliance/SourceManager';
import { CardGenerator } from './compliance/CardGenerator';

const sourceManager = new SourceManager();
const cardGenerator = new CardGenerator(sourceManager);

// Generate card with source verification
await cardGenerator.generateFromSource(
  'comp-iec62304-005',
  sourceManager.getSource('iec62304-2015'),
  { sections: ['§5.4'] }
);
```

**Recommendation**: Start with Option A (CLI), refactor to Option B later if needed.

---

## Next Steps

**Immediate (Option B - Finish IEC 62304 batch)**:
1. ✅ Generate 5 remaining IEC 62304 cards (005, 007, 008, 012, 014)
2. Mark cards as "pending source verification"

**Then (Build Reference Manager)**:
3. Implement Phase 1-2 (infrastructure + basic CLI)
4. Implement Phase 5 (fetch public sources)
5. Implement Phase 3-4 (verification + citations)
6. Run Phase 6 (verify all 15 IEC 62304 cards)

**Finally (Continue with sources)**:
7. Generate remaining FDA AI/ML cards WITH sources
8. Generate GMLP cards WITH sources

---

**Status**: ✅ Plan complete, ready to execute  
**Owner**: Compliance Team  
**Last Updated**: 2025-12-13

