---
title: Compliance Cards Template Quality Audit - 2025-12-13
type: documentation
created: 2025-12-17
updated: 2025-12-17
---

# Compliance Cards Template Quality Audit - 2025-12-13

## Executive Summary

Audited all compliance card templates in `@supernal/compliance-cards` to identify boilerplate-only files lacking substantial content.

**Key Findings**:
- **40 EN 18031 templates** are identical boilerplate with no specific content
- All other frameworks (HIPAA, ISO 27001, SOC 2, GDPR, ISO 27701, ISO 13485, FDA 21 CFR 11) have high-quality templates
- Comprehensive improvement plan created with tools and tracking

## Audit Results

### Frameworks Status

| Framework | Total Cards | Boilerplate | Quality | Status |
|-----------|-------------|-------------|---------|--------|
| EN 18031 | 40 | 40 (100%) | ❌ Poor | 🔧 Needs Improvement |
| HIPAA | 63 | 0 (0%) | ✅ Good | ✅ Acceptable |
| ISO 27001 | 93 | 0 (0%) | ✅ Good | ✅ Acceptable |
| SOC 2 | 19 | 0 (0%) | ✅ Good | ✅ Acceptable |
| GDPR | 21 | 0 (0%) | ✅ Good | ✅ Acceptable |
| ISO 27701 | 62 | 0 (0%) | ✅ Good | ✅ Acceptable |
| ISO 13485 | 15 | 0 (0%) | ✅ Good | ✅ Acceptable |
| FDA 21 CFR 11 | 14 | 0 (0%) | ✅ Good | ✅ Acceptable |
| **TOTAL** | **327** | **40 (12%)** | - | - |

### EN 18031 Boilerplate Issues

All 40 EN 18031 templates suffer from:

1. **Generic Descriptions** (100%)
   - "Establishes comprehensive [topic] framework"
   - No specific EN 18031 control details

2. **Generic Gherkin Scenarios** (100%)
   - Same "AI Control Implementation" scenario
   - Same "AI Control Verification" scenario
   - No specific test cases

3. **Missing Control References** (100%)
   - No specific EN 18031 section numbers
   - Generic "EN 18031 control 5.X.X" references

4. **No Cross-Framework Mapping** (100%)
   - Placeholder text: "comp-iso27001-XXX"
   - No actual ISO 42001, EU AI Act, or NIST AI RMF mappings

5. **Generic Implementation Guidance** (100%)
   - Same MLOps tools listed for all cards
   - No card-specific tools or approaches

6. **Generic Evidence Requirements** (100%)
   - Same "AI governance policies" for all cards
   - No specific artifacts or metrics

7. **Low Unique Content** (100%)
   - Average: 42 unique lines per file
   - Total: ~185 lines (mostly boilerplate)
   - Target: >300 lines with >100 unique

### Boilerplate Scoring

**Indicators Checked**:
1. Generic "establish comprehensive" phrases
2. Generic "AI system trustworthiness" language
3. Generic "AI Control Implementation" scenario
4. Generic "AI Control Verification" scenario
5. Same implementation requirements across cards
6. Same evidence requirements across cards

**Scores**:
- EN18031-001: 6/6 (worst)
- EN18031-002 through EN18031-040: 4/6 (poor)

**Target**: <2/6 for acceptable quality

## Quality Benchmark

### Example: High-Quality Card

`docs/compliance/frameworks/en18031/templates/comp-en18031-042-stochastic-system-validation.md` (main repo)

**Quality Metrics**:
- ✅ 655 lines of substantive content
- ✅ Specific EN 18031 controls: 5.5.6, 5.3.2, 5.4.1
- ✅ 14 specific Gherkin scenarios (e.g., "Multiple Run Statistical Analysis", "Reproducibility Validation")
- ✅ Cross-framework mapping: ISO 5725, ISO 24028, ISO 23894, EU AI Act Article 15
- ✅ Statistical validation methodology with formulas
- ✅ Specific tools: scipy, numpy, matplotlib, statsmodels (with use cases)
- ✅ Specific evidence: Control charts, P-value distributions, statistical reports
- ✅ Code examples: Python implementations

