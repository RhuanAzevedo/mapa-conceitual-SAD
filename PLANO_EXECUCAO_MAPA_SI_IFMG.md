```markdown
# PLANO DE EXECUÇÃO TÉCNICO E ESPECIFICAÇÃO OPERACIONAL

## PROJETO: MAPA DIGITAL INTERATIVO DO CURSO DE BACHARELADO EM SISTEMAS DE INFORMAÇÃO (IFMG CAMPUS OURO BRANCO)

---

## 1. Visão Geral do Documento e Objetivos

### 1.1 Propósito
Este documento constitui a especificação técnica, arquitetural e operacional completa para a construção de uma aplicação web interativa em **HTML5, CSS3 e JavaScript puro (Vanilla JS)**. A aplicação consiste em um **Mapa Digital do Curso de Bacharelado em Sistemas de Informação do IFMG Campus Ouro Branco**, direcionado prioritariamente a estudantes do ensino médio e ingressantes que desejam compreender a estrutura do curso, suas áreas de conhecimento e as múltiplas trajetórias de carreira associadas.

### 1.2 Agente Executor
Este plano destina-se ao **Google Antigravity**, que deverá ler, processar, estruturar e implementar integralmente o projeto de software sem necessidade de intervenção manual suplementar para decisões de arquitetura ou design de nível básico.

### 1.3 Objetivos Acadêmicos e Funcionais
*   **Apresentar a Matriz Curricular Real:** Exibir com exatidão todas as disciplinas obrigatórias e optativas organizadas por eixos de formação e períodos, conforme o Projeto Pedagógico do Curso (PPC) oficial.
*   **Mapear Carreiras de TI:** Explicitar visualmente e de forma reativa como a junção de disciplinas e eixos de conhecimento viabiliza caminhos profissionais reais (Engenharia de Software, Desenvolvimento Full-Stack, Ciência de Dados/IA, Infraestrutura/Redes, Gestão de TI, UX/UI, Banco de Dados, Empreendedorismo, etc.).
*   **Interatividade Clara:** Permitir cruzamento de dados bidirecional (Seleção de Disciplina -> Destaque de Carreiras e Áreas; Seleção de Carreira -> Destaque de Trilhas Curriculares e Competências).
*   **Publicação Autônoma:** Garantir compatibilidade total com o ecossistema estático do GitHub Pages.

---

## 2. Tecnologias e Regras Técnicas Estritas

### 2.1 Stack Tecnológico Permitido
*   **Linguagens:** HTML5 semântico, CSS3 moderno (Flexbox, CSS Grid, Custom Properties/Variables), JavaScript Puro (ES6+ Vanilla).
*   **Vetores e Conexões Visuais:** SVG nativo (inline ou renderizado dinamicamente via DOM/JavaScript).
*   **Hospedagem/Deploy:** GitHub Pages (arquivos estáticos servidos diretamente do repositório).

### 2.2 Restrições Absolutas (Proibições)
1.  **Zero Frameworks Front-end:** Proibido o uso de React, Vue, Angular, Svelte ou similares.
2.  **Zero Bibliotecas de Estilização:** Proibido Tailwind, Bootstrap, Bulma, Foundation ou pré-processadores que exijam build complexo se não puderem ser servidos diretamente.
3.  **Zero Bibliotecas de Manipulação de Grafos/UI:** Proibido D3.js, Cytoscape.js, Vis.js, Mermaid.js, jQuery, Lodash, etc. Toda a lógica de interatividade e traçado de linhas/destaques deve ser feita em JavaScript puro.
4.  **Zero Transpiladores/Bundlers Obrigatórios:** O código deve rodar diretamente no navegador sem necessidade de Node.js, Webpack, Vite ou Babel.
5.  **Sem Emojis em Códigos:** É estritamente proibido o uso de emojis em arquivos de código (comentários, strings, logs de console, variáveis ou IDs).

---

## 3. Fontes de Dados e Documentação

### 3.1 Fontes Primárias e Secundárias
*   **Fonte Primária (Incondicional):** Projeto Pedagógico do Curso (PPC) do Bacharelado em Sistemas de Informação – IFMG Campus Ouro Branco (Aprovado pela Resolução Nº 016/2017 e atualizações vigentes).
*   **Fonte Secundária (Complementar/Conceitual):** Referência metodológica de diagramação do `roadmap.sh` (utilizada estritamente para inspiração de fluxo visual, sem cópia de conteúdo).

### 3.2 Tabela de Mapeamento de Fontes e Decisões

| Informação | Fonte Origem | Aplicação no Projeto | Justificativa / Resolução de Divergências |
| :--- | :--- | :--- | :--- |
| **Carga Horária Total (3004h)** | PPC BSI IFMG (Seção 1 e 8.1) | Cabeçalho e Estatísticas do Mapa | Dado oficial e mandatório do IFMG. |
| **Eixos de Formação (6 Eixos)** | PPC BSI IFMG (Seção 6.2) | Filtros Globais e Codificação de Cores | Define a estrutura conceitual do curso. |
| **Lista de Disciplinas (38 Obrigatórias + Optativas)** | PPC BSI IFMG (Seção 8.1.1) | Nós da Matriz Curricular e Conexões | Respeita a matriz oficial do campus. |
| **Perfil e Percursos de Carreira** | PPC BSI IFMG (Seção 6.1) + Adaptação Acadêmica | Nós e Filtros de Carreiras | O PPC descreve 12+ papéis do egresso; estes foram agrupados em 10 carreiras bem estruturadas. |
| **Relação Disciplina -> Carreira** | Construção Lógica baseada nas Ementas do PPC | Conexões e Matriz do JS | Estabelecida após análise detalhada dos objetivos de cada ementa (Seção 8.1.2 do PPC). |

---

## 4. Estrutura e Arquitetura de Dados em JavaScript

Para suportar relacionamentos N:N (Muitos-para-Muitos) entre Áreas, Disciplinas e Carreiras sem poluição visual, os dados serão centralizados no arquivo `js/data.js` em objetos estruturados.

### 4.1 Schema do Banco de Dados em Memória (`data.js`)

```javascript
const BSI_DATA = {
  eixos: [
    {
      id: "matematica",
      nome: "Formação Matemática",
      cor: "#e91e63",
      percentualCargaHoraria: 9,
      descricao: "Fornece a base do raciocínio lógico abstrato, modelagem e suporte teórico para algoritmos."
    },
    {
      id: "computacional",
      nome: "Formação Computacional",
      cor: "#ff9800",
      percentualCargaHoraria: 21,
      descricao: "Promove o desenvolvimento de habilidades de programação, estruturas de dados e algoritmos."
    },
    {
      id: "ti",
      nome: "Formação em Tecnologia da Informação",
      cor: "#4caf50",
      percentualCargaHoraria: 28,
      descricao: "Trata dados, engenharia de software, redes, sistemas distribuídos e infraestrutura."
    },
    {
      id: "administrativa",
      nome: "Formação Administrativa",
      cor: "#00bcd4",
      percentualCargaHoraria: 7,
      descricao: "Oferece conceitos de gestão, contabilidade, processos organizacionais e alinhamento estratégico."
    },
    {
      id: "complementar",
      nome: "Formação Complementar",
      cor: "#ffeb3b",
      percentualCargaHoraria: 29,
      descricao: "Envolve disciplinas optativas, projetos integradores, atividades acadêmicas e idiomas."
    },
    {
      id: "profissional_social",
      nome: "Formação Profissional e Social",
      cor: "#9e9e9e",
      percentualCargaHoraria: 6,
      descricao: "Aplica conteúdos na prática, ética, legislação e desenvolvimento do TCC."
    }
  ],

  disciplinas: [
    /* Exemplo de Estrutura Interna de cada disciplina */
    {
      id: "prog_web",
      codigo: "OBBGSIN.023",
      nome: "Programação WEB",
      periodo: 4,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatória",
      ementaResumida: "Desenvolvimento lado-cliente (HTML, CSS, JS) e lado-servidor. Arquitetura de aplicações web e sessões.",
      competencias: ["Desenvolvimento Front-end", "Desenvolvimento Back-end", "Integração Web"],
      carreirasRelacionadas: ["dev_fullstack", "dev_frontend", "dev_backend", "ux_ui"]
    }
    /* Lista completa definida na Seção 5 */
  ],

  carreiras: [
    /* Exemplo de Estrutura Interna de cada carreira */
    {
      id: "dev_fullstack",
      titulo: "Desenvolvedor Full-Stack",
      categoria: "Desenvolvimento de Software",
      descricaoCurta: "Atua na construção completa de aplicações software, cobrindo interface do usuário, regras de negócio e persistência de dados.",
      descricaoDetalhada: "O profissional Full-Stack domina tanto o desenvolvimento de front-end (interfaces) quanto de back-end (servidores e bancos de dados), aplicando padrões de projeto e engenharia de software.",
      eixosChave: ["ti", "computacional"],
      disciplinasChaveIds: [
        "intro_prog", "aed1", "poo1", "poo2", "banco_dados1",
        "eng_soft1", "prog_web", "ihc", "eng_soft2"
      ],
      tecnologias: ["HTML/CSS/JS", "Java", "SQL", "REST APIs", "Git"],
      nivelAlinhamento: "Alto"
    }
    /* Lista completa definida na Seção 6 */
  ]
};

