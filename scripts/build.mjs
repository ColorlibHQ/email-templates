import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import mjml2html from 'mjml';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(repoRoot, 'src');

export async function buildOne(file) {
  const id = basename(file, '.mjml');
  const inputPath = join(srcDir, file);
  const outputDir = join(repoRoot, id);
  const outputPath = join(outputDir, 'index.html');

  const source = readFileSync(inputPath, 'utf8');
  const { html, errors } = await mjml2html(source, {
    filePath: inputPath,
    validationLevel: 'soft',
    keepComments: false,
  });

  for (const e of errors ?? []) {
    console.error(`  ! ${e.formattedMessage ?? e.message}`);
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, html);
  console.log(`  ${file} -> ${id}/index.html`);
  return errors?.length ?? 0;
}

export async function buildAll() {
  const files = readdirSync(srcDir)
    .filter((f) => /^\d+\.mjml$/.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Building ${files.length} template${files.length === 1 ? '' : 's'}...`);
  let errors = 0;
  for (const file of files) errors += await buildOne(file);
  console.log(errors ? `Done with ${errors} warning(s).` : 'Done.');
  return errors;
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  await buildAll();
}
