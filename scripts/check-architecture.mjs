import fs from 'fs';
import path from 'path';

const root = process.cwd();
const featureRoot = path.join(root, 'client/app/features');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

function rel(p) { return path.relative(root, p).replaceAll('\\', '/'); }

const jsFiles = walk(path.join(root, 'client/app')).filter(f => f.endsWith('.js'));
const errors = [];

for (const file of jsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const imports = [...content.matchAll(/from\s+["']([^"']+)["']/g)].map(m => m[1]);
  const fileRel = rel(file);

  const m = fileRel.match(/^client\/app\/features\/([^/]+)\//);
  const currentFeature = m?.[1];

  for (const imp of imports) {
    if (!imp.startsWith('.')) continue;
    const resolved = rel(path.normalize(path.join(path.dirname(file), imp)) + (imp.endsWith('.js') ? '' : '.js'));

    if (currentFeature && resolved.startsWith('client/app/features/')) {
      const targetFeature = resolved.split('/')[3];
      if (targetFeature !== currentFeature) {
        errors.push(`${fileRel} imports another feature directly: ${imp} -> ${resolved}`);
      }
    }

    if (currentFeature && resolved.includes('/shared/') === false && resolved.includes('/state/') === false && resolved.includes(`/features/${currentFeature}/`) === false) {
      // allow core base classes
      if (!resolved.startsWith('core/')) {
        errors.push(`${fileRel} imports disallowed layer: ${imp} -> ${resolved}`);
      }
    }
  }
}

if (errors.length) {
  console.error('Architecture boundary check failed:');
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log('Architecture boundary check passed.');
