<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- LADE_ACADEMY_CONTEXT:BEGIN -->
## Contexto do projeto (LADE Academy — Landing Page)

Funil de baixo ticket "Do Zero ao Primeiro Produto com IA" (mecanismo:
"Método Produto em 45 Minutos"), R$37, com upsell de R$137 (estratégia de
tráfego) e backend em grupo VIP no Telegram. Marca: **LADE Academy**
(separada da LADE Group, empresa-mãe de soluções B2B em IA). O brief
criativo original está em `README.md` — o que segue é o que mudou e foi
decidido DEPOIS desse brief, numa sessão de revisão/CRO. Leia isto antes
de propor mudanças na página pra não desfazer decisões já validadas.

### Regras que não podem ser quebradas
- **Nunca invente depoimentos, estatísticas, provas sociais ou senso de
  urgência falso** (contador regressivo fake, "vagas limitadas" fake,
  etc.). Isso já foi implementado uma vez e removido por risco de
  propaganda enganosa (CDC art. 37). Só adicionar depoimentos/números
  reais quando houver compradores de verdade.
- A bio do Fabio e do Leonardo (seção "Quem está por trás disso") é
  factual, fornecida por eles — não reescrever os fatos, só tom/formatação.
- Link de checkout e Pixel ID ficam centralizados em `src/lib/tracking.ts`
  (`CHECKOUT_URL`, `META_PIXEL_ID`) — nunca hardcode em outro lugar.

### Decisões de CRO já validadas com pesquisa (não reabrir sem motivo)
- CTA de compra foi **removido do hero** (público frio/cético — CTA de
  compra logo de cara reduz conversão antes de construir confiança). No
  lugar, um link suave "Veja como funciona ↓" que rola até a seção de Dor.
  O botão de compra reaparece só depois do bloco Método.
- Seção "Quem está por trás disso" (Autoridade) foi adicionada antes da
  Oferta — dupla Fabio + Leonardo, tom autêntico/humilde, não "guru".
  Ainda sem fotos: usa iniciais como avatar; há um comentário `TODO` no
  JSX de `src/routes/index.tsx` explicando onde trocar pela `<img>`
  quando as fotos chegarem.
- Bloco de ancoragem de valor ("VOCÊ LEVA:") foi adicionado antes do
  preço na seção Oferta — deliberadamente **sem valores fictícios por
  item** (ex.: "vale R$97"), porque não existe preço real avulso pra
  esses itens e inventar um repetiria o mesmo problema de conteúdo
  fabricado.
- Paleta de cores (dourado + fundo escuro, tokens OKLCH em
  `src/styles.css`) foi auditada (contraste WCAG) e considerada coerente
  e acessível — não precisa mudar.