```

---

## 5. Mapeamento Completo de Conteúdo Curricular (PPC IFMG Ouro Branco)

O Antigravity deve popular integralmente o vetor `BSI_DATA.disciplinas` com os dados oficiais do PPC extraídos a seguir:

### 5.1 Disciplinas Obrigatórias por Período

#### 1º Período (320h)

1. **Ética e Legislação** (`OBBGSIN.044`) | 32h | Eixo: `profissional_social` | Competências: Ética profissional, Marco Civil da Internet, Direitos Autorais de Software, LGPD/Privacidade.
2. **Introdução à Programação** (`OBBGSIN.085`) | 64h | Eixo: `computacional` | Competências: Lógica de programação, algoritmos procedimentais, estruturas condicionais e de repetição, modularização.
3. **Introdução a Sistemas de Informação** (`OBBGSIN.001`) | 64h | Eixo: `ti` | Competências: Visão geral da computação, lógica proposicional, componentes de SI, fundamentos de hardware/software.
4. **Português Instrumental I** (`OBBGSIN.007`) | 32h | Eixo: `complementar` | Competências: Redação técnica, interpretação de texto, coesão, coerência, comunicação acadêmica.
5. **Pré-Cálculo** (`OBBGSIN.101`) | 64h | Eixo: `matematica` | Competências: Funções elementares, gráficos, fundamentação algébrica para cálculo.
6. **Princípios da Administração I** (`OBBGSIN.011`) | 64h | Eixo: `administrativa` | Competências: Teoria geral da administração, processos gerenciais, negócios de tecnologia.

#### 2º Período (320h)

7. **Algoritmos e Estrutura de Dados I** (`OBBGSIN.009`) | 64h | Eixo: `computacional` | Competências: Alocação estática e dinâmica, listas, pilhas, filas, métodos de busca e ordenação.
8. **Cálculo Diferencial e Integral I** (`OBBGSIN.012`) | 64h | Eixo: `matematica` | Competências: Limites, derivadas, integrais, otimização e taxas de variação.
9. **Inglês Instrumental I** (`OBBGSIN.003`) | 32h | Eixo: `complementar` | Competências: Leitura e interpretação de documentação técnica em língua inglesa.
10. **Métodos e Técnicas de Pesquisa** (`OBBGSIN.002`) | 32h | Eixo: `complementar` | Competências: Metodologia científica, normas ABNT, elaboração de projetos e relatórios acadêmicos.
11. **Programação Orientada a Objetos I** (`OBBGSIN.010`) | 64h | Eixo: `computacional` | Competências: Abstração, classes, objetos, encapsulamento, herança, polimorfismo.
12. **Sistemas Digitais e Circuitos Combinacionais** (`OBBGSIN.013`) | 64h | Eixo: `computacional` | Competências: Álgebra booleana, portas lógicas, circuitos combinacionais e sequenciais.

#### 3º Período (320h)

13. **Algoritmos e Estrutura de Dados II** (`OBBGSIN.015`) | 64h | Eixo: `computacional` | Competências: Árvores binárias/balanceadas, processamento de cadeias, representação de grafos.
14. **Arquitetura e Organização de Computadores** (`OBBGSIN.024`) | 64h | Eixo: `computacional` | Competências: Arquitetura de Von Neumann, UCP, memória, barramentos, E/S, linguagem de máquina.
15. **Banco de Dados I** (`OBBGSIN.016`) | 64h | Eixo: `ti` | Competências: Modelagem ER/relacional, linguagem SQL (DDL/DML), normalização, transações.
16. **Contabilidade** (`OBBGSIN.018`) | 64h | Eixo: `administrativa` | Competências: Demonstrações financeiras, balanço patrimonial, DRE, análise de custos organizacionais.
17. **Engenharia de Software I** (`OBBGSIN.017`) | 64h | Eixo: `ti` | Competências: Ciclo de vida de software, engenharia de requisitos, UML, processos ágeis.

#### 4º Período (320h)

18. **Álgebra Linear e Geometria Analítica** (`OBBGSIN.021`) | 64h | Eixo: `matematica` | Competências: Matrizes, vetores, espaços vetoriais, transformações lineares, sistemas lineares.
19. **Matemática Discreta** (`OBBGSIN.020`) | 64h | Eixo: `computacional` | Competências: Teoria dos conjuntos, relações, indução, noções de grafos e combinatória.
20. **Programação Orientada a Objetos II** (`OBBGSIN.022`) | 64h | Eixo: `computacional` | Competências: Interface gráfica (GUI), tratamento de exceções, threads, padrões de projeto, persistência.
21. **Programação WEB** (`OBBGSIN.023`) | 64h | Eixo: `ti` | Competências: HTML5, CSS3, JavaScript, desenvolvimento servidor (scripts), arquitetura cliente-servidor.
22. **Sistemas Operacionais** (`OBBGSIN.030`) | 64h | Eixo: `computacional` | Competências: Gerenciamento de processos, memória virtual, sistemas de arquivos, concorrência.

#### 5º Período (320h)

23. **Engenharia de Software II** (`OBBGSIN.041`) | 64h | Eixo: `ti` | Competências: Arquiteturas complexas (REST/GraphQL), DevOps, testes automatizados, reuso de software.
24. **Governança e Gestão da Informação** (`OBBGSIN.019`) | 64h | Eixo: `ti` | Competências: COBIT, ITIL, TIC Verde, gestão do conhecimento, inteligência competitiva.
25. **Probabilidade e Estatística** (`OBBGSIN.031`) | 64h | Eixo: `matematica` | Competências: Análise de dados, variáveis aleatórias, distribuições probabilísticas, teste de hipóteses.
26. **Redes de Computadores I** (`OBBGSIN.029`) | 64h | Eixo: `ti` | Competências: Modelos OSI/TCP-IP, endereçamento IP, roteamento, protocolos de transporte (TCP/UDP).

#### 6º Período (320h)

27. **Programação para Dispositivos Móveis** (`OBBGSIN.039`) | 64h | Eixo: `ti` | Competências: Desenvolvimento mobile, consumo de APIs, persistência local, UI móvel.
28. **Projeto e Análise de Algoritmos** (`OBBGSIN.038`) | 64h | Eixo: `computacional` | Competências: Complexidade de algoritmos (Notação Big-O), divisão e conquista, programação dinâmica, NP-completo.
29. **Sistemas de Apoio à Decisão** (`OBBGSIN.036`) | 64h | Eixo: `ti` | Competências: BI, sistemas de informação gerencial, ERP, análise de suporte estratégico.
30. **Sistemas Distribuídos** (`OBBGSIN.037`) | 64h | Eixo: `ti` | Competências: Comunicação entre processos, RPC/RMI, tolerância a falhas, concorrência distribuída.

#### 7º Período (288h)

31. **Gestão de Projetos** (`OBBGSIN.040`) | 32h | Eixo: `administrativa` | Competências: PMBOK, gerenciamento de escopo, tempo, custo, riscos e equipes de projeto.
32. **Inteligência Artificial** (`OBBGSIN.034`) | 64h | Eixo: `ti` | Competências: Algoritmos de busca, aprendizado de máquina, redes neurais, sistemas especialistas.
33. **Interface Humano Computador** (`OBBGSIN.026`) | 64h | Eixo: `ti` | Competências: Design centrado no usuário, usabilidade, acessibilidade, prototipagem, avaliação de IHC.
34. **Trabalho de Conclusão de Curso I** (`OBBGSIN.091`) | 64h | Eixo: `profissional_social` | Competências: Definição de projeto de pesquisa, revisão bibliográfica, proposta metodológica.

#### 8º Período (256h)

35. **Empreendedorismo** (`OBBGSIN.102`) | 64h | Eixo: `administrativa` | Competências: Plano de negócios, validação de startups, inovação tecnológica, modelos de negócios.
36. **Qualidade de Software** (`OBBGSIN.103`) | 64h | Eixo: `ti` | Competências: Métricas de qualidade, normas ISO/IEEE, modelos CMMI/MPS.BR, planos de teste.
37. **Trabalho de Conclusão de Curso II** (`OBBGSIN.092`) | 64h | Eixo: `profissional_social` | Competências: Execução da pesquisa, desenvolvimento de solução técnica, defesa pública.

### 5.2 Disciplinas Optativas Mapeadas no Sistema

As seguintes disciplinas optativas relevantes devem constar no dataset para enriquecimento dos caminhos de carreira:

* **Banco de Dados II** (`OBBGSIN.033` - 64h)
* **Mineração de Dados** (`OBBGSIN.068` - 64h)
* **Redes de Computadores II** (`OBBGSIN.032` - 64h)
* **Gerência de Projetos de Software** (`OBBGSIN.049` - 64h)
* **Computação Gráfica** (`OBBGSIN.070` - 64h)
* **Processamento de Imagens** (`OBBGSIN.095` - 64h)
* **Tópicos em Jogos Digitais** (`OBBGSIN.097` - 64h)
* **Tópicos Especiais em Robótica** (`OBBGSIN.099` - 64h)
* **Segurança e Criptografia (Tópicos em Redes)** (`OBBGSIN.066` - 64h)
* **Gestão da Inovação** (`OBBGSIN.054` - 64h)

---

## 6. Mapeamento Detalhado de Carreiras Profissionais

O Antigravity deve registrar no mínimo **10 trajetórias de carreira** sólidas e fundamentadas no perfil do egresso descrito no PPC:

### 1. Desenvolvedor Full-Stack

* **Categoria:** Desenvolvimento de Software
* **Descrição:** Constrói aplicações completas (Web/Desktop/Mobile), integrando front-end, lógica de negócios e banco de dados.
* **Disciplinas Chave:** Introdução à Programação, POO I & II, Banco de Dados I, Engenharia de Software I & II, Programação WEB, IHC.
* **Tecnologias:** HTML5/CSS3, JavaScript, Java, SQL, REST APIs.

### 2. Engenheiro de Software / Arquiteto de Software

* **Categoria:** Engenharia de Software
* **Descrição:** Projetos, especificação de arquitetura, garantia da qualidade, processos de desenvolvimento e manutenção de sistemas complexos.
* **Disciplinas Chave:** Engenharia de Software I & II, Qualidade de Software, Projeto e Análise de Algoritmos, POO II, Governança e Gestão da Informação.
* **Tecnologias:** UML, Padrões de Projeto (Design Patterns), DevOps, CI/CD, Ferramentas de Teste.

### 3. Cientista de Dados / Especialista em Inteligência Artificial

* **Categoria:** Dados e IA
* **Descrição:** Analisa volumes massivos de dados, cria modelos preditivos e implementa soluções baseadas em aprendizado de máquina.
* **Disciplinas Chave:** Pré-Cálculo, Cálculo I, Álgebra Linear, Probabilidade e Estatística, Inteligência Artificial, Mineração de Dados (Optativa).
* **Tecnologias:** Python/R, Algoritmos ML, Redes Neurais, SQL, Visualização de Dados.

### 4. Administrador de Banco de Dados (DBA) / Engenheiro de Dados

* **Categoria:** Banco de Dados
* **Descrição:** Projeta, otimiza, gerencia a segurança e garante a alta disponibilidade das bases de dados organizacionais.
* **Disciplinas Chave:** Banco de Dados I, Banco de Dados II (Optativa), Tópicos Avançados em Banco de Dados, Algoritmos e Estrutura de Dados I & II, Sistemas Operacionais.
* **Tecnologias:** SQL Avançado, SGBDs Relacionais/NoSQL, Modelagem Dimensional, Tuning de Consultas.

### 5. Administrador de Redes e Infraestrutura / Especialista em Nuvem

* **Categoria:** Infraestrutura e Redes
* **Descrição:** Planeja, configura e mantém a infraestrutura de comunicação, servidores, segurança de redes e ambientes de computação em nuvem.
* **Disciplinas Chave:** Arquitetura de Computadores, Sistemas Operacionais, Redes de Computadores I & II, Sistemas Distribuídos, Tópicos em Redes e Segurança.
* **Tecnologias:** Protocolos TCP/IP, Linux/Unix, Roteadores/Switches, Virtualização, Sockets.

### 6. Analista de Sistemas / Analista de Requisitos e Negócios

* **Categoria:** Análise e Negócios
* **Descrição:** Atua como ponte entre os problemas da organização e as soluções tecnológicas, identificando requisitos e otimizando processos.
* **Disciplinas Chave:** Introdução a SI, Engenharia de Software I, Princípios da Administração I, Contabilidade, Sistemas de Apoio à Decisão, Governança e Gestão.
* **Tecnologias:** Casos de Uso, Histórias de Usuário, Modelagem BPMN, ERP, BI.

### 7. Gerente de Projetos de TI / Product Owner / Scrum Master

* **Categoria:** Gestão de TI
* **Descrição:** Lidera equipes, planeja entregas, gerencia cronograma, custos, riscos e alinhamento estratégico de produtos tecnológicos.
* **Disciplinas Chave:** Gestão de Projetos, Gerência de Projetos de Software (Optativa), Engenharia de Software I & II, Princípios da Administração, Empreendedorismo.
* **Tecnologias:** Metodologias Ágeis (Scrum/Kanban), PMBOK, Ferramentas de Gestão (Jira/Trello).

### 8. Especialista em UX/UI e Interação Humano-Computador

* **Categoria:** Design e Experiência do Usuário
* **Descrição:** Avalia e desenha a experiência do usuário, garantindo usabilidade, acessibilidade, prototipagem e eficiência na navegação.
* **Disciplinas Chave:** Interface Humano Computador (IHC), Programação WEB, Qualidade de Software, Engenharia de Software I.
* **Tecnologias:** Prototipagem (Figma/Wireframes), Testes de Usabilidade, Acessibilidade Web (WCAG), HTML/CSS.

### 9. Desenvolvedor Mobile

* **Categoria:** Desenvolvimento de Software
* **Descrição:** Cria aplicativos nativos ou híbridos para smartphones e tablets, focando em performance, armazenamento local e experiência móvel.
* **Disciplinas Chave:** Programação para Dispositivos Móveis, POO I & II, Banco de Dados I, Programação WEB, IHC.
* **Tecnologias:** Android/Java/Kotlin, APIs RESTful, Persistência Local (SQLite).

### 10. Empreendedor de Tecnologia / Consultor de TI

* **Categoria:** Empreendedorismo e Consultoria
* **Descrição:** Identifica oportunidades de mercado, cria startups de tecnologia ou presta consultoria estratégica em transformação digital.
* **Disciplinas Chave:** Empreendedorismo, Princípios da Administração, Contabilidade, Governança e Gestão da Informação, Consultoria Empresarial (Optativa), Gestão da Inovação.
* **Tecnologias:** Lean Startup, Canvas de Modelo de Negócios, Valuation, Gestão de Serviços.

---

## 7. Design de Interface (UI), Experiência do Usuário (UX) e Layout

### 7.1 Diretrizes de Estilo e Estética

* **Conceito Visual:** **"Academic Precision & Clean Functional Tech"**. Deve passar a imagem de um projeto sério, limpo, moderno e elaborado por um estudante universitário de Sistemas de Informação do IFMG.
* **Paleta de Cores Principais:**
* Fundo Geral: `#F8F9FA` (Cinza claro suave).
* Superfícies/Cards: `#FFFFFF` (Branco puro com bordas finas `#E9ECEF`).
* Texto Principal: `#212529` (Grafite escuro para excelente contraste).
* Texto Secundário: `#6C757D` (Cinza neutro).
* Cor de Destaque Primária (IFMG): `#006633` (Verde Institucional IFMG).
* Cor de Acento/Conexão: `#0284C7` (Azul corporativo/tecnológico para destaques e linhas).


