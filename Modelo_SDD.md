Pacote Mestre SDD — Plataforma Jornada v2.3

Documento autosuficiente de entrada para o Claude Code gerar o MVP da Plataforma Jornada  
no contexto da Plataforma FIGITAL FAB LAB REC

Versão de consolidação baseada em tudo o que já foi definido neste chat, nos documentos-fonte utilizados no processo, nas complementações visuais de Mabuse e na mesclagem metodológica filtrada do documento de Augusto, preservando o recorte enxuto do MVP e evitando inflar a arquitetura com engine analítica prematura.

| **AZUL** | **AMARELO** | **VERMELHO** |
| :-: | :-: | :-: |
| Bem definido. Pode ser tratado como decisão consolidada para o MVP. | Forte, mas ainda depende de validação final ou detalhamento operacional. | Aberto. Não deve ser resolvido na fase de código por inferência. |


| **Como o Claude Code deve usar este documento  
**Trate este documento como a principal referência de produto, escopo, funcionalidades, experiência e direção técnica do MVP. Itens marcados em VERDE/AZUL podem ser implementados. Itens em AMARELO exigem prudência e não devem ser arbitrados sem validar o restante do pacote. Itens em VERMELHO não podem ser inventados no código e devem virar perguntas explícitas ou ser mantidos fora do escopo do MVP. |
| - |


**1. Mapa executivo do pacote AMARELO **

Este documento é o pacote mais completo possível neste momento para servir de input ao Claude Code. Ele já consolida produto, MVP, funcionalidades, UX e direção técnica. Ainda assim, alguns pontos críticos permanecem abertos e estão destacados com o padrão AZUL / AMARELO / VERMELHO.

| **Bloco** | **Objetivo** | **Status** | **Observação de uso** |
| :-: | :-: | :-: | :-: |
| Constitution operacional | Traduzir os princípios éticos em impacto real de produto | AMARELO | Usar como restrição normativa. Não tratar como resolvido em itens vermelhos. |
| Product Spec | Definir o produto e o problema que ele resolve | AZUL | Pode orientar implementação do escopo principal. |
| MVP Spec | Fixar o recorte real de 2 semanas | AZUL | Deve limitar o escopo do Claude Code. |
| Feature Specs do MVP | Descrever comportamento funcional central | AMARELO | Base suficiente para começar Design/Technical, mas ainda com lacunas pontuais. |
| Design Spec — base + derivação 11.A | Definir navegação, estados, hierarquia executiva, fluxos críticos e matriz detalhada de exportações | AMARELO | Derivação detalhada incorporada no pacote. Já pode orientar UI e handoff, mas ainda depende das observações em vermelho da Seção 11.A. |
| Technical Direction | Definir stack e arquitetura-alvo do MVP | AMARELO | Boa direção; ainda depende de decisões vermelhas. |
| Pontos críticos abertos | Evitar que o código invente decisões de produto | VERMELHO | Devem ser resolvidos ou explicitamente excluídos do MVP. |

**2. Documentos-fonte e precedência AZUL **

- Constituição — fundamentos éticos e limites do projeto.

- Histórias de Usuário da Plataforma FIGITAL FAB LAB REC — backlog metodológico e funcional.

- Roteiro de Entrevista com Gestor do Território — calibração de valor, entendimento e outputs.

- Canvas estratégico do MVP de 2 semanas — recorte operacional das Etapas 1 e 2.

- Discussões consolidadas neste chat — Product Spec v1, MVP Spec v1, Feature Specs iniciais, Design Skeleton e direção técnica.

**Ordem de precedência AZUL **

- A Constituição prevalece sobre qualquer decisão funcional ou técnica.

- O Product Spec prevalece sobre backlog amplo e desejos de escopo.

- O MVP Spec prevalece sobre funcionalidades fora do recorte de 2 semanas.

- Feature Specs guiam comportamento; o código não deve inventar regra de negócio.

- Itens em AMARELO ou VERMELHO não devem ser “resolvidos” por inferência na implementação.

**3. Contexto do portfólio e decisão estruturante AZUL **

**Arquitetura de portfólio AZUL **

A Plataforma FIGITAL FAB LAB REC é a arquitetura guarda-chuva do ecossistema digital. Dentro dela, existem dois produtos distintos:

- Plataforma Jornada para Antecipação de Futuros — produto territorial principal e foco deste documento.

- Plataforma Agente IA para Captação e Desenvolvimento de Projetos — produto/SaaS independente, estratégico, mas fora do MVP territorial atual.

**Decisão estruturante do ciclo atual AZUL **

Neste ciclo, o produto especificado e preparado para implementação no Claude Code é a Plataforma Jornada para Antecipação de Futuros, com foco nas Etapas 1 e 2 da Jornada.

**4. Processo adotado AZUL **

Estamos usando Spec-Driven Development (SDD). A implementação não começa por prompts de código. Ela começa por especificação. A sequência adotada é:

- Constitution

- Product Spec

- MVP Spec

- Feature Specs

- Design Spec

- Technical Spec

- Backlog final

- Implementação no Claude Code

| **Regra central  
**O Claude Code não deve definir o produto. O Claude Code deve implementar um produto já definido. Quando uma decisão não estiver azul, ela precisa ser respeitada como pendência ou restrição, e não “completada” no código. |
| - |

**5. Constitution operacional resumida AMARELO **

**5.1 Declaração do problema — versão consolidada AZUL **

Governos locais, secretarias e equipes territoriais ainda não dispõem de uma infraestrutura digital contínua capaz de conectar leitura territorial, evidências, escutas, atores, prioridades, carteira de projetos, governança, indicadores e decisão em um único ambiente rastreável e utilizável. Por isso, parte relevante da Jornada continua dispersa entre planilhas, relatórios, oficinas, entrevistas e documentos não conectados, reduzindo memória, continuidade, capacidade de execução e também a capacidade de estruturar oportunidades consistentes de captação de recursos, como editais, patrocínios, leis de incentivo, premiações e outras fontes de apoio. As soluções atuais falham porque organizam partes isoladas do processo, mas não sustentam a passagem completa do diagnóstico à pactuação, à estruturação, ao acompanhamento e à mobilização de recursos para o território.

*Leitura de status: a redação final do problema está consolidada como decisão funcional do pacote. Resta apenas registrá-la oficialmente na Constituição e mantê-la coerente com os artefatos derivados.*

**5.2 Princípios não negociáveis AZUL **

- Não prejudicar quem já foi prejudicado.

- Transparência sem exceção.

- Supervisão humana não é opcional.

- Conhecimento situado é dado de projeto.

- Reversibilidade é funcionalidade.

- Contextualização antes de adoção.

**5.3 Implicações diretas no produto AMARELO **

- Nenhuma decisão automatizada final sem revisão humana.

- Toda síntese estratégica deve ter origem, responsável e contexto.

- A plataforma não deve coletar dados além do necessário.

- Qualquer uso de IA deve ser auditável, restrito e explicável.

- A base precisa ser portável e reversível.

- Feedback territorial e escuta qualificada não podem virar apêndices secundários.

- Frugalidade operacional é requisito do produto. O MVP deve evitar dependências de custo variável elevado, integrações pagas sem justificativa clara, lock-in prematuro e uso desnecessário de processamento, storage, tráfego ou chamadas externas.

- 5.4 Pontos ainda abertos da Constitution AMARELO 

**Homologação institucional residual da política de dados sensíveis, acesso e retenção.**


- Decisões residuais do Design Spec derivado ainda em aberto: layout mestre das exportações PDF, semáforos de indicador, política de retenção das exportações e detalhes finos de navegação.


- Decisões residuais do Design Spec derivado ainda em aberto: layout mestre das exportações PDF, semáforos de indicador, política de retenção das exportações e detalhes finos de navegação.

**6. Product Spec — Plataforma Jornada AZUL **

**6.1 Nome oficial do produto AZUL **

Plataforma Jornada para Antecipação de Futuros.

**6.2 Definição oficial do produto AZUL **

A Plataforma Jornada para Antecipação de Futuros é uma plataforma territorial WEB que organiza leitura territorial, evidências, escutas, atores, prioridades, carteira de projetos, governança, indicadores e saídas executivas para apoiar a passagem do diagnóstico à pactuação, à estruturação de soluções e ao acompanhamento das ações no território.

**6.3 Definição curta AZUL **

É a plataforma digital da Jornada que transforma leitura territorial em decisão, carteira, governança e acompanhamento.

**6.4 O que o produto resolve AZUL **

O produto resolve a falta de uma infraestrutura digital contínua para sustentar a Jornada como processo cumulativo, rastreável, utilizável e institucionalmente legível.

- Sem o produto, a leitura territorial se dispersa.

- A escuta perde força analítica quando fica em documentos soltos.

- A transição entre etapas depende excessivamente de memória e curadoria manuais.

- O gestor não acessa uma visão executiva clara do território.

- A carteira de projetos nasce sem continuidade operacional suficiente.

**6.5 O que o produto é AZUL **

- Uma plataforma WEB-first.

- Uma infraestrutura digital territorial.

- Uma base de organização, leitura, conexão, priorização e acompanhamento inicial.

- Um instrumento de apoio à decisão e coordenação.

- Uma interface executiva e operacional da Jornada.

**6.6 O que o produto não é AZUL **

- Não é o ecossistema FIGITAL completo já no MVP.

- Não é o Agente IA de captação.

- Não é rede social territorial completa.

- Não é LMS completo.

- Não é observatório avançado.

- Não é aplicativo mobile nativo.

- Não é automação total do método.

- Não substitui facilitação, escuta ou leitura estratégica humana.

**6.7 Valor gerado no curto prazo AZUL **

- Memória estruturada.

- Rastreabilidade do processo territorial.

- Consolidação da leitura estratégica.

- Passagem do diagnóstico para a carteira.

- Governança mínima explícita.

- Visão executiva utilizável por gestor e secretaria.

**6.8 Status do Product Spec AZUL **

*O Product Spec está forte o suficiente para orientar o recorte do MVP e a escrita dos specs derivados. As principais lacunas não estão mais no “o quê”, e sim no “como” operacionalizar certas decisões sensíveis.*

**7. Usuários, perfis e jobs to be done AMARELO **

**7.1 Usuários principais AZUL **

| **Perfil** | **Objetivo principal** | **Valor esperado** |
| :-: | :-: | :-: |
| Gestor público / secretário / prefeito | Entender rapidamente estágio do território, prioridades, riscos e o que exige decisão. | Leitura executiva clara, poucos cliques, exportações imediatas. |
| Equipe técnica do território | Alimentar dados, validar prioridades, estruturar projetos e acompanhar indicadores. | Ambiente único de registro, organização e acompanhamento. |
| Articulador territorial / facilitação | Registrar escutas, entrevistas, evidências, oficinas e atores. | Captura simples, rastreável e conectada ao território. |
| Equipe Fab Lab Rec | Administrar, revisar, consolidar, exportar e apoiar o território. | Visão administrativa, analítica e transversal. |
| Parceiro estratégico / financiador | Acessar saídas executivas controladas. | Leitura institucional clara, sem acesso irrestrito à base operacional. |

**7.2 Jobs to be done AMARELO **

- Quando a equipe estiver lendo o território, precisa registrar e relacionar evidências, escutas, atores e ativos sem perder contexto.

- Quando a equipe estiver saindo do diagnóstico, precisa converter leitura em prioridades, frentes, projetos e carteira inicial.

- Quando o gestor estiver indo para uma reunião, precisa abrir um painel curto, confiável e legível sobre o território.

- Quando a equipe precisar justificar uma prioridade, precisa mostrar vínculo entre evidência, escuta, ator, decisão e projeto.

- Leitura de status: os perfis e objetivos estão bem definidos. A matriz funcional de permissões já foi consolidada em nível de produto; faltam apenas refinamentos finos derivados de dashboard, publicação e política de dados/exportações.

*Leitura de status: os perfis e objetivos estão bem definidos. O que ainda falta é a matriz final de permissões e o refinamento fino de frequência/contexto de uso.*

**8. Outputs principais do produto AMARELO **

**8.1 Outputs da Etapa 1 AZUL **

- Radar Estratégico

- Mapa do Território / GeoPortal v1

- Mapa de Atores e Governança

- Síntese de dores e vocações prioritárias

- Carteira preliminar

- Leitura inicial de viabilização

**8.2 Outputs da Etapa 2 AZUL **

- Carteira priorizada

- Fichas mínimas de projeto

- Protótipos/testes registrados

- Indicadores iniciais

- Plano de execução e governança

- Dashboard executivo v1

- Kit Expedição

**8.3 Matriz resumida de formato das saídas AMARELO **

8.4 Gramática analítica mínima do Radar Estratégico — versão metodológica consolidada AMARELO

No MVP, o Radar Estratégico deve operar com gramática analítica mínima e explícita, suficiente para qualificar a leitura territorial sem converter o produto em motor analítico pesado. A contribuição metodológica de Augusto entra aqui como ontologia de uso e de interface, não como exigência automática de novas entidades de banco. Para efeito do pacote atual, adota-se a seguinte definição operacional mais estrita: sinal é evento, dado, anomalia ou inovação empiricamente observável no presente, com potencial de escalabilidade ou impacto sistêmico futuro, e para ser registrado como síntese válida deve estar vinculado a pelo menos uma evidência bruta com URL, documento ou relato datado; tensão é o atrito observável entre uma estrutura estabelecida e uma força emergente ou pressão externa, devendo ser formulada preferencialmente na sintaxe “A versus B”; risco é a probabilidade de ocorrência de evento futuro adverso derivado de tensões não resolvidas ou sinais negativos, sempre com objeto de impacto claro; oportunidade é janela de intervenção temporalmente delimitada baseada em sinais positivos, ativos territoriais ou alívio de tensões, preferencialmente vinculada a um ativo territorial ou sinal emergente; hipótese é proposição testável sobre a relação entre intervenção proposta e resultado territorial desejado, formulada preferencialmente na sintaxe “Se fizermos X, então observaremos Y, porque Z”. Essas categorias devem servir como linguagem comum entre leitura técnica, síntese executiva, radar e priorização, evitando uso genérico ou intercambiável dos termos.

8.5 Confiança, incerteza e sustentação empírica — versão metodológica consolidada AMARELO

