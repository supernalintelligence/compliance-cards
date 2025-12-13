#!/usr/bin/env node
/**
 * Audit compliance card templates to identify boilerplate-only files
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const FRAMEWORKS_DIR = path.join(__dirname, '..', 'frameworks');

const INDICATORS_OF_BOILERPLATE = [
  /establish comprehensive .* framework/i,
  /implements .* control .* to .* comprehensive/i,
  /This control ensures AI system trustworthiness/i,
  /Given AI system requirements are identified/i,
  /When control measures are implemented/i,
  /Then AI system shall be trustworthy/i,
];

function auditFramework(frameworkId) {
  const templatesDir = path.join(FRAMEWORKS_DIR, frameworkId, 'templates');
  
  if (!fs.existsSync(templatesDir)) {
    return [];
  }

  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.md') && f !== 'index.md');
  const boilerplateFiles = [];

  for (const file of files) {
    const fullPath = path.join(templatesDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data, content: body } = matter(content);

    // Check indicators
    let boilerplateScore = 0;
    for (const indicator of INDICATORS_OF_BOILERPLATE) {
      if (indicator.test(body)) {
        boilerplateScore++;
      }
    }

    // Check if scenarios are generic
    const hasGenericScenarios = body.includes('AI Control Implementation') && 
                                 body.includes('AI Control Verification');

    // Check content length and uniqueness
    const lines = body.split('\n').filter(l => l.trim().length > 0);
    const uniqueLines = new Set(lines.filter(l => !l.match(/^#+\s/) && !l.match(/^-\s/))).size;

    const isBoilerplate = boilerplateScore >= 3 || (hasGenericScenarios && uniqueLines < 50);

    if (isBoilerplate) {
      boilerplateFiles.push({
        file,
        id: data.id,
        title: data.title,
        boilerplateScore,
        hasGenericScenarios,
        uniqueLines,
        lineCount: lines.length,
        purpose: data.purpose || 'N/A',
      });
    }
  }

  return boilerplateFiles;
}

function generateReport() {
  const frameworks = fs.readdirSync(FRAMEWORKS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const report = {
    date: new Date().toISOString(),
    frameworks: {},
    summary: {
      totalFrameworks: 0,
      frameworksWithBoilerplate: 0,
      totalBoilerplateFiles: 0,
    },
  };

  for (const framework of frameworks) {
    const boilerplateFiles = auditFramework(framework);
    
    if (boilerplateFiles.length > 0) {
      report.frameworks[framework] = {
        boilerplateCount: boilerplateFiles.length,
        files: boilerplateFiles,
      };
      report.summary.frameworksWithBoilerplate++;
      report.summary.totalBoilerplateFiles += boilerplateFiles.length;
    }
    report.summary.totalFrameworks++;
  }

  return report;
}

// Main execution
if (require.main === module) {
  console.log('Auditing compliance card templates...\n');
  
  const report = generateReport();

  console.log('=== AUDIT SUMMARY ===');
  console.log(`Total Frameworks: ${report.summary.totalFrameworks}`);
  console.log(`Frameworks with Boilerplate: ${report.summary.frameworksWithBoilerplate}`);
  console.log(`Total Boilerplate Files: ${report.summary.totalBoilerplateFiles}\n`);

  console.log('=== DETAILED FINDINGS ===\n');

  for (const [framework, data] of Object.entries(report.frameworks)) {
    console.log(`\n${framework.toUpperCase()}: ${data.boilerplateCount} boilerplate files`);
    console.log('─'.repeat(60));
    
    for (const file of data.files.slice(0, 5)) {
      console.log(`  ${file.id}`);
      console.log(`    Purpose: ${file.purpose}`);
      console.log(`    Boilerplate Score: ${file.boilerplateScore}/6`);
      console.log(`    Unique Lines: ${file.uniqueLines}`);
      console.log(`    Generic Scenarios: ${file.hasGenericScenarios ? 'Yes' : 'No'}`);
      console.log();
    }

    if (data.files.length > 5) {
      console.log(`  ... and ${data.files.length - 5} more`);
    }
  }

  // Save detailed report
  const reportPath = path.join(__dirname, '..', 'BOILERPLATE_AUDIT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
}

module.exports = { auditFramework, generateReport };


