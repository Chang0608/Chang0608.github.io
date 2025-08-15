const fs = require('fs');
const path = require('path');

const SOLUTIONS_DIR = path.resolve(__dirname, '../../src/solutions');
const OUTPUT_FILE = path.resolve(__dirname, '../../src/data/solutions-data.ts');

function parseSolution(content, filename) {
  const title = content.match(/^#\s+(.*)/)?.[1] || filename.replace('.md', '');
  const problem = content.match(/problem:\s+(.*)/)?.[1] || '';
  const tags = content.match(/tags:\s+(.*)/)?.[1]?.split(',').map(t => t.trim()) || [];

  return {
    id: filename.replace('.md', ''),
    title,
    problem,
    tags,
    fullText: content
  };
}

function generateSolutionsData() {
  const files = fs.readdirSync(SOLUTIONS_DIR).filter(f => f.endsWith('.md'));
  const result = files.map(filename => {
    const filepath = path.join(SOLUTIONS_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    return parseSolution(content, filename);
  });

  const output = `export const solutions = ${JSON.stringify(result, null, 2)}\n`;
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`✅ solutions-data.ts generated with ${result.length} entries.`);
}

generateSolutionsData();