No MVP, toda leitura estratégica relevante pode ser qualificada, quando útil, por três dimensões leves de interpretação: confiança, incerteza e sustentação empírica. Essas dimensões existem para melhorar a honestidade analítica dos outputs, e não para criar sistema matemático obrigatório. Confiança deve operar em 3 níveis leves de governança: Exploratório, quando a leitura decorre de intuição ou relato isolado; Plausível, quando há corroboração por mais de um ator ou dado secundário; e Validado, quando há sustentação por dados estruturados ou consenso de governança. Sustentação empírica pode ser representada por marcador simples ou contagem de evidências vinculadas; síntese com 0 evidências vinculadas recebe marcador visual de Baixa Sustentação e entra em estado de pendência para revisão. Incerteza não precisa ser calculada por engine analítico: no MVP ela pode ser exibida de forma leve por meio de riscos relevantes não mitigados vinculados a uma prioridade ou projeto, preservando legibilidade executiva. Nada disso deve bloquear a operação do MVP, mas tudo deve qualificar a leitura com mais honestidade metodológica.

8.6 Diretriz de triangulação analítica leve e limites do Radar AMARELO

A leitura estratégica do MVP deve, sempre que houver base suficiente, buscar coerência entre três planos: contexto externo relevante, dados estruturados disponíveis e realidade territorial registrada na Jornada. Essa triangulação deve operar como princípio de qualidade analítica e prudência metodológica, e não como pipeline técnico rígido ou requisito bloqueador de output. Ao mesmo tempo, o Radar Estratégico do MVP não deve produzir síntese autônoma: o sistema não cruza sinais e tensões para gerar hipóteses automaticamente; a síntese continua sendo ato de responsabilidade humana. No dashboard executivo, o bloco Radar Estratégico Resumido deve exibir, por padrão, no máximo 5 itens prioritários combinando sinais, tensões, riscos e oportunidades, ordenados por recência ou peso manual. Esse limite existe por frugalidade cognitiva e legibilidade executiva e não restringe a existência de uma visão derivada mais rica do Radar, com filtros e rastreabilidade ampliada. Toda síntese relevante exibida no Radar deve manter rastreabilidade reversa para a evidência ou o ator que a originou; quando esse vínculo estiver quebrado, o item entra em estado de pendência.

8.7 Refinamento da priorização mínima com heurística leve AMARELO

A priorização do MVP permanece simples, humana e transparente, evitando sofisticação prematura. A contribuição de Augusto entra aqui como heurística leve de ordenação visual, e não como substituição integral da lógica funcional já consolidada do pacote. O quadro de prioridades pode usar os eixos Relevância Estratégica (R), Viabilidade de Execução (V) e Fator de Redução por Dependência (D), avaliados de forma simples pelo usuário, para sugerir ordenação visual por meio da fórmula P = (R + V) × D. No MVP, R e V podem permanecer em escala simples de 1 a 3, enquanto D atua como redutor leve quando houver dependências críticas relevantes. Essa heurística deve ser visível em interface, não pode ser “caixa-preta” e não elimina o override manual do gestor ou da equipe. O efeito prático esperado é apenas sugerir diferenciação entre itens mais prontos para iniciar e hipóteses ainda em maturação, sem criar motor analítico obrigatório, sem redefinir sozinho o banco e sem impedir decisão humana final.

| **Saída** | **Formato principal** | **Status de definição** |
| :-: | :-: | :-: |
| Dashboard executivo do território | Tela | Principal visão executiva do gestor; exportações executivas derivadas já definidas. |
| GeoPortal v1 | Tela (versão super simples, interna) | Previsto como recurso territorial mínimo, não como módulo geográfico pesado no MVP. |
| Mapa de atores e governança | Tela + Exportação simples | Direção funcional definida; layout final depende de Mabuse. |
| Radar Estratégico | Exportação principal (PDF executivo) | Direção funcional definida; pode existir como bloco resumido em tela, dependendo do design final. |
| Carteira priorizada | Tela + PDF + planilha | Direção funcional definida; faltam ajustes finais de formato/legibilidade. |
| Ficha mínima de projeto | Tela + PDF + planilha resumida | Direção funcional definida; faltam ajustes finais de formato/legibilidade. |
| Kit Expedição | PDF consolidado + anexos complementares | Direção funcional definida; empacotamento final depende da homologação visual. |

**9. MVP Spec — escopo real de 2 semanas AZUL **

**9.1 Definição do MVP AZUL **

O MVP de 2 semanas é o núcleo operacional inicial da Plataforma Jornada, suficiente para gerar base territorial, leitura estratégica, carteira inicial, governança mínima, indicadores básicos, dashboard executivo e exportações para sustentar Etapa 1 e Etapa 2.

**9.2 Princípio do corte AZUL **

Entram no MVP apenas as capacidades que produzem base de dados do território, sustentam a passagem entre etapas, permitem visão executiva clara e geram exportações úteis ao território e à prefeitura.

**9.3 Capacidades centrais do MVP AZUL **

| **Código** | **Capacidade** | **Motivo de entrada** |
| :-: | :-: | :-: |
| CAP-01 | Configurar e ativar o território | Sem workspace do território, não existe base comum nem rastreabilidade. |
| CAP-02 | Registrar e organizar evidências, escutas e memória territorial | Etapa 1 depende disso para existir como base utilizável. |
| CAP-03 | Mapear atores, governança e ativos do território | É entrega obrigatória da Etapa 1 e base da pactuação. |
| CAP-04 | Converter leitura territorial em prioridades e carteira inicial | É a ponte real entre Etapa 1 e Etapa 2. |
| CAP-05 | Estruturar projetos mínimos na Fábrica de Projetos v1 | Etapa 2 precisa sair com fichas, responsáveis e ordem inicial. |
| CAP-06 | Registrar indicadores iniciais e acompanhar status executivo | Sem isso a Etapa 2 perde visibilidade gerencial mínima. |
| CAP-07 | Exibir dashboard executivo e gerar exportações essenciais | É a principal face institucional do MVP. |

**9.4 O que entra no MVP AZUL **

- Setup do território e workspace

- Repositório de evidências

- GeoPortal v1 / perfil territorial (versão super simples, interna)

- GeoPortal v1 / perfil territorial

- Mapa de atores e governança

- Cadastro de ativos, iniciativas e projetos

- Fábrica de Projetos v1 (versão mínima)

- Painel de indicadores v1 (versão mínima)

- Painel de indicadores v1

- Dashboard executivo do território

- Landing pública mínima da Jornada

- Login / embarque simples




- Dados abertos básicos do IBGE (localidades e agregados)

- Exportações essenciais

**9.5 O que fica fora do MVP AZUL **

- Rede de Ativação completa

- Escola do Futuro completa

- Integrações externas extensas e cruzamentos complexos de dados públicos

- Dashboard público aberto

- Base política completa, emendas detalhadas, OSCs integradas e CNPJ enriquecido

- Cadastro público complexo / autosserviço

- Comunidade digital robusta

- Aplicativo mobile nativo

- Observatório avançado

- Analytics avançado

- IA pública ou conversacional

- Multi-tenant robusto

- 9.7 Camada pública mínima e dados abertos do MVP AMARELO

- **Observação de escopo AMARELO**

- **Além do núcleo territorial, o MVP inclui uma camada pública mínima de entrada e leitura contextual via dados abertos básicos.**

- **Esses elementos devem ser implementados como escopo leve e não como módulo analítico avançado ou dashboard público aberto.**

- Camada pública mínima do MVP: landing page da Jornada, proposta de valor, etapas/entregas, CTA de contato/embarque e login.

- Não entra no MVP como prioridade: dashboard público aberto.

- Bases abertas obrigatórias do MVP: IBGE Localidades, IBGE SIDRA/Agregados básicos e geobr.

- Bases abertas de fase seguinte ou opcionais: TSE, Portal da Transparência CGU, Mapa das OSCs do IPEA e Base dos Dados, restrita à trilha econômica/industrial quando essa camada for priorizada institucionalmente.

- Objetivo dos dados abertos no MVP: enriquecer perfil territorial e leitura executiva com contexto público útil, sem inflar escopo nem criar dependência excessiva de integrações.

- Suporte geoespacial leve opcional no MVP: OpenStreetMap/Overpass API como apoio ao GeoPortal v1 e ao contexto territorial, sem transformar o MVP em ferramenta de análise urbana avançada.

- **Observação complementar de governança AMARELO**

- Na ausência temporária de validação metodológica integral de Edgar Andrade, Leonardo Andrade poderá assumir provisoriamente decisões de corte funcional relacionadas à camada pública, ao uso comercial inicial do MVP e ao limite entre simplificação aceitável e expansão indevida de escopo, desde que essas decisões não contrariem o MVP já consolidado nem criem falsa sensação de homologação metodológica plena.

- **Princípio de uso desta diretriz AMARELO**

- As contribuições de Edgar nesta fase devem ser lidas como orientação estratégica e comercial útil para priorização e proteção do valor institucional do MVP, mas não como autorização automática para ampliar o produto além do recorte já aprovado. Quando houver tensão entre desejo comercial e corte do MVP, prevalece o MVP Spec já consolidado.

- **O que esta diretriz autoriza priorizar no MVP AMARELO**

- O MVP pode e deve priorizar, de forma explícita, as capacidades já coerentes com a espinha metodológica da Jornada e com o recorte aprovado: rodar a coleta e organização de dados no ambiente digital; sustentar leitura executiva útil para perfis estratégicos; gerar exportações e relatórios essenciais das entregas; manter landing pública mínima, embarque simples e login para usuários habilitados; e enriquecer o perfil territorial com IBGE, geobr e suporte geoespacial leve quando necessário.

- Também é aceitável, no estudo de caso e em fluxos controlados, registrar dados sobre indústrias locais como evidência, ator, ativo, iniciativa ou insumo territorial, desde que isso não exija integração complexa, novo módulo analítico pesado ou ampliação indevida do modelo de dados do MVP.

- **Simplificações metodologicamente aceitáveis neste ciclo AMARELO**

- São consideradas simplificações aceitáveis para o ciclo atual: restringir o MVP às Etapas 1 e 2; manter a visão executiva principal em ambiente controlado e não público; limitar a camada pública à apresentação da Jornada, CTA de contato/embarque e acesso a login; usar dados públicos apenas como enriquecimento contextual básico; e tratar interação de perfis estratégicos como leitura controlada ou trilha mínima de registro, e não como comunidade digital robusta.

- **O que não deve ser prometido como capacidade do MVP AMARELO**

- Não devem ser prometidos como capacidade do MVP, nem no SPEC nem em proposta comercial dependente do produto atual: chamada pública estruturada para 50 cidades com funil completo operado pela própria plataforma; cadastro público autosserviço robusto; dashboard público aberto; camada interativa ampla para perfis externos; cruzamentos complexos multi-origem; base política expandida; enriquecimento automatizado em tempo real de bases externas; geração automática, em escala, de análise antecipatória para cidades inscritas; ou entrega automática de relatórios estratégicos sem supervisão humana obrigatória.

- **Cuidado metodológico obrigatório AMARELO**

- Cruzar dados do IBGE com dados coletados no território pode enriquecer o contexto e melhorar a leitura executiva, mas isso, por si só, não sustenta promessa forte de análise antecipatória automatizada. Sem camada interpretativa supervisionada, o risco é entregar apenas retrato do presente ou síntese superficial. Portanto, qualquer automação futura de leitura antecipatória, síntese ou relatório deve permanecer fora do núcleo obrigatório do MVP e, se vier a existir em fase seguinte, deverá ser opcional, auditável, supervisionada e nunca substitutiva da leitura humana territorial.

- **Diretriz comercial de uso do MVP AMARELO**

- Do ponto de vista comercial, o MVP pode ser apresentado como núcleo digital confiável para operação territorial, leitura executiva, rastreabilidade, geração de entregas contratuais e demonstração institucional da Jornada. Ele também pode ser usado como base para captação futura, triagem e amadurecimento de uma oferta mais ampla. O que não deve ocorrer é vender o MVP atual como motor plenamente automatizado de seleção, leitura antecipatória e geração massiva de relatórios para múltiplas cidades sem mediação humana.

- **Regra de precedência AMARELO**

- Caso surja conflito entre esta diretriz provisória e futura validação metodológica explícita de Edgar Andrade, prevalece a validação metodológica final, e o Pacote Mestre, o Formulário e os specs derivados deverão ser atualizados antes de novo handoff ao Claude Code.

- **Leitura de status AMARELO**

- Direção provisória forte para proteger o corte do MVP, organizar o uso comercial do produto e evitar promessa indevida. Não equivale a chancela metodológica final integral de Edgar.

- Diretriz complementar de sustentabilidade operacional AMARELO

- O MVP deve ser arquitetado com frugalidade operacional. APIs, LLMs, serviços externos, processamento pesado, storage, exportações, tráfego e automações só entram quando houver necessidade real de produto, custo ou quota conhecidos, fallback definido e responsável explícito pela dependência.

- Regra de entrada de dependências externas AMARELO

- Nenhuma integração externa deve entrar no MVP apenas por sofisticação técnica. Para cada API, LLM ou serviço adicional, o SPEC deve registrar finalidade, se é obrigatória ou opcional no MVP, risco de custo variável, alternativa suficiente mais barata ou gratuita quando existir, fallback manual ou técnico e responsável pela aprovação e acompanhamento.

- Leitura prática de custo no ciclo atual AMARELO

- Supabase, Vercel, Storage, exportações, anexos, branches de preview, processamento de funções, tráfego, otimização de imagens e chamadas a modelos externos devem ser tratados com cuidado para evitar crescimento silencioso de custo. O corte atual do MVP continua privilegiando soluções suficientes, uso controlado de integrações e ausência de dependência obrigatória de LLMs no núcleo do produto.

- Integrações externas extensas

- Backlog do Agente IA

**9.6 Critérios de sucesso do MVP AZUL **

- Um território pode ser criado rapidamente.

- A equipe registra dados sem planilhas paralelas como base principal.

- O território gera visão executiva utilizável.

- A Etapa 1 sai com outputs estratégicos exportáveis.

- A Etapa 2 sai com carteira, projeto mínimo, indicador e material executivo exportável.

- A atualização contínua não destrói histórico.

- O produto pode ser usado em reunião institucional sem explicação excessiva.

**10. Feature Specs centrais do MVP AMARELO **

**FS-01 — Administrador configura um território e abre um ciclo de trabalho AMARELO **

Objetivo: criar o território, definir responsáveis, recorte e status inicial do workspace.

- Usuário principal: equipe Fab Lab Rec / equipe técnica.

- Pré-condição: usuário autenticado com permissão administrativa.

- Happy path: criar território → preencher dados mínimos → salvar → abrir workspace.

- Edge cases já definidos: duplicidade, dados mínimos insuficientes, responsável ainda não ativo.

- Critério de aceite: território criado e pronto para receber evidências, atores e projetos.

*Leitura de status: a estrutura funcional está suficientemente clara para orientar Design e Technical Spec, mas ainda requer fechamento dos pontos vermelhos antes de um handoff final e irrestrito ao Claude Code.*

**FS-02 — Articulador registra evidências territoriais com rastreabilidade AMARELO **

Objetivo: registrar documentos, dados, links e materiais com classificação, confiabilidade e vínculo territorial.

