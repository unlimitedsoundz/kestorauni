const fs = require('fs');
const path = require('path');

const root = 'E:\\Cannogacollege';

function replaceInFile(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [search, replace] of replacements) {
      content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (e) {
    console.error(`Error processing ${filePath}:`, e.message);
    return false;
  }
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'scratch' && file !== 'supabase') {
      results = results.concat(walk(filePath));
    } else if (stat && !stat.isDirectory() && /\.(ts|tsx|js|jsx|css|json|md)$/.test(file)) {
      results.push(filePath);
    }
  }
  return results;
}

const files = walk(root);
console.log(`Found ${files.length} files`);

let changed = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  
  // Skip blog-app subdirectory
  if (rel.startsWith('blog-app\\')) continue;
  
  const replacements = [];
  
  // Brand name replacements
  replacements.push(['Cannoga College', 'Kestora University']);
  
  // URL replacements
  replacements.push(['cannogacollege\\.ca', 'kestora.online']);
  replacements.push(['kestora\\.fi', 'kestora.online']);
  
  // Logo replacements
  replacements.push(['logo-cannoga\\.png', 'logo-kestora.png']);
  
  // Email replacements
  replacements.push(['info@cannogacollege\\.ca', 'info@kestora.online']);
  replacements.push(['admissions@cannogacollege\\.ca', 'admissions@kestora.online']);
  replacements.push(['admissions@kestora\\.fi', 'admissions@kestora.online']);
  
  // Address replacements
  replacements.push(['2368 Midway Ave', 'Pohjoisesplanadi 51']);
  replacements.push(['Ottawa, ON K2B 5J8', '00150 Helsinki, Uusimaa']);
  replacements.push(['Ottawa, ON', 'Helsinki, Uusimaa']);
  replacements.push(['K2B 5J8', '00150']);
  
  // Ottawa -> Helsinki (but preserve some specific cases)
  // We'll do a targeted replacement that avoids "Ottawa" in certain URLs
  replacements.push(['Cannoga College – Ottawa Campus', 'Kestora University – Helsinki Campus']);
  replacements.push(['Cannoga College Ottawa', 'Kestora University Helsinki Campus']);
  
  // Specific Ottawa -> Helsinki replacements
  replacements.push(['our Ottawa Campus', 'our Helsinki Campus']);
  replacements.push(['Ottawa Campus', 'Helsinki Campus']);
  replacements.push(['Ottawa Campus (Single Location)', 'Helsinki Campus (Single Location)']);
  replacements.push(['Ottawa-area', 'Helsinki-area']);
  replacements.push(['Ottawa River', 'Vantaa River']);
  replacements.push(['Ottawa Community Housing', 'Helsinki Community Housing']);
  replacements.push(['city of Ottawa', 'city of Helsinki']);
  replacements.push(['Ottawa, Canada', 'Helsinki, Finland']);
  replacements.push(['in Ottawa and Canada', 'in Helsinki and Finland']);
  replacements.push(['expanded Ottawa campus', 'expanded Helsinki campus']);
  replacements.push(['Ottawa, Canada resident enquiries', 'Helsinki, Finland resident enquiries']);
  
  // In the scratch directory, keep original replacements but skip some aggressive ones
  const isScratch = rel.startsWith('scratch\\');
  
  if (replaceInFile(file, replacements)) {
    changed++;
    console.log(`Updated: ${rel}`);
  }
}

console.log(`\nTotal files changed: ${changed}`);
