import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..', 'dist');
const port = Number(process.env.PORT || 4173);
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.m3u8': 'application/vnd.apple.mpegurl',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
  '.ts': 'video/mp2t',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400).end('Endereço inválido');
    return;
  }

  const relativePath = normalize(pathname === '/' ? 'index.html' : pathname.replace(/^[/\\]+/, ''));
  let file = resolve(root, relativePath);
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(403).end('Acesso negado');
    return;
  }

  try {
    if (statSync(file).isDirectory()) file = join(file, 'index.html');
    const info = statSync(file);
    response.writeHead(200, {
      'Content-Type': mime[extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': 'no-cache',
    });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Arquivo não encontrado');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Prévia disponível em http://localhost:${port}`);
  console.log('Pressione Ctrl+C para encerrar.');
});