- Usuário principal: articulador / equipe técnica / Fab Lab.

- Happy path: criar evidência → preencher campos mínimos → anexar/linkar → salvar → listar/filtrar.

- Edge cases já definidos: sem anexo, data aproximada, duplicidade potencial.

- Critério de aceite: evidência salva, listável, filtrável e exportável.

*Leitura de status: a estrutura funcional está suficientemente clara para orientar Design e Technical Spec, mas ainda requer fechamento dos pontos vermelhos antes de um handoff final e irrestrito ao Claude Code.*

**FS-03 — Articulador registra escutas e entrevistas estruturadas AMARELO **

Objetivo: transformar escutas e entrevistas em dados estruturados utilizáveis na leitura territorial.

- Usuário principal: articulador / equipe técnica / Fab Lab.

- Happy path: criar escuta → registrar contexto e síntese → vincular → salvar.

- Edge cases já definidos: escuta incompleta, entrevista coletiva, sensibilidade dos dados.

- Critério de aceite: registro filtrável, vinculável e utilizável em síntese posterior.

*Leitura de status: a estrutura funcional está suficientemente clara para orientar Design e Technical Spec, mas ainda requer fechamento dos pontos vermelhos antes de um handoff final e irrestrito ao Claude Code.*

**FS-04 — Equipe organiza atores, governança e ativos do território AMARELO **

Objetivo: mapear quem influencia, executa, decide, apoia e quais ativos existem no território.

- Usuário principal: articulador / equipe técnica / Fab Lab.

- Happy path: criar ator ou ativo → classificar → vincular → salvar → listar/filtrar.

- Edge cases já definidos: ator com dados incompletos, múltiplos papéis, ativo provisório.

- Critério de aceite: mapa/lista exportável e visão utilizável do arranjo inicial.

*Leitura de status: a estrutura funcional está suficientemente clara para orientar Design e Technical Spec, mas ainda requer fechamento dos pontos vermelhos antes de um handoff final e irrestrito ao Claude Code.*

**FS-05 — Equipe converte leitura territorial em prioridades e carteira inicial AMARELO **

Objetivo: transformar leitura, dores e hipóteses em prioridades, frentes e projetos iniciais.

- Usuário principal: equipe técnica / Fab Lab.

- Happy path: registrar prioridade → classificar → gerar projeto/frente → salvar em carteira.

- Edge cases já definidos: sem evidência associada, conflito de prioridade, projeto sem responsável.

- Critério de aceite: prioridade cadastrável, carteira filtrável e exportável.

*Leitura de status: a estrutura funcional está suficientemente clara para orientar Design e Technical Spec, mas ainda requer fechamento dos pontos vermelhos antes de um handoff final e irrestrito ao Claude Code.*

**FS-06 — Equipe registra indicadores iniciais dos projetos e acompanha status mínimo AMARELO **

Objetivo: criar base mínima de monitoramento para a carteira.

- Usuário principal: equipe técnica / Fab Lab / gestor em leitura.

- Happy path: criar indicador no projeto → definir baseline/meta/frequência → salvar → exibir em painel.

- Edge cases já definidos: baseline pendente, fonte não validada, excesso de indicadores.

- Critério de aceite: indicador visível, atualizado e incluível em saída executiva.

*Leitura de status: a estrutura funcional está suficientemente clara para orientar Design e Technical Spec, mas ainda requer fechamento dos pontos vermelhos antes de um handoff final e irrestrito ao Claude Code.*

**FS-07 — Gestor acessa dashboard executivo e exporta sínteses do território AMARELO **

Objetivo: entregar leitura executiva curta e exportação institucional.

- Usuário principal: gestor público / secretário / prefeito.

- Happy path: abrir dashboard → ler blocos principais → exportar síntese.

- Edge cases já definidos: dados insuficientes, desatualização, falha de exportação.

- Critério de aceite: visão legível e utilizável em reunião institucional.

*Leitura de status: a estrutura funcional está suficientemente clara para orientar Design e Technical Spec, mas ainda requer fechamento dos pontos vermelhos antes de um handoff final e irrestrito ao Claude Code.*

**11. Design Skeleton v1 AMARELO **

**11.1 Princípios de UX AZUL **

- WEB-first.

- Responsiva sempre que possível.

- Foco principal em desktop/laptop para dashboard e gestão.

- Captura e consulta rápida responsivas.

- Navegação curta.

- 11. Design Spec — base mínima e derivação detalhada AMARELO 

- Excelente legibilidade.

- Filtros claros.

- Poucos campos obrigatórios por tela.

- Estados vazios úteis.

- Feedback explícito de erro e sucesso.

**11.2 Estrutura sugerida de navegação AMARELO **

- Território

- Evidências e escutas

- Atores e ativos

- Prioridades

- Projetos

- Indicadores

- Exportações

**11.3 Fluxos principais AMARELO **

| **Perfil** | **Fluxo principal** |
| :-: | :-: |
| Gestor | Login → Território → Dashboard executivo → Radar → Carteira → Indicadores → Exportação |
| Articulador | Login → Território → Evidências/Escutas → Novo registro → Vínculo → Salvar → Revisar pendências |
| Equipe técnica | Login → Prioridades → Criar/Ajustar prioridade → Gerar projeto → Registrar responsável → Criar indicador → Exportar ficha |
| Fab Lab | Login → Visão administrativa → Consolidar dados → Revisar síntese → Publicar/Exportar saída executiva |

**11.4 Estados obrigatórios por tela crítica AMARELO **

- Vazio

- Claude Code será usado para implementar a plataforma; o uso de Claude API ou outros serviços externos no produto não é dependência obrigatória do MVP e será decidido conforme necessidades futuras.

- Erro

- Sucesso

- Pendência/Rascunho, quando aplicável

**11.5 Itens ainda abertos no Design VERMELHO **

- Fluxo tela a tela com profundidade de navegação real.

- Layout final do dashboard executivo.

- Padrões finais de mensagem de erro e sucesso.

- Carregando

- Definição detalhada da experiência responsiva por tela.

**12. Technical Direction v1 AMARELO **

**12.1 Stack definida AZUL **

- 11.5 Itens ainda abertos no Design após a derivação AMARELO 

- Decisões finas de navegação ainda marcadas em vermelho na Seção 11.A (GeoPortal no menu, comportamento de breadcrumb por link externo e seletor multi-território).

- Definições complementares da separação executivo/operacional ainda dependentes de homologação (modo de inspeção Fab Lab Rec e recorte final do parceiro estratégico).

- Metas mensuráveis de UX ainda não fechadas: número máximo de cliques por fluxo e regra final da persistência do estado de pendência entre sessões.

- Regras finais do dashboard e dos indicadores ainda pendentes: semáforos de indicador, presença obrigatória de pendências nos stats e decisão final sobre Radar resumido versus tela derivada.

- Layout mestre e decisões institucionais das exportações PDF ainda em aberto: render front ou back, formato final do Kit Expedição e política de retenção dos arquivos gerados.

**🔴 Observação  **Permanecem em aberto, como derivação direta deste documento e dependência cruzada com outras seções do pacote principal: paleta final e identidade visual aplicada aos estados; layout mestre das exportações PDF; regra final dos semáforos de indicador; matriz de permissões por perfil em relação à visibilidade de campos na exportação; política de retenção das exportações.

**🔵 Definição consolidada  **Com este documento ficam fechados seis dos itens marcados como pendência aberta na Seção 11 do pacote principal: navegação principal, separação executivo/operacional, fluxo tela a tela dos cinco fluxos críticos, estados de interface tela a tela, hierarquia do dashboard executivo e matriz de exportações por formato. Os itens aqui consolidados podem ser usados imediatamente para derivação de componentes e para estimativa de handoff ao Claude Code.

# Encerramento desta derivação

**🔴 Observação  **Ainda falta definir política de retenção das exportações geradas: por quanto tempo os arquivos gerados ficam disponíveis para redownload pelo usuário que os criou e pela equipe Fab Lab Rec. Recomendação inicial: durante toda a vigência do ciclo territorial, com expurgo ao encerramento.

**🔴 Observação  **Ainda falta decidir se o Kit Expedição será um único PDF compilado ou um pacote ZIP com um PDF por componente e um PDF índice. Recomendação: pacote ZIP, para que cada componente seja reutilizável separadamente nas reuniões da Expedição.

**🔴 Observação  **Ainda falta fechar o layout mestre de cada PDF institucional com identidade visual aplicada (capa, cabeçalho, rodapé, tipografia, grid). Esse é item bloqueador para a implementação das exportações PDF.

**🔴 Observação  **Ainda falta decidir se o PDF da Síntese Executiva será renderizado no frontend (controle visual total, dependência de tempo de sessão) ou no backend (render mais robusto, dependência de infraestrutura). Recomendação inicial: backend com biblioteca testada, dado o peso institucional desses documentos.

**🔵 Definição consolidada  **Orientação de uso institucional: cada PDF deve ser entregue com nome de arquivo padronizado no formato FABLAB-RECIFE\_\<TERRITORIO\>\_\<SAIDA\>\_v\<VERSAO\>\_\<AAAA-MM\>.pdf, coerente com o padrão de nomenclatura usado no acervo do Fab Lab Rec (DOC000, REF001 e afins). Esse padrão é também o padrão sugerido para XLSX e CSV, substituindo a extensão. A padronização é requisito de arquivamento institucional, não preferência estética.

**🔵 Definição consolidada  **Orientação de legibilidade para PDFs institucionais: uma coluna de texto principal com fonte serifada ou humanist sans; margens confortáveis; cabeçalho com identidade visual do Fab Lab Rec; rodapé com número de página, data de geração, responsável e procedência; tabelas com linhas zebradas; gráficos com fonte, data e legenda explícita; blocos de síntese sempre com citação do vínculo (evidência, escuta, ata).

| **Saída** | **PDF** | **XLSX** | **CSV** | **Perfil que exporta** | **Uso esperado** | **Regra crítica** |
| - | - | - | - | - | - | - |
| Síntese executiva do território | Primário | — | — | Gestor; Equipe Fab Lab | Reunião institucional e arquivo oficial | Inclui procedência, data, responsáveis e versão da Constitution |
| Relatório executivo da Etapa 1 | Primário | — | — | Gestor; Equipe Fab Lab | Fechamento da Etapa 1 em sessão executiva | Inclui Radar, prioridades, atores-chave e evidências-chave |
| Radar Estratégico | Primário | Secundário | — | Equipe técnica; Equipe Fab Lab | Leitura antecipatória e compartilhamento | Cada item com data, fonte e responsável pela leitura |
| Carteira priorizada | Primário | Primário | Secundário | Equipe técnica; Gestor | Pactuação executiva e trabalho analítico | PDF com visual institucional; XLSX com filtros automáticos |
| Ficha mínima de projeto | Primário | — | — | Equipe técnica | Documento-base do projeto em reuniões e editais | Uma ficha por PDF; identificador estável visível |
| Indicadores iniciais | Secundário | Primário | Secundário | Equipe técnica; Gestor | Acompanhamento e reuso em planilhas institucionais | XLSX com uma aba por projeto; baseline, meta e última atualização por indicador |
| Base de evidências | Secundário | Primário | Primário | Articulador; Equipe técnica | Reuso analítico e auditoria | CSV para reuso técnico; XLSX para trabalho direto |
| Base de escutas e entrevistas | Secundário | Primário | Secundário | Articulador; Equipe técnica | Consolidação temática e análise | Campos sensíveis só exportáveis com permissão explícita |
| Mapa de atores e governança | Primário | Primário | Secundário | Articulador; Equipe Fab Lab; Gestor | Reuniões de governança e análise de influência/postura | PDF inclui quadrante visual; XLSX inclui tipo de entidade e vínculos |
| Kit Expedição (Etapa 2) | Primário | — | — | Equipe Fab Lab; Gestor | Pacote de entrega da Expedição | Compilação ordenada: Radar, carteira, fichas, indicadores, atores-chave |
| Dashboard executivo (snapshot) | Primário | — | — | Gestor | Captura do estado do território em momento decisório | Inclui data do snapshot e todos os blocos visíveis no painel |
| Log de auditoria de exportações | Secundário | Primário | Primário | Equipe Fab Lab; Gestor | Rastreabilidade e governança | Apenas perfis administrativos; nunca inclui dado de negócio |

A matriz a seguir consolida, por saída do produto, os formatos oferecidos, o formato primário, o perfil que exporta, o uso esperado e a regra crítica de cada saída:

**🔵 Definição consolidada  **Toda exportação gera registro em log de auditoria com: entidade exportada, filtros aplicados, campos selecionados, formato, responsável, data/hora, total de registros exportados. Esse log é consultável por gestor e pela equipe Fab Lab Rec e integra o ciclo de rastreabilidade exigido pela Constitution.

**🔵 Definição consolidada  **Toda exportação, em qualquer formato, respeita a regra de visibilidade por perfil: exporta apenas os campos e registros visíveis para o perfil do usuário que solicita. Campos sensíveis (notas internas, dados de contato em detalhe, transcrições de escuta confidencial) exigem permissão explícita e aparecem no relatório final de exportação com marcação visual.

**🔵 Definição consolidada  **Princípio de reuso técnico: toda exportação em CSV é plana, sem formatação, com encoding UTF-8 com BOM, separador vírgula, aspas duplas para texto e identificador estável da entidade. O CSV nunca contém sumários, totais ou linhas de cabeçalho múltiplas: é fonte de dados para sistema terceiro ou ferramenta analítica.

**🔵 Definição consolidada  **Princípio de interoperabilidade: toda exportação em XLSX tem cabeçalhos claros, filtros automáticos ativados, coluna de identificador estável da entidade, uma linha por registro e uma aba por tipo de entidade quando houver mais de um conjunto na mesma exportação. O XLSX é aberto em Excel, Google Sheets e LibreOffice sem ajuste manual.

**🔵 Definição consolidada  **Princípio de legibilidade institucional: toda exportação em PDF segue padrão visual do Fab Lab Rec, com cabeçalho institucional, rodapé de procedência, paginação, data de geração, filtros aplicados e responsável pela exportação. O PDF nunca é apenas transcrição da tela: é documento formatado para leitura fora da plataforma, em contexto de reunião ou arquivo oficial.

**🔵 Definição consolidada  **A plataforma oferece três formatos de exportação no MVP, com usos distintos e irredutíveis: PDF, destinado à leitura institucional, reunião e compartilhamento externo; XLSX, destinado ao trabalho analítico interno e reuso de dados; CSV, destinado à interoperabilidade com outros sistemas e análises técnicas. Nenhum formato é padrão universal: cada saída do produto tem formato primário e, quando justificável, formato secundário.

## 11.A.6 Matriz de exportações por formato

