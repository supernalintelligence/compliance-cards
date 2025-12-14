# Compliance Source Registry

This directory contains regulatory source PDFs used for compliance card verification.

## ⚠️ Important: PDFs are NOT git-committed

- **Why**: Licensed content, copyrighted standards ($300-500 each)
- **What's committed**: Only metadata files (registry.yaml, metadata.json)
- **What's ignored**: All *.pdf, *.txt, *.ocr files

## Available Sources

### ISO 14971:2019 - Medical Devices Risk Management
- **Path**: `iso14971/ISO-14971-2019.pdf`
- **Size**: 1.5MB
- **Status**: Ready for OCR

### ISO 23053 
- **Path**: `iso23053/ISO-23053.pdf`
- **Size**: 4.4MB
- **Status**: Ready for OCR

## Usage

### Add new source
```bash
sc compliance add-source --framework=iso14971 --file=/path/to/ISO-14971.pdf --auto-ocr
```

### OCR a source
```bash
sc compliance ocr-source iso14971
```

### Verify cards against source
```bash
sc compliance verify-framework iso14971 --auto-update
```

## Storage Strategy

**Local** (current): PDFs stored in this directory (gitignored)  
**Future**: Plugin architecture for cloud storage (S3, Google Drive, etc.)