- FAQ foi reescrita pra soar real/racional em vez de defensiva ("parece
  cilada"); pergunta redundante foi removida.
- A barra fixa mobile (CTA sticky no rodapé) estava sempre visível desde
  o primeiro frame, o que contradizia a regra acima (CTA de compra visível
  antes de construir confiança). Corrigido: a barra agora começa
  escondida (`translate-y-full`) e só aparece (`translate-y-0`, com
  transição) depois que o usuário rola até o CTA do bloco Método — usa um
  `IntersectionObserver` no elemento que envolve `<CTA origem="metodo" />`
  em `src/routes/index.tsx`. Uma vez visível, permanece visível mesmo se
  o usuário rolar de volta pra cima (comportamento esperado de CTA
  sticky).

### Estado confirmado nesta sessão (2026-09-03)
- `CHECKOUT_URL` e `META_PIXEL_ID` em `src/lib/tracking.ts` já estão
  preenchidos (checkout Hotmart + Pixel real) — não são mais placeholder.
- O `TODO` de trocar iniciais pelas fotos do Fabio/Leonardo ainda está
  presente no JSX (`src/routes/index.tsx`, seção Autoridade) — pendência
  segue válida.
- Nenhum depoimento/estatística real foi adicionado ainda — pendência
  segue válida.
- Este ambiente local foi montado a partir de um **zip exportado
  manualmente do Lovable** (`landing-page-codigo-atual.zip`), não de um
  clone git sincronizado. `npm install` foi usado aqui (bun não está
  disponível localmente), só para rodar o preview (`vite dev`, porta
  8080). Para publicar de volta no Lovable, qualquer mudança feita aqui
  precisa ser levada por git push no branch conectado (ver pendência de
  Git sync abaixo) — não depender do npm install local para o fluxo de
  deploy real.

### Auditoria de CRO/performance (2026-09-03)
Feita com base em pesquisa (NN/g, Baymard, CXL, Google/Deloitte "Milliseconds
Make Millions"). Corrigido nesta sessão:
- `<html lang="en">` → `lang="pt-BR"` em `src/routes/__root.tsx` (conteúdo é
  todo em português; afetava indexação e leitores de tela).
- Hero image trocada de PNG (1024×1024, 1,27MB) para
  `src/assets/hero-mockup.webp` (900×900, ~59KB) — reduz risco de LCP lento
  em mobile. `fetchPriority="high"` adicionado na tag `<img>` do hero (é o
  elemento LCP da página).
- Adicionado `og:image` / `twitter:image` (usando `src/assets/og-image.webp`,
  1024×1024, ~63KB) + `og:locale: pt_BR` em `src/routes/index.tsx` — antes
  não existia imagem de preview ao compartilhar o link (WhatsApp/Instagram).
  **Atenção**: o `content` desses metas hoje é um caminho relativo (resolvido
  pelo Vite). Depois do deploy na Vercel, trocar para URL absoluta
  (`https://dominio.com/...`) pra garantir que os crawlers do
  Facebook/WhatsApp consigam ler a imagem — isso ainda não foi feito.
- Cofundadores (Fabio e Leonardo) passaram de "Cofundador da LADE Group"
  para "Cofundador da LADE Academy" na seção Autoridade — mais coerente
  com a marca da própria página (LADE Group é a empresa-mãe B2B, contexto
  diferente do que o leitor está comprando aqui). Continua factual: ambos
  são cofundadores das duas empresas.

### Deploy (2026-09-03)
- Publicado na Vercel via CLI (conta `fabinhohenriquekarolus-coder`), projeto
  `karolus/extracted`. URLs de produção: `https://extracted-henna-eta.vercel.app`
  e domínio próprio `https://45min.ladegroup.com.br` (CNAME configurado na
  Hostinger, ambos com "Valid Configuration" no painel da Vercel).
- Código versionado no GitHub:
  `https://github.com/fabinhohenriquekarolus-coder/45min---landing`
  (repositório público — sem problema, o código não expõe nenhum segredo
  real; checkout e Pixel ID já são públicos no HTML do site). Projeto da
  Vercel conectado a esse repositório via `vercel git connect` — **todo
  push na branch `main` dispara deploy automático em produção**, não
  precisa mais rodar `vercel --prod` manualmente.
- `fbq('track', 'PageView')` movido pro `<head>` (`src/routes/__root.tsx`),
  igual ao snippet oficial do Meta Pixel — antes disparava só via
  `useEffect` em `index.tsx`. A chamada duplicada em `index.tsx` foi
  removida (mantido só o `ViewContent`, que é específico da página) pra não
  contar `PageView` em dobro no Gerenciador de Eventos.
- Corrigido bug reportado por usuário real (Android, tema escuro do
  sistema): o dourado aparecia como bordô/vinho. Causa: a página não
  declarava `color-scheme`, então o "Force Dark" do Chrome Android tentava
  inverter as cores heuristicamente por cima do tema escuro já customizado
  (que é fixo, não depende do tema do SO). Corrigido adicionando
  `color-scheme: dark` em `src/styles.css` (`:root`) e o meta
  `<meta name="color-scheme" content="dark">` em `src/routes/__root.tsx`
  — isso avisa o navegador que a página já gerencia seu próprio tema
  escuro e ele não deve reprocessar as cores. Testado em emulação, ainda
  não confirmado no Android real do usuário.
- Pendente: apontar subdomínio da Hostinger (domínio raiz e nome do
  subdomínio ainda não informados) e trocar `og:image`/`twitter:image` pra
  URL absoluta com o domínio final.

Ainda pendente da auditoria: nenhum bloqueador restante identificado.
Havia 3 arquivos de asset não usados (`juliana-r.webp`, `lucas-b.webp`,
`marina-p.jpg`, nomes de depoimento fictício) sem referência no código —
não afetam a página, mas não devem ser reconectados sem depoimentos reais
(ver regra acima).

### Pendências conhecidas
- [ ] Trocar iniciais por fotos reais do Fabio e do Leonardo (ver `TODO`
      no JSX da seção Autoridade em `src/routes/index.tsx`).
- [ ] Adicionar depoimentos/estatísticas reais assim que houver vendas.
- [ ] Confirmar o Meta Pixel recebendo eventos de verdade (Gerenciador de
      Eventos → Eventos de teste) depois do deploy.
- [ ] Ativar o Player de vídeo da Hotmart quando as aulas forem gravadas
      (hoje está desativado — a área de membros só tem os rascunhos).
- [ ] Configurar o Git sync (Project settings → Git → GitHub, dentro do
      Lovable) pra editar aqui sem gastar créditos de IA, e depois dar
      `git push` pra sincronizar de volta com o Lovable.
- [ ] Trocar `og:image`/`twitter:image` de caminho relativo pra URL
      absoluta assim que soubermos o domínio final na Vercel.

### Mapa rápido de arquivos
- `src/routes/index.tsx` — página inteira (hero, dor, método, autoridade,
  oferta, jornada, entregáveis, transformação, FAQ, CTA final, barra
  fixa mobile).
- `src/lib/tracking.ts` — `CHECKOUT_URL`, `META_PIXEL_ID`, helpers
  `track()` / `goToCheckout()`.
- `src/routes/__root.tsx` — `<head>`, título, instalação do script do
  Meta Pixel.
- `src/styles.css` — tema (tokens OKLCH), fontes (Sora + Inter Tight).
<!-- LADE_ACADEMY_CONTEXT:END -->