**🔴 Observação  **Ainda falta definir regras exatas dos semáforos de indicador (limiares, cores, comportamento quando dado está ausente), para evitar falsa leitura executiva.

**🔴 Observação  **Ainda falta decidir se o bloco Stats — Pendências é obrigatório no MVP. Recomendação: obrigatório, pois pendência é dado executivo de qualidade do trabalho territorial, não apenas operacional.

**🔴 Observação  **Ainda falta decidir se o Radar Estratégico aparecerá como bloco resumido no dashboard ou como tela derivada com retorno ao painel. Recomendação: resumido no painel com ação Abrir radar completo, preservando coerência com os demais blocos.

| **Nível** | **Bloco** | **Função primária** | **Conteúdo mínimo** | **Regra crítica** |
| - | - | - | - | - |
| 1 | Cabeçalho identitário | Ancorar o território e oferecer ação | Nome, etapa, responsáveis, data, botões Exportar e Ver detalhes | Nenhum dado numérico; nenhum gráfico |
| 2 | Stats — Evidências | Massa de registro de campo | Total de evidências registradas | Clique leva à lista filtrável |
| 2 | Stats — Atores-chave | Cobertura da governança | Atores classificados com postura definida | Clique leva ao mapa de atores |
| 2 | Stats — Projetos | Carteira viva | Projetos priorizados na Fábrica | Clique leva à Fábrica de Projetos |
| 2 | Stats — Indicadores | Base de acompanhamento | Indicadores ativos com baseline definido | Clique leva ao painel operacional de indicadores |
| 2 | Stats — Pendências | Dívida territorial | Itens com status pendência de consolidação | Clique leva à lista de pendências |
| 3 | Radar Estratégico resumido | Leitura antecipatória do território | Até cinco sinais/tensões/riscos/oportunidades | Cada item datado e com fonte; sem síntese gerada sem responsável humano |
| 3 | Carteira por status | Estado operacional da carteira | Projetos agrupados por status visual | Agrupamento coerente com a Fábrica; máximo cinco por coluna |
| 3 | Prioridades pactuadas | Foco decisório do período | Até cinco prioridades com hipótese curta | Cada prioridade exibe vínculo com evidência quando houver |
| 3 | Indicadores iniciais | Acompanhamento executivo | Até cinco indicadores com baseline, meta e semáforo | Semáforo sempre com regra visível e data da última atualização |
| 3 | Agenda decisória | Ritos e decisões iminentes | Próximos ritos, decisões em aberto, responsáveis | Nenhum item automático sem revisão humana |
| 3 | Alertas e riscos | Pontos de atenção executiva | Até cinco itens de alerta territorial | Cada alerta exibe origem, data e responsável pela leitura |
| 4 | Rodapé institucional | Transparência e auditabilidade | Procedência, ciclo, Constitution, glossário, responsáveis | Presente em toda exportação executiva |

A tabela a seguir consolida a hierarquia completa, por bloco, com função primária, conteúdo mínimo e regra crítica:

**🔵 Definição consolidada  **Faixa final do dashboard contendo: procedência da plataforma (Plataforma FIGITAL FAB LAB REC); identificação do ciclo e da versão metodológica em uso; link para a Constitution operacional; link para o glossário; responsáveis pelo território. Esse rodapé não é decoração: é camada de transparência e auditabilidade exigida pela Constitution.

### Nível 4 — Rodapé institucional

**🔵 Definição consolidada  **Cada bloco analítico cumpre regras comuns: máximo de cinco itens visíveis por bloco no estado padrão (o restante em ver detalhe); toda síntese carrega data e fonte; ações pesadas (exportar, publicar) ficam no cabeçalho do bloco, nunca em cada item; o bloco informa explicitamente quando está com dado insuficiente para a leitura executiva (estado Sem base suficiente).

**🔵 Definição consolidada  **Grade de blocos analíticos em duas colunas de mesma largura visual, na ordem fixa: Radar Estratégico resumido (coluna esquerda, bloco maior); Carteira por status (coluna direita, bloco maior); Prioridades pactuadas (coluna esquerda, bloco médio); Indicadores iniciais (coluna direita, bloco médio); Agenda decisória (coluna esquerda, bloco curto); Alertas e riscos territoriais (coluna direita, bloco curto). Cada bloco mostra: título curto, conteúdo visual próprio, data da última atualização, ação de ver detalhe sem sair do contexto.

### Nível 3 — Blocos analíticos

**🔵 Definição consolidada  **Linha horizontal com quatro a cinco tiles numéricos grandes, cada um com número, rótulo curto, e indicação sutil de tendência quando aplicável (seta, cor de borda). Os tiles obrigatórios do MVP são: Evidências registradas; Atores-chave mapeados; Projetos priorizados; Indicadores ativos; Pendências territoriais. A linha tem propósito de ancoragem rápida: em menos de cinco segundos, o gestor sabe a massa de trabalho registrada no território.

### Nível 2 — Linha de números-chave (stats)

**🔵 Definição consolidada  **Bloco compacto no topo contendo: nome do território; etapa atual da Jornada (Etapa 1 ou Etapa 2); responsáveis-chave atuais; data da última atualização relevante do painel; ação Exportar síntese executiva como botão primário; ação Ver detalhes do território como botão secundário. Nenhum gráfico, nenhuma métrica numérica: apenas identidade e ação.

### Nível 1 — Cabeçalho identitário

**🔵 Definição consolidada  **O dashboard executivo se organiza em quatro níveis de hierarquia visual, lidos de cima para baixo sem exigir rolagem antes da primeira leitura completa dos blocos-chave: cabeçalho identitário; linha de números-chave (stats); blocos analíticos; rodapé institucional. A hierarquia é fixa: nenhum território vê o dashboard em ordem diferente.

## 11.A.5 Hierarquia do dashboard executivo

**🔴 Observação  **Ainda falta decidir se o estado pendência será persistente entre sessões (acompanha o item até resolução) ou apenas sinalização visual transiente na sessão atual. Recomendação: persistente, pois a pendência é dado de governança, não de UI.

**🔴 Observação  **Ainda falta decidir a paleta final dos estados (cor, borda, ícone) e sua integração com a identidade visual do Fab Lab Rec. Recomendação do Design: cinza neutro para vazio, azul suave para carregando, vermelho de baixa saturação para erro, verde institucional para sucesso, âmbar para pendência.

| **Tela** | **Vazio** | **Carregando** | **Erro** | **Sucesso** | **Pendência** |
| - | - | - | - | - | - |
| Lista de evidências | “Nenhuma evidência ainda.” / Ação: Criar primeira evidência.Se filtro ativo: “Nenhuma evidência encontrada.” / Ação: Ajustar filtros. | Skeleton dos tiles e das linhas da tabela. | “Falha ao carregar evidências.” / Ação: Tentar novamente. | Nova evidência destacada no topo, toast persistente. | Etiqueta Rascunho na linha; item permanece editável. |
| Formulário de nova evidência | Campos vazios com placeholders explicativos. | Botão Salvar desabilitado com texto Salvando... | Mensagem contextual ao campo que falhou; conteúdo preservado. Retry disponível. | Redireciona para lista com evidência em destaque. | Botão Salvar rascunho; status visível no retorno à lista. |
| Mapa de atores | Quadrante vazio com instrução: “Comece cadastrando o primeiro ator do território.” / Ação: Novo ator. | Quadrante com pontos em tom cinza pulsante. | “Não foi possível carregar o mapa.” / Ação: Recarregar. Bloco de lista continua disponível. | Novo ator destacado no quadrante por alguns segundos. | Ator sem classificação de postura aparece em zona Desconhecido. |
| Detalhe de ator | Seções do painel com linhas guia (Sem notas; Sem mídia; Sem vínculos). | Skeleton das seções. | Mensagem por seção afetada; seções saudáveis permanecem legíveis. | Painel abre com item recém-salvo já populado. | Etiqueta visível em seção ainda sem dado crítico (Sem responsável). |
| Quadro de prioridades | “Nenhuma prioridade registrada.” / Ação: Registrar prioridade. | Cards em skeleton. | “Falha ao carregar prioridades.” / Ação: Tentar novamente. | Nova prioridade destacada na posição correta do quadro. | Indicador Sem evidência vinculada em cards aplicáveis. |
| Ficha de projeto | Abas com instrução curta (Sem indicadores; Sem dependências). | Skeleton por aba. | Mensagem por aba afetada; núcleo da ficha permanece legível. | Confirmação persistente com próximos passos sugeridos. | Etiqueta Sem responsável ou Baseline ausente na aba correspondente. |
| Painel de indicadores | “Nenhum indicador registrado para este território.” / Ação: Definir indicador inicial. | Skeleton dos tiles. | “Falha ao carregar indicadores.” / Ação: Tentar novamente. | Indicador recém-atualizado com data em destaque. | Etiqueta Desatualizado em indicadores fora da frequência definida. |
| Dashboard executivo | Bloco a bloco: instrução para enriquecer dados na operação (sem pedir ao gestor que execute ação operacional). | Skeleton por bloco; blocos independentes carregam em paralelo. | Erro isolado por bloco; o painel continua legível nos blocos saudáveis. | Confirmação de última atualização por bloco, com data e fonte. | Etiqueta Síntese pendente de revisão quando o bloco depende de revisão humana prévia. |
| Tela de exportação | Prévia vazia (0 registros selecionados) se os filtros resultarem em vazio. | Botão Exportar com texto Gerando arquivo... e bloqueio temporário. | “Falha ao gerar arquivo.” / Ação: Tentar novamente. Configurações preservadas. | Arquivo disponível com link persistente na sessão. | Aviso de exportação parcial quando filtro excluir registros por permissão. |

A tabela a seguir formaliza, tela a tela dos fluxos críticos, as mensagens e ações recomendadas para cada estado. É a derivação exigida pela Observação aberta na Seção 11 do pacote principal:

**🔵 Definição consolidada  **Estado pendência: aparece quando um registro foi salvo como rascunho, quando uma síntese precisa de revisão antes de publicação, quando um indicador está com dado desatualizado, quando uma prioridade foi cadastrada sem evidência associada ainda. Pendência é indicador visual discreto mas inequívoco (etiqueta, borda lateral colorida, ou ícone) e sempre acompanhado de ação recomendada para resolvê-la.

**🔵 Definição consolidada  **Estado sucesso: aparece após criação, edição, exclusão, upload, exportação ou publicação. Nunca é só toast efêmero: em ações críticas, o sistema destaca visualmente o item afetado na lista ou tela de retorno (por exemplo, a nova evidência no topo da lista com realce temporário) e mantém a confirmação visível até ação do usuário. Para exportação, o link do arquivo fica disponível imediatamente e persiste no histórico da sessão.

**🔵 Definição consolidada  **Estado erro: aparece em falha de carregamento, falha de salvamento, falha de upload, falha de exportação. Sempre contém: identificação do que falhou; causa em linguagem não técnica quando possível; ação de retry; opção de voltar sem perder o que foi digitado; código ou identificador do erro para suporte. Falha parcial (um bloco falha enquanto outros carregam) mostra erro apenas no bloco afetado, preservando o restante da tela.

**🔵 Definição consolidada  **Estado carregando: aparece enquanto a tela busca dados. Nunca é apenas spinner central: quando possível, usa-se skeleton dos blocos esperados (silhuetas cinzentas dos cards, tiles e linhas de tabela) para que o usuário antecipe a estrutura da tela. Para exportação em processamento, a ação principal fica desabilitada e exibe texto explícito sobre o que está acontecendo.

**🔵 Definição consolidada  **Estado vazio: aparece quando não há dado para exibir, seja por território recém-criado, seja por filtro que não retorna resultado. Tem três variantes: vazio-inicial (território sem registros), vazio-filtrado (filtros ativos resultaram em zero), vazio-seção (seção da tela sem conteúdo enquanto outras têm). Cada variante tem mensagem e ação recomendada distintas.

**🔵 Definição consolidada  **Princípios comuns aos cinco estados: mensagem curta e orientada a ação; uso da mesma linguagem do restante da tela; manutenção de elementos de navegação; ação recomendada visível no próprio estado quando aplicável; nenhum estado bloqueia o retorno à tela anterior.

**🔵 Definição consolidada  **Toda tela operacional do MVP implementa cinco estados visuais explícitos, e não apenas o estado padrão populado: estado vazio, estado carregando, estado erro, estado sucesso e estado pendência (rascunho ou aguardando consolidação). Nenhum desses estados pode ser tratado como caso de borda: todos são estados de primeiro nível do desenho da tela.

## 11.A.4 Estados de interface: vazio, carregando, erro, sucesso e pendência

**🔴 Observação  **Ainda falta decidir se o Fluxo 5 terá, desde o MVP, a possibilidade de reexportação da mesma síntese em sessão futura (histórico de exportações do gestor) ou se essa capacidade fica para a fase seguinte.

**🔴 Observação  **Ainda falta formalizar, para cada fluxo, o número máximo de cliques admissível entre o início e o critério de sucesso, como regra mensurável do Design Spec.

**🔵 Definição consolidada  **Pontos de retorno: qualquer detalhe aberto a partir do dashboard tem caminho direto de volta ao painel principal; falha de exportação não trava a consulta; exportação em andamento mostra progresso sem bloquear a leitura dos blocos já carregados. Critério de sucesso: gestor consegue ler o território e sair da plataforma com a síntese em arquivo, em uma única sessão, sem mediação da equipe técnica.

**🔵 Definição consolidada  **Sequência: Login → Seleção do território → Dashboard executivo abre automaticamente → Leitura dos blocos principais em ordem de hierarquia (estágio, Radar, prioridades, carteira, indicadores, agenda) → Consulta a detalhe resumido de qualquer bloco mantendo o contexto executivo → Botão Exportar síntese executiva → Confirmação do formato e escopo da exportação → Download do arquivo e confirmação visual de sucesso com link persistente para reexportar a mesma síntese em sessão futura.

### Fluxo 5 — Leitura executiva e exportação

**🔵 Definição consolidada  **Pontos de retorno e proteção: falha ao converter prioridade em projeto não apaga a prioridade; criação de projeto sem responsável ainda definido é permitida, mas o sistema sinaliza a pendência; prioridade sem evidência associada é permitida, mas o sistema exibe alerta visual no quadro. Critério de sucesso: prioridade originou ao menos um item de carteira e a carteira é filtrável e exportável.

**🔵 Definição consolidada  **Sequência: Aba Prioridades → Quadro de priorização com prioridades já registradas → Seleção ou criação de nova prioridade com campos mínimos (dor ou vocação, hipótese, impacto, urgência, viabilidade, dependências) → Classificação pelos critérios → Salvamento da prioridade → Ação A partir desta prioridade, criar projeto → Ficha mínima de projeto pré-preenchida com referência à prioridade de origem → Salvamento → Item entra na Fábrica de Projetos v1 com vínculo visível à prioridade.

