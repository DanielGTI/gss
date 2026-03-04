Ajustando para o **cenário brasileiro** (TV aberta), a lógica é parecida, mas os “nomes” e algumas práticas mudam:

* **Medição de audiência** costuma ser tratada como **pontos** e **share** por praça (ex.: Grande SP, Grande RJ) e/ou visão nacional (PNT/mercado), com equivalências de ponto **atualizadas periodicamente** com base em estimativas populacionais. Em **2026**, por exemplo, a Kantar IBOPE Media atualizou a equivalência de 1 ponto e publicou números por mercado (ex.: Grande SP etc.). (\[SET PORTAL]\[1])

* A modernização hoje pede que você enxergue “**Total Vídeo**” (TV linear + vídeo online/streaming) e a expansão de **CTV/Smart TV**, porque o consumo e a competição por atenção já são multi-plataforma.

A seguir vai um **PRD** para uma **página interna** (sem menus externos) de **dashboard gerencial**, com **dados mockados** (exemplo: “SBT” como vice-líder entre 5 emissoras).

***

## PRD — Página Interna “Dashboard Gerencial (SBT)”

### 1) Objetivo do produto

Entregar uma página única, objetiva, para leitura em 1–3 minutos, que permita ao Diretor Geral e diretoria:

* saber **se estamos ganhando/perdendo audiência** (e onde),

* entender **impacto comercial** (inventário, vacância, preço efetivo),

* ver **saúde financeira** (receita, pacing, margem),

* e identificar **alertas** (quedas, risco de meta, pressão competitiva).

### 2) Usuários e decisões suportadas

**Usuários primários**

* Diretor Geral (DG): decisões de prioridades semanais (grade, jornalismo, investimentos).

* Diretor Comercial: precificação, pacotes, foco de prospecção, redução de vacância/makegood.

* Programação/Conteúdo: ajustes de grade, chamadas, posicionamento de breaks e “fluxo”.

* Finanças/Controladoria: margem por faixa/programa, orçamento, custo.

**Decisões que o dashboard deve responder**

* “Onde perdemos share ontem/semana? (qual faixa/qual praça/qual demo?)”

* “Estamos mantendo a vice-liderança? Em quais dayparts corremos risco?”

* “Qual o nível de vacância nas próximas 2–4 semanas e o impacto em receita?”

* “Preço efetivo (yield) está subindo/descendo? Por quê?”

* “Quais programas/faixas dão mais contribuição (margem) vs custo?”

### 3) Escopo e não-escopo

**No escopo**

* Uma única página, **embutível** (ex.: rota interna ou iframe), **sem menus externos**.

* Visões: **Audiência**, **Competição**, **Comercial**, **Financeiro**, **Alertas**.

* Filtros internos mínimos (no topo da página, sem “menu”): **Período**, **Praça**, **Target**.

**Fora do escopo**

* CRUD de cadastros (programas, anunciantes).

* Gestão de campanhas, ordens, criação de propostas.

* Autenticação/autorização (assumir que o sistema “pai” já faz).

### 4) Indicadores (o que precisa aparecer)

**Bloco A — Placar (cards no topo)**

1. **Share consolidado (período)** + variação vs período anterior
2. **Pontos de audiência (média)**
3. **Posição no ranking (1º/2º/3º)** e distância para 3º
4. **Sell-out (%)** e **Vacância (%)** do inventário
5. **Receita publicitária líquida** (MTD / mês fechado) e **Pacing vs meta**
6. **Yield efetivo (eCPM/CPP/CPM, conforme seu padrão interno)**
7. **Margem de contribuição** (ou EBITDA proxy, se preferir)

> Observação importante (Brasil): manter metadado “**valor do ponto** por praça/ano”, porque a equivalência muda (ex.: atualização válida para 2026). (\[SET PORTAL]\[1])

**Bloco B — Audiência e Competição**

* Série temporal do **share** (SBT vs concorrentes)

* Tabela por **daypart** (share e pontos)

* **Retenção / fluxo** (lead-in → programa → lead-out), pelo menos em jornalismo/prime

* **Alcance (reach)** e/ou **tempo médio** (se você tiver essa métrica disponível internamente ou via fornecedor; a tendência de “Total Vídeo”/cross-media é relevante).

**Bloco C — Comercial**

* **Inventário disponível vs vendido** (segundos ou inserções) por daypart

* **Makegood** (volume e motivo)

* Top 10 anunciantes (R$ e participação)

* Preço efetivo: eCPM/CPP/CPM (definições de mercado costumam vincular custo a pontos/GRP e target). (\[IAB Brasil]\[2])

**Bloco D — Financeiro/Conteúdo**

* Receita por linha (ex.: nacional/local/patrocínios/branded/digital)

