# EN 18031 Compliance Cards Improvement Plan

## Problem Statement

All 40 EN 18031 compliance cards in `standalone/compliance-cards/frameworks/en18031/templates/` are identical boilerplate templates with:

- **Generic descriptions**: "Establishes comprehensive [topic] framework"
- **Generic Gherkin scenarios**: Same "AI Control Implementation" and "AI Control Verification" scenarios
- **No specific content**: Missing actual EN 18031 control details
- **Missing frontmatter**: No `purpose` field populated
- **Low unique content**: Only ~42 unique lines per file

### Audit Results

- **Total Boilerplate Files**: 40/40 (100%)
- **Boilerplate Score**: 4-6/6 indicators
- **Generic Scenarios**: 100% have generic scenarios
- **Unique Lines**: ~42 lines (mostly boilerplate)

## Comparison with Quality Example

The main repo contains `docs/compliance/frameworks/en18031/templates/comp-en18031-042-stochastic-system-validation.md` which demonstrates the expected quality:

- **655 lines** of substantive content
- **Specific EN 18031 controls** referenced (5.5.6, 5.3.2, 5.4.1)
- **Cross-framework mapping** (ISO 5725, ISO 24028, EU AI Act)
- **Detailed Gherkin scenarios** (14 specific scenarios)
- **Technical implementation** details with code examples
- **Statistical validation** methodology
- **Evidence requirements** with specific metrics
- **Testing strategy** with concrete approaches

## Improvement Strategy

### Phase 1: Research & Content Development

For each of the 40 EN 18031 controls:

1. **Research EN 18031 standard** to understand specific control requirements
2. **Identify control number** and section in EN 18031
3. **Map cross-framework relationships**:
   - ISO/IEC 42001 (AI Management System)
   - ISO 24028 (AI Trustworthiness)
   - ISO 27001 (Information Security)
   - ISO 27701 (Privacy)
   - EU AI Act articles
   - NIST AI RMF
   - IEEE 7000 series

4. **Develop specific content** per card:
   - Actual EN 18031 control description
   - Specific technical requirements
   - Concrete Gherkin scenarios (not generic)
   - Implementation guidance
   - Evidence requirements
   - Testing strategies
   - Tool recommendations

### Phase 2: Template Enhancement

Create enhanced templates with:

```markdown
---
id: comp-en18031-XXX-[topic]
title: COMP-EN18031-XXX - [Topic]
purpose: [Specific control purpose]
en18031Control: [Specific section number]
category: [ai-governance|ai-data|ai-model|ai-deployment|ai-safety]
priority: [critical|high|medium]
framework: EN 18031
crossFramework:
  - ISO/IEC 42001: [section]
  - EU AI Act: [article]
  - ISO 24028: [section]
---

# COMP-EN18031-XXX: [Topic]

## Overview

**Purpose**: [Specific, actionable purpose]
**EN 18031 Control**: [Section number and name]
**Category**: [Specific category]
**Priority**: [Risk-based priority]
**Framework**: EN 18031

## Regulatory Context

### EN 18031 Alignment
- **Section X.X.X**: [Specific requirement]
- **Related Controls**: [Other EN 18031 sections]

### Cross-Framework Mapping
- **ISO/IEC 42001**: [Specific mapping]
- **EU AI Act**: [Article and requirement]
- **ISO 24028**: [Trustworthiness characteristic]
- **NIST AI RMF**: [Function and category]

## Description

[Detailed, specific description of the control requirement]

## Acceptance Criteria

\```gherkin
Feature: [Specific Feature Name]
  As [specific role]
  I want [specific capability]
  So that [specific outcome]

  Background:
    Given [specific preconditions]
    And [specific context]

  Scenario: [Specific scenario name]
    Given [specific conditions]
    When [specific actions]
    And [specific steps]
    Then [specific outcomes]
    And [specific verification]
    And [specific evidence]
\```

## Technical Context

### Implementation Requirements

[Specific technical requirements]

### System Architecture

[If applicable: TypeScript interfaces, system diagrams]

### AI/ML Specific Considerations

[If applicable: Model-specific, data-specific, or deployment-specific guidance]

## Validation Strategy

### Testing Approach

1. **[Specific test category]**: [Description]
2. **[Specific test category]**: [Description]

### [Domain]-Specific Testing

- [Specific test scenarios]
- [Specific metrics]
- [Specific tools]

## Evidence Requirements

### Required Documentation

- [Specific document type]
- [Specific artifact]
- [Specific record]

### Evidence Collection

- [Specific collection method]
- [Specific storage approach]
- [Specific retention policy]

## Related Controls

### Within EN 18031

- comp-en18031-XXX: [Specific relationship]

### Cross-Framework

- comp-iso27001-XXX: [Specific mapping]
- comp-iso42001-XXX: [Specific mapping]
- comp-gdpr-XXX: [If applicable]

## Implementation Notes

### Best Practices

- [Specific best practice]
- [Specific tooling recommendation]

### Common Pitfalls

- [Specific anti-pattern to avoid]
- [Specific risk]

### Recommended Tools

**[Category]**:
- [Tool name]: [Use case]

## Status

- [ ] [Specific implementation step]
- [ ] [Specific verification step]
- [ ] [Specific documentation step]
```

### Phase 3: Prioritization

Priority order for improvement:

