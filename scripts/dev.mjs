import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import chokidar from 'chokidar';
import bs from 'browser-sync';
import { buildAll, buildOne } from './build.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

await buildAll();

const server = bs.create();
server.init({
  server: repoRoot,
  startPath: '/index.html',
  files: [join(repoRoot, '*/index.html')],
  open: true,
  notify: false,
  ui: false,
  logLevel: 'info',
});

chokidar
  .watch(join(repoRoot, 'src'), { ignoreInitial: true })
  .on('all', (event, path) => {
    if (!path.endsWith('.mjml')) return;
    const isPartial = path.includes(`${repoRoot}/src/partials/`);
    console.log(`[${event}] ${path.replace(repoRoot + '/', '')}`);
    if (isPartial) {
      buildAll();
    } else {
      buildOne(basename(path));
    }
  });
