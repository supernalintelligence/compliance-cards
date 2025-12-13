# Compliance Cards Improvement Guide

## Quick Start

### 1. Identify Boilerplate Cards

```bash
cd standalone/compliance-cards
node scripts/audit-templates.js
```

This will show you which compliance cards need improvement.

### 2. Improve a Card

```bash
# Get improvement guidance
node scripts/improve-template.js comp-en18031-001-ai-governance-framework

# Generate starter template (optional)
node scripts/improve-template.js comp-en18031-001-ai-governance-framework --generate
```

### 3. Verify Improvements

```bash
# Run audit again to see improvements
node scripts/audit-templates.js

# Check specific card
node scripts/improve-template.js comp-en18031-001-ai-governance-framework
```

### 4. Track Progress

Update `EN18031-IMPROVEMENT-PROGRESS.md` with your progress.

## Audit Results Summary

### Current State (2025-12-13)

- **Total Frameworks**: 8 (HIPAA, ISO 27001, SOC 2, GDPR, ISO 27701, ISO 13485, FDA 21 CFR 11, EN 18031)
- **Frameworks with Boilerplate**: 1 (EN 18031)
- **Total Boilerplate Files**: 40 (all in EN 18031)

### EN 18031 Boilerplate Issues

All 40 EN 18031 templates have:

- ❌ **Generic descriptions**: "establish comprehensive ... framework"
- ❌ **Generic Gherkin scenarios**: Same "AI Control Implementation" / "AI Control Verification"
- ❌ **No specific EN 18031 control references**
- ❌ **No cross-framework mappings** (ISO 42001, EU AI Act, etc.)
- ❌ **Generic implementation guidance** (same MLOps tools listed for all)
- ❌ **Generic evidence requirements** (same "AI governance policies" for all)
- ❌ **Low unique content**: Only ~42 unique lines per file

### Quality Comparison

| Metric | Boilerplate EN18031 | Quality Example (042) | Target |
|--------|---------------------|----------------------|--------|
| Total Lines | ~185 | 655 | >300 |
| Unique Lines | 42 | ~400 | >100 |
| Boilerplate Score | 4-6/6 | 0/6 | <2/6 |
| Generic Scenarios | Yes | No | No |
| Specific Control Refs | No | Yes (5.5.6, 5.3.2, 5.4.1) | Yes |
| Cross-Framework Map | No | Yes (4+ frameworks) | Yes (≥2) |

## What Makes a Good Compliance Card?

### ✅ Quality Indicators

1. **Specific Control References**
   - ✅ "EN 18031 Section 5.5.6 (Robustness Testing)"
   - ❌ "EN 18031 control 5.5.7"

2. **Detailed Description**
   - ✅ "Implements statistical validation for stochastic AI/ML systems, including generative models, reinforcement learning agents..."
   - ❌ "Implements EN 18031 control 5.5.7 to implement emergency stop for ai systems"

3. **Specific Gherkin Scenarios**
   - ✅ "Scenario: Multiple Run Statistical Analysis" with specific Given/When/Then
   - ❌ "Scenario: AI Control Implementation" with generic steps

4. **Cross-Framework Mapping**
   - ✅ ISO 5725-1 (Statistical Methods), ISO 24028 (AI Trustworthiness), EU AI Act Article 15
   - ❌ "comp-iso27001-XXX: ISO 27001 information security controls"

5. **Specific Evidence**
   - ✅ "Statistical validation reports with confidence intervals", "P-value distributions", "Control charts"
   - ❌ "AI governance policies", "Model development documentation"

6. **Actionable Implementation Guidance**
   - ✅ "Use scipy.stats for statistical tests", "Implement control charts with matplotlib"
   - ❌ "Integrate AI security into MLOps pipelines"

### ❌ Boilerplate Indicators

1. **Generic phrases**:
   - "establish comprehensive ... framework"
   - "This control ensures AI system trustworthiness, security, and compliance"
   - "AI system shall be trustworthy"

2. **Reused scenarios**:
   - "AI Control Implementation"
   - "AI Control Verification"

3. **Placeholder references**:
   - "comp-iso27001-XXX"
   - "Related AI trustworthiness controls will be identified during implementation"

4. **Generic tools**:
   - Same MLOps tools (MLflow, Weights & Biases) listed for every card
   - No specific tools for the control's purpose

## Improvement Workflow

### Phase 1: Research (30 minutes)

1. **Find EN 18031 control details**
   - Read EN 18031 standard section
   - Understand specific requirements
   - Identify verification methods

2. **Cross-framework mapping**
   - Search ISO/IEC 42001 for related AI management controls
   - Search EU AI Act for related articles
   - Search ISO 24028 for trustworthiness characteristics
   - Search NIST AI RMF for related functions

3. **Gather examples**
   - Find real-world implementations
   - Identify relevant tools and technologies
   - Collect evidence examples

### Phase 2: Draft Content (60 minutes)

1. **Update frontmatter**
   ```yaml
   ---
   purpose: [Specific, one-sentence purpose]
   en18031Control: [Section number]
   category: [Specific category]
   crossFramework:
     iso42001: [Specific section]
     euAiAct: [Specific article]
   ---
   ```

2. **Write specific description**
   - What: Specific requirements
   - Why: Specific risks addressed
   - How: Specific approach
   - Outcomes: Specific benefits