**This demonstrates the target quality for all EN 18031 cards.**

## Improvement Plan

### Deliverables Created

1. **`EN18031-IMPROVEMENT-PLAN.md`** - Comprehensive improvement strategy
   - Phased approach (8 weeks)
   - Prioritization (critical → high → medium → low)
   - Quality acceptance criteria
   - Resource requirements

2. **`EN18031-IMPROVEMENT-PROGRESS.md`** - Progress tracking
   - All 40 cards listed with status
   - Priority assignments
   - Quality score tracking
   - Weekly goals

3. **`IMPROVEMENT-GUIDE.md`** - Step-by-step guide
   - Quick start instructions
   - Quality indicators vs. boilerplate indicators
   - Improvement workflow
   - Tool usage
   - FAQ

4. **`scripts/audit-templates.js`** - Automated audit tool
   - Scans all frameworks for boilerplate
   - Generates detailed report
   - Outputs `BOILERPLATE_AUDIT.json`

5. **`scripts/improve-template.js`** - Improvement assistant
   - Analyzes specific cards
   - Provides improvement guidance
   - Generates template starters
   - Maps EN 18031 controls

### Improvement Approach

**Phase 1: Critical Cards (Weeks 1-2)**
- 001: AI Governance Framework
- 002: AI Risk Management
- 009: Training Data Quality
- 010: Data Bias Detection
- 017: Model Validation

**Phase 2: High Priority (Weeks 3-4)**
- 020: Model Explainability
- 021: Model Fairness Testing
- 026: AI System Monitoring
- 030: Prompt Injection Prevention
- 036: Human Oversight

**Phase 3: Medium Priority (Weeks 5-6)**
- 20 data/model/deployment cards

**Phase 4: Lower Priority (Weeks 7-8)**
- 10 documentation/administrative cards
- Final QA review

### Quality Acceptance Criteria

Each improved card must:
- [ ] Reference specific EN 18031 control numbers (e.g., 5.5.6)
- [ ] Include detailed description (not generic) >100 words
- [ ] Contain at least 3 specific Gherkin scenarios
- [ ] Map to at least 2 other frameworks (ISO 42001, EU AI Act, etc.)
- [ ] Provide specific evidence requirements (≥5 items)
- [ ] Include testing strategy with specific tools
- [ ] Provide implementation guidance with specific best practices
- [ ] Total length >300 lines
- [ ] Boilerplate score <2/6
- [ ] Unique lines >100

## Tools Usage

### Audit Templates

```bash
cd standalone/compliance-cards
node scripts/audit-templates.js
```

**Output**: Console summary + `BOILERPLATE_AUDIT.json`

### Improve Template

```bash
# Get improvement guidance
node scripts/improve-template.js comp-en18031-001-ai-governance-framework

# Generate template starter
node scripts/improve-template.js comp-en18031-001-ai-governance-framework --generate
```

**Output**: 
- Improvement guide with specific issues
- Research resources
- Quality checklist
- Optional template starter file

### Verify Improvements

```bash
# Re-run audit after improvements
node scripts/audit-templates.js

# Check specific card progress
node scripts/improve-template.js comp-en18031-001-ai-governance-framework
```

## Impact Assessment

### Current State
- **40 low-quality templates** that don't provide value
- **Unable to use EN 18031 cards** for actual compliance
- **Poor user experience** with generic content
- **No cross-framework mapping** for EN 18031

### After Improvement
- **40 high-quality templates** with specific guidance
- **Usable for EN 18031 compliance** implementation
- **Cross-framework efficiency** (ISO 42001, EU AI Act alignment)
- **Testable scenarios** for validation
- **Specific evidence requirements** for auditors

