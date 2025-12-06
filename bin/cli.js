#!/usr/bin/env node

/**
 * @supernal/compliance-cards CLI
 */

const { Command } = require('commander');
const chalk = require('chalk');
const Table = require('cli-table3');
const {
  listFrameworks,
  getFramework,
  getCard,
  searchCards,
  getOverlap,
  validateCard,
} = require('../src');

const program = new Command();

program
  .name('compliance-cards')
  .description('Open-source compliance requirement cards')
  .version(require('../package.json').version);

// List command
program
  .command('list [framework]')
  .description('List frameworks or cards in a framework')
  .option('-f, --format <format>', 'Output format: table, json', 'table')
  .action((framework, options) => {
    if (framework) {
      // List cards in framework
      try {
        const cards = getFramework(framework);
        
        if (options.format === 'json') {
          console.log(JSON.stringify(cards, null, 2));
        } else {
          const table = new Table({
            head: [chalk.cyan('ID'), chalk.cyan('Title'), chalk.cyan('Priority')],
            colWidths: [35, 50, 10],
          });
          
          cards.forEach(card => {
            table.push([card.id, card.title || 'Untitled', card.priority || '-']);
          });
          
          console.log(`\n${chalk.bold(`${framework.toUpperCase()} Cards`)} (${cards.length} total)\n`);
          console.log(table.toString());
        }
      } catch (e) {
        console.error(chalk.red(`Error: ${e.message}`));
        process.exit(1);
      }
    } else {
      // List all frameworks
      const frameworks = listFrameworks();
      
      if (options.format === 'json') {
        console.log(JSON.stringify(frameworks, null, 2));
      } else {
        const table = new Table({
          head: [chalk.cyan('Framework'), chalk.cyan('Name'), chalk.cyan('Cards')],
          colWidths: [15, 45, 10],
        });
        
        frameworks.forEach(fw => {
          table.push([fw.id, fw.name, fw.cardCount]);
        });
        
        console.log(`\n${chalk.bold('Available Compliance Frameworks')}\n`);
        console.log(table.toString());
        console.log(`\nTotal: ${frameworks.reduce((sum, f) => sum + f.cardCount, 0)} cards across ${frameworks.length} frameworks\n`);
      }
    }
  });

// Get command
program
  .command('get <cardId>')
  .description('Get a specific compliance card')
  .option('-f, --format <format>', 'Output format: markdown, json, yaml', 'markdown')
  .action((cardId, options) => {
    try {
      const card = getCard(cardId);
      
      if (options.format === 'json') {
        console.log(JSON.stringify(card, null, 2));
      } else {
        console.log(card.content);
      }
    } catch (e) {
      console.error(chalk.red(`Error: ${e.message}`));
      process.exit(1);
    }
  });

// Search command
program
  .command('search <query>')
  .description('Search compliance cards')
  .option('--framework <frameworks>', 'Comma-separated frameworks to search')
  .option('-f, --format <format>', 'Output format: table, json', 'table')
  .action((query, options) => {
    const frameworks = options.framework?.split(',');
    const results = searchCards(query, { frameworks });
    
    if (options.format === 'json') {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(`\n${chalk.bold(`Search results for "${query}"`)} (${results.length} found)\n`);
      
      if (results.length === 0) {
        console.log(chalk.yellow('No cards found matching your query.'));
      } else {
        const table = new Table({
          head: [chalk.cyan('ID'), chalk.cyan('Title'), chalk.cyan('Framework')],
          colWidths: [35, 45, 12],
        });
        
        results.slice(0, 20).forEach(card => {
          table.push([card.id, card.title || 'Untitled', card.framework]);
        });
        
        console.log(table.toString());
        
        if (results.length > 20) {
          console.log(chalk.gray(`\n... and ${results.length - 20} more results`));
        }
      }
    }
  });

// Overlap command
program
  .command('overlap <framework1> <framework2>')
  .description('Analyze overlap between two frameworks')
  .option('-f, --format <format>', 'Output format: table, json', 'table')
  .action((fw1, fw2, options) => {
    try {
      const overlap = getOverlap(fw1, fw2);
      
      if (options.format === 'json') {
        console.log(JSON.stringify(overlap, null, 2));
      } else {
        console.log(`\n${chalk.bold(`${fw1.toUpperCase()} ↔ ${fw2.toUpperCase()} Overlap Analysis`)}\n`);
        console.log(`${fw1.toUpperCase()}: ${overlap.framework1.cardCount} cards`);
        console.log(`${fw2.toUpperCase()}: ${overlap.framework2.cardCount} cards`);
        console.log(`\n${chalk.yellow(overlap.message)}`);
        console.log(`\n${chalk.gray('For full overlap mapping, see: https://github.com/ianderrington/compliance-cards/tree/main/mapping')}`);
      }
    } catch (e) {
      console.error(chalk.red(`Error: ${e.message}`));
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate [path]')
  .description('Validate compliance cards')
  .action((targetPath) => {
    console.log(chalk.bold('\nValidating compliance cards...\n'));
    
    const frameworks = listFrameworks();
    let totalCards = 0;
    let validCards = 0;
    const errors = [];
    
    frameworks.forEach(fw => {
      try {
        const cards = getFramework(fw.id);
        totalCards += cards.length;
        
        cards.forEach(card => {
          const result = validateCard(card);
          if (result.valid) {
            validCards++;
          } else {
            errors.push({ card: card.id, errors: result.errors });
          }
        });
      } catch (e) {
        console.error(chalk.red(`Error validating ${fw.id}: ${e.message}`));
      }
    });
    
    console.log(`${chalk.green('✓')} Validated ${validCards}/${totalCards} cards`);
    
    if (errors.length > 0) {
      console.log(chalk.yellow(`\n${errors.length} cards with issues:\n`));
      errors.slice(0, 10).forEach(e => {
        console.log(`  ${chalk.red('✗')} ${e.card}: ${e.errors.join(', ')}`);
      });
      if (errors.length > 10) {
        console.log(chalk.gray(`  ... and ${errors.length - 10} more`));
      }
    } else {
      console.log(chalk.green('\nAll cards valid!'));
    }
  });

program.parse();

