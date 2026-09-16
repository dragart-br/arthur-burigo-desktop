import { readFileSync, readdirSync, statSync, lstatSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const siteRoot = join(projectRoot, 'dist');
const errors = [];
const warnings = [];
const referencedFiles = new Set();

function sitePath(value) {
  return normalize(String(value).split(/[?#]/, 1)[0]).replace(/^[/\\]+/, '');
}

function requireFile(value, source) {
  if (!value || /^(?:https?:|data:|#)/i.test(value)) return;
  const rel = sitePath(value);
  const full = resolve(siteRoot, rel);
  if (full !== siteRoot && !full.startsWith(siteRoot + '/')) {
    errors.push(`${source}: caminho fora de dist (${value})`);
    return;
  }
  referencedFiles.add(rel);
  try {
    if (!statSync(full).isFile()) errors.push(`${source}: não é um arquivo (${value})`);
  } catch {
    errors.push(`${source}: arquivo ausente (${value})`);
  }
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      errors.push(`Link simbólico não permitido no GitHub Pages: ${relative(projectRoot, full)}`);
      return [];
    }
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function inspectFolder(folder, trail = folder.slug || folder.name || 'pasta') {
  for (const media of folder.media || []) {
    requireFile(media.src, `${trail} / ${media.name} / src`);
    requireFile(media.poster, `${trail} / ${media.name} / poster`);
    requireFile(media.hls, `${trail} / ${media.name} / HLS`);

    if (media.hls) {
      const playlistRel = sitePath(media.hls);
      const playlistFull = resolve(siteRoot, playlistRel);
      try {
        const playlist = readFileSync(playlistFull, 'utf8');
        for (const line of playlist.split(/\r?\n/)) {
          const item = line.trim();
          if (item && !item.startsWith('#')) {
            requireFile(join(dirname(playlistRel), item), `${trail} / ${media.name} / segmento HLS`);
          }
        }
      } catch {
        // A ausência do manifesto já foi registrada por requireFile.
      }
    }
  }

  for (const child of folder.children || []) {
    inspectFolder(child, `${trail} / ${child.slug || child.name}`);
  }
}

for (const required of [
  'index.html',
  'style.css',
  'app.js',
  'data.json',
  'media/Logo.svg',
  'media/portrait.webp',
  'fonts/pixel.ttf',
  'fonts/mono.ttf',
  'vendor/hls.min.js',
]) {
  requireFile(required, 'estrutura principal');
}

let data;
try {
  data = JSON.parse(readFileSync(join(siteRoot, 'data.json'), 'utf8'));
} catch (error) {
  errors.push(`data.json inválido: ${error.message}`);
}

for (const tab of data?.tabs || []) {
  inspectFolder(tab);
  for (const project of tab.projects || []) {
    try {
      const url = new URL(project.url);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('protocolo inválido');
    } catch {
      errors.push(`${tab.slug} / ${project.name}: URL externa inválida (${project.url})`);
    }
  }
}

for (const file of ['index.html', 'style.css', 'app.js']) {
  const source = readFileSync(join(siteRoot, file), 'utf8');
  const rootRelative = /(?:src|href)\s*=\s*["']\/(?!\/)|url\(\s*["']?\/(?!\/)/g;
  if (rootRelative.test(source)) {
    errors.push(`${file}: contém caminho iniciado por “/”, incompatível com páginas de projeto do GitHub`);
  }
}

const files = walk(siteRoot);
let totalBytes = 0;
for (const file of files) {
  const info = lstatSync(file);
  totalBytes += info.size;
  if (info.size >= 100 * 1024 * 1024) {
    errors.push(`${relative(projectRoot, file)} excede o limite de 100 MiB por arquivo do GitHub`);
  } else if (info.size >= 50 * 1024 * 1024) {
    warnings.push(`${relative(projectRoot, file)} tem mais de 50 MiB`);
  }
}

if (totalBytes >= 1024 * 1024 * 1024) {
  errors.push('O site publicado excede o limite de 1 GiB do GitHub Pages');
}

for (const warning of warnings) console.warn(`AVISO: ${warning}`);

if (errors.length) {
  console.error('\nFalha na verificação do portfólio:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const mib = (totalBytes / 1024 / 1024).toFixed(1);
console.log(`Portfólio validado: ${files.length} arquivos, ${mib} MiB e ${referencedFiles.size} referências conferidas.`);
