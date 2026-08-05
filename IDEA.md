# IDEIA.md — Hermes: Assistente Diário de Atualização em IA

## Nome do Projeto
**Radar IA** (ou o nome que você já usa no Hermes)

## Missão
Ser meu curador pessoal diário do mundo da Inteligência Artificial. Todo dia, pesquisar, filtrar, traduzir em linguagem simples e organizar em um documento único tudo o que for relevante para eu me manter atualizado e, com o tempo, me tornar um expert no assunto — sem eu precisar caçar informação espalhada em várias fontes.

## Frequência
Execução automática **1x por dia** (definir horário fixo, ex: 7h da manhã, para eu ler com café antes de começar o dia).

## Escopo do Hermes (importante)
O Hermes é responsável **apenas pela coleta, curadoria e atualização dos dados**. Ele não precisa se preocupar com layout, site ou visualização — isso será construído separadamente (site + backend próprios, feitos por mim depois). O Hermes entrega os dados prontos, estruturados e organizados, e para por aí.

Ou seja: **Hermes = fonte de dados. Site/backend = camada de visualização, feita à parte, consumindo esses dados.**

## O que o agente deve pesquisar todos os dias
1. **Modelos novos e atualizações de modelos** (LLMs, modelos de imagem, vídeo, áudio, multimodais) — lançamentos, benchmarks, mudanças de preço/limites.
2. **Tópicos mais discutidos do dia** nas comunidades de IA (X/Twitter, Reddit, Hacker News, LinkedIn, newsletters especializadas).
3. **Plugins, extensões e ferramentas novas** relacionadas a IA (para navegadores, editores de código, produtividade etc).
4. **MCPs (Model Context Protocol)** novos ou atualizados — servidores, integrações, casos de uso interessantes.
5. **Projetos open source** relevantes (novos repositórios em alta, releases importantes, forks/discussões técnicas relevantes no GitHub).
6. **Papers e pesquisas** relevantes (resumidos em linguagem simples, sem jargão acadêmico cru).
7. **Movimentos de mercado/empresas** (Anthropic, OpenAI, Google, Meta, xAI, Mistral, startups relevantes) — parcerias, aquisições, mudanças de política, polêmicas.
8. **Regulação e políticas públicas** relacionadas a IA, quando relevante.
9. **Integrações novas com IA** — apps, serviços, SaaS e sistemas que anunciaram novas integrações com IA (ex: integração de um app conhecido com Claude/GPT, novas APIs conectando ferramentas populares).
10. **Dicas de economia** (dinheiro e tokens) — formas de reduzir custo de uso de IA: cache de prompt, escolha do modelo certo para cada tarefa, técnicas de prompt mais enxuto, uso de modelos menores/locais quando fizer sentido, comparação de preços entre provedores.
11. **Dicas de performance/velocidade** — como entregar respostas mais rápido: streaming, paralelização de chamadas, modelos mais rápidos para tarefas simples, técnicas de cache, batch processing.
12. **Dicas para programadores sobre IA** — boas práticas de uso de IA no dia a dia de desenvolvimento (Claude Code, Copilot, Cursor etc), padrões de prompt para código, formas de integrar IA em pipelines/CI, cuidados com segurança ao usar IA no código.
13. **Notícias de IA para Delphi** — qualquer novidade que cruze o mundo Delphi/Object Pascal com IA: bibliotecas, componentes, integrações de IA em apps Delphi, wrappers de API de IA para Delphi, discussões da comunidade Delphi sobre uso de IA.
14. **Comparativos e custo-benefício entre modelos** — pesquisas/benchmarks que respondem "qual modelo é melhor em quê": rankings gerais (ex: LMSYS Chatbot Arena, Artificial Analysis), benchmarks por tarefa específica (código, matemática, raciocínio, visão, agentes), e comparações de preço vs desempenho (custo por token/tarefa entre OpenAI, Anthropic, Google, Meta, xAI, Mistral, DeepSeek, modelos abertos etc). Sempre trazer contexto de "para qual caso de uso esse modelo compensa mais", não só a posição no ranking.

## Como o agente deve tratar a informação
- **Explicar todo termo técnico** que aparecer (ex: "RAG", "fine-tuning", "context window", "agentic", "quantização", "MCP", "RLHF") com uma explicação curta e simples, como se estivesse explicando para alguém inteligente mas não especialista.
- **Capturar novos termos técnicos continuamente**: sempre que um termo novo de IA/engenharia de IA surgir nas notícias do dia (esteja ele em qualquer seção — modelos, ferramentas, papers, dicas de programação etc), ele deve ser adicionado ao glossário do dia e ao `glossario.json` acumulado, mesmo que não seja o foco principal da notícia. O glossário deve crescer organicamente, dia após dia, sem eu precisar pedir.
- **Priorizar qualidade sobre quantidade**: preferir 8 a 12 itens realmente relevantes e bem explicados do que uma lista enorme e rasa.
- **Contextualizar por que aquilo importa**: não só "o que aconteceu", mas "por que devo me importar com isso".
- **Evitar hype vazio**: separar o que é realmente relevante do que é apenas ruído/marketing.
- **Citar as fontes** (links) para eu poder aprofundar se quiser. **Regra crítica: toda fonte deve ser uma URL específica que aponte direto pro artigo/post/repo/paper — nunca uma homepage genérica** (ex: proibido `https://blog.google/`, `https://reuters.com/technology`, `https://arxiv.org/`, `https://github.com/`, `https://cursor.sh/` sem caminho completo). Se não achar a URL exata, descartar o item em vez de usar link genérico como fallback. **Preferir sempre a fonte primária/oficial em vez de agregadores terceirizados** quando ambos existirem (ex: para rankings da LMSYS/LMArena, usar `lmarena.ai` diretamente em vez de sites de terceiros como `swfte.com` que apenas espelham os dados).

