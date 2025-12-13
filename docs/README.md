# Compliance Cards Documentation

## Improvement Campaign

### Status
- **Total Cards**: 328 across 8 frameworks
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
| SOC 2 | 19 | ✅ High Quality |
| GDPR | 21 | ✅ High Quality |
| ISO 27701 | 62 | ✅ High Quality |
| ISO 13485 | 15 | ✅ High Quality |
| FDA 21 CFR 11 | 14 | ✅ High Quality |
| EN 18031 | 40 | 🔧 1/40 Improved |
