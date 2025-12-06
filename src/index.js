/**
 * @supernal/compliance-cards
 * Open-source compliance requirement cards
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { glob } = require('glob');

const FRAMEWORKS_DIR = path.join(__dirname, '..', 'frameworks');

/**
 * List all available frameworks
 * @returns {Array<{id: string, name: string, cardCount: number}>}
 */
function listFrameworks() {
  const dirs = fs.readdirSync(FRAMEWORKS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  return dirs.map(id => {
    const indexPath = path.join(FRAMEWORKS_DIR, id, 'overview', 'index.md');
    let name = id.toUpperCase();
    
    if (fs.existsSync(indexPath)) {
      try {
        const { data } = matter(fs.readFileSync(indexPath, 'utf8'));
        name = data.title || data.name || name;
      } catch (e) {
        // Use default name
      }
    }
    
    const templatesDir = path.join(FRAMEWORKS_DIR, id, 'templates');
    let cardCount = 0;
    if (fs.existsSync(templatesDir)) {
      cardCount = fs.readdirSync(templatesDir).filter(f => f.endsWith('.md')).length;
    }
    
    return { id, name, cardCount };
  });
}

/**
 * Get all cards for a framework
 * @param {string} frameworkId 
 * @returns {Array<Object>}
 */
function getFramework(frameworkId) {
  const templatesDir = path.join(FRAMEWORKS_DIR, frameworkId, 'templates');
  
  if (!fs.existsSync(templatesDir)) {
    throw new Error(`Framework not found: ${frameworkId}`);
  }
  
  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.md'));
  
  return files.map(file => {
    const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
    const { data, content: body } = matter(content);
    
    return {
      id: data.id || path.basename(file, '.md'),
      title: data.title,
      framework: frameworkId,
      ...data,
      content: body,
    };
  });
}

/**
 * Get a specific card by ID
 * @param {string} cardId - Card ID (e.g., 'comp-hipaa-043-access-control')
 * @returns {Object}
 */
function getCard(cardId) {
  // Extract framework from card ID
  const match = cardId.match(/^comp-([a-z0-9]+)-/);
  if (!match) {
    throw new Error(`Invalid card ID format: ${cardId}`);
  }
  
  const framework = match[1];
  const templatesDir = path.join(FRAMEWORKS_DIR, framework, 'templates');
  
  // Try exact match first
  let cardPath = path.join(templatesDir, `${cardId}.md`);
  
  if (!fs.existsSync(cardPath)) {
    // Try to find by pattern
    const files = fs.readdirSync(templatesDir);
    const found = files.find(f => f.startsWith(cardId) || f.includes(cardId));
    if (found) {
      cardPath = path.join(templatesDir, found);
    } else {
      throw new Error(`Card not found: ${cardId}`);
    }
  }
  
  const content = fs.readFileSync(cardPath, 'utf8');
  const { data, content: body } = matter(content);
  
  return {
    id: data.id || cardId,
    title: data.title,
    framework,
    ...data,
    content: body,
  };
}

/**
 * Search cards by query
 * @param {string} query 
 * @param {Object} options 
 * @returns {Array<Object>}
 */
function searchCards(query, options = {}) {
  const { frameworks } = options;
  const queryLower = query.toLowerCase();
  const results = [];
  
  const frameworkList = frameworks || listFrameworks().map(f => f.id);
  
  for (const fw of frameworkList) {
    try {
      const cards = getFramework(fw);
      for (const card of cards) {
        const searchText = `${card.title} ${card.content}`.toLowerCase();
        if (searchText.includes(queryLower)) {
          results.push(card);
        }
      }
    } catch (e) {
      // Skip frameworks that don't exist
    }
  }
  
  return results;
}

/**
 * Analyze overlap between two frameworks
 * @param {string} fw1 
 * @param {string} fw2 
 * @returns {Object}
 */
function getOverlap(fw1, fw2) {
  // Basic implementation - can be enhanced with mapping files
  const cards1 = getFramework(fw1);
  const cards2 = getFramework(fw2);
  
  // For now, return basic stats
  // Full implementation would use mapping/equivalence/ files
  return {
    framework1: { id: fw1, cardCount: cards1.length },
    framework2: { id: fw2, cardCount: cards2.length },
    full: [],
    partial: [],
    unique1: cards1.map(c => c.id),
    unique2: cards2.map(c => c.id),
    message: 'Full overlap analysis requires mapping files. See docs/mapping/',
  };
}

/**
 * Validate a card against schema
 * @param {Object} card 
 * @returns {Object}
 */
function validateCard(card) {
  const errors = [];
  
  if (!card.id) errors.push('Missing required field: id');
  if (!card.title) errors.push('Missing required field: title');
  if (!card.framework) errors.push('Missing required field: framework');
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  listFrameworks,
  getFramework,
  getCard,
  searchCards,
  getOverlap,
  validateCard,
  FRAMEWORKS_DIR,
};