## Formato de saída: dados estruturados (JSON)
Em vez de gerar um documento visual, o Hermes deve gerar **dados estruturados em JSON**, prontos para serem consumidos por qualquer site/backend/app no futuro, sem precisar reprocessar texto.

### Estrutura de pastas/arquivos
```
IA News/
├── data/
│   ├── 2026-08-02.json      → dados estruturados do dia
│   ├── 2026-08-03.json
│   └── ...
├── glossario.json            → termos acumulados (chave = termo, nunca duplicado)
├── index.json                 → índice com metadados de todos os dias (data, resumo curto, destaque)
└── raw-md/                    → (opcional) versão em markdown de cada dia, só para eu dar uma olhada rápida sem precisar montar o site ainda
    ├── 2026-08-02.md
    └── ...
```

### Schema de cada `data/AAAA-MM-DD.json`
```json
{
  "data": "2026-08-02",
  "resumo": "Resumo curto do dia em 2-3 frases",
  "destaque_do_dia": true,
  "secoes": {
    "modelos": [
      {
        "titulo": "...",
        "resumo": "...",
        "fonte": "https://...",
        "relevancia": "alta"
      }
    ],
    "ferramentas_plugins_mcps": [...],
    "open_source": [...],
    "discussoes": [...],
    "papers": [...],
    "mercado": [...],
    "regulacao": [...],
    "integracoes_novas": [
      {
        "titulo": "...",
        "resumo": "...",
        "fonte": "https://...",
        "relevancia": "alta"
      }
    ],
    "dicas_economia_e_performance": [
      {
        "titulo": "...",
        "tipo": "economia_dinheiro | economia_tokens | performance",
        "resumo": "...",
        "fonte": "https://..."
      }
    ],
    "dicas_programadores": [
      {
        "titulo": "...",
        "resumo": "...",
        "fonte": "https://..."
      }
    ],
    "delphi_e_ia": [
      {
        "titulo": "...",
        "resumo": "...",
        "fonte": "https://..."
      }
    ],
    "comparativos_modelos": [
      {
        "titulo": "...",
        "resumo": "... (explicar em qual tarefa/cenário o modelo se destaca e por quê)",
        "modelos_comparados": ["..."],
        "custo_beneficio": "resumo curto de preço vs desempenho, quando aplicável",
        "fonte": "https://...",
        "relevancia": "alta"
      }
    ]
  },
  "glossario_do_dia": [
    { "termo": "RAG", "explicacao": "..." }
  ],
  "para_aprofundar": [
    { "titulo": "...", "tipo": "artigo|video|curso", "link": "..." }
  ]
}
```

### `glossario.json`
```json
{
  "RAG": "Explicação curta e simples do termo, atualizada só se necessário.",
  "fine-tuning": "..."
}
```
Antes de adicionar um termo novo no `glossario_do_dia` de um dia específico, o Hermes deve checar se ele já existe no `glossario.json` acumulado — se já existir, só referenciar o termo (não duplicar a explicação, a menos que tenha mudado/evoluído).

### `index.json`
```json
[
  { "data": "2026-08-02", "resumo": "...", "destaque_do_dia": true },
  { "data": "2026-08-01", "resumo": "...", "destaque_do_dia": false }
]
```
Serve como um índice rápido pra qualquer site listar os dias sem precisar abrir todos os JSONs individuais.

## Tom e linguagem
- Português claro, direto, sem academicismo.
- Pode usar analogias para explicar conceitos complexos.
- Zero pressuposição de que eu já sei termos técnicos — sempre explicar na primeira aparição do dia.
- Objetivo: eu ler em 10-15 minutos e sair mais inteligente sobre IA do que entrei.

## Objetivo de longo prazo
Com o acúmulo desses documentos diários, construir gradualmente meu domínio sobre:
- O vocabulário técnico da área (glossário vivo, sempre crescendo)
- Os principais players e suas estratégias
- As tendências e para onde a tecnologia está indo
- Um mapa mental de ferramentas, integrações e projetos que eu poderia usar no meu próprio trabalho
- Como programar de forma mais eficiente usando IA no dia a dia
- Como economizar dinheiro, tokens e ganhar velocidade nas minhas próprias aplicações de IA
- Como o ecossistema Delphi está (ou não) se conectando com o mundo de IA