3. **Create Gherkin scenarios**
   - At least 3 specific scenarios
   - Real-world situations
   - Testable steps
   - Specific verification criteria

4. **Detail implementation**
   - Specific technical requirements
   - Specific tools (with versions if relevant)
   - Specific architecture patterns
   - Code examples (if helpful)

5. **Define evidence**
   - Specific documents needed
   - Specific metrics to collect
   - Specific artifacts to maintain
   - Specific retention periods

6. **Add testing strategy**
   - Specific test types
   - Specific validation methods
   - Specific pass/fail criteria
   - Specific tools for testing

### Phase 3: Review (30 minutes)

1. **Self-review checklist**
   ```
   [ ] No generic phrases ("establish comprehensive", "AI system trustworthiness")
   [ ] Specific EN 18031 control reference (section number)
   [ ] At least 3 specific Gherkin scenarios (not "AI Control Implementation")
   [ ] Cross-framework mapping to ≥2 frameworks with specific sections
   [ ] Specific evidence requirements (≥5 items, not generic)
   [ ] Specific tools and implementation guidance
   [ ] Total length >300 lines
   [ ] All TODO items removed
   ```

2. **Run audit**
   ```bash
   node scripts/audit-templates.js
   ```

3. **Verify improvements**
   ```bash
   node scripts/improve-template.js [card-id]
   ```

### Phase 4: Peer Review (variable)

1. **Request review**
   - Update progress tracker
   - Mark as "In Review"
   - Assign reviewer

2. **Address feedback**
   - Make revisions
   - Re-run audit
   - Update progress

3. **Final approval**
   - Mark as "Complete"
   - Calculate quality score
   - Update statistics

## Tools

### audit-templates.js

Scans all compliance cards to identify boilerplate content.

**Usage**:
```bash
node scripts/audit-templates.js
```

**Output**:
- Summary of boilerplate files by framework
- Detailed findings with boilerplate scores
- `BOILERPLATE_AUDIT.json` with full analysis

### improve-template.js

Provides improvement guidance and generates template starters.

**Usage**:
```bash
# Get improvement guide
node scripts/improve-template.js comp-en18031-001-ai-governance-framework

# Generate template starter
node scripts/improve-template.js comp-en18031-001-ai-governance-framework --generate
```

**Output**:
- Analysis of current card quality
- Specific improvements needed
- Research resources
- Quality checklist
- Next steps
- Optional: Template starter file (with `--generate`)

## Reference Quality Example

See `docs/compliance/frameworks/en18031/templates/comp-en18031-042-stochastic-system-validation.md` in the main repo for a high-quality example:

- **655 lines** of substantive content
- **14 specific Gherkin scenarios** (not generic)
- **4+ cross-framework mappings** with specific sections
- **Statistical validation methodology** with formulas
- **Specific tools**: scipy, numpy, matplotlib, statsmodels
- **Specific evidence**: Control charts, P-value distributions, statistical reports
- **Code examples**: Python implementations

## Resources

### Documentation
- EN 18031 standard (full text required)
- ISO/IEC 42001: AI Management System
- EU AI Act (official text)
- ISO 24028: AI Trustworthiness
- NIST AI RMF documentation
- IEEE 7000 series (AI ethics)

### AI Research Tools
- Claude (Anthropic) - for EN 18031 research
- GPT-4 (OpenAI) - for cross-framework mapping
- Perplexity - for finding real-world implementations

### Verification
- Gherkin validators
- Cross-framework compliance databases
- AI standards repositories

## FAQ

### Q: How long does it take to improve one card?

**A**: With proper research: ~2 hours per card
- Research: 30 minutes
- Drafting: 60 minutes
- Review: 30 minutes

With AI assistance (semi-automated): ~45-60 minutes per card

### Q: Can I use AI to generate content?

**A**: Yes, but with careful review:
- ✅ Use AI for research and initial drafting
- ✅ Use AI to find cross-framework mappings
- ⚠️ Verify all EN 18031 control references
- ⚠️ Validate cross-framework mappings
- ❌ Don't blindly copy AI-generated content

### Q: What if I can't find EN 18031 details?

**A**: 
1. Check if EN 18031 standard is available
2. Search for DIN SPEC 18031 (German precursor)
3. Reference ISO/IEC 42001 as closest equivalent
4. Mark card with note about limited source availability

### Q: Should I improve other frameworks (HIPAA, ISO 27001)?

**A**: Not immediately. Current audit shows:
- HIPAA: Good quality (see comp-hipaa-043)
- ISO 27001: Good quality
- SOC 2: Good quality (see comp-soc-001)
- FDA 21 CFR 11: Good quality (see comp-fda-001)
- Only EN 18031 needs systematic improvement

## Progress Tracking

See `EN18031-IMPROVEMENT-PROGRESS.md` for:
- Current status of all 40 cards
- Assigned owners
- Completion dates
- Quality scores
- Weekly goals

## Contact

For questions or to contribute:
- Open issue on GitHub
- Discuss in compliance-cards channel
- Email: compliance@supernal.dev

---

**Last Updated**: 2025-12-13  
**Status**: Active Improvement Campaign  
**Target Completion**: 8 weeks (5 cards/week average)


