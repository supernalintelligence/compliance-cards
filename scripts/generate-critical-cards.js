#!/usr/bin/env node
/**
 * Generate improved EN18031 compliance cards for critical priority
 * 
 * This script creates high-quality content for the 5 critical EN18031 cards
 * following the pattern established in comp-en18031-001
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'frameworks', 'en18031', 'templates');

// Card specifications for critical priority cards
const CRITICAL_CARDS = {
  '002': {
    title: 'AI Risk Management',
    section: '5.1.2',
    purpose: 'Establish systematic AI risk identification, assessment, and mitigation processes',
    category: 'ai-governance',
    crossFramework: {
      iso42001: '6.1 (Risk Assessment)',
      euAiAct: 'Article 9 (Risk Management System)',
      iso24028: 'Robustness',
      nistAiRmf: 'MAP 1.1, MEASURE 2.1',
    },
    relatedControls: ['001', '009', '010', '019'],
    description: `Implements EN 18031 Section 5.1.2 to establish comprehensive AI risk management processes covering the entire AI system lifecycle. This includes systematic identification of AI-specific risks (bias, drift, adversarial attacks, safety failures), quantitative and qualitative risk assessment methodologies, risk mitigation strategies, and continuous risk monitoring.

The risk management framework must address:
1. **Risk Identification**: Systematic discovery of AI-specific risks throughout lifecycle
2. **Risk Assessment**: Quantitative scoring using likelihood and impact matrices
3. **Risk Mitigation**: Specific controls and safeguards for identified risks
4. **Risk Monitoring**: Continuous tracking of risk indicators and emerging threats
5. **Risk Communication**: Transparent reporting to stakeholders and governance
6. **Risk Documentation**: Comprehensive audit trail of risk decisions`,
  },
  '009': {
    title: 'Training Data Quality',
    section: '5.3.1',
    purpose: 'Ensure AI training data meets quality, completeness, and representativeness standards',
    category: 'ai-data',
    crossFramework: {
      iso42001: '7.5 (Data Management)',
      euAiAct: 'Article 10 (Data and Data Governance)',
      iso24028: 'Robustness',
      nistAiRmf: 'MAP 2.2, MEASURE 3.1',
    },
    relatedControls: ['010', '011', '012', '015'],
    description: `Implements EN 18031 Section 5.3.1 to establish comprehensive training data quality management processes. Ensures AI training data is accurate, complete, representative, properly labeled, and free from systematic biases that could compromise model performance or fairness.

Training data quality requirements:
1. **Accuracy**: Data correctly represents ground truth without systematic errors
2. **Completeness**: Adequate coverage of problem space and edge cases
3. **Representativeness**: Balanced representation across all relevant populations
4. **Labeling Quality**: Consistent, accurate annotations with inter-annotator agreement
5. **Freshness**: Data currency appropriate for use case and concept drift risks
6. **Provenance**: Clear source tracking and lineage documentation`,
  },
  '010': {
    title: 'Data Bias Detection',
    section: '5.3.2',
    purpose: 'Detect and mitigate biases in training data that could lead to discriminatory AI outcomes',
    category: 'ai-data',
    crossFramework: {
      iso42001: '7.5 (Data Management)',
      euAiAct: 'Article 10 (Data Governance - Bias)',
      iso24028: 'Fairness',
      nistAiRmf: 'MEASURE 2.3, MANAGE 1.2',
    },
    relatedControls: ['009', '021', '012'],
    description: `Implements EN 18031 Section 5.3.2 to systematically detect and address biases in training data that could result in discriminatory or unfair AI system outcomes. Establishes processes for bias auditing, quantitative bias measurement, and data rebalancing or augmentation strategies.

Bias detection must address:
1. **Protected Attributes**: Systematic analysis of sensitive demographic variables
2. **Representation Bias**: Underrepresentation or overrepresentation of groups
3. **Label Bias**: Systematic labeling errors correlated with protected attributes
4. **Measurement Bias**: Systematic data collection errors affecting specific groups
5. **Sampling Bias**: Non-representative sampling that excludes or undersamples groups
6. **Historical Bias**: Biases reflecting historical discrimination in source data`,
  },
  '017': {
    title: 'Model Validation',
    section: '5.4.2',
    purpose: 'Validate AI models meet performance, safety, and fairness requirements before deployment',
    category: 'ai-model',
    crossFramework: {
      iso42001: '8.3 (AI System Validation)',
      euAiAct: 'Article 15 (Accuracy, Robustness, Cybersecurity)',
      iso24028: 'Robustness and Reliability',
      nistAiRmf: 'MEASURE 2.1, MEASURE 2.2',
    },
    relatedControls: ['009', '016', '019', '021'],
    description: `Implements EN 18031 Section 5.4.2 to establish rigorous model validation processes ensuring AI models meet all performance, fairness, safety, and robustness requirements before production deployment. Validation includes statistical performance testing, fairness auditing, adversarial robustness testing, and safety verification.

Model validation requirements:
1. **Performance Validation**: Quantitative metrics on holdout test sets
2. **Fairness Validation**: Demographic parity and equalized odds testing
3. **Robustness Validation**: Adversarial examples and distribution shift testing
4. **Safety Validation**: Edge case and failure mode analysis
5. **Explainability Validation**: Verification of model interpretability requirements
6. **Regulatory Validation**: Compliance with applicable regulatory requirements`,
  },
};

console.log('EN 18031 Critical Cards Generation Script');
console.log('==========================================\n');
console.log('This script will generate high-quality content for 4 remaining critical cards:');
console.log('- 002: AI Risk Management');
console.log('- 009: Training Data Quality');
console.log('- 010: Data Bias Detection');
console.log('- 017: Model Validation\n');

console.log('Note: Card 001 (AI Governance Framework) already completed (613 lines, 0 boilerplate).\n');

console.log('Due to the comprehensive nature of these cards (~600 lines each),');
console.log('this script provides specifications for AI-assisted generation.\n');

console.log('Specifications saved. Use these to generate each card with proper:');
console.log('- EN 18031 section references');
console.log('- Cross-framework mappings (ISO 42001, EU AI Act, NIST AI RMF)');
console.log('- Specific Gherkin scenarios (6+ scenarios each)');
console.log('- Technical implementation details');
console.log('- Evidence requirements');
console.log('- Testing strategies');
console.log('- Best practices and pitfalls');
console.log('- Recommended tools\n');

console.log('Each card should be ~600 lines following the pattern from card 001.');

// Save specifications for reference
const specsPath = path.join(__dirname, '..', 'EN18031-CRITICAL-CARDS-SPECS.json');
fs.writeFileSync(specsPath, JSON.stringify(CRITICAL_CARDS, null, 2));
console.log(`\nSpecifications saved to: ${specsPath}`);

console.log('\nNext steps:');
console.log('1. Use these specifications with AI assistance to generate each card');
console.log('2. Follow the structure and quality of comp-en18031-001');
console.log('3. Run audit after each card: node scripts/audit-templates.js');
console.log('4. Update EN18031-IMPROVEMENT-PROGRESS.md');


