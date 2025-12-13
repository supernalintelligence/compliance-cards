#!/usr/bin/env node
/**
 * Improve EN18031 compliance card templates
 * 
 * Usage:
 *   node scripts/improve-template.js <card-id>
 *   node scripts/improve-template.js comp-en18031-001-ai-governance-framework
 * 
 * This script helps guide the improvement of boilerplate templates
 * by providing structure, checklists, and quality criteria.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const FRAMEWORKS_DIR = path.join(__dirname, '..', 'frameworks');
const EN18031_STANDARD_MAP = {
  '001': { section: '5.1.1', name: 'AI Governance Framework', category: 'ai-governance' },
  '002': { section: '5.1.2', name: 'AI Risk Management', category: 'ai-governance' },
  '003': { section: '5.1.3', name: 'AI Ethics Board', category: 'ai-governance' },
  '004': { section: '5.1.4', name: 'AI Incident Response', category: 'ai-governance' },
  '005': { section: '5.2.1', name: 'AI Documentation Standards', category: 'ai-governance' },
  '006': { section: '5.2.2', name: 'AI Transparency Requirements', category: 'ai-governance' },
  '007': { section: '5.2.3', name: 'AI Audit Trail', category: 'ai-governance' },
  '008': { section: '5.2.4', name: 'AI Stakeholder Engagement', category: 'ai-governance' },
  '009': { section: '5.3.1', name: 'Training Data Quality', category: 'ai-data' },
  '010': { section: '5.3.2', name: 'Data Bias Detection', category: 'ai-data' },
  '011': { section: '5.3.3', name: 'Data Provenance', category: 'ai-data' },
  '012': { section: '5.3.4', name: 'Data Privacy for AI', category: 'ai-data' },
  '013': { section: '5.3.5', name: 'Synthetic Data Generation', category: 'ai-data' },
  '014': { section: '5.3.6', name: 'Data Versioning', category: 'ai-data' },
  '015': { section: '5.3.7', name: 'Data Poisoning Prevention', category: 'ai-data' },
  '016': { section: '5.4.1', name: 'Model Development Lifecycle', category: 'ai-model' },
  '017': { section: '5.4.2', name: 'Model Validation', category: 'ai-model' },
  '018': { section: '5.4.3', name: 'Model Versioning', category: 'ai-model' },
  '019': { section: '5.4.4', name: 'Model Adversarial Testing', category: 'ai-model' },
  '020': { section: '5.4.5', name: 'Model Explainability', category: 'ai-model' },
  '021': { section: '5.4.6', name: 'Model Fairness Testing', category: 'ai-model' },
  '022': { section: '5.4.7', name: 'Model Security Scanning', category: 'ai-model' },
  '023': { section: '5.5.1', name: 'Model Drift Detection', category: 'ai-deployment' },
  '024': { section: '5.5.2', name: 'Model Backdoor Prevention', category: 'ai-model' },
  '025': { section: '5.5.3', name: 'Model Supply Chain Security', category: 'ai-model' },
  '026': { section: '5.6.1', name: 'AI System Monitoring', category: 'ai-deployment' },
  '027': { section: '5.6.2', name: 'Inference Security', category: 'ai-deployment' },
  '028': { section: '5.6.3', name: 'Model Serving Infrastructure', category: 'ai-deployment' },
  '029': { section: '5.6.4', name: 'AI System Performance Monitoring', category: 'ai-deployment' },
  '030': { section: '5.6.5', name: 'Prompt Injection Prevention', category: 'ai-deployment' },
  '031': { section: '5.6.6', name: 'Output Validation', category: 'ai-deployment' },
  '032': { section: '5.6.7', name: 'Rate Limiting & Abuse Prevention', category: 'ai-deployment' },
  '033': { section: '5.6.8', name: 'AI System Rollback', category: 'ai-deployment' },
  '034': { section: '5.7.1', name: 'Safety Requirements', category: 'ai-safety' },
  '035': { section: '5.7.2', name: 'Fail-Safe Mechanisms', category: 'ai-safety' },
  '036': { section: '5.7.3', name: 'Human Oversight', category: 'ai-safety' },
  '037': { section: '5.7.4', name: 'Continuous Learning Safety', category: 'ai-safety' },
  '038': { section: '5.7.5', name: 'AI System Testing', category: 'ai-safety' },
  '039': { section: '5.7.6', name: 'Robustness Testing', category: 'ai-safety' },
  '040': { section: '5.7.7', name: 'Emergency Stop Procedures', category: 'ai-safety' },
};

function extractCardNumber(cardId) {
  const match = cardId.match(/comp-en18031-(\d{3})/);
  return match ? match[1] : null;
}

function loadCurrentCard(cardId) {
  const templatesDir = path.join(FRAMEWORKS_DIR, 'en18031', 'templates');
  const cardFile = `${cardId}.md`;
  const cardPath = path.join(templatesDir, cardFile);

  if (!fs.existsSync(cardPath)) {
    throw new Error(`Card not found: ${cardPath}`);
  }

  const content = fs.readFileSync(cardPath, 'utf8');
  const { data, content: body } = matter(content);

  return {
    path: cardPath,
    frontmatter: data,
    body,
    fullContent: content,
  };
}

function analyzeCard(cardId) {
  const cardNumber = extractCardNumber(cardId);
  const standardInfo = EN18031_STANDARD_MAP[cardNumber];
  
  if (!standardInfo) {
    throw new Error(`Unknown card number: ${cardNumber}`);
  }

  const current = loadCurrentCard(cardId);

  // Analyze quality
  const analysis = {
    cardId,
    cardNumber,
    standardInfo,
    current: {
      frontmatter: current.frontmatter,
      lineCount: current.body.split('\n').length,
      hasGenericScenarios: current.body.includes('AI Control Implementation'),
      hasSpecificImplementation: current.body.split('\n').filter(l => l.trim().length > 0 && !l.match(/^#+\s/) && !l.match(/^-\s/)).length > 100,
    },
    needed: {
      specificPurpose: !current.frontmatter.purpose || current.frontmatter.purpose === 'N/A',
      detailedDescription: current.body.includes('establish comprehensive'),
      specificScenarios: current.body.includes('AI Control Implementation'),
      crossFrameworkMapping: !current.body.includes('ISO/IEC 42001') || !current.body.includes('EU AI Act'),
      implementationGuidance: !current.body.includes('### Best Practices') || current.body.includes('Integrate AI security into MLOps'),
      specificEvidence: !current.body.includes('### Required Documentation') || current.body.includes('AI governance policies'),
      testingStrategy: !current.body.includes('### Testing Approach') || current.body.includes('AI Documentation Review'),
    },
  };

  return analysis;
}

function generateImprovementGuide(analysis) {
  const { cardId, cardNumber, standardInfo, current, needed } = analysis;

  console.log(`\n${'='.repeat(70)}`);
  console.log(`IMPROVEMENT GUIDE: ${cardId}`);
  console.log(`${'='.repeat(70)}\n`);

  console.log(`📋 **Card Details**`);
  console.log(`   ID: ${cardId}`);
  console.log(`   Title: ${standardInfo.name}`);
  console.log(`   EN 18031 Section: ${standardInfo.section}`);
  console.log(`   Category: ${standardInfo.category}\n`);

  console.log(`📊 **Current Status**`);
  console.log(`   Line Count: ${current.lineCount}`);
  console.log(`   Has Generic Scenarios: ${current.hasGenericScenarios ? '❌ Yes (needs improvement)' : '✅ No'}`);
  console.log(`   Has Specific Implementation: ${current.hasSpecificImplementation ? '✅ Yes' : '❌ No (needs improvement)'}\n`);

  console.log(`🔧 **Improvements Needed**\n`);

  let improvementCount = 0;

  if (needed.specificPurpose) {
    improvementCount++;
    console.log(`   ${improvementCount}. ❌ Add Specific Purpose`);
    console.log(`      Current: "${current.frontmatter.purpose || 'N/A'}"`);
    console.log(`      Needed: Specific purpose statement for ${standardInfo.name}\n`);
  }

  if (needed.detailedDescription) {
    improvementCount++;
    console.log(`   ${improvementCount}. ❌ Replace Generic Description`);
    console.log(`      Remove: "establish comprehensive ... framework"`);
    console.log(`      Add: Specific description of EN 18031 ${standardInfo.section} requirements\n`);
  }

  if (needed.specificScenarios) {
    improvementCount++;
    console.log(`   ${improvementCount}. ❌ Create Specific Gherkin Scenarios`);
    console.log(`      Remove: Generic "AI Control Implementation" and "AI Control Verification"`);
    console.log(`      Add: At least 3 specific scenarios for ${standardInfo.name}`);
    console.log(`      Example topics: Data validation, Model testing, Deployment checks\n`);
  }

  if (needed.crossFrameworkMapping) {
    improvementCount++;
    console.log(`   ${improvementCount}. ❌ Add Cross-Framework Mapping`);
    console.log(`      Add mappings to:`);
    console.log(`      - ISO/IEC 42001 (AI Management System)`);
    console.log(`      - EU AI Act (relevant articles)`);
    console.log(`      - ISO 24028 (AI Trustworthiness)`);
    console.log(`      - NIST AI RMF (relevant functions)\n`);
  }

  if (needed.implementationGuidance) {
    improvementCount++;
    console.log(`   ${improvementCount}. ❌ Add Specific Implementation Guidance`);
    console.log(`      Replace generic MLOps guidance with:`);
    console.log(`      - Specific tools for ${standardInfo.name}`);
    console.log(`      - Specific best practices`);
    console.log(`      - Specific common pitfalls\n`);
  }

  if (needed.specificEvidence) {
    improvementCount++;
    console.log(`   ${improvementCount}. ❌ Define Specific Evidence Requirements`);
    console.log(`      Replace generic "AI governance policies" with:`);
    console.log(`      - Specific documents for ${standardInfo.name}`);
    console.log(`      - Specific artifacts`);
    console.log(`      - Specific metrics\n`);
  }

  if (needed.testingStrategy) {
    improvementCount++;
    console.log(`   ${improvementCount}. ❌ Create Specific Testing Strategy`);
    console.log(`      Replace generic "AI Documentation Review" with:`);
    console.log(`      - Specific test types for ${standardInfo.name}`);
    console.log(`      - Specific validation methods`);
    console.log(`      - Specific success criteria\n`);
  }

  console.log(`\n📚 **Research Resources**\n`);
  console.log(`   1. EN 18031 Section ${standardInfo.section} - ${standardInfo.name}`);
  console.log(`   2. ISO/IEC 42001 (search for AI ${standardInfo.category} controls)`);
  console.log(`   3. EU AI Act (search for ${standardInfo.name.toLowerCase()} requirements)`);
  console.log(`   4. NIST AI RMF (search for ${standardInfo.category} guidance)`);
  console.log(`   5. IEEE 7000 series (AI ethics and trustworthiness)\n`);

  console.log(`\n✅ **Quality Checklist**\n`);
  console.log(`   [ ] Specific EN 18031 control reference (${standardInfo.section})`);
  console.log(`   [ ] Detailed, non-generic description (> 100 words)`);
  console.log(`   [ ] At least 3 specific Gherkin scenarios`);
  console.log(`   [ ] Cross-framework mapping (≥ 2 frameworks)`);
  console.log(`   [ ] Specific evidence requirements (≥ 5 items)`);
  console.log(`   [ ] Specific testing strategy with tools`);
  console.log(`   [ ] Implementation best practices (≥ 3 items)`);
  console.log(`   [ ] Common pitfalls to avoid (≥ 3 items)`);
  console.log(`   [ ] Total length > 300 lines`);
  console.log(`   [ ] Boilerplate score < 2/6\n`);

  console.log(`\n📝 **Next Steps**\n`);
  console.log(`   1. Research EN 18031 section ${standardInfo.section}`);
  console.log(`   2. Draft specific content for each improvement area`);
  console.log(`   3. Review against quality checklist`);
  console.log(`   4. Test Gherkin scenarios for clarity`);
  console.log(`   5. Validate cross-framework mappings`);
  console.log(`   6. Run audit: node scripts/audit-templates.js`);
  console.log(`   7. Update progress: EN18031-IMPROVEMENT-PROGRESS.md\n`);

  console.log(`${'='.repeat(70)}\n`);
}

function generateImprovedTemplate(analysis) {
  const { cardId, standardInfo } = analysis;
  
  const template = `---
id: ${cardId}
title: COMP-EN18031-${analysis.cardNumber} - ${standardInfo.name}
purpose: [TODO: Add specific purpose for ${standardInfo.name}]
en18031Control: ${standardInfo.section}
category: ${standardInfo.category}
priority: high
framework: EN 18031
sidebar_label: COMP-EN18031-${analysis.cardNumber}
sidebar_position: ${parseInt(analysis.cardNumber)}
crossFramework:
  iso42001: [TODO: Add ISO/IEC 42001 mapping]
  euAiAct: [TODO: Add EU AI Act article]
  iso24028: [TODO: Add ISO 24028 mapping]
  nistAiRmf: [TODO: Add NIST AI RMF function]
---

# COMP-EN18031-${analysis.cardNumber}: ${standardInfo.name}

## Overview

**Purpose**: [TODO: Specific purpose statement]
**EN 18031 Control**: ${standardInfo.section} - ${standardInfo.name}
**Category**: ${standardInfo.category}
**Priority**: high
**Framework**: EN 18031

## Regulatory Context

### EN 18031 Alignment

- **${standardInfo.section}**: [TODO: Specific control requirement]
- **Related Controls**: [TODO: List related EN 18031 sections]

### Cross-Framework Mapping

- **ISO/IEC 42001**: [TODO: Specific section and requirement]
- **EU AI Act**: [TODO: Article and requirement]
- **ISO 24028**: [TODO: Trustworthiness characteristic]
- **NIST AI RMF**: [TODO: Function and category]

## Description

[TODO: Replace with specific, detailed description of EN 18031 ${standardInfo.section} requirements. Explain:
- What this control requires
- Why it's important for AI trustworthiness
- How it addresses AI-specific risks
- What outcomes it achieves]

## Acceptance Criteria

\`\`\`gherkin
Feature: [TODO: Specific feature name related to ${standardInfo.name}]
  As [TODO: Specific role]
  I want [TODO: Specific capability]
  So that [TODO: Specific outcome]

  Background:
    Given [TODO: Specific precondition]
    And [TODO: Specific context]
    And [TODO: Specific state]

  Scenario: [TODO: First specific scenario name]
    Given [TODO: Specific conditions]
    When [TODO: Specific actions]
    And [TODO: Specific steps]
    Then [TODO: Specific outcomes]
    And [TODO: Specific verification]
    And [TODO: Specific evidence]

  Scenario: [TODO: Second specific scenario name]
    Given [TODO: Specific conditions]
    When [TODO: Specific actions]
    And [TODO: Specific steps]
    Then [TODO: Specific outcomes]
    And [TODO: Specific verification]

  Scenario: [TODO: Third specific scenario name]
    Given [TODO: Specific conditions]
    When [TODO: Specific actions]
    Then [TODO: Specific outcomes]
\`\`\`

## Technical Context

### Implementation Requirements

[TODO: List specific technical requirements for ${standardInfo.name}:
- Technical controls needed
- System components involved
- Integration points
- Configuration requirements]

### ${standardInfo.category === 'ai-model' ? 'Model' : standardInfo.category === 'ai-data' ? 'Data' : 'System'} Architecture

[TODO: Add relevant architecture details, TypeScript interfaces if applicable]

### AI/ML Specific Considerations

[TODO: Add AI/ML specific guidance for ${standardInfo.name}:
- Model-specific considerations
- Data-specific considerations
- Deployment-specific considerations]

## Validation Strategy

### Testing Approach

1. **[TODO: Test category 1]**: [Description]
2. **[TODO: Test category 2]**: [Description]
3. **[TODO: Test category 3]**: [Description]

### ${standardInfo.category === 'ai-data' ? 'Data' : standardInfo.category === 'ai-model' ? 'Model' : 'System'}-Specific Testing

[TODO: Add specific test scenarios for ${standardInfo.name}:
- Specific metrics to measure
- Specific validation methods
- Specific success criteria]

## Evidence Requirements

### Required Documentation

[TODO: List specific documentation for ${standardInfo.name}:
- Specific document types
- Specific templates
- Specific records]

### Evidence Collection

[TODO: Describe how to collect evidence for ${standardInfo.name}:
- Collection methods
- Storage approach
- Retention policy]

## Related Controls

### Within EN 18031

[TODO: List related EN 18031 controls with specific relationships]

### Cross-Framework

[TODO: List specific cross-framework control mappings:
- comp-iso27001-XXX: [Relationship]
- comp-iso42001-XXX: [Relationship]
- comp-gdpr-XXX: [If applicable]]

### AI-Specific Standards

- ISO/IEC 42001: AI Management System
- NIST AI Risk Management Framework
- EU AI Act requirements
- IEEE 7000 series (AI ethics)

## Implementation Notes

### Best Practices

[TODO: Add specific best practices for ${standardInfo.name}:
- Specific approaches
- Specific tools
- Specific patterns]

### Common Pitfalls

[TODO: Add specific pitfalls to avoid for ${standardInfo.name}:
- Specific anti-patterns
- Specific risks
- Specific mistakes]

### Recommended Tools

**[TODO: Tool category]**:

[TODO: List specific tools for ${standardInfo.name}:
- Tool name: Use case
- Tool name: Use case]

## Status

[TODO: Update with specific implementation steps for ${standardInfo.name}:
- [ ] [Specific step 1]
- [ ] [Specific step 2]
- [ ] [Specific step 3]]
`;

  return template;
}

// Main execution
if (require.main === module) {
  const cardId = process.argv[2];

  if (!cardId) {
    console.error('\nUsage: node scripts/improve-template.js <card-id>');
    console.error('Example: node scripts/improve-template.js comp-en18031-001-ai-governance-framework\n');
    console.error('Available cards:');
    Object.entries(EN18031_STANDARD_MAP).forEach(([num, info]) => {
      console.error(`  comp-en18031-${num}-${info.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
    });
    process.exit(1);
  }

  try {
    const analysis = analyzeCard(cardId);
    generateImprovementGuide(analysis);

    // Offer to generate template
    console.log('\n💡 Would you like to generate an improved template starter?');
    console.log('   Run: node scripts/improve-template.js ' + cardId + ' --generate\n');

    if (process.argv.includes('--generate')) {
      const template = generateImprovedTemplate(analysis);
      const outputPath = path.join(__dirname, '..', 'templates', `${cardId}-improved.md`);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, template);
      console.log(`✅ Improved template generated: ${outputPath}`);
      console.log('   Review, complete TODOs, then replace original file.\n');
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

module.exports = {
  analyzeCard,
  generateImprovementGuide,
  generateImprovedTemplate,
  EN18031_STANDARD_MAP,
};