### ROI Estimate

**Effort Required**:
- Manual improvement: 2-4 hours/card × 40 = 80-160 hours
- Semi-automated (AI-assisted): 45-60 min/card × 40 = 30-40 hours
- **Recommended**: Semi-automated with careful review (~40 hours)

**Value Created**:
- EN 18031 compliance cards become **usable**
- Cross-framework mapping **reduces duplicate work** (60-80% effort savings)
- Community contribution value for open-source project
- Competitive advantage for @supernal/compliance-cards package

## Next Steps

### Immediate (Week 1)
1. Review improvement plan with team
2. Assign first 5 critical cards
3. Begin manual improvement to establish quality baseline
4. Document lessons learned

### Short-term (Weeks 2-4)
1. Establish semi-automated workflow with AI assistance
2. Improve 10 high-priority cards
3. Conduct peer reviews
4. Refine improvement process

### Medium-term (Weeks 5-8)
1. Complete remaining 20 medium-priority cards
2. Improve 10 lower-priority cards
3. Conduct final quality review of all 40 cards
4. Update package documentation

### Long-term (Week 9+)
1. Publish improved cards to npm
2. Update package version
3. Announce improvements to community
4. Monitor feedback and iterate

## Resources

### Created Files
- `EN18031-IMPROVEMENT-PLAN.md` - Strategy document
- `EN18031-IMPROVEMENT-PROGRESS.md` - Progress tracker
- `IMPROVEMENT-GUIDE.md` - User guide
- `AUDIT-SUMMARY.md` - This document
- `BOILERPLATE_AUDIT.json` - Detailed audit data
- `scripts/audit-templates.js` - Audit automation
- `scripts/improve-template.js` - Improvement automation

### Required Access
- EN 18031 standard (full text)
- ISO/IEC 42001 standard
- EU AI Act (official text)
- NIST AI RMF documentation

### Recommended Tools
- Claude/GPT-4 for research
- Perplexity for finding implementations
- Gherkin validators
- Cross-framework compliance databases

## Recommendations

1. **Prioritize EN 18031 improvement** - It's the only framework with quality issues

2. **Use semi-automated approach** - Balance speed and quality
   - Use AI for research and initial drafting
   - Human review for accuracy and specificity
   - ~40 hours total effort

3. **Start with critical cards** - Establish quality baseline
   - Governance (001, 002)
   - High-impact technical (009, 010, 017)
   - These are most commonly referenced

4. **Leverage main repo example** - Use comp-en18031-042 as template
   - Structure is proven
   - Quality is excellent
   - Cross-framework mapping is thorough

5. **Track progress rigorously** - Use EN18031-IMPROVEMENT-PROGRESS.md
   - Update weekly
   - Calculate quality scores
   - Monitor velocity

6. **Engage community** - After Weeks 1-4
   - Open contribution for remaining cards
   - Provide clear guidelines
   - Review contributions thoroughly

7. **Maintain quality bar** - Don't compromise for speed
   - Boilerplate score <2/6 required
   - All TODO items must be completed
   - Cross-framework mappings must be verified

## Conclusion

**Key Takeaways**:
- ✅ Successfully identified all boilerplate templates
- ✅ Created comprehensive improvement plan and tools
- ✅ Established quality benchmarks and acceptance criteria
- ✅ Provided step-by-step improvement workflow
- 🔧 40 EN 18031 cards require ~40 hours of focused improvement
- 🎯 Target: 8-week completion for all improvements
- 📈 Expected outcome: High-quality, usable EN 18031 compliance cards

**Status**: 📋 Planning Complete, Ready for Implementation

---

**Audit Date**: 2025-12-13  
**Audited By**: Compliance Cards Improvement Team  
**Frameworks Audited**: 8 (327 total cards)  
**Boilerplate Identified**: 40 cards (12% of total)  
**Next Review Date**: 2025-12-20 (Week 1 progress check)