* **Cores dos Eixos Formativos:** Respeitar rigidamente as cores definidas no dataset (Tonalidades bem diferenciadas e acessíveis).
* **Tipografia:** `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (Legibilidade nativa excelente em qualquer SO).

### 7.2 Layout da Aplicação (Estrutura em 3 Blocos)

```
+-----------------------------------------------------------------------------------+
| HEADER INSTITUCIONAL: Título, CH Total (3004h), Badge IFMG, Filtros e Busca      |
+-----------------------------------------------------------------------------------+
| SELETOR DE MODO: [ Visão por Períodos/Eixos ]  |  [ Visão por Carreiras (Roadmap) ]|
+--------------------------------------------------+--------------------------------+
| ÁREA PRINCIPAL (ESQUERDA - 70%)                  | PAINEL LATERAL (DIREITA - 30%) |
|                                                  |                                |
| [ SVG de Conexões Overlay ]                      | [ Detalhes do Item Selecionado]|
|                                                  | - Disciplina / Carreira / Eixo |
| Grid por Períodos (1º ao 8º Período)             | - Ementa / Carga Horária       |
|   - Cards de Disciplinas com borda do Eixo       | - Competências Geradas         |
|   - Conexões reativas em destaque ao clicar      | - Carreiras Relacionadas (Links)|
|                                                  | - Botão "Limpar Seleção"       |
+--------------------------------------------------+--------------------------------+
| FOOTER: Legenda de Cores por Eixo | Créditos e Fontes Oficiais PPC | Links GitHub |
+-----------------------------------------------------------------------------------+

