# Arthur Búrigo — Portfólio

Pacote completo da versão publicada do portfólio, preparado para GitHub Pages. O conteúdo do site fica em `dist/`, e a publicação automática já está configurada em `.github/workflows/deploy-pages.yml`.

## O que foi preservado

- Tela inicial de carregamento e dissolução em pixels.
- Correções de altura e área segura para Safari no iPhone.
- Navegação por abas e subpastas via hash.
- Transição temática da área AAA Jesse Owens.
- Animação binária de entrada da VibeCode.
- Duas prévias ao vivo da VibeCode em `iframe`.
- Galerias, ampliação de imagens e modal de vídeos.
- Reprodução HLS com fallback em MP4.
- Fontes, logo SVG, imagens, vídeos e pôsteres locais.
- Responsividade para desktop e celular.
- Preferência de movimento reduzido para acessibilidade.

## Publicação rápida no Windows

### 1. Crie um repositório vazio

1. Entre em [github.com/new](https://github.com/new).
2. Use um nome como `arthur-burigo-portfolio`.
3. Para um portfólio público, marque **Public**.
4. Não adicione README, `.gitignore` ou licença nessa tela.
5. Clique em **Create repository** e copie a URL HTTPS terminada em `.git`.

### 2. Envie este pacote

1. Extraia todo o ZIP para uma pasta.
2. Instale o [Git para Windows](https://git-scm.com/download/win), se ainda não tiver.
3. Dê dois cliques em `PUBLICAR-NO-GITHUB.bat`.
4. Cole a URL HTTPS do repositório quando o arquivo pedir.
5. Se o GitHub solicitar autenticação, conclua pelo navegador.

O primeiro envio pode demorar porque o portfólio contém aproximadamente 139 MiB de mídia.

### 3. Ative o GitHub Pages

1. Abra o repositório no GitHub.
2. Entre em **Settings → Pages**.
3. Em **Build and deployment → Source**, selecione **GitHub Actions**.
4. Abra a aba **Actions** do repositório.
5. Se a primeira execução tiver ocorrido antes da ativação, abra **Publicar portfólio no GitHub Pages** e clique em **Run workflow**.
6. Quando a execução ficar verde, o endereço público aparecerá na própria execução e em **Settings → Pages**.

Para um repositório chamado `arthur-burigo-portfolio`, o endereço normalmente será:

```text
https://SEU-USUARIO.github.io/arthur-burigo-portfolio/
```

Todos os caminhos internos são relativos, então o site funciona tanto nesse endereço com subpasta quanto em um domínio próprio.

## Publicação manual pelo terminal

Se preferir não usar o arquivo `.bat`, abra o terminal dentro da pasta extraída e execute:

```bash
git init
git add .
git commit -m "Publica portfólio de Arthur Búrigo"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/arthur-burigo-portfolio.git
git push -u origin main
```

Depois, ative **GitHub Actions** em **Settings → Pages**.

## Conferir antes de publicar

O projeto não exige instalação de dependências. Com o [Node.js](https://nodejs.org/) instalado, use:

```bash
npm run verify
npm run preview
```

O primeiro comando confirma se mídias, fontes, manifestos HLS e caminhos estão íntegros. O segundo abre uma prévia em `http://localhost:4173`.

Não abra `dist/index.html` diretamente com dois cliques: o navegador pode bloquear o carregamento de `data.json` em páginas locais. Use a prévia acima ou o endereço publicado.

## Como atualizar o site depois

Edite os arquivos dentro de `dist/`, principalmente:

- `dist/index.html`: estrutura inicial e conteúdo da seção Sobre mim.
- `dist/data.json`: projetos, galerias e URLs da VibeCode.
- `dist/style.css`: visual, responsividade e animações.
- `dist/app.js`: navegação, transições, modais e reprodução de mídia.

Depois, execute novamente `PUBLICAR-NO-GITHUB.bat`. Cada envio para a branch `main` publica a nova versão automaticamente.

## Observação sobre as prévias VibeCode

As duas prévias continuam funcionando como no site atual, mas carregam projetos externos:

- `https://dmc-delorean-1985.melanciaraivosa.chatgpt.site/`
- `https://omo-dozi-astra-la-vista.arthurburigo120.chatgpt.site/`

Por isso, essas prévias dependem de os dois projetos permanecerem online e permitirem abertura em `iframe`. Os botões **VISITE O SITE** também continuam apontando para esses endereços.

## Estrutura

```text
.
├── .github/workflows/deploy-pages.yml  # publicação automática
├── dist/                               # site completo
├── scripts/verify-site.mjs             # verificação de integridade
├── scripts/serve.mjs                   # prévia local
├── PUBLICAR-NO-GITHUB.bat              # envio guiado no Windows
├── package.json
└── README.md
```

O pacote atual está abaixo do limite de 1 GiB do GitHub Pages e não possui nenhum arquivo acima do limite de 100 MiB por arquivo do GitHub.
