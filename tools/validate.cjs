'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const exists = rel => {
  assert.equal(typeof rel, 'string', 'Caminho de arquivo ausente');
  assert(!/^(?:[a-z]+:|\/|\\)/i.test(rel), `Use um caminho relativo: ${rel}`);
  const full = path.resolve(root, rel);
  assert(full.startsWith(root + path.sep), `Arquivo fora da pasta: ${rel}`);
  assert(fs.statSync(full, {throwIfNoEntry:false})?.isFile(), `Arquivo ausente: ${rel}`);
  return full;
};
try {
  const data = JSON.parse(fs.readFileSync(exists('data.json'), 'utf8'));
  let images = 0, videos = 0, hls = 0, segments = 0;
  assert.equal(data.tabs.length, 7, 'Devem existir sete abas');
  function folder(node) {
    let later = false;
    for (const m of node.media) {
      const first = m.width === 1920 && m.height === 1080;
      if (first) assert(!later, `Ordem incorreta em ${node.name}`);
      else later = true;
      assert(m.width > 0 && m.height > 0, `Dimensões ausentes em ${m.name}`);
      if (m.kind === 'image') { images++; exists(m.src); }
      else {
        videos++; exists(m.poster); assert(m.duration > 0, `Duração ausente: ${m.name}`);
        exists(m.src);
        if (m.hls) {
          hls++;
          const playlist = fs.readFileSync(exists(m.hls), 'utf8');
          assert(playlist.includes('#EXT-X-ENDLIST'), `Vídeo incompleto: ${m.name}`);
          let duration = 0;
          for (const line of playlist.split(/\r?\n/)) {
            if (line.startsWith('#EXTINF:')) duration += Number(line.slice(8).split(',')[0]);
            else if (line && !line.startsWith('#')) { exists(path.join(path.dirname(m.hls), line)); segments++; }
          }
          assert(Math.abs(duration - m.duration) < 0.15, `Duração divergente: ${m.name}`);
        }
      }
    }
    node.children.forEach(folder);
  }
  data.tabs.forEach(folder);
  assert.equal(images, 60); assert.equal(videos, 10); assert.equal(hls, 5); assert.equal(segments, 124);
  const html = fs.readFileSync(exists('index.html'), 'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
    if (!match[1].startsWith('data:') && !match[1].includes('://')) exists(match[1]);
  }
  exists('vendor/hls.min.js'); exists('fonts/Pixelify-Sans-OFL.txt'); exists('fonts/Space-Mono-OFL.txt');
  exists('vendor/hls-LICENSE.txt'); exists('vendor/Apache-2.0.txt');
  const files = [];
  function walk(dir) { for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    if (['.git', '_site'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    assert(!entry.isSymbolicLink(), `Link simbólico não suportado: ${file}`);
    if (entry.isDirectory()) walk(file); else if (entry.isFile()) files.push(file);
  }}
  walk(root);
  const total = files.reduce((n, file) => {const size = fs.statSync(file).size;
    assert(size < 25 * 1024 * 1024, `Arquivo acima de 25 MiB: ${file}`); return n + size; }, 0);
  assert(total < 1024 ** 3, 'Pacote acima do limite de 1 GiB');
  console.log(`OK: 7 abas, ${images} imagens, ${videos} vídeos, ${hls} playlists e ${segments} segmentos.`);
  console.log(`${files.length} arquivos; ${(total / 1024 ** 2).toFixed(1)} MiB. Referências e durações verificadas.`);
} catch (error) { console.error('Falha na conferência:', error.message); process.exitCode = 1; }