```

### 7.3 Interatividade Bidirecional

1. **Clique em uma Disciplina:**
* Destaca a disciplina selecionada com uma borda forte e brilho sutil.
* Calcula e exibe via linhas SVG as conexões com as carreiras das quais ela faz parte.
* Preenche o Painel Lateral com os dados da disciplina (Ementa, CH, Código, Período e lista de Carreiras favorecidas).


2. **Clique em uma Carreira:**
* Esmaece levemente as disciplinas não relacionadas (opacidade = 0.25).
* Ilumina vigorosamente todas as disciplinas que compõem a trilha dessa carreira.
* Preenche o Painel Lateral com a descrição da carreira, disciplinas-chave, tecnologias e nível de alinhamento com o curso.


3. **Filtro por Eixo / Busca Textual:**
* O campo de busca filtra em tempo real por nome de disciplina, código, competência ou tecnologia.



---

## 8. Arquitetura de Arquivos e Estrutura do Código

O projeto deve ser organizado na seguinte estrutura de diretórios simples e transparente:

```
mapa-digital-bsi/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── app.js
├── assets/
│   └── logo-ifmg.svg (ou versão inline/proporcional em CSS)
└── README.md

```

### 8.1 Responsabilidade de Cada Arquivo

* `index.html`: Estrutura semântica principal, tags de cabeçalho, contêiner da matriz curricular, overlay SVG para linhas de conexão, painel lateral e estrutura do rodapé.
* `css/style.css`: Estilização completa, variáveis CSS, regras de layout (Grid/Flexbox), estilos de estados (hover, active, muted, highlighted), responsividade (media queries para desktop, tablet e mobile).
* `js/data.js`: Dataset completo e imutável contendo os eixos, disciplinas obrigatórias/optativas e carreiras do PPC.
* `js/app.js`: Lógica de renderização dinâmica, gerenciamento do estado da aplicação, manipulação do DOM, cálculo de posições e desenho das linhas de conexão SVG, ouvintes de eventos e buscas.

---

## 9. Diretrizes de Implementação JavaScript (`js/app.js`)

### 9.1 Gerenciamento de Estado Simplificado

```javascript
const state = {
  selectedDisciplinaId: null,
  selectedCarreiraId: null,
  activeEixoFilter: "all",
  searchQuery: "",
  activeViewMode: "matriz" // "matriz" ou "carreiras"
};

