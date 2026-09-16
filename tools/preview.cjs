'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.ttf':'font/ttf','.mp4':'video/mp4','.m3u8':'application/vnd.apple.mpegurl','.ts':'video/mp2t','.txt':'text/plain; charset=utf-8'};
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch {res.writeHead(400); return res.end('URL invalida');}
  // Permite testar o mesmo pacote na raiz e em /portfolio/.
  if (pathname === '/portfolio') {res.writeHead(301, {Location:'/portfolio/'}); return res.end();}
  if (pathname.startsWith('/portfolio/')) pathname = pathname.slice('/portfolio'.length);
  let file = path.resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + path.sep)) {res.writeHead(403); return res.end();}
  if (file === root || pathname.endsWith('/')) file = path.join(file, 'index.html');
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) {res.writeHead(404); return res.end('Arquivo nao encontrado');}
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache'); res.setHeader('Accept-Ranges', 'bytes');
    const range = /bytes=(\d+)-(\d*)/.exec(req.headers.range || '');
    if (range) {
      const start = Number(range[1]), end = range[2] ? Math.min(Number(range[2]), stat.size - 1) : stat.size - 1;
      if (start > end || start >= stat.size) {res.writeHead(416, {'Content-Range':`bytes */${stat.size}`}); return res.end();}
      res.writeHead(206, {'Content-Range':`bytes ${start}-${end}/${stat.size}`, 'Content-Length':end - start + 1});
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(file, {start, end}).pipe(res);
    } else {
      res.setHeader('Content-Length', stat.size);
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(file).pipe(res);
    }
  });
}).listen(4173, '127.0.0.1', () => console.log('Previa: http://127.0.0.1:4173/portfolio/ — encerre com Ctrl+C'));