* Custo e **margem por programa/faixa** (top ganhos e top drenagens)

### 5) Layout (wireframe textual)

**Header interno (compacto)**

* Título: “Dashboard Gerencial — SBT”

* Filtros inline:

  * Período: “Últimos 7 dias / 28 dias / Mês atual / Custom”

  * Praça: “PNT / GSP / GRJ / …”

  * Target: “Ind 4+ / HH / A18-49 / A25-54 …”

**Seção 1 — Cards (7–9 cards)**

* Share | Pontos | Ranking | Gap para 3º | Sell-out | Receita | Pacing | Yield | Margem

**Seção 2 — Audiência**

* Gráfico linha: Share (SBT + 4 concorrentes)

* Heatmap/tabela: Share por daypart × emissora

* Bloco “Fluxo”: retenção % entre programas-chave

**Seção 3 — Comercial**

* Barra empilhada: Vendido vs Vacância por daypart

* Linha: Sell-out semanal (4–8 semanas)

* Tabela: Top anunciantes + variação vs período anterior

**Seção 4 — Financeiro/Conteúdo**

* Tabela: Margem por programa/faixa (Receita atribuída, Custo, Margem %)

* Mini-gráfico: Receita MTD vs Meta vs LY

**Seção 5 — Alertas**

* Lista de 5 alertas, com regra e severidade (ex.: “Prime em GSP caiu 1,2pp vs semana passada”)

### 6) Requisitos de dados e integração

**Fontes típicas**

* Audiência: fornecedor de medição + consolidações internas (por praça/daypart/target).

* Comercial: ad sales / traffic (inventário, vendido, preço, makegood).

* Financeiro: ERP/BI (receita líquida, descontos, comissões, custo).

* Programação: grade/programas.

**Atualização**

* Audiência: D+1 (diária)

* Comercial: intradiária (ex.: a cada 15–60 min)

* Financeiro: diária (MTD) e fechamento mensal

**Contratos (exemplo de endpoints)**

* `GET /dash/summary?from&to&market&target`

* `GET /dash/audience/trend?...`

* `GET /dash/commercial/inventory?...`

* `GET /dash/finance/program_margin?...`

* `GET /dash/alerts?...`

### 7) Requisitos não funcionais

* **Performance:** carregar em < 2s (com cache do período padrão).

* **Responsivo:** funciona bem em 1366×768 e 1920×1080.

* **Embedding:** sem navegação própria; altura adaptável; compatível com iframe.

* **Acessibilidade:** contraste, números legíveis, “tooltips” simples.

### 8) Telemetria (para melhorar o produto)

* Filtro usado (período/praça/target)

* Seções mais visualizadas (scroll depth)

* Cliques em alertas / drilldowns

* Tempo na página

***

## Dados mockados (para você “subir” o dashboard desde o dia 1)

### A) Exemplo — Summary (cards)

```json
{
  "context": {
    "brand": "SBT",
    "market": "PNT",
    "target": "Ind 4+",
    "period": { "from": "2026-02-04", "to": "2026-03-03" },
    "point_equivalence_note": "Atualizar 1 ponto por praça/ano conforme referência oficial (ex.: parâmetros 2026)."
  },
  "kpis": {
    "share_pct": { "value": 20.1, "delta_pp_vs_prev_period": 0.6, "rank": 2, "gap_to_3rd_pp": 1.9 },
    "rating_points": { "value": 4.8, "delta_points": 0.2 },
    "sellout_pct": { "value": 87.0, "delta_pp": -3.0 },
    "vacancy_pct": { "value": 13.0, "delta_pp": 3.0 },
    "ad_revenue_net_brl": { "mtd": 38200000, "delta_pct_vs_budget": -2.5, "delta_pct_vs_ly": 6.2 },
    "yield_ecpm_brl": { "value": 74.5, "delta_pct": 1.8 },
    "contribution_margin_pct": { "value": 21.4, "delta_pp": 0.9 }
  }
}
```

### B) Market share (5 emissoras — SBT vice-líder)

```json
{
  "market_share_pct": [
    { "broadcaster": "Globo", "share": 40.2 },
    { "broadcaster": "SBT", "share": 20.1 },
    { "broadcaster": "Record", "share": 18.2 },
    { "broadcaster": "Band", "share": 12.0 },
    { "broadcaster": "RedeTV!", "share": 9.5 }
  ]
}
```

### C) Trend semanal (8 semanas) — share por emissora

