@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
cd /d "%~dp0"

echo.
echo ================================================
echo   ARTHUR BURIGO - PUBLICAR PORTFOLIO NO GITHUB
echo ================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo O Git nao foi encontrado neste computador.
  echo Instale em https://git-scm.com/download/win e execute este arquivo novamente.
  goto :error
)

if not exist ".git" (
  git init
  if errorlevel 1 goto :error
  git branch -M main
)

git config user.name >nul 2>&1
if errorlevel 1 (
  set /p GIT_NAME=Digite seu nome para os commits: 
  if "!GIT_NAME!"=="" goto :error
  git config user.name "!GIT_NAME!"
)

git config user.email >nul 2>&1
if errorlevel 1 (
  set /p GIT_EMAIL=Digite o e-mail da sua conta GitHub: 
  if "!GIT_EMAIL!"=="" goto :error
  git config user.email "!GIT_EMAIL!"
)

echo.
echo Crie antes um repositorio VAZIO no GitHub, sem README, .gitignore ou licenca.
echo Exemplo: https://github.com/SEU-USUARIO/arthur-burigo-portfolio.git
echo.
set /p REPO_URL=Cole aqui a URL HTTPS do repositorio: 
if "%REPO_URL%"=="" goto :error

echo %REPO_URL% | findstr /r /c:"^https://github.com/.*\.git$" >nul
if errorlevel 1 (
  echo.
  echo A URL precisa comecar com https://github.com/ e terminar com .git
  goto :error
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin "%REPO_URL%"
) else (
  git remote set-url origin "%REPO_URL%"
)

git add .
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Publica portfolio de Arthur Burigo"
  if errorlevel 1 goto :error
) else (
  echo Nenhuma alteracao nova para registrar.
)

echo.
echo Enviando os arquivos. Como o portfolio possui videos, esta etapa pode demorar.
git push -u origin main
if errorlevel 1 goto :push_error

echo.
echo Arquivos enviados com sucesso.
echo Agora abra Settings ^> Pages no repositorio e selecione GitHub Actions.
echo Depois acompanhe a publicacao na aba Actions.
echo.
pause
exit /b 0

:push_error
echo.
echo Nao foi possivel enviar os arquivos.
echo Confirme se o repositorio foi criado vazio e se voce esta conectado ao GitHub.
echo Consulte o README.md para o passo a passo manual.
goto :error

:error
echo.
echo Processo interrompido sem apagar nenhum arquivo.
pause
exit /b 1