```

### 9.2 Lógica do Desenho de Conexões em SVG

Para desenhar linhas entre disciplinas e o painel de carreiras sem bibliotecas externas:

1. Obter o retângulo delimitador do elemento origem (`getBoundingClientRect()`).
2. Obter o retângulo delimitador do elemento destino.
3. Calcular as coordenadas (x1, y1) e (x2, y2) relativas ao contêiner pai SVG.
4. Criar ou atualizar o elemento `<path d="M x1 y1 C (x1+x2)/2 y1, (x1+x2)/2 y2, x2 y2" />` para gerar uma curva suave de Bezier no SVG.

---

## 10. Acessibilidade, Responsividade e Desempenho

### 10.1 Responsividade (Adaptabilidade para Dispositivos)

* **Desktop (> 1024px):** Grid completo de 8 colunas para os semestres com SVG overlay ativo.
* **Tablet (768px - 1023px):** Grid de 4 colunas em 2 linhas de rolagem ou sanfona expansível por período.
* **Mobile (< 767px):** Exibição em lista vertical expansível ("Accordion") agrupada por semestres ou por carreiras. As conexões visuais por linhas SVG são substituídas no mobile por destaques de cores e badges de navegação direta para garantir usabilidade sem sobreposição de linhas.

### 10.2 Acessibilidade (WCAG 2.1 nível AA)

* Contraste mínimo de 4.5:1 para todos os textos.
* Navegação por teclado ativada (`tabindex="0"` nos elementos interativos com escuta dos eventos `Enter` e `Space`).
* Atributos `aria-label`, `aria-expanded` e `role="button"` aplicados corretamente nos nós interativos.
* A informação nunca deve depender exclusivamente da cor: todo elemento colorido possui rótulo em texto explicativo correspondente.

---

## 11. Checklist de Validação Acadêmica

O Antigravity deverá executar o seguinte checklist de autoavaliação antes de dar o projeto por concluído:

### Conteúdo

* [ ] Todas as 37+ disciplinas obrigatórias do PPC estão presentes com nome, código, CH e ementa resumida.
* [ ] Todas as 6 áreas/eixos formativos estão representadas com suas respectivas cores oficiais.
* [ ] Mínimo de 10 trajetórias de carreira relevantes cadastradas e devidamente ligadas às disciplinas.
* [ ] O conteúdo textual é fiel ao PPC e livre de informações genéricas não sustentadas.

### Funcionalidade

* [ ] O clique em uma disciplina seleciona e destaca as carreiras correspondentes.
* [ ] O clique em uma carreira destaca as disciplinas que formam sua trilha no mapa.
* [ ] A busca em tempo real filtra disciplinas e carreiras corretamente.
* [ ] O botão "Limpar Filtros / Resetar" restaura o mapa ao estado inicial.
* [ ] Nenhum erro é disparado no console do navegador (`Developer Tools`).

### Interface & Design

* [ ] O layout é responsivo e funcional em telas desktop, tablet e celular.
* [ ] A estética é profissional, limpa e acadêmica (sem poluição visual SaaS ou glassmorphism excessivo).
* [ ] A hierarquia tipográfica e o espaçamento são consistentes.

### Código & Arquitetura

* [ ] Apenas HTML, CSS e JavaScript puro (Vanilla) foram utilizados.
* [ ] Zero frameworks ou bibliotecas externas.
* [ ] Código sem emojis em comentários, strings ou prints.
* [ ] Organizado nos arquivos `index.html`, `css/style.css`, `js/data.js` e `js/app.js`.

### Entrega

* [ ] O projeto funciona ao abrir o arquivo `index.html` diretamente no navegador.
* [ ] Os caminhos de arquivos são relativos (ex: `./css/style.css`), garantindo funcionamento pleno no GitHub Pages.
* [ ] README.md explicativo incluído no repositório.

---

## 12. Guia de Configuração e Deploy no GitHub Pages

### 12.1 Passos para Publicação do Projeto

1. Inicializar o repositório Git localmente na raiz do projeto:
```bash
git init
git add .
git commit -m "feat: implementacao inicial do mapa digital BSI IFMG Ouro Branco"