#### Critical Priority (Weeks 1-2)
1. **comp-en18031-001**: AI Governance Framework (foundational)
2. **comp-en18031-002**: AI Risk Management (foundational)
3. **comp-en18031-009**: Training Data Quality (high-impact)
4. **comp-en18031-010**: Data Bias Detection (high-impact)
5. **comp-en18031-017**: Model Validation (high-impact)

#### High Priority (Weeks 3-4)
6. **comp-en18031-020**: Model Explainability
7. **comp-en18031-021**: Model Fairness Testing
8. **comp-en18031-026**: AI System Monitoring
9. **comp-en18031-030**: Prompt Injection Prevention
10. **comp-en18031-036**: Human Oversight

#### Medium Priority (Weeks 5-6)
11-30: [Remaining data, model, and deployment cards]

#### Lower Priority (Weeks 7-8)
31-40: [Documentation and administrative controls]

### Phase 4: Quality Assurance

For each improved card:

1. **Peer Review**: Have compliance expert review
2. **Technical Review**: Have AI/ML engineer review
3. **Cross-Framework Validation**: Verify mappings are accurate
4. **Gherkin Validation**: Ensure scenarios are testable
5. **Evidence Validation**: Confirm evidence requirements are feasible

## Implementation Approach

### Option A: Manual Improvement (High Quality)

**Pros**:
- Highest quality output
- Deep understanding of each control
- Accurate cross-framework mapping

**Cons**:
- Time-intensive (2-4 hours per card)
- Requires EN 18031 expertise
- 40 cards = 80-160 hours total

### Option B: Semi-Automated with AI Assistance (Balanced)

**Pros**:
- Faster (30-60 minutes per card with review)
- Consistent structure
- Can leverage LLMs for research

**Cons**:
- Requires careful review
- May need manual refinement
- Accuracy depends on AI knowledge

**Process**:
1. Use Claude/GPT-4 to research EN 18031 controls
2. Generate initial content with specific prompts
3. Human review and refinement
4. Cross-framework validation
5. Quality assurance

### Option C: Community Contribution (Scalable)

**Pros**:
- Leverages community expertise
- Distributed effort
- Multiple perspectives

**Cons**:
- Coordination overhead
- Quality variability
- Slower consensus

## Recommended Approach

**Hybrid Strategy**:

1. **Week 1**: Improve 5 critical cards manually (Option A) to establish quality baseline
2. **Week 2-4**: Use semi-automated approach (Option B) for next 15 cards
3. **Week 5-8**: Open remaining 20 cards for community contribution (Option C) with templates from Weeks 1-4

## Acceptance Criteria for Improvement

Each improved card must:

- [ ] Reference specific EN 18031 control numbers
- [ ] Include detailed description (not generic)
- [ ] Contain at least 3 specific Gherkin scenarios
- [ ] Map to at least 2 other frameworks
- [ ] Provide specific evidence requirements
- [ ] Include testing strategy with tools
- [ ] Provide implementation guidance
- [ ] Total length > 300 lines (substantive content)
- [ ] Boilerplate score < 2/6
- [ ] Unique lines > 100

## Tracking Progress

Create tracking file: `EN18031-IMPROVEMENT-PROGRESS.md`

```markdown
# EN 18031 Improvement Progress

| Card ID | Title | Status | Assignee | Review Date | Quality Score |
|---------|-------|--------|----------|-------------|---------------|
| 001 | AI Governance Framework | ⏳ In Progress | @alice | - | - |
| 002 | AI Risk Management | 📝 Planned | - | - | - |
| ... | ... | ... | ... | ... | ... |

**Legend**:
- ✅ Complete
- 🔍 In Review
- ⏳ In Progress
- 📝 Planned
- ⚠️ Blocked
```

## Resources Needed

### Documentation
- EN 18031 standard (full text)
- ISO/IEC 42001 standard
- EU AI Act (official text)
- NIST AI RMF documentation

### Tools
- AI research assistants (Claude, GPT-4)
- Compliance mapping tools
- Gherkin validators

### Expertise
- EN 18031 compliance expert
- AI/ML engineer (model validation)
- Security expert (adversarial AI)
- Privacy expert (GDPR mapping)

## Success Metrics

- **Quality**: 100% of cards have < 2/6 boilerplate score
- **Completeness**: 100% of cards reference specific EN 18031 controls
- **Cross-Framework**: 100% of cards map to at least 2 other frameworks
- **Testability**: 100% of cards have at least 3 specific Gherkin scenarios
- **Usability**: Community feedback average > 4/5 stars

## Next Steps

1. **Immediate**: Review this plan with compliance team
2. **Week 1**: Begin manual improvement of 5 critical cards
3. **Week 2**: Establish semi-automated workflow
4. **Week 3**: Open community contribution guidelines
5. **Week 8**: Quality assurance review of all 40 cards
6. **Week 9**: Publish improved cards to npm

## Related Files

- `BOILERPLATE_AUDIT.json` - Detailed audit results
- `scripts/audit-templates.js` - Audit script
- `scripts/improve-template.js` - Improvement automation script (to be created)
- `EN18031-IMPROVEMENT-PROGRESS.md` - Progress tracking (to be created)

---

**Created**: 2025-12-13  
**Last Updated**: 2025-12-13  
**Status**: 📝 Planning  
**Owner**: Compliance Cards Team

