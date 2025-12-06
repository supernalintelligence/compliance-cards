# Contributing to Compliance Cards

Thank you for your interest in contributing! This document provides guidelines for contributing to the compliance cards library.

## Types of Contributions

### 🐛 Bug Fixes
- Incorrect control references
- Typos in card content
- Broken cross-framework mappings

### 📝 Evidence Improvements
- Better evidence requirements based on audit experience
- Additional evidence collection methods
- Clearer evidence specifications

### 🔗 Cross-Framework Mappings
- New overlap discoveries between frameworks
- Corrections to existing mappings
- Additional equivalence relationships

### 📚 New Framework Cards
- Cards for frameworks not yet covered
- Additional cards for existing frameworks
- Framework version updates (e.g., ISO 27001:2022)

### 🧪 Gherkin Improvements
- More precise acceptance criteria
- Additional test scenarios
- Better Given/When/Then structure

## How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/ianderrington/compliance-cards.git
cd compliance-cards
git checkout -b feature/your-improvement
```

### 2. Make Your Changes

#### For Card Updates

Cards follow this structure:

```markdown
---
id: comp-{framework}-{number}-{slug}
title: COMP-{FRAMEWORK}-{NUMBER} - {Title}
---

# COMP-{FRAMEWORK}-{NUMBER}: {Title}

## Overview
**Purpose**: {description}
**{Framework} Control**: {reference}
**Category**: {categories}
**Priority**: {High|Medium|Low}

## Acceptance Criteria

```gherkin
Feature: {Control Name}
  Scenario: {Scenario}
    Given {context}
    When {action}
    Then {outcome}
```

## Technical Context
{implementation guidance}

## Evidence Requirements
{what auditors need}

## Related Controls
### Cross-Framework
- {other framework mappings}
```

### 3. Validate Your Changes

```bash
npm run validate
npm test
```

### 4. Submit a Pull Request

- Use clear PR title: `[FRAMEWORK] Brief description`
- Include context about the change
- Reference any auditor feedback or regulatory sources

## Card Guidelines

### Gherkin Acceptance Criteria

✅ **DO:**
```gherkin
Scenario: Access denied without authentication
  Given a user has not authenticated
  When they attempt to access protected health information
  Then access shall be denied
  And the attempt shall be logged
```

❌ **DON'T:**
```gherkin
Scenario: Security
  Given security is needed
  When user tries stuff
  Then it should be secure
```

### Evidence Requirements

✅ **DO:**
- Be specific: "Quarterly access review reports signed by system owner"
- Include retention: "Retain for 6 years per HIPAA requirements"
- Specify format: "PDF or signed digital document"

❌ **DON'T:**
- Vague: "Documentation of access controls"
- Missing retention: "Access logs"

### Cross-Framework Mappings

Use these equivalence levels:
- `full`: Requirements are functionally identical
- `partial`: Significant overlap with some unique elements
- `foundational`: One supports but doesn't complete the other

## Review Process

1. **Automated checks** run on PR (validation, lint)
2. **Community review** for technical accuracy
3. **Maintainer review** for consistency
4. **Merge** once approved

## Questions?

- Open an issue for questions
- Join discussions in existing issues
- Check the [documentation](./docs/)

## Code of Conduct

Be respectful, constructive, and professional. We're building compliance tools—let's be compliant with basic human decency too.

---

Thank you for helping make compliance more accessible! 🎉

