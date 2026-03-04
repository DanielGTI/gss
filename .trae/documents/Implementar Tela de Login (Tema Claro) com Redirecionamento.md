## Objetivo
Criar uma tela de login como tela inicial, alinhada ao tema claro da aplicação. O usuário informará email e senha, poderá escolher "manter logado" via select, acessar link de recuperação de senha e links de políticas/termos. Ao clicar em "Entrar", o app redireciona para a página principal (chat).

## Páginas e Rotas
- Adicionar roteamento com react-router-dom.
- Rotas:
  - /login → LoginPage (nova tela)
  - / → Página principal atual (App com Sidebar, Header e Chat)
- Comportamento:
  - Se não autenticado, redirecionar “/” → “/login”.
  - Se autenticado, “/login” → “/”.

## Autenticação (simples, frontend)
- Criar store `useAuthStore` (zustand):
  - `isAuthenticated: boolean`, `login(email, remember)`, `logout()`
  - Persistir em `localStorage` quando `remember === true` ("manter logado").
- Inicializar a store lendo `localStorage` para restaurar sessão.

## Componentes/Arquivos Novos
- src/pages/LoginPage.tsx
  - Layout centralizado, cartão branco com bordas arredondadas, sombra suave.
  - Elementos:
    - Imagem da empresa (usar /logo.svg ou placeholder)
    - Campo Email
    - Campo Senha
    - Select "Manter logado" (Opções: "Não", "Sim")
    - Link "Recuperar senha"
    - Botão "Entrar"
    - Rodapé com links "Políticas de Privacidade" e "Termos de Uso"
  - Ação do botão "Entrar": `auth.login(email, remember)`; `navigate('/')`.
- src/routes/ProtectedRoute.tsx
  - Se `!isAuthenticated` → `<Navigate to="/login" />`
- src/routes/AppRouter.tsx
  - Define `<Routes>` com `ProtectedRoute` para “/”.

## Integrações no Projeto
- Atualizar `src/main.tsx` para envolver a aplicação com `<BrowserRouter>`.
- Manter o App.tsx inalterado como página principal (chat). A LoginPage não renderiza Sidebar/Header, mantendo layout limpo.

## Estilo/Tema (consistência com a tela principal)
- Tema claro: fundo branco, cinzas para textos e ícones.
- Controles com cantos arredondados, bordas claras (#e5e7eb), sombras discretas.
- Espaçamento e tipografia seguindo a Home (Inter/sans, tamanhos coerentes).

## Acessibilidade
- Labels associadas aos inputs, `aria-label`/`aria-describedby`.
- Foco visível nos controles; `type="email"` e `type="password"` apropriados.

## Verificação
- Acessar http://localhost:5173/login → ver tela de login.
- Testar login com e sem “Manter logado”.
- Confirmar redirecionamentos e restauração de sessão após refresh.

## Entregáveis
- Novos arquivos: `src/pages/LoginPage.tsx`, `src/routes/ProtectedRoute.tsx`, `src/routes/AppRouter.tsx`, `src/store/useAuthStore.ts`.
- Ajustes mínimos em `src/main.tsx` para ativar o roteamento.

Confirma que posso aplicar o plano e implementar a tela agora?