### Fluxo 4 — Passagem de prioridade para carteira

**🔵 Definição consolidada  **Pontos de retorno e revisão: ao clicar em um ator no mapa, o sistema abre o painel de detalhe do lado direito sem perder o mapa; a partir do detalhe, o usuário pode editar (abre modo de edição na mesma tela com indicador visual de Editando) ou abrir a ficha completa em tela própria. Critério de sucesso: ator pode ser filtrado por tipo, papel e criticidade, e pode ser vinculado a pelo menos um outro objeto do território (evidência, prioridade ou projeto).

**🔵 Definição consolidada  **Sequência: Aba Atores e ativos → Mapa de atores em visualização de quadrante (influência × postura, com eixos Favorável, Neutro, Resistente e Desconhecido, conforme o protótipo de referência) → Botão Novo ator → Seletor de tipo de entidade (Organização, Pessoa física, Coletivo) → Formulário específico do tipo, com campos comuns de contato e seção de quadrante — o usuário posiciona o ator visualmente → Seção de notas e governança → Prévia lateral com o ator já inserido no quadrante antes do salvamento → Salvamento → Retorno ao mapa com o novo ator destacado.

### Fluxo 3 — Mapeamento de ator com classificação de governança

**🔵 Definição consolidada  **Pontos de retorno e reversão: cancelar durante o preenchimento oferece salvar como rascunho antes de descartar; falha de upload não apaga o corpo textual já preenchido; erro de vínculo não bloqueia o salvamento do núcleo do registro. Critério de sucesso: evidência aparece na listagem filtrável imediatamente após salvamento, com autor, data/hora e status registrados.

**🔵 Definição consolidada  **Variantes previstas: salvar como rascunho (retorna à lista marcando o item como pendente de consolidação); salvar e criar outra (mantém o formulário aberto com campos comuns preservados); salvar e vincular (abre seletor de ator, prioridade ou projeto para vínculo imediato).

**🔵 Definição consolidada  **Sequência: Entrada no território → Aba da feature (Evidências, por exemplo) com lista filtrável e tile de contagem (total registradas, confiabilidade alta, confiabilidade média, em revisão) → Botão Nova evidência → Formulário com campos mínimos e anexo/link opcional → Salvamento com confirmação visual → Retorno à lista com a nova evidência destacada no topo e filtro preservado.

### Fluxo 2 — Registro de evidência ou escuta com rastreabilidade

**🔵 Definição consolidada  **Pontos de retorno: em qualquer momento, o usuário pode sair do formulário sem perda, desde que confirme o descarte. O sistema oferece rascunho automático para retomar depois. Critério de sucesso: território aceita imediatamente cadastro de evidências, atores e projetos.

**🔵 Definição consolidada  **Sequência: Lista de territórios (vazio ou populado) → Formulário de criação com campos mínimos (nome, recorte, etapa atual, responsáveis) → Confirmação com prévia do workspace que será criado → Tela inicial do território recém-criado com três próximos passos sugeridos conforme o perfil.

### Fluxo 1 — Setup do território

**🔵 Definição consolidada  **Os fluxos críticos do MVP são cinco e cada um tem sequência estável de telas, pontos de retorno claros e critério de sucesso explícito: (1) Setup do território; (2) Registro de evidência ou escuta com rastreabilidade; (3) Mapeamento de ator com classificação de governança; (4) Passagem de prioridade para carteira; (5) Leitura executiva e exportação de síntese.

## 11.A.3 Fluxo tela a tela dos fluxos críticos

**🔴 Observação  **Ainda falta decidir, para o parceiro estratégico com leitura controlada, se ele verá a visão executiva integral, um recorte ainda mais reduzido ou uma visão específica por módulo contratado.

**🔴 Observação  **Ainda falta decidir se a equipe Fab Lab Rec terá, desde o MVP, um modo de inspeção que permita alternar rapidamente entre visão executiva e operacional para a mesma entidade, ou se isso será comportamento apenas da fase seguinte.

| **Entidade** | **Visão executiva** | **Visão operacional** | **Exclusivo operacional** |
| - | - | - | - |
| Território | Nome, etapa atual, data da última atualização, estado de saúde geral, próxima decisão pactuada | Perfil territorial, GeoPortal, configuração de responsáveis, histórico completo | Edição estrutural do território; suspensão de workspace |
| Evidências | Contagem por tema, indicador de confiabilidade agregada, últimas evidências-chave vinculadas ao radar | Lista filtrável, formulário de cadastro, upload, edição, vínculos, rascunhos | Upload de arquivo; exclusão; campos técnicos de proveniência |
| Escutas | Número de escutas realizadas, temas recorrentes agregados | Registro estruturado, vínculos, classificação temática, campo de confidencialidade quando aplicável | Transcrição bruta; áudio; dados de entrevistado em detalhe |
| Atores | Mapa sintético por influência e postura, atores-chave da governança | Mapa completo em quadrante, cadastro por tipo (organização, pessoa, coletivo), galeria de mídia, campo de governança | Cadastro; edição de quadrante; dados de contato |
| Prioridades | Top prioridades pactuadas, dor/vocação e hipótese curta | Quadro de priorização, critérios, vínculos com evidências e escutas | Edição de critérios; conversão em projeto |
| Projetos | Carteira por status, responsáveis, próximos marcos | Ficha completa, indicadores, dependências, histórico | Edição de escopo; alteração de responsável |
| Indicadores | Baseline, meta e status visual por projeto-âncora | Definição, frequência, fonte, responsável, histórico de atualização | Cadastro; atualização de valor; edição de fonte |
| Exportações | Exportação rápida do painel e do Kit Expedição | Exportação com seleção de campos, filtros e formatos por entidade | Exportação com notas internas; exportação de dados brutos sensíveis |

A tabela a seguir consolida, por entidade, os componentes que aparecem em cada visão e os componentes que devem permanecer exclusivos de cada lado:

**🔵 Definição consolidada  **Regra de trânsito entre as duas visões: o gestor em visão executiva pode acessar, de qualquer bloco, uma visão derivada apenas de leitura com mais detalhe, e retornar ao painel principal sem perder o contexto. A equipe operacional pode ter um atalho para inspecionar como um registro está aparecendo na visão executiva — isso ajuda a manter qualidade do material que chega ao gestor.

**🔵 Definição consolidada  **Componentes que nunca aparecem na visão executiva: upload direto de arquivos; exclusão de registros; edição estrutural de entidades; rascunhos não consolidados; logs técnicos; campos sem responsável humano definido; qualquer síntese gerada automaticamente sem indicação de data, fonte e nível de confiança. A regra é coerente com a Constitution operacional: toda síntese estratégica precisa de vínculo com evidência e responsável humano.

**🔵 Definição consolidada  **Componentes típicos da visão operacional: listas filtráveis, formulários de cadastro e edição, telas de vínculo entre objetos, upload de arquivos, painel de pendências, histórico de alterações, campos técnicos de proveniência. Linguagem descritiva, múltiplas ações por tela, estados de rascunho visíveis.

**🔵 Definição consolidada  **Componentes típicos da visão executiva: cartões-resumo com números agregados, Radar Estratégico em forma condensada, carteira por status visual, indicadores iniciais com semáforo simples, agenda decisória, alertas territoriais, botão direto de exportação executiva. Linguagem curta, dados datados, fonte visível, poucas decisões por tela.

**🔵 Definição consolidada  **Critério de decisão: um componente entra na visão executiva apenas se responder a uma das três perguntas executivas — o que está pactuado, o que está em risco, o que exige decisão agora. Qualquer componente que exija do gestor consultar filtros, percorrer listas longas ou interpretar campos técnicos permanece na visão operacional.

**🔵 Definição consolidada  **A separação entre visão executiva e visão operacional é regra arquitetural, não apenas estética. A mesma entidade — território, ator, projeto, indicador, carteira — tem duas representações no produto: uma executiva, destinada ao gestor público em leitura de decisão, e uma operacional, destinada à equipe territorial em trabalho de edição e consolidação. Nenhuma das duas é redução da outra: são recortes de propósito distinto sobre a mesma base.

## 11.A.2 Separação entre visão executiva e visão operacional

**🔴 Observação  **Ainda falta definir o comportamento do breadcrumb quando o usuário entra direto por link externo em uma tela operacional: se o sistema reconstrói a camada contextual completa ou se oferece fallback de retorno ao território.

**🔴 Observação  **Ainda falta decidir se o seletor de território ativo na camada global apresentará visão multi-território para equipe Fab Lab Rec já no MVP ou apenas troca entre territórios aos quais o usuário pertence.

**🔴 Observação  **Ainda falta decidir se GeoPortal aparecerá como item raiz do menu principal, subárea da entrada Território, ou camada visual permanente sobre a plataforma. O protótipo atual aponta para subárea, mas a decisão final afeta a arquitetura de rotas.

**🔵 Definição consolidada  **Regras invariantes da navegação: o usuário nunca perde a referência ao território ativo; o código do Épico/História é visível em toda tela operacional; o retorno ao dashboard executivo está a no máximo um clique da camada global; a navegação entre abas locais de uma feature não recarrega o contexto do território.

**🔵 Definição consolidada  **Os itens do menu principal da plataforma, em ordem de leitura, são: Território (com GeoPortal e perfil territorial dentro); Evidências e escutas; Atores e ativos; Prioridades; Projetos; Indicadores; Dashboard executivo; Exportações. Essa ordem reflete a própria passagem da Etapa 1 para a Etapa 2 e deve se manter estável no MVP, mesmo que a ordem de implementação seja outra.

**🔵 Definição consolidada  **A camada local é um conjunto de abas horizontais próprias de cada área funcional, que agrupam as telas internas daquele fluxo. Cada aba exibe seu nome curto em linguagem operacional e, quando aplicável, um contador numérico entre parênteses indicando a quantidade de itens presentes. As abas locais são responsáveis por toda a movimentação interna da feature e nunca se misturam com a navegação entre áreas diferentes da plataforma.

**🔵 Definição consolidada  **A camada contextual é um breadcrumb estruturado em quatro níveis: Plataforma / Etapa da Jornada / Código do Épico / Código da História em uso. Esse breadcrumb cumpre duas funções que são inseparáveis: orienta o usuário sobre onde está no método da Jornada (Etapa 1 ou Etapa 2, Épico tal, História tal) e não apenas na árvore de telas do software. O código visível (por exemplo, EP 02.01 · HU 02.01.01) é a ponte entre o artefato de documentação e a tela real.

**🔵 Definição consolidada  **A camada global fica sempre visível no topo e contém: identidade da plataforma (Plataforma FIGITAL FAB LAB REC), seletor de território ativo com indicação da etapa atual da Jornada, acesso rápido ao dashboard executivo daquele território, menu de exportações e identificação do usuário com seu papel. Essa camada não muda entre telas e garante a orientação territorial em qualquer ponto da plataforma.

**🔵 Definição consolidada  **A navegação principal da plataforma se organiza em três camadas coexistentes, e não em um único menu: a camada global, que identifica a plataforma, o território ativo e o usuário autenticado; a camada contextual, que orienta pela Jornada por meio de um breadcrumb com o código do Épico/História em uso; e a camada local, que agrupa as telas internas de cada área funcional em abas horizontais curtas.

## 11.A.1 Navegação principal da plataforma

# 11.A Design Spec detalhado — derivação de Mabuse AMARELO

Este documento deriva da Seção 11 (Design Skeleton v1 do pacote principal) do pacote principal e fecha seis pontos ainda marcados como pendentes: navegação principal da plataforma; separação entre visão executiva e visão operacional; fluxo tela a tela dos fluxos críticos; estados de interface (vazio, carregando, erro, sucesso e pendência); hierarquia do dashboard executivo; e matriz de exportações por formato. As definições consolidadas abaixo foram construídas a partir dos protótipos HTML de referência HU 02.01.01 — Coleta de Evidências e EP 02.02 — Mapeamento de Atores e Governança e devem ser lidas em continuidade direta com as Seções 5 a 9 do pacote principal.

- **Geração final das exportações e sua implementação técnica (front/server/processo).**

- Detalhamento técnico das integrações abertas além do pacote obrigatório do IBGE.


- Vercel

- Leaflet ou MapLibre

- Recharts

- Claude API opcional e restrita

**12.2 Stack final e papel de cada tecnologia AMARELO**

O MVP será implementado como uma aplicação web única, WEB-first, com foco principal em desktop/laptop para dashboard e gestão, mantendo responsividade suficiente para captura e consulta rápida em telas menores. A escolha técnica do ciclo atual deve privilegiar simplicidade operacional, baixo custo recorrente, manutenção viável por equipe pequena e reversibilidade arquitetural, evitando microserviços, múltiplas clouds, integrações extensas, processamento pesado e dependências pagas variáveis sem necessidade real de MVP.

12.2.A Diretriz de custos, quotas e dependências externas AMARELO

Frontend, UI e hospedagem mínima AMARELO

A arquitetura do MVP deve priorizar operação economicamente sustentável. Isso significa evitar multiplicação desnecessária de serviços, processamento redundante, consultas pesadas repetidas, anexos e exportações sem política de retenção, dependências externas sem quota conhecida e qualquer desenho técnico que dificulte previsibilidade de custo, reversibilidade ou troca futura de fornecedor.

Mapas, gráficos e dados abertos mínimos AMARELO

Toda integração externa do MVP ou da fase seguinte deve ser registrada com finalidade funcional, obrigatoriedade no produto, forma de cobrança ou limite de uso quando aplicável, fallback, risco de expansão de custo e responsável. O Claude Code não deve presumir inclusão de APIs pagas, modelos mais caros ou automações de alto consumo sem instrução explícita no Technical Spec detalhado.

IA, LLMs e diretriz permanente de prudência técnica AMARELO

O Technical Spec detalhado deverá consolidar, no mínimo: política de ambientes e preview branches; limites de storage e anexos; retenção e redownload de exportações; caching e atualização do dashboard executivo; critérios para processamento de funções e jobs; limites de chamadas a serviços externos; e ficha mínima de governança por integração, incluindo Supabase, Vercel, dados abertos, APIs futuras e eventuais LLMs.

**12.3 Arquitetura geral por domínio AMARELO**

- O MVP será implementado como aplicação web única organizada por domínio funcional, sem microserviços, sem múltiplos backends independentes e sem segmentação prematura de infraestrutura. A organização por domínio existe para manter clareza de código, previsibilidade de manutenção e separação entre responsabilidades do produto, e não para justificar complexidade adicional.

- Domínios mínimos do MVP: territórios, autenticação e perfis, evidências, escutas/entrevistas, atores e ativos, prioridades, projetos, indicadores, dashboard executivo, exportações e camada pública mínima.