## Extras desejáveis (se o Hermes permitir)
- Manter o **glossário acumulado** (`glossario.json`) sempre atualizado, sem duplicar termos já explicados.
- Atualizar o **`index.json`** a cada execução, adicionando a entrada do novo dia.
- No fim de cada semana, gerar um `resumos-semanais/AAAA-Www.json` consolidando os destaques dos 7 dias (mesmo schema de seções, mas agregando a semana).
- Marcar `"destaque_do_dia": true` quando algo for muito relevante/urgente (ex: um lançamento que muda o jogo), para o site poder destacar isso visualmente depois.
- Gerar também a versão `raw-md/AAAA-MM-DD.md` (mesmo conteúdo em markdown legível), só para eu conseguir ler rapidamente enquanto o site/backend ainda não existe.

## Pontos de atenção a monitorar
- **Cobertura de X/Twitter e LinkedIn na seção `discussoes`**: essas plataformas têm bloqueio anti-bot forte e são difíceis de raspar com ferramentas de busca genéricas (o conteúdo indexado é parcial — perde-se thread completo, engajamento, replies). Reddit e Hacker News, por outro lado, já vêm funcionando bem sem ferramenta extra.
  - Se, depois de 1-2 semanas de execução diária, a seção `discussoes` vier consistentemente vazia ou fraca especificamente em conteúdo de X/Twitter/LinkedIn, avaliar uma integração dedicada (ex: Bright Data, ou APIs oficiais das próprias plataformas) **só para esse ponto**, em vez de substituir toda a base de pesquisa atual.
  - Motivo de não integrar de cara: custo recorrente, API key extra para gerenciar, complexidade adicional — vale a pena só se o gap se confirmar como recorrente e real, não hipotético.

## Teste A/B de modelo do cron job (custo x qualidade)
- **02/08/2026**: rodou com Claude Sonnet 5 (modelo padrão da sessão) — qualidade alta, fontes específicas e verificáveis, boa distribuição de itens por categoria.
- **03/08/2026**: trocado para `google/gemini-3.1-flash-lite-20260507` (provider `nous`) visando reduzir custo — qualidade caiu: várias fontes viraram homepages genéricas (`blog.google/`, `arxiv.org/`, `github.com/` sem path), e várias categorias ficaram com só 1 item. Causa provável: modelo mais fraco fazendo menos esforço de busca real.
  - Corrigido no prompt do cron: regra explícita proibindo URL de fonte sem path específico (descartar item em vez de usar link genérico).
- **04/08/2026**: tentativa de trocar para "Gemini 3.1 Flash" (sem Lite) falhou — `google/gemini-3.1-flash-20260519` **não existe** no catálogo (a família 3.1 só tem Flash Lite / Flash Lite Preview / Pro Preview, não um "Flash" intermediário). O job de 5h falhou com HTTP 404 e não gerou o arquivo do dia. Corrigido para `google/gemini-3.5-flash-20260519` (esse existe) e o job foi re-executado manualmente às 21:42 com sucesso — efetivamente o teste desse dia é **Gemini 3.5 Flash**, não 3.1.
  - **Resultado da revisão**: salto de qualidade real em relação ao Flash Lite — 2-5 itens bem distribuídos por categoria, fontes específicas com path, resumos detalhados com números concretos (Elo scores, preços), Delphi+IA preenchido com itens genuínos. Único problema: citou agregador terceirizado (`swfte.com`) como fonte de rankings LMSYS em vez da fonte primária (`lmarena.ai`) — corrigida a regra no IDEA.md para preferir sempre fonte primária.
  - Fica bem mais perto do nível do Sonnet 5 (02/08) do que do Flash Lite (03/08), a um custo ainda bem menor que Sonnet.
- **05/08/2026 (planejado)**: trocar para DeepSeek V4 Flash 0731 (`deepseek/deepseek-v4-flash-20260731`, extremamente barato: $0.01/$0.02 por 1M tokens, e testado com bom desempenho em benchmarks de agente) e revisar qualidade.
- **Lição aprendida**: sempre confirmar que o ID exato do modelo existe no catálogo (via `hermes model` ou busca no Portal) antes de usar `hermes cron edit --model`, e checar `hermes cron runs <job_id>` no dia seguinte para confirmar que rodou sem erro — `last_status` no `cronjob list` pode ficar em `error` silenciosamente se ninguém checar.
- **Depois dos testes**: comparar custo x qualidade das fontes/itens entre Sonnet 5, Gemini 3.5 Flash e DeepSeek V4 Flash 0731, e fixar o vencedor como modelo definitivo do job (via `hermes cron edit 41366dbb1909 --model ... --provider ...`).

## Regras técnicas para os arquivos JSON
- Sempre **JSON válido** (o Hermes deve validar antes de salvar, para não quebrar o consumo posterior por um site/API).
- Nomes de arquivo e chaves sempre em minúsculo, sem espaços, no padrão já definido acima.
- Nunca sobrescrever dados de dias anteriores — cada dia é um arquivo novo e imutável.
- O `index.json` e o `glossario.json` são os únicos arquivos "vivos" (atualizados/sobrescritos a cada execução).