```json
{
  "weekly_share_trend": [
    { "week": "2026-W04", "Globo": 41.0, "SBT": 19.4, "Record": 18.0, "Band": 12.3, "RedeTV!": 9.3 },
    { "week": "2026-W05", "Globo": 40.6, "SBT": 19.7, "Record": 18.1, "Band": 12.0, "RedeTV!": 9.6 },
    { "week": "2026-W06", "Globo": 40.4, "SBT": 19.8, "Record": 18.3, "Band": 11.8, "RedeTV!": 9.7 },
    { "week": "2026-W07", "Globo": 40.1, "SBT": 20.0, "Record": 18.2, "Band": 12.1, "RedeTV!": 9.6 },
    { "week": "2026-W08", "Globo": 39.8, "SBT": 20.1, "Record": 18.4, "Band": 12.0, "RedeTV!": 9.7 },
    { "week": "2026-W09", "Globo": 40.0, "SBT": 20.2, "Record": 18.1, "Band": 12.1, "RedeTV!": 9.6 },
    { "week": "2026-W10", "Globo": 40.3, "SBT": 20.1, "Record": 18.0, "Band": 12.2, "RedeTV!": 9.4 },
    { "week": "2026-W11", "Globo": 40.2, "SBT": 20.1, "Record": 18.2, "Band": 12.0, "RedeTV!": 9.5 }
  ]
}
```

### D) Daypart table (share e pontos)

```json
{
  "dayparts": [
    {
      "daypart": "Manhã",
      "SBT": { "share": 18.5, "points": 3.2 },
      "Globo": { "share": 38.0, "points": 6.6 },
      "Record": { "share": 19.0, "points": 3.3 },
      "Band": { "share": 13.0, "points": 2.3 },
      "RedeTV!": { "share": 11.5, "points": 2.0 }
    },
    {
      "daypart": "Tarde",
      "SBT": { "share": 21.2, "points": 4.1 },
      "Globo": { "share": 39.5, "points": 7.6 },
      "Record": { "share": 17.0, "points": 3.3 },
      "Band": { "share": 12.3, "points": 2.4 },
      "RedeTV!": { "share": 10.0, "points": 1.9 }
    },
    {
      "daypart": "Prime Time",
      "SBT": { "share": 20.8, "points": 6.0 },
      "Globo": { "share": 41.0, "points": 11.8 },
      "Record": { "share": 18.0, "points": 5.2 },
      "Band": { "share": 11.2, "points": 3.2 },
      "RedeTV!": { "share": 9.0, "points": 2.6 }
    }
  ]
}
```

### E) Comercial — inventário/vacância e top anunciantes

```json
{
  "inventory": [
    { "daypart": "Manhã", "available_seconds": 7200, "sold_seconds": 6120, "unsold_seconds": 1080, "sellout_pct": 85.0 },
    { "daypart": "Tarde", "available_seconds": 8400, "sold_seconds": 7560, "unsold_seconds": 840, "sellout_pct": 90.0 },
    { "daypart": "Prime Time", "available_seconds": 9000, "sold_seconds": 8100, "unsold_seconds": 900, "sellout_pct": 90.0 }
  ],
  "makegoods": { "total_seconds": 420, "main_reasons": [{ "reason": "Underdelivery", "seconds": 260 }, { "reason": "Troca de grade", "seconds": 160 }] },
  "top_advertisers": [
    { "advertiser": "Anunciante A", "revenue_brl": 4200000, "delta_pct_vs_prev": 5.1 },
    { "advertiser": "Anunciante B", "revenue_brl": 3100000, "delta_pct_vs_prev": -2.2 },
    { "advertiser": "Anunciante C", "revenue_brl": 2800000, "delta_pct_vs_prev": 1.0 }
  ],
  "yield": { "ecpm_brl": 74.5, "cpp_brl": 18200 }
}
```

### F) Conteúdo — margem por programa (exemplo)

```json
{
  "program_margin": [
    { "program": "Jornal 1", "slot": "Noite", "revenue_brl": 6800000, "cost_brl": 4100000, "margin_pct": 39.7 },
    { "program": "Variedades", "slot": "Tarde", "revenue_brl": 5200000, "cost_brl": 3600000, "margin_pct": 30.8 },
    { "program": "Reality", "slot": "Prime Time", "revenue_brl": 9100000, "cost_brl": 7800000, "margin_pct": 14.3 }
  ]
}

[1]: https://set.org.br/sem-categoria/kantar-ibope-media-atualiza-equivalencia-do-ponto-de-audiencia-de-tv-para-2026/ "Kantar IBOPE Media atualiza equivalência do ponto de audiência de TV para 2026 - SET PORTAL"
[2]: https://iabbrasil.com.br/wp-content/uploads/2023/02/Glossario-de-Metricas-para-a-Publicidade-Digital.pdf?utm_source=chatgpt.com "Glossário de Métricas para a Publicidade Digital"
```