- As relações entre domínios devem seguir a lógica funcional da Jornada: território como base de contexto; evidências e escutas como base de leitura; atores e ativos como base de governança; prioridades como ponte entre leitura e ação; projetos e indicadores como base da Etapa 2; dashboard e exportações como camada de síntese e uso executivo. A camada pública mínima deve permanecer separada do núcleo operacional no nível de rotas, interface e permissões, mas sem criar arquitetura paralela, CMS externo obrigatório ou backend distinto no MVP.

- 16. Decisão final de uso deste documento AMARELO 

- Este documento já deve ser usado como a principal base de alinhamento e de entrada para o Claude Code gerar o MVP da Plataforma Jornada. Ele permanece autosuficiente para transmitir contexto, produto, escopo, funcionalidades, direções de UX e direção técnica do MVP, agora já incorporando as decisões mais recentes do formulário oficial de fechamento.

- Ao mesmo tempo, ele não elimina a necessidade de tratar corretamente os pontos ainda amarelos. Esses pontos não devem ser empurrados para o código sem homologação final de design, priorização e detalhamento técnico.

- Articulador territorial

- Gestor público

- Parceiro estratégico com leitura controlada

**12.4 Autenticação, perfis e autorização do MVP AMARELO**

O MVP trabalhará com autenticação controlada e cinco perfis principais de acesso: Admin Fab Lab, Equipe técnica do território, Articulador territorial, Gestor público e Parceiro estratégico com leitura controlada. A autenticação deverá permanecer centralizada no Supabase Auth. A autorização será condicionada à combinação entre perfil, vínculo territorial quando aplicável e classe de dado, preservando a separação entre visão executiva e visão operacional.

| **Módulo / ação** | **Admin Fab Lab** | **Equipe técnica** | **Articulador** | **Gestor público** | **Parceiro estratégico** | **Status** |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Criar território | Sim | Não | Não | Não | Não | AMARELO |
| Editar configuração do território | Sim | Parcial | Não | Não | Não | AMARELO |
| Ver dashboard executivo | Sim | Sim | Sim | Sim | Parcial | AMARELO |
| Ver evidências brutas | Sim | Sim | Sim | Não | Não | AMARELO |
| Criar/editar evidências | Sim | Sim | Sim | Não | Não | AZUL |
| Ver escutas/entrevistas brutas | Sim | Sim | Sim | Não | Não | AZUL |
| Criar/editar escutas/entrevistas | Sim | Sim | Sim | Não | Não | AZUL |
| Ver mapa de atores e governança | Sim | Sim | Sim | Sim | Parcial | AMARELO |
| Criar/editar atores e ativos | Sim | Sim | Sim | Não | Não | AZUL |
| Criar/editar prioridades | Sim | Sim | Parcial | Não | Não | AMARELO |
| Criar/editar projetos | Sim | Sim | Parcial | Não | Não | AMARELO |
| Criar/editar indicadores | Sim | Sim | Não | Não | Não | AZUL |
| Exportar Radar Estratégico / síntese executiva | Sim | Sim | Parcial | Sim | Parcial | AMARELO |
| Exportar base bruta | Sim | Sim | Não | Não | Não | AMARELO |
| Publicar síntese executiva | Sim | Parcial | Não | Não | Não | AMARELO |
| Suspender funcionalidade | Sim | Não | Não | Não | Não | AMARELO |

**Detalhes finos consolidados de autorização e dados AMARELO**

Regras já consolidadas para o MVP: equipe técnica pode editar configuração operacional do território, mas não configuração estrutural crítica; gestor público não vê evidência bruta livre, apenas evidências-chave derivadas ou detalhamento executivo controlado; parceiro estratégico vê apenas recorte executivo derivado/compartilhado; articulador pode propor e editar prioridades e projetos em rascunho, mas não consolidá-los sozinho; exportação de base bruta fica restrita a Admin Fab Lab e equipe técnica autorizada; equipe técnica autorizada pode publicar síntese executiva apenas quando validada. A política de dados do MVP passa a operar com quatro classes — Público, Interno operacional, Restrito e Executivo sintetizado — com retenção, consentimento, correção, ocultação, exclusão excepcional e compartilhamento conforme as definições já consolidadas no pacote.

12.5 Entidades mínimas AZUL 

| **Entidade** | **Campos mínimos** |
| :-: | :-: |
| Território | nome, recorte, responsáveis, status, janela do ciclo, links, anexos |
| Ator | nome, tipo, papel, influência, interesse, contato, relação com prioridades |
| Evidência | origem, tipo, data, tema, resumo, arquivo, confiabilidade, vínculo territorial |
| Escuta/Entrevista | perfil, contexto, dores, desejos, barreiras, repertórios, projetos citados, anexos |
| Ativo/Iniciativa | nome, categoria, localização, responsável, estágio, evidências relacionadas |
| Problema/Prioridade | dor, vocação, hipótese, impacto, urgência, viabilidade, dependências |
| Projeto/Frente | tipo, objetivo, escopo, etapas, responsável, parceiros, status, prioridade |
| Indicador | nome, definição, baseline, meta, frequência, fonte, responsável, status |
| Rito/Decisão | reunião, deliberação, pendência, prazo, responsável, próximo passo |

12.6 Pontos ainda abertos no Technical VERMELHO 

- Modelo de dados v1 detalhado, incluindo relações, enums e diretriz de Row Level Security.

- Tipos, limites e política técnica de anexos e storage.

- Estratégia final de geração, retenção, regeneração e auditoria das exportações.

- Definições finais de semáforos de indicador, layout mestre dos PDFs institucionais e política de retenção das exportações geradas.

- Política operacional de ambientes, preview branches, cache e quotas para evitar crescimento silencioso de custo.

- Homologações residuais de UX e leitura estratégica que impactam implementação, sem reabrir o escopo do MVP.


12.7 Contribuições metodológicas destinadas a evolução pós-MVP AMARELO

Permanecem como trilha futura, sem entrada no núcleo obrigatório do MVP atual, as contribuições de evolução analítica que impliquem motor de foresight, triangulação obrigatória entre fontes, vetores fixos taxativos, fórmulas de robustez ou consistência, novos objetos analíticos obrigatórios, cobertura mínima por tipo de fonte, conectores externos múltiplos e outras camadas capazes de transformar a plataforma atual em observatório avançado ou engine analítico completo. O melhor uso dessas contribuições no ciclo presente é como backlog metodológico e arquitetura analítica futura, sem desmontar o recorte operacional e territorial já fechado para o MVP.

**13. Mapa de definição — o que já está bem definido e o que ainda não está AZUL **

| **Tema** | **Status** | **Leitura prática** |
| :-: | :-: | :-: |
| Definição do produto | **AZUL** | Bem definida e utilizável como base de implementação. |
| Separação FIGITAL / Jornada / Agente IA | **AZUL** | Estruturante e consolidada. |
| Usuários principais | **AZUL** | Perfis claros; falta apenas matriz fina de permissão. |
| Escopo do MVP | **AZUL** | Recorte forte e defensável. |
| Lista do que fica fora do MVP | **AZUL** | Bem delimitada. |
| Feature Specs funcionais do MVP | **AMARELO** | Suficientes para orientar, mas ainda sem todos os detalhes finais. |
| Design Spec detalhado (derivação de Mabuse) | AMARELO | Derivação detalhada incorporada em 11.A. Já fecha navegação, fluxos, estados, dashboard e exportações em nível de design, restando apenas decisões finas explicitadas em vermelho. |
| Direção técnica e stack | AMARELO | Base consolidada para a arquitetura do MVP e agora complementada por stack final, arquitetura por domínio, autenticação e autorização. O que falta é o Technical Spec detalhado completo. |
| Declaração final oficial do problema | AZUL | Conteúdo e redação final consolidados no pacote. |
| Regra mínima de priorização | AMARELO | Regra funcional fechada, pendente homologação final de Augusto. |
| Matriz de exportações por formato | AMARELO | Matriz detalhada já derivada, incluindo PDF/XLSX/CSV, perfis, usos e regras críticas. Faltam layout mestre PDF, retenção e homologação visual final. |
| Fluxos críticos com estados completos | AMARELO | Fluxos e estados já detalhados tela a tela na Seção 11.A. Faltam apenas metas mensuráveis e algumas homologações finas de UX. |
| Mecanismo de suspensão | AMARELO | Escopos global, por módulo e por território já definidos, com bloqueio de ações, preservação de leitura e reversão com log. Falta detalhamento de schema e interface administrativa no Technical. |
| Política de dados sensíveis / acesso / retenção | AMARELO | Política de dados v0.1 consolidada para o MVP, com retenção por classe, consentimento, correção, ocultação, exclusão excepcional e regra de compartilhamento. Resta apenas tradução técnica e homologação institucional residual. |
| Matriz de permissões por perfil | AMARELO | Matriz funcional consolidada e detalhes finos fechados para dashboard, evidência bruta, publicação e exportação. Resta tradução técnica final no Technical Spec. |
| Decisão final sobre Claude API no MVP | AZUL | Decisão final tomada: Claude API não é dependência funcional obrigatória do MVP. O uso de LLMs e outros serviços externos será decidido posteriormente, conforme necessidades reais do produto. |
| Camada pública mínima e dados abertos do MVP | AMARELO | Direção funcional definida; falta apenas detalhamento técnico e homologação metodológica final. |

**14. Como o Claude Code deve tratar este pacote AMARELO **

- Usar o Product Spec e o MVP Spec como limite de escopo.

- Implementar apenas o que estiver claramente dentro do MVP.

- Não transformar backlog metodológico em interface de software sem justificativa funcional explícita.

- Não inventar comportamento para itens em vermelho; tratá-los como dependências em aberto.

- Quando um item estiver amarelo, implementar apenas o núcleo seguro e deixar a decisão pendente evidenciada no código/documentação.

- Preservar supervisão humana, reversibilidade, transparência e ausência de lock-in.

- Priorizar clareza, rastreabilidade, exportações e simplicidade operacional sobre sofisticação prematura.

**15. Responsabilidades por pessoa AMARELO **

| **Pessoa** | **Foco principal** |
| :-: | :-: |
| Leonardo Andrade | Product Spec, MVP Spec, regras de negócio, validação funcional do Technical Spec e handoff para implementação |
| Mabuse | Jornadas, Design Spec, arquitetura da informação, UX/UI, visão executiva versus operacional, fluxos críticos, dashboard e exportações sob a ótica de uso |
| Augusto Carminati | Gramática analítica do radar, regra mínima de priorização, confiança/sustentação empírica e coerência da leitura territorial |
| Maya Pereira | Revisão de clareza do spec, teste de ambiguidade, simulação de fluxos e apoio ao handoff operacional |
| Edgar Andrade | Aderência metodológica, valor institucional das saídas, coerência entre software e Jornada e validação da camada pública mínima e dos dados abertos do MVP |

**16. Decisão final de uso deste documento AMARELO **

Este documento já deve ser usado como a principal base de alinhamento e de entrada para o Claude Code gerar o MVP da Plataforma Jornada. Ele é autosuficiente para transmitir contexto, produto, escopo, funcionalidades, direções de UX e direção técnica do MVP.

Ao mesmo tempo, ele não elimina a necessidade de tratar corretamente os pontos vermelhos. Esses pontos não devem ser empurrados para o código. Devem ser resolvidos, explicitamente assumidos como fora do MVP, ou tratados como restrições que exigem implementação conservadora.

| Leitura final honesta  
Sim, este é o documento mais completo e autosuficiente possível neste momento para servir de input ao Claude Code. Ele já incorpora as decisões críticas fechadas nos últimos dois dias: problema final, escopo funcional do MVP, suspensão em nível funcional, política de dados, permissões, regra de não usar Claude API como dependência funcional obrigatória no MVP, priorização, exportações, camada pública mínima e dados abertos básicos. Importante: usar Claude Code para construir a plataforma não significa usar Claude API dentro do produto. O uso de APIs de LLMs e outros serviços externos no sistema seguirá sendo decidido conforme necessidades reais, sem fazer parte do núcleo obrigatório do MVP. O que falta agora não é reinventar o produto, mas homologar o que depende de Mabuse e Augusto e derivar o Design Spec e o Technical Spec detalhados. |
| - |


17. Consolidação final do Technical Spec detalhado AMARELO

O Technical Spec detalhado do MVP foi materialmente derivado ao longo da consolidação final do pacote e já possui direção suficiente para implementação conservadora do núcleo da plataforma. Foram fechados, em nível compatível com o MVP e com a diretriz de frugalidade operacional, os blocos de stack final e papel de cada tecnologia, arquitetura por domínio, autenticação e autorização, modelo de dados v1, exportações e geração de arquivos, anexos e storage, integrações externas e dados abertos, custos e operação sustentável, além de observabilidade, logs e auditoria mínima. O que permanece pendente não é mais definição estrutural ampla, e sim fechamento residual e consolidação editorial.


18. Revisão final de coerência do Pacote Mestre AMARELO

Fechado AZUL

- Produto, problema central e separação entre Plataforma Jornada e Plataforma Agente IA.

- Recorte do MVP de 2 semanas, foco nas Etapas 1 e 2, plataforma WEB-first e núcleo territorial, executivo e operacional.

- Escopo funcional central do MVP: território, evidências, escutas, atores, prioridades, projetos, indicadores, dashboard executivo e exportações essenciais.

- Diretriz de frugalidade operacional, simplicidade arquitetural, baixo custo recorrente e ausência de IA/LLM como dependência funcional obrigatória.

- Dados abertos mínimos do MVP: IBGE Localidades, IBGE SIDRA/agregados básicos, geobr e OpenStreetMap/Overpass em uso leve.

- Política de dados v0.1 em conteúdo, matriz de permissões em conteúdo e mecanismo de suspensão em conteúdo.

- Gramática analítica mínima do Radar Estratégico e refinamentos metodológicos compatíveis com o MVP.

Quase fechado AMARELO

- Design detalhado, já derivado na 8A, restando apenas resíduos finos de navegação, exportação e legibilidade institucional.

- Feature Specs centrais, fortes o suficiente para o MVP, mas ainda dependentes de rechecagem final contra o Technical consolidado.

- Technical Spec detalhado, já derivado em conteúdo suficiente para implementação conservadora, restando fechamento residual e consolidação editorial.

- Módulo de atores e governança, forte e compatível com o protótipo funcional, mas ainda exigindo harmonização total no pacote consolidado.

Pendente residual VERMELHO

- Recorte final da leitura controlada do parceiro estratégico.

- Regra final dos semáforos dos indicadores.

- Layout mestre dos PDFs institucionais.

- Política final de retenção dos binários exportados.

- Harmonização final da semântica do mapa de atores no pacote consolidado.