```


2. Criar o repositório no GitHub (ex: `mapa-digital-bsi-ifmg`) e conectar a origem:
```bash
git remote add origin [https://github.com/SEU_USUARIO/mapa-digital-bsi-ifmg.git](https://github.com/SEU_USUARIO/mapa-digital-bsi-ifmg.git)
git branch -M main
git push -u origin main

```


3. Ativar o GitHub Pages:
* Navegar até **Settings** > **Pages** no repositório do GitHub.
* Em **Source**, selecionar a branch `main` e a pasta `/ (root)`.
* Salvar. O site estará online na URL: `https://SEU_USUARIO.github.io/mapa-digital-bsi-ifmg/`.



### 12.2 Modelo Proposto para o `README.md`

```markdown
# Mapa Digital Interativo - Bacharelado em Sistemas de Informação
### IFMG Campus Ouro Branco

Este projeto é uma ferramenta interativa desenvolvida para auxiliar estudantes do ensino médio e ingressantes a explorar o curso de Bacharelado em Sistemas de Informação do IFMG Campus Ouro Branco. Ele apresenta a matriz curricular oficial, as áreas de conhecimento (eixos formativos) e as diversas possibilidades de carreiras profissionais na área de TI.

## Recursos
- Visualização completa da Matriz Curricular por Períodos e Eixos de Formação.
- Mapeamento dinâmico entre Disciplinas, Competências e Carreiras Profissionais.
- Destaque interativo bidirecional de conexões.
- Filtros em tempo real por eixos, busca por palavra-chave e modo de visualização.
- Design responsivo e acessível.

## Tecnologias Utilizadas
- HTML5 Semântico
- CSS3 (Flexbox, CSS Grid, Custom Properties)
- JavaScript Puro (ES6+ Vanilla JS)
- SVG Nativo para renderização de conexões

## Como Executar Localmente
Não é necessária a instalação de dependências ou servidores backend.
1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/mapa-digital-bsi-ifmg.git

```

2. Abra o arquivo `index.html` em qualquer navegador web moderno.

## Fonte de Dados

* Projeto Pedagógico do Curso (PPC) de Bacharelado em Sistemas de Informação do IFMG Campus Ouro Branco.

## Licença

Projeto acadêmico desenvolvido para fins educacionais.

```

---

## 13. Instruções de Execução para o Google Antigravity

**ATENÇÃO, GOOGLE ANTIGRAVITY:** Siga estritamente as instruções operacionais a seguir para a execução deste projeto.

1.  **Leitura e Análise:**
    *   Leia integralmente este documento `PLANO_EXECUCAO_MAPA_SI_IFMG.md`.
    *   Valide que todos os requisitos técnicos (HTML/CSS/JS puro, sem bibliotecas externas, sem emojis no código) foram compreendidos.
2.  **Criação da Estrutura de Arquivos:**
    *   Crie o diretório raiz do projeto e a estrutura de pastas (`css/`, `js/`).
    *   Crie os arquivos `index.html`, `css/style.css`, `js/data.js`, `js/app.js` e `README.md`.
3.  **População dos Dados (`js/data.js`):**
    *   Insira todos os eixos, disciplinas obrigatórias, optativas e carreiras exatamente como especificado nas Seções 4, 5 e 6 deste documento.
4.  **Implementação da Interface e Estilos (`index.html` e `css/style.css`):**
    *   Desenvolva o layout conforme o mock-up estrutural da Seção 7.2.
    *   Aplique a paleta de cores limpa/acadêmica especificada.
    *   Garantir a responsividade para telas móveis e desktop.
5.  **Implementação da Lógica Interativa (`js/app.js`):**
    *   Implemente a renderização dinâmica dos cartões de disciplinas organizados por semestres.
    *   Implemente a renderização das carreiras e a lógica de cálculo/desenho das linhas de conexão em SVG.
    *   Implemente os eventos de clique, hover, busca por texto e filtragem por eixo.
6.  **Verificação e Autoteste:**
    *   Execute a verificação de todos os itens da **Checklist de Validação Acadêmica** (Seção 11).
    *   Certifique-se de que não existem erros no console do navegador e que todos os caminhos são relativos.
7.  **Finalização:**
    *   Após validar que todos os requisitos da atividade acadêmica foram atendidos com rigor, finalize o processo e disponibilize a estrutura pronta para ser versionada e publicada no GitHub.

---

## 14. Critérios de Aceitação

O projeto será considerado oficialmente concluído e aprovado quando atender rigorosamente ao seguinte critério fundamental:

> **Critério Principal de Aceitação:** Um estudante do ensino médio, ao acessar o mapa digital publicado no GitHub Pages, consegue navegar de maneira intuitiva entre os semestres do curso, clicar em uma disciplina ou carreira e compreender claramente quais conhecimentos precisará aprender no IFMG Campus Ouro Branco para se tornar o profissional que deseja ser no mercado de Tecnologia da Informação.

```