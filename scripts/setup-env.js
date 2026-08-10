import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envExamplePath = path.join(rootDir, '.env.example');
const envPath = path.join(rootDir, '.env');

async function main() {
  const force = process.argv.includes('--force') || process.argv.includes('-f');

  try {
    const exists = await fs.stat(envPath).then(() => true).catch(() => false);
    if (exists && !force) {
      console.log('.env already exists. Use --force to overwrite.');
      return;
    }

    const exampleContent = await fs.readFile(envExamplePath, 'utf8');
    await fs.writeFile(envPath, exampleContent, { encoding: 'utf8', mode: 0o600 });

    console.log(`.env created from .env.example${force ? ' (overwritten)' : ''}`);
  } catch (error) {
    console.error('Failed to create .env:', error.message);
    process.exit(1);
  }
}

main();