- Política final de mídia operacional em atores, já assumida de forma prudente, mas ainda precisando de consolidação final nos documentos.

- Consolidação editorial final entre Pacote Mestre, Formulário, Design 8A e Technical derivado.


19. Checklist final de fechamento do Pacote Mestre AMARELO

Resolver agora AMARELO

- Fechar o recorte final do parceiro estratégico, especialmente em dashboard, visão derivada e exportações compartilháveis.

- Fechar a regra dos semáforos dos indicadores ou declarar explicitamente, no pacote final, que o semáforo ficará fora do MVP e será apenas sinalização textual/visual simples.

- Harmonizar definitivamente o mapa de atores como influência × interesse, mantendo relação separada como Favorável, Neutro, Resistente e Desconhecido.

- Sequenciar o backlog final de handoff em ordem de implementação.

- Consolidar editorialmente o Pacote Mestre, o Formulário, o Design 8A e o Technical derivado, eliminando duplicidade e contradição residual.

Pode ficar como pendência controlada AMARELO

- Layout mestre definitivo dos PDFs institucionais, desde que o MVP use template simples, estável e sóbrio.

- Política final de retenção dos binários exportados, desde que a retenção do MVP continue temporária e controlada, com metadado preservado em export\_logs.

- Política final de mídia operacional em atores, desde que o MVP mantenha bucket privado, limites menores de upload e uso opcional/controlado de áudio e vídeo.

Não pode seguir sem fechar VERMELHO

- Qualquer ambiguidade residual de permissão, visibilidade ou compartilhamento que faça o Claude Code precisar inferir regra de acesso.

- Qualquer conflito entre pacote, formulário, design e technical sobre o que está dentro ou fora do MVP.

- Ausência de backlog final de handoff sequenciado, porque isso deixaria a implementação sem ordem de dependência.

- Contradição não resolvida sobre o comportamento executivo/operacional de módulos centrais, especialmente dashboard, exportações e atores.

Leitura final AMARELO  O pacote já está suficientemente maduro para consolidação final e preparação do handoff, mas ainda não deve ser tratado como irrestritamente pronto para geração se os itens marcados como “não pode seguir sem fechar” permanecerem em aberto.

# **20. Atualização consolidada após complementação visual de Mabuse AMARELO**

Esta atualização incorpora, sem remover conteúdo anterior, os novos artefatos de Design recebidos de Mabuse: proposta de complementação visual, sistema de design tokens, mapa de rotas, wireframes críticos, layout mestre de PDF institucional, especificação responsiva, acessibilidade, microinterações e diagrama de relações entre entidades. O objetivo desta integração é reduzir ambiguidade visual e de navegação antes do handoff ao Claude Code, preservando o recorte já fechado do MVP.

## **20.1 Artefatos visuais recebidos e integrados AMARELO**

- E01 — Design Token System: design-tokens.json, tokens.css e componente de referência visual.

- E02 + E03 — Decisões vermelhas de navegação e mapa de rotas implementável para Next.js App Router.

- E04 — Wireframes das 7 telas críticas do MVP, cobrindo dashboard, evidências, atores, prioridades, projetos e exportações.

- E05 — Layout mestre PDF institucional em HTML/CSS, com diretriz de renderização backend e padrão de identidade visual.

- E06 + E07 + E11 — Spec complementar de comportamento responsivo, acessibilidade WCAG 2.1 AA e microinterações.

- E08 — Diagrama de relações entre entidades do MVP, como adendo visual do modelo de dados.

## **20.2 Seção 11.B — Design Token System AMARELO**

**Fica incorporada ao Pacote Mestre a definição de um Design Token System como fonte única de verdade visual do MVP.**

- Paleta institucional: azul primário Fab Lab Rec, dourado/âmbar institucional, neutros 50–900 e cores semânticas de sucesso, erro, alerta, informação e pendência.

- Escala tipográfica mínima: Display 32px, H1 28px, H2 24px, H3 20px, Body 16px, Body small 14px, Caption 12px, Overline 11px.

- Sistema de espaçamento com base 4px, raios de borda em 0/4/8/12/full e três níveis de sombra.

- Breakpoints base: mobile 375px, tablet 768px, desktop 1024px, wide 1280px e ultrawide 1440px.

- Estados visuais com variáveis explícitas de fundo, borda, texto e ícone para vazio, carregando, erro, sucesso e pendência.

- Critério de aceite: o front-end do MVP não deve inventar valores visuais fora do token system.

## **20.3 Atualização consolidada da navegação — 11.A.1 e 11.C AMARELO**

**As decisões vermelhas de navegação ficam atualizadas com a seguinte direção consolidada:**

1. GeoPortal v1 permanece como subárea de Território, e não item-raiz independente do menu principal.

2. Entrada por link externo deve reconstruir automaticamente o breadcrumb contextual completo a partir da rota e do ID da entidade; quando isso não for possível, o sistema oferece fallback de retorno ao território do usuário.

3. O seletor multi-território do MVP é apenas troca de contexto via dropdown para perfis com acesso a mais de um território, e não visão comparativa simultânea.

Fica também incorporado o mapa de rotas como derivação técnica de navegação, com estrutura mínima em App Router para: landing, login, lista de territórios, dashboard, perfil territorial, GeoPortal, evidências, escutas, atores, ativos, prioridades, projetos, indicadores e exportações.

## **20.4 Wireframes críticos de referência — 11.D AMARELO**

**Ficam incorporados como referência visual de implementação, sem alterar o escopo do MVP, wireframes de média fidelidade para as 7 telas críticas:**

- dashboard executivo

- lista de evidências

- formulário de nova evidência

- mapa de atores em quadrante

- quadro de prioridades

- ficha de projeto

- tela de exportação

Esses wireframes passam a funcionar como referência visual mínima para posição de ações, hierarquia de informação, aplicação dos tokens, layout base desktop e estados principais.

## **20.5 Layout mestre PDF institucional — 11.E AMARELO**

**Fica incorporada a direção de layout mestre dos PDFs institucionais do MVP.**

- PDF com identidade do Fab Lab Rec, capa quando aplicável, cabeçalho, rodapé, data de geração, responsáveis e procedência.

- Template HTML/CSS parametrizável como base visual do PDF institucional.

- Direção preferencial de renderização no backend, dada a importância institucional dos documentos.

- Kit Expedição orientado como pacote ZIP com componentes reutilizáveis, e não documento monolítico único.

- A entrega atual reduz a lacuna visual dos PDFs, mas o refinamento final de homologação do layout mestre ainda pode permanecer como pendência controlada, se necessário.

## **20.6 Responsividade, acessibilidade e microinterações — 11.F, 11.G e 11.H AMARELO**

**Ficam incorporadas as seguintes diretrizes complementares de design de interface:**

- Responsividade por breakpoint com prioridades explícitas: captura de evidências e escutas como prioridade 1 em mobile; mapa de atores e prioridades como prioridade 2; dashboard e exportações como desktop-first/tablet-first.

- Acessibilidade mínima alinhada à WCAG 2.1 AA: contraste, navegação por teclado, foco visível, labels, mensagens acessíveis de erro/sucesso, redundância sem depender apenas de cor.

- Microinterações leves e consistentes para toast, skeleton loading, destaque de item novo, painéis laterais, modais e estados de processamento, sempre respeitando prefers-reduced-motion.

## **20.7 Dashboard — decisões complementares de Mabuse AMARELO**

**Passam a constar como direção forte para o dashboard executivo do MVP:**

- Semáforos de indicador com quatro estados visuais: verde, âmbar, vermelho, sem baseline e sem dado. Esta especificação visual reduz ambiguidade, mas a validação metodológica final dos limiares continua dependendo da camada estratégica.

- Bloco de Pendências como tile obrigatório do dashboard executivo, por ser dado de qualidade do trabalho territorial e não apenas detalhe operacional.

- Radar Estratégico resumido no dashboard, com ação de abertura de tela derivada para leitura completa.

## **20.8 Adendo visual à Seção 12.5 — Diagrama de relações entre entidades AMARELO**

**Fica incorporado como artefato visual de apoio ao Technical Spec um diagrama de relações entre entidades do MVP.**

- O diagrama reforça território como eixo central do modelo.

- Ele explicita relações entre evidências, escutas, atores, ativos, prioridades, projetos e indicadores.

- Seu papel no Pacote é de clarificação visual do modelo, não de reabertura do schema já consolidado.

## **20.9 Critério de fechamento após a complementação visual de Mabuse AMARELO**

**Após esta integração, o Pacote Mestre passa a contar com camada visual significativamente mais madura para handoff.**

- Navegação e rotas ficam muito mais claras para implementação.

- Tokens e wireframes reduzem a liberdade indevida do front-end.

- PDF institucional deixa de depender apenas de descrição textual.

- Responsividade, acessibilidade e microinterações deixam de ser lacuna total.

- Permanece, ainda assim, a necessidade de consolidar no pacote final apenas os resíduos realmente controlados antes do handoff irrestrito.

# **21. Checklist final de fechamento do Pacote Mestre após complementação visual de Mabuse AMARELO**

Resolver agora AMARELO

- Fechar recorte final do parceiro estratégico na visão controlada do MVP.

- Consolidar no texto final do pacote a semântica do mapa de atores como influência × interesse, mantendo relation separada.

- Decidir se áudio e vídeo em atores entram plenamente no primeiro ciclo do MVP ou como recurso condicionado de uso controlado.

- Harmonizar no pacote final as decisões técnicas já assumidas para exportações, storage e mídia.

Pode ficar como pendência controlada AMARELO

- Homologação final do layout mestre PDF institucional, desde que o template base já esteja integrado ao handoff.

- Validação metodológica final dos limiares dos semáforos de indicadores.

- Refino posterior de microinterações e motion além do nível suficiente do MVP.

- Ajustes finos de nomenclatura com usuários reais em fase seguinte.

Não pode seguir sem fechar AMARELO

- Coerência final entre Pacote Mestre, Formulário, Technical Spec e design detalhado.

- Validação de que nenhum ponto sensível de visual, navegação ou permissão ficou dependente de inferência do Claude Code.

- Confirmação de que o escopo visual incorporado não amplia o MVP além do recorte já fechado.


# 22. Remesclagem detalhada da camada visual e harmonização final AMARELO

Esta atualização refaz a incorporação da camada visual a partir da Proposta de Complementação Design Spec Visual de Mabuse e dos arquivos concretos do ZIP, com remesclagem explícita do conteúdo em decisões, diretrizes e seções utilizáveis no SPEC. O objetivo desta rodada é corrigir menções superficiais, absorver o material efetivamente produzido, resolver contradições editoriais e reduzir o mínimo possível de ambiguidade para handoff ao Claude Code.

## **22.1 Regra de precedência visual e técnica AZUL**

Para fins desta versão consolidada, prevalecem como fonte oficial de Design: a derivação 8A, a Proposta de Complementação Design Spec Visual e os artefatos efetivamente presentes no ZIP. Quando houver conflito entre texto antigo do Pacote e os artefatos visuais mais recentes, prevalece o conteúdo materializado nos artefatos do Mabuse, desde que não amplie o escopo do MVP já consolidado.

- Os artefatos do ZIP deixam de ser apenas referência externa e passam a ser parte operacional do SPEC.

- O código não deve decidir sozinho valores visuais, layout, rotas, hierarquia de telas, comportamento responsivo, microinterações ou template de PDF quando esses itens já estiverem definidos nos artefatos.

- O que ainda depender de validação metodológica ou teste com usuário permanece sinalizado como pendência controlada, mas com direção forte registrada.

## **22.2 E01 — Design Token System incorporado como Seção 11.B AZUL**

O Design Token System passa a ser fonte única de verdade visual do MVP. O artefato materializado no ZIP define não apenas famílias e escalas, mas valores concretos utilizáveis por front-end via tokens.css e design-tokens.json.

- Família de títulos e display: Karla. Família principal de interface: Inter. Família monoespaçada para dados, IDs e trechos técnicos: JetBrains Mono.

- Escala tipográfica materializada: Display 32/40 bold; H1 28/36 bold; H2 24/32 semibold; H3 20/28 semibold; Body 16/24 regular; Body Small 14/20 regular; Caption 12/16 regular; Overline 11/16 semibold uppercase; Stat Number 36/44 bold.

