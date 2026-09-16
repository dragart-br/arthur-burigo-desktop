# Arthur Búrigo — Portfólio

Este pacote contém o site completo para publicar no GitHub Pages. A abertura com Logo.svg e barra de carregamento, a dissolução em pixels, a mudança para vermelho em Jesse Owens, os movimentos durante a rolagem, a expansão das peças verticais, as janelas de imagens e vídeos e os pontos animados do VibeCode estão incluídos.

São 7 abas, 60 imagens de portfólio e 10 vídeos completos. As subpastas de Jesse Owens e Europe estão preservadas. As fontes e o player de vídeo estão dentro do pacote; não é necessário instalar dependências nem configurar chaves ou serviços externos.

## O que você precisa

- Uma conta no [GitHub](https://github.com/).
- [GitHub Desktop](https://desktop.github.com/download/), para enviar a pasta inteira com os vídeos.
- Os arquivos deste pacote extraídos em uma pasta.

Na modalidade gratuita, use um repositório público. Isso deixa os arquivos do portfólio e o site acessíveis publicamente. [Disponibilidade do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Publicar sem usar o terminal

1. Extraia o ZIP. Abra a pasta que contém `index.html`, `app.js`, `data.json`, `style.css`, `fonts`, `media`, `vendor` e `.github`. Não envie o ZIP como um arquivo para o GitHub.
2. Instale o GitHub Desktop, abra-o e entre na sua conta.
3. No GitHub Desktop, escolha **File → New repository**. Use o nome `portfolio`, escolha onde salvar e crie o repositório. Não selecione licença, Git ignore ou criação de README nessa tela: o pacote já inclui os arquivos necessários.
4. Escolha **Repository → Show in Explorer**. Copie para essa pasta **todo o conteúdo** da pasta extraída, incluindo `.github`, `.gitattributes`, `.gitignore` e `.nojekyll`. O `index.html` deve ficar diretamente na pasta do repositório, e não dentro de outra pasta `github-pages-portfolio` ou `dist`. Preserve a pasta `.git` que o Desktop criou.
5. Volte ao Desktop. Se houver mudanças, escreva `Adicionar portfolio completo` no campo Summary e clique em **Commit to main**. Se a branch selecionada não se chamar `main`, renomeie-a em **Branch → Rename** antes de continuar.
6. Clique em **Publish repository**, use `portfolio` como nome e desmarque **Keep this code private** para publicar gratuitamente. Clique em **Publish repository** e aguarde o envio completo. [Publicação pelo GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop).
7. Abra o repositório no GitHub: **Repository → View on GitHub**, no Desktop. No navegador, entre em **Settings → Pages → Build and deployment → Source** e escolha **GitHub Actions**. Não precisa criar outro workflow: ele já está no pacote.
8. Vá à aba **Actions**, escolha **Publicar portfolio no GitHub Pages** e clique em **Run workflow → Branch: main → Run workflow**. Se uma execução anterior falhou antes de você ativar Pages, essa nova execução resolve a ordem de configuração.
9. Espere a execução ficar verde. Abra **Settings → Pages → Visit site**. Para um repositório chamado `portfolio`, o endereço será `https://SEU-USUARIO.github.io/portfolio/`. Substitua `SEU-USUARIO` pelo seu nome de usuário real.

Essa configuração segue o [workflow oficial de publicação de sites estáticos](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Como manter todas as funções

- Envie a pasta `media` inteira. Os vídeos longos usam pastas terminadas em `--hls`, com `index.m3u8` e arquivos `segment-000.ts`, `segment-001.ts` etc. Todos os segmentos são necessários para reprodução e avanço do vídeo.
- Preserve `vendor/hls.min.js`, as duas fontes em `fonts` e `media/Logo.svg`.
- Preserve os nomes dos arquivos e das pastas, incluindo maiúsculas e minúsculas. O GitHub diferencia `Logo.svg` de `logo.svg`.
- Os endereços dos arquivos são relativos. Funcionam tanto em `/portfolio/` como na raiz de um domínio. Não adicione barras `/` no início dos caminhos e não altere o site para apontar para arquivos do seu computador.
- `data.json` contém a lista das peças, dimensões, ordem e subabas. Se alterar apenas uma imagem ou vídeo, mantenha seu nome; se adicionar novas peças, atualize também esse arquivo.
- As animações respeitam a opção de acessibilidade **reduzir movimento** do dispositivo. Se ela estiver ativada, os movimentos serão reduzidos. A expansão por cursor aparece em computadores com mouse; no celular, o toque abre a visualização.
- O navegador pode impedir reprodução automática; use o botão de play da janela de vídeo quando necessário.

Os cinco filmes longos usam streaming em Full HD e incluem uma cópia MP4 mais leve como alternativa de compatibilidade. As cinco cópias MP4 não substituem o streaming principal nem acrescentam peças duplicadas às galerias.

## Conferência depois de publicar

1. Atualize a página e confira a abertura com a logo, o carregamento e os pixels se desfazendo.
2. Abra Jesse Owens e confira a mudança de azul para vermelho. Ao sair, o azul deve voltar.
3. Abra as subabas de Jesse Owens, FORCEUSA e Titanium Strength, incluindo os países e as séries internas.
4. Role uma galeria longa e confira o surgimento das peças.
5. Posicione o mouse sobre peças verticais e confira a expansão.
6. Abra uma imagem, feche a janela e abra um vídeo. Confira áudio, avanço e tela cheia; Escape fecha a janela.
7. Abra VibeCode e confira `In progress...` com os pontos aparecendo em sequência.
8. Abra no celular e confira o menu horizontal e os arquivos sem cortes.

## Atualizar o site

Edite os arquivos na mesma pasta do repositório. No GitHub Desktop, descreva a alteração, clique em **Commit to main** e depois em **Push origin**. O workflow publica a atualização automaticamente. Aguarde o resultado verde em Actions antes de conferir o site.

## Se algo não abrir

**Página 404:** confira se Pages está em GitHub Actions, se o workflow terminou verde e se você abriu o endereço completo com `/portfolio/` no final. O `index.html` precisa estar na raiz do repositório.

**Workflow não aparece:** confirme que `.github/workflows/deploy.yml` foi enviado, sem uma pasta extra envolvendo o pacote. No Explorador do Windows, marque **Exibir → Mostrar → Itens ocultos** se necessário.

**Workflow falhou:** clique na execução vermelha em Actions e abra a etapa com erro. A etapa de conferência mostra exatamente qual arquivo está faltando. Se o erro mencionar Pages desativado, escolha GitHub Actions em Settings → Pages e execute o workflow novamente.

**Vídeo não carrega:** confira a presença da pasta `--hls`, do `index.m3u8`, dos segmentos e do MP4 correspondente. Confira também `vendor/hls.min.js`. Não envie os vídeos para Git LFS: o Pages precisa dos arquivos reais.

**Mudança ainda não apareceu:** confira se fez Push origin, aguarde a execução verde e recarregue com `Ctrl + F5`.

**Abrir o index.html direto do computador não carrega as galerias:** use o endereço publicado. O site carrega `data.json` e os vídeos por HTTP; abrir com duplo clique usa `file://` e não testa a publicação. Para prévia local opcional, instale [Node.js LTS](https://nodejs.org/), abra um terminal na pasta do pacote, execute `node tools/preview.cjs` e visite `http://127.0.0.1:4173/`. Encerre com `Ctrl + C`.

## Alternativa pelo terminal

Se preferir Git, crie no GitHub um repositório vazio chamado `portfolio`, sem README, licença ou `.gitignore`. Abra um terminal na pasta extraída do pacote e execute, substituindo `SEU-USUARIO`:

```powershell
git init
git add .
git commit -m "Adicionar portfolio completo"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/portfolio.git
git push -u origin main
```

Se o Git solicitar nome e e-mail, configure seus próprios dados. Faça a autenticação normal do GitHub; não coloque senha ou token no código do site. Depois siga os passos 7–9 da publicação acima.

## Arquivos e limites

O pacote fica abaixo de 1 GB e todos os arquivos individuais ficam abaixo de 25 MiB. O GitHub Pages aceita sites publicados de até 1 GB e tem um limite flexível de tráfego de 100 GB por mês. Se houver muito acesso aos vídeos, pode ser necessário hospedar apenas a mídia em outro serviço. [Limites oficiais](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

Use o Desktop ou Git para enviar tudo de uma vez. Pelo navegador, o GitHub permite no máximo 100 arquivos em um envio; este pacote tem mais arquivos por causa dos segmentos de vídeo. [Upload de arquivos](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## Créditos de componentes

Pixelify Sans e Space Mono: SIL Open Font License 1.1. Player hls.js: Apache License 2.0. As licenças estão junto aos arquivos correspondentes. As peças e a identidade visual são o conteúdo fornecido para o portfólio de Arthur Búrigo; não foi aplicada uma licença aberta geral ao seu conteúdo.