- Paleta cromática materializada em seis famílias: Gold (primária institucional, âncora 500 = \#7F6000), Wine (erro/crítico, âncora 500 = \#980000), Blue (links/loading/foco, âncora 500 = \#3C78D8), Purple (dados/acento, âncora 500 = \#5B2D8E), Teal (sucesso/territorial, âncora 600 = \#0D9488) e Neutral (0 a 900, com base \#FFFFFF e \#171717).

- Estados de interface passam a ter tokens concretos de fundo, borda, texto e ícone: vazio em neutros; carregando em azul suave; erro em wine de baixa saturação; sucesso em teal; pendência em gold/âmbar institucional.

- Sistema de espaçamento materializado em base 4px com escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 e 96. Uso preferencial: 4 para microespaço; 8 para gap entre irmãos; 16 para padding de cards; 24 para seções; 32–48 para blocos executivos; 64–96 para margens de página e respiros grandes.

- Raios de borda materializados: 0, 4, 8, 12, 16 e full. Botões usam sm; cards usam md; overlays e modais usam lg; avatares usam full.

- Sombras materializadas em níveis sm, md, lg e xl, com opacidade baixa e uso progressivo de cards em repouso, hover, dropdowns e modais.

- Breakpoints materializados: mobile 375; tablet 768; desktop 1024; wide 1280; ultrawide 1440. Os containers máximos passam a ser explicitamente controlados por token.

- Motion tokens materializados: 100, 150, 200, 250 e 300ms, com curvas default, ease-in, ease-out e spring. Esses valores deixam de ser escolha de implementação e passam a ser regra visual do MVP.

Integração no Pacote: os tokens devem reger Tailwind/configuração CSS, componentes de front-end, layout de exportações HTML/PDF e estados de interface. O front-end não deve inventar novas cores, fontes, espaçamentos ou durações sem justificativa e atualização do pacote.

## **22.3 E02 + E03 — Decisões de navegação e mapa de rotas incorporados como Seções 11.A.1 e 11.C AZUL**

As decisões antes marcadas em vermelho na navegação passam a constar em estado consolidado, com efeito direto sobre arquitetura de rotas, breadcrumb e menu.

- GeoPortal fica consolidado como subárea de Território, em rota própria /territorios/:id/geoportal. Não é item-raiz do menu no MVP, evitando promessa prematura de módulo geoespacial avançado.

- Entrada por link externo deve reconstruir automaticamente o breadcrumb contextual a partir do ID da entidade presente na URL. Se não houver contexto de território disponível, o sistema oferece fallback explícito para retorno ao território do usuário.

- Seletor multi-território para equipe Fab Lab Rec fica consolidado como troca de contexto em dropdown, e não como visão comparativa simultânea.

- Rotas de alto nível do MVP ficam materializadas: /, /login, /territorios, /territorios/novo, /territorios/:id/dashboard, /territorios/:id/perfil, /territorios/:id/geoportal, /territorios/:id/evidencias, /territorios/:id/evidencias/nova, /territorios/:id/evidencias/:eid, /territorios/:id/escutas, /territorios/:id/escutas/nova, /territorios/:id/escutas/:sid, /territorios/:id/atores, /territorios/:id/atores/novo, /territorios/:id/atores/:aid, /territorios/:id/ativos, /territorios/:id/prioridades, /territorios/:id/prioridades/:pid, /territorios/:id/projetos, /territorios/:id/projetos/novo, /territorios/:id/projetos/:pjid, /territorios/:id/indicadores, /territorios/:id/indicadores/:iid e /territorios/:id/exportacoes.

- Regras de redirecionamento incorporadas: usuário não autenticado vai para /login com redirect; usuário sem território vai para /territorios; gestor com um território cai direto no dashboard; articulador com um território cai direto em evidências; /territorios/:id sem subpath redireciona por perfil.

- Estrutura Next.js App Router deixa de estar vaga e passa a ter árvore base definida no pacote, alinhando layout de território, páginas de detalhe e contexto local por seção.

Integração no Pacote: o breadcrumb contextual e as camadas global/contextual/local deixam de depender de interpretação do time de front-end. O mapa de rotas passa a integrar simultaneamente Design Spec e direção técnica.

## **22.4 E04 — Wireframes das 7 telas críticas incorporados como Seção 11.D AMARELO forte**

Os wireframes presentes no ZIP deixam de ser apenas prova de conceito e passam a funcionar como referência visual explícita das sete telas mais críticas do MVP.

- T01 — Dashboard executivo: cabeçalho identitário no topo; cinco tiles de stats na primeira linha, incluindo Pendências; grade analítica em duas colunas com Radar estratégico maior na esquerda e Carteira por status maior na direita; blocos de Prioridades, Indicadores, Agenda e Alertas abaixo; rodapé institucional; estado Sem base suficiente materializado para Radar com badge e texto explicativo.

- T02 — Lista de evidências: breadcrumb + menu + abas locais; tiles de contagem no topo; filtros; tabela/lista com status visível; registros em rascunho destacados em fundo de pendência; vazio inicial e vazio filtrado previstos.

- T03 — Formulário de nova evidência: layout em colunas; bloco de anexo/link; confiabilidade; variantes de ação Salvar, Salvar rascunho, Salvar e criar outra / salvar e vincular como diretriz funcional; feedback por campo e foco em fluxo mobile de articulador.

- T04 — Mapa de atores: quadrante com painel lateral; botão Novo ator; estados vazios; atalhos visuais de postura nos quatro quadrantes; painel lateral de detalhe com resumo e ações; uso de sheet/modal em telas menores no comportamento responsivo.

- T05 — Quadro de prioridades: cards com dor/vocação, hipótese, impacto, urgência, viabilidade; destaque explícito de Sem evidência vinculada; ação A partir desta prioridade, criar projeto mantida como CTA estrutural do fluxo.

- T06 — Ficha de projeto: abas para dados gerais, indicadores, dependências e histórico; vínculo com prioridade de origem visível; pendências visuais como Sem responsável e Baseline ausente já materializadas.

- T07 — Tela de exportação: configuração por entidade, filtros, formato, contagem e aviso de permissões; botão Exportar; prévia lateral; nome de arquivo padronizado; aviso de exportação parcial.

Integração no Pacote: cada wireframe passa a fechar hierarquia de informação, posição de ações, distribuição de blocos e estados secundários mínimos. O front-end não deve redesenhar livremente essas telas.

## **22.5 E05 — Layout mestre PDF institucional incorporado como Seção 11.E AZUL**

O template HTML/CSS do ZIP materializa o layout mestre das exportações PDF e deve ser tratado como base oficial do MVP para documentos institucionais renderizados em backend.

- Renderização consolidada: backend com Puppeteer e template HTML/CSS parametrizável. O PDF institucional deixa de ser pendência vaga e passa a ter direção técnica e visual definida.

- Página de capa definida com faixa institucional, título, subtítulo, metadados, responsáveis, data, versão e rodapé institucional.

- Página-tipo definida com cabeçalho leve, identificação do território, título de seção, rodapé com paginação, procedência, data de geração e referência à plataforma.

- Tabela institucional definida com cabeçalho colorido, linhas zebradas, padding generoso e legibilidade de relatório oficial.

- Bloco de síntese definido com caixa lateral colorida, fundo suave e citação obrigatória de vínculo com evidência, escuta ou ata.

- Página de gráfico definida com espaço reservado, legenda, fonte, data e responsável; gráficos sem contexto ficam proibidos.

- Kit Expedição consolidado como pacote ZIP com um PDF por componente e um PDF índice, em vez de um único PDF monolítico.

- Retenção recomendada pelo artefato: exportações disponíveis durante a vigência do ciclo territorial, com expurgo ao encerramento. Isso substitui a formulação vaga anterior e deve prevalecer como direção forte de retenção, salvo revisão posterior expressa.

## **22.6 E06 — Comportamento responsivo incorporado como Seção 11.F AZUL**

A responsividade deixa de ser princípio genérico e passa a ter comportamento explícito por breakpoint e por prioridade de tela.

- Navegação por breakpoint: no desktop, header completo + sidebar fixa + breadcrumb completo; no tablet, header compacto + drawer lateral + breadcrumb reduzido; no mobile, header compacto + drawer fullscreen + breadcrumb no último nível com botão voltar.

- Prioridade 1 mobile obrigatória: formulário de evidência, lista de evidências e formulário de escuta, com coluna única, ações fixadas no rodapé da viewport e tratamento keyboard-aware.

- Prioridade 2 funcional: mapa de atores e quadro de prioridades; no mobile, quadrante vira lista vertical com indicação visual de postura e detalhe em sheet modal; prioridades viram abas por status.

- Prioridade 3 desktop-first: dashboard executivo, ficha de projeto e tela de exportação, que precisam funcionar em tablet e mobile sem refinamento total, mantendo ordem hierárquica.

- Tiles de stats em mobile usam scroll horizontal com snap; grade analítica do dashboard colapsa para coluna única em tablet.

## **22.7 E07 — Acessibilidade incorporada como Seção 11.G AZUL**

A acessibilidade deixa de ser diretriz abstrata e passa a ser requisito de implementação do MVP.

- Contraste mínimo: 4.5:1 para texto normal e 3:1 para texto grande, com obrigação de validação da paleta definida em E01.

- Navegação por teclado obrigatória, com ordem de foco coerente, foco visível e preservação do contexto visual.

- Rótulos ARIA obrigatórios para elementos interativos; aria-live para estados de erro, sucesso e carregando; aria-busy para skeleton loading.

- Formulários com labels associados, mensagens de erro vinculadas via aria-describedby e indicação acessível de obrigatoriedade.

- Nenhuma informação crítica deve depender apenas de cor; semáforos, quadrantes e estados devem ter redundância por texto ou ícone.

- Reduced motion deve ser respeitado: skeleton sem pulsação, toasts sem slide e transições reduzidas quando o usuário preferir menos movimento.

## **22.8 E08 — Diagrama de relações entre entidades incorporado como adendo da Seção 12.5 AMARELO forte**

O diagrama de relações do ZIP passa a integrar a leitura do domínio e do modelo de dados como mapa conceitual do produto.

- Relações 1:N obrigatórias por território: território contém evidências, escutas, atores, ativos, prioridades, projetos, indicadores e, conceitualmente, ritos/decisões.

- Relações N:N relevantes materializadas pelo diagrama: evidência ↔ ator, evidência ↔ prioridade, evidência ↔ projeto, escuta ↔ ator, escuta ↔ prioridade, ator ↔ projeto, ator ↔ ativo, projeto ↔ ativo e rito ↔ projeto.

- Regras conceituais incorporadas: prioridade sem evidência vinculada é permitida, mas gera alerta; projeto sem responsável é permitido, mas gera pendência; indicador sem baseline é permitido, mas exibe estado neutro.

- Correção de escopo: o diagrama inclui Rito/Decisão como entidade do domínio amplo da Jornada. No MVP atual, isso passa a constar como entidade conceitual de referência e não como obrigação imediata do schema produtivo, salvo validação posterior. Isso elimina a omissão sem inflar o escopo.

## **22.9 E09 — Decisões do dashboard incorporadas como atualização da Seção 11.A.5 AMARELO forte**

As decisões do dashboard deixam de ficar genéricas e passam a ter direção concreta, vinda do artefato de Mabuse.

- D04 — Semáforos de indicador: direção forte consolidada em quatro estados: verde quando atingimento da meta estiver acima de 80%; âmbar entre 50% e 80%; vermelho abaixo de 50%; cinza/neutro quando não houver dado ou baseline. A validação metodológica final do critério permanece com Augusto, mas o pacote deixa de ficar sem regra provisória.

- D05 — Tile de Pendências passa a ser obrigatório na linha de stats do dashboard executivo, por tratar pendência como dado executivo de qualidade do trabalho territorial.

- D06 — Radar Estratégico permanece como bloco resumido no dashboard, com até cinco itens e ação explícita Abrir radar completo em tela derivada. Isso substitui a formulação vaga anterior.

## **22.10 E10 — Teste de nomenclatura com usuários incorporado como pendência controlada explícita AMARELO**

O teste de nomenclatura não foi executado, mas seu método e seu papel no pacote passam a ser explícitos.

- Método recomendado incorporado: card sorting aberto com 3 a 5 gestores públicos ou secretários, duração de 30 minutos por participante, com perguntas sobre expectativa de clique e renomeação espontânea.

- Termos de maior risco já registrados no pacote: Radar Estratégico, Fábrica de Projetos, Kit Expedição, Articulador territorial, Pendências territoriais e Evidências e escutas.

- Status: pendência controlada de validação de nomenclatura. Não bloqueia o pacote, mas não pode ser fingida como concluída.

## **22.11 E11 — Microinterações e motion incorporadas como Seção 11.H AZUL**

As microinterações deixam de ser improviso de implementação e passam a ter parâmetros explícitos no pacote.

- Toast de sucesso: posição top-right, duração 4s, fade-out 300ms.

- Toast de erro: entrada suave, persistência até ação do usuário quando necessário.

- Highlight de item recém-criado: flash de fundo amarelo suave por 2s com ease-out.

- Skeleton loading: pulsação entre opacidade 0.4 e 0.7 em ciclo de 1.5s, salvo reduced motion.

- Transição entre estados: cross-fade 200ms ease.

- Botão desabilitado durante processamento: opacity 0.5, cursor not-allowed e texto dinâmico.

- Painel lateral de detalhe de ator: slide-in 250ms ease-out desde a direita.

- Modal de confirmação: overlay com backdrop blur 4px e fade-in 150ms.

## **22.12 Correções explícitas de inconsistência e supersessão AZUL**

Esta remesclagem corrige inconsistências e define qual leitura passa a prevalecer no pacote consolidado.

- Mapa de atores: para fins do Pacote Mestre consolidado, prevalece a formulação visual e de Design do eixo influência × postura. Menções anteriores a influência × interesse no protótipo EP 02.02 deixam de reger o Design e a navegação do pacote atual. Quando houver implementação intermediária usando relation como nome técnico, ela deve ser tratada como sinônimo transitório de postura até harmonização completa do módulo.

- Mapa de rotas deixa de ser apenas princípio e passa a ser árvore implementável. Toda menção anterior excessivamente genérica sobre navegação deve ser lida à luz da árvore de rotas consolidada em E03.

- Tokens visuais deixam de ser recomendação e passam a ser materialização oficial. Qualquer menção anterior a paleta, fonte ou espaçamento sem valor concreto fica superada pelo sistema de tokens incorporado nesta versão.

- Template PDF deixa de ser item vago: passa a existir direção visual e técnica concreta, em backend com Puppeteer e layout institucional parametrizável.

- Semáforos do dashboard deixam de ser lacuna total. O pacote agora registra regra provisória forte, ainda pendente apenas de homologação metodológica final.

- Acessibilidade, responsividade e microinterações deixam de estar reduzidas a menção superficial e passam a ter requisitos operacionais suficientes para handoff de front-end.

## **22.13 Checklist detalhada de incorporação do Design Spec visual AMARELO**

- E01 Design Token System — incorporado materialmente com famílias tipográficas, paleta cromática, estados, espaçamentos, raios, sombras, breakpoints e motion tokens. Status: AZUL.

- E02 Decisões vermelhas de navegação — incorporadas e consolidadas (GeoPortal como subárea, breadcrumb reconstruído, seletor multi-território como troca de contexto). Status: AZUL.

- E03 Mapa de rotas — incorporado com árvore de URLs, regras de redirecionamento e estrutura App Router. Status: AZUL.

- E04 Wireframes das 7 telas críticas — incorporados como referência visual explícita e usados para fechar layout e hierarquia de T01–T07. Status: AZUL.

- E05 Layout mestre PDF institucional — incorporado com direção visual e técnica concreta. Status: AZUL.

- E06 Comportamento responsivo — incorporado com breakpoints, navegação colapsada e prioridades de tela. Status: AZUL.

- E07 Acessibilidade — incorporada com WCAG 2.1 AA, teclado, ARIA, contraste e reduced motion. Status: AZUL.

- E08 Diagrama de relações — incorporado como mapa conceitual do domínio, com observação explícita sobre Rito/Decisão como camada conceitual ainda não obrigatória no schema do MVP. Status: AMARELO forte.

- E09 Decisões pendentes do dashboard — incorporadas com regra provisória forte para semáforos, bloco Pendências obrigatório e Radar resumido com abertura em tela derivada. Status: AMARELO forte.

- E10 Teste de nomenclatura com usuários — incorporado como método e pendência controlada, sem falso fechamento. Status: AMARELO.

- E11 Microinterações e motion — incorporados com durações, easing e gatilhos suficientes para implementação. Status: AZUL.

## **22.14 Leitura final desta remesclagem visual AZUL**

Após esta remesclagem, a camada visual deixa de existir apenas como lista de artefatos e passa a estar incorporada de forma utilizável no Pacote Mestre. O que está produzido no ZIP foi absorvido como decisão, diretriz ou seção efetiva do SPEC. O que ainda não é produção concluída, como o teste de nomenclatura ou a homologação final dos limiares dos semáforos, permanece visível como pendência controlada. Com isso, o pacote reduz fortemente o espaço para improviso de front-end, rotas, estados, responsividade, acessibilidade, motion e exportações PDF.


