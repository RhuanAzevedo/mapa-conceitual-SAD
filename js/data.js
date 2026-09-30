/**
 * DATASET OFICIAL DO CURSO DE BACHARELADO EM SISTEMAS DE INFORMACAO
 * INSTITUTO FEDERAL DE MINAS GERAIS - CAMPUS OURO BRANCO
 * Fonte oficial: Projeto Pedagogico do Curso (PPC) - Resolucao No 016/2017 e DCNs MEC
 */

const BSI_DATA = {
  metricas: {
    cargaHorariaTotal: 3004,
    cargaHorariaObrigatoria: 2208,
    cargaHorariaOptativa: 256,
    cargaHorariaComplementar: 220,
    cargaHorariaProjetoIntegrador: 320,
    duracaoSemestresMin: 8,
    duracaoSemestresMax: 16,
    vagasAnuais: 50,
    turno: "Noturno",
    modalidade: "Presencial",
    campus: "IFMG Campus Ouro Branco",
    tituloConferido: "Bacharel em Sistemas de Informacao"
  },

  eixos: [
    {
      id: "matematica",
      nome: "Formacao Matematica",
      cor: "#e91e63",
      corSuave: "rgba(233, 30, 99, 0.08)",
      corBorda: "#d81b60",
      percentualCargaHoraria: 9,
      horasEstimadas: 270,
      descricao: "Fornece a base do raciocinio logico abstrato, modelagem quantitativa e suporte teorico indispensavel para algoritmos e analise de dados."
    },
    {
      id: "computacional",
      nome: "Formacao Computacional",
      cor: "#ff9800",
      corSuave: "rgba(255, 152, 0, 0.08)",
      corBorda: "#f57c00",
      percentualCargaHoraria: 21,
      horasEstimadas: 631,
      descricao: "Promove o desenvolvimento de habilidades de programacao de computadores, arquitetura, estruturas de dados, algoritmos e sistemas operacionais."
    },
    {
      id: "ti",
      nome: "Formacao em Tecnologia da Informacao",
      cor: "#2e7d32",
      corSuave: "rgba(46, 125, 50, 0.08)",
      corBorda: "#1b5e20",
      percentualCargaHoraria: 28,
      horasEstimadas: 841,
      descricao: "Concentra o tratamento de dados, engenharia de software, redes de computadores, inteligencia artificial, sistemas distribuidos e IHC."
    },
    {
      id: "administrativa",
      nome: "Formacao Administrativa",
      cor: "#0097a7",
      corSuave: "rgba(0, 151, 167, 0.08)",
      corBorda: "#00838f",
      percentualCargaHoraria: 7,
      horasEstimadas: 210,
      descricao: "Oferece conceitos de gestao organizacional, contabilidade, processos de negocios, administracao de projetos e empreendedorismo."
    },
    {
      id: "complementar",
      nome: "Formacao Complementar",
      cor: "#b45309",
      corSuave: "rgba(180, 83, 9, 0.08)",
      corBorda: "#92400e",
      percentualCargaHoraria: 29,
      horasEstimadas: 871,
      descricao: "Compreende disciplinas optativas, projetos integradores com dimensao extensionista, atividades academicas e comunicacao instrumental."
    },
    {
      id: "profissional_social",
      nome: "Formacao Profissional e Social",
      cor: "#546e7a",
      corSuave: "rgba(84, 110, 122, 0.08)",
      corBorda: "#37474f",
      percentualCargaHoraria: 6,
      horasEstimadas: 180,
      descricao: "Aplica de forma integradora os conteudos teorico-praticos, enfatizando etica profissional, legislacao e o Trabalho de Conclusao de Curso."
    }
  ],

  disciplinas: [
    /* 1o PERIODO */
    {
      id: "etica_leg",
      codigo: "OBBGSIN.044",
      nome: "Etica e Legislacao",
      periodo: 1,
      cargaHoraria: 32,
      eixoId: "profissional_social",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Conceitos de etica e moral. Etica teorica, aplicada e profissional no contexto da computacao. Introducao geral ao Direito e Direitos Humanos. Confidencialidade e privacidade de dados. Marco Civil da Internet. Direitos autorais de software e legislacao em TI.",
      competencias: [
        "Compreensao de etica e deontologia profissional em computacao",
        "Aplicacao do Marco Civil da Internet e normas de privacidade",
        "Conhecimento de direitos autorais e licenciamento de software",
        "Responsabilidade social e juridica em projetos tecnologicos"
      ],
      carreirasRelacionadas: ["gestao_ti_pm", "eng_software", "analista_sistemas_negocios", "empreendedor_consultor"]
    },
    {
      id: "intro_prog",
      codigo: "OBBGSIN.085",
      nome: "Introducao a Programacao",
      periodo: 1,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Conceitos fundamentais de algoritmos e programacao. Metodologias de resolucao de problemas. Variaveis, tipos de dados primitivos, expressoes logicas e aritmeticas. Estruturas condicionais e de repeticao. Modularizacao com funcoes e procedimentos. Vetores e matrizes.",
      competencias: [
        "Construcao de logica algoritmica estruturada",
        "Implementacao de programas em linguagem de programacao de alto nivel",
        "Modularizacao de codigo e reutilizacao de rotinas",
        "Manipulacao basica de memoria e arranjos multidimensionais"
      ],
      carreirasRelacionadas: ["dev_fullstack", "eng_software", "data_ai", "dev_mobile", "dba_data_eng"]
    },
    {
      id: "intro_si",
      codigo: "OBBGSIN.001",
      nome: "Introducao a Sistemas de Informacao",
      periodo: 1,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Historico e visao geral da computacao e dos sistemas de informacao. Componentes de hardware e software. Logica proposicional e algebra booleana basica. O papel estrategico dos sistemas de informacao nas organizacoes contemporaneas.",
      competencias: [
        "Compreensao da arquitetura de sistemas de informacao empresariais",
        "Identificacao dos componentes e fluxos de dados corporativos",
        "Aplicacao de logica formal e proposicional basica",
        "Alinhamento inicial entre objetivos de TI e objetivos de negocio"
      ],
      carreirasRelacionadas: ["analista_sistemas_negocios", "gestao_ti_pm", "infra_redes_cloud", "empreendedor_consultor"]
    },
    {
      id: "portugues_inst1",
      codigo: "OBBGSIN.007",
      nome: "Portugues Instrumental I",
      periodo: 1,
      cargaHoraria: 32,
      eixoId: "complementar",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Analise e producao de textos tecnicos e academicos. Leitura, interpretacao, coesao e coerencia textual. Elaboracao de resumos, resenhas e relatorios tecnicos voltados a comunicacao organizacional e cientifica na area de computacao.",
      competencias: [
        "Redacao tecnica e comunicacao formal estruturada",
        "Interpretacao e producao de documentacao de projetos",
        "Aplicacao de normas gramaticais e clareza discursiva em TI"
      ],
      carreirasRelacionadas: ["analista_sistemas_negocios", "gestao_ti_pm", "ux_ui_designer", "empreendedor_consultor"]
    },
    {
      id: "pre_calculo",
      codigo: "OBBGSIN.101",
      nome: "Pre-Calculo",
      periodo: 1,
      cargaHoraria: 64,
      eixoId: "matematica",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Conjuntos numericos. Estudo de funcoes de uma variavel real: lineares, quadraticas, polinomiais, exponenciais, logaritmicas e trigonometricas. Equacoes, inequacoes e analise grafica comportamental.",
      competencias: [
        "Dominio de funcoes algebricas e transcendentais",
        "Analise e interpretacao grafica de modelos quantitativos",
        "Fundamentacao para estudo de taxas de variacao e calculo diferencial"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software", "dba_data_eng"]
    },
    {
      id: "princ_adm1",
      codigo: "OBBGSIN.011",
      nome: "Principios da Administracao I",
      periodo: 1,
      cargaHoraria: 64,
      eixoId: "administrativa",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Evolucao do pensamento administrativo e teorias gerais da administracao. As funcoes administrativas essenciais: planejamento, organizacao, direcao e controle. Tomada de decisao e organizacao de processos produtivos e de servicos.",
      competencias: [
        "Compreensao das funcoes gerenciais corporativas (PODC)",
        "Analise de estruturas organizacionais e processos de trabalho",
        "Visao sistemica sobre dinamica empresarial e tomada de decisao"
      ],
      carreirasRelacionadas: ["gestao_ti_pm", "analista_sistemas_negocios", "empreendedor_consultor"]
    },

    /* 2o PERIODO */
    {
      id: "aed1",
      codigo: "OBBGSIN.009",
      nome: "Algoritmos e Estrutura de Dados I",
      periodo: 2,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Tipos abstratos de dados (TAD). Ponteiros e alocacao dinamica de memoria. Estruturas lineares: listas simplesmente e duplamente encadeadas, pilhas e filas. Algoritmos classicos de ordenacao interna e busca sequencial e binaria.",
      competencias: [
        "Manipulacao direta de ponteiros e alocacao de memoria dinamica",
        "Implementacao eficiente de listas, pilhas e filas",
        "Aplicacao e analise comparativa de algoritmos de ordenacao e busca",
        "Construcao de tipos abstratos de dados modulares"
      ],
      carreirasRelacionadas: ["dev_fullstack", "eng_software", "data_ai", "dba_data_eng", "dev_mobile"]
    },
    {
      id: "calculo1",
      codigo: "OBBGSIN.012",
      nome: "Calculo Diferencial e Integral I",
      periodo: 2,
      cargaHoraria: 64,
      eixoId: "matematica",
      tipo: "Obrigatoria",
      preRequisitos: ["pre_calculo"],
      ementaResumida: "Conceito de limite e continuidade de funcoes. Derivada: interpretacao geometrica e fisica, regras operacionais e taxas de variacao. Aplicacao de derivadas em otimizacao e construcao de curvas. Integral definida e indefinida, Teorema Fundamental do Calculo.",
      competencias: [
        "Calculo e interpretacao geometrica de limites e derivadas",
        "Modelagem e solucao de problemas de otimizacao matematica",
        "Aplicacao de integracao definida na quantificacao de grandezas continuas"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software"]
    },
    {
      id: "ingles_inst1",
      codigo: "OBBGSIN.003",
      nome: "Ingles Instrumental I",
      periodo: 2,
      cargaHoraria: 32,
      eixoId: "complementar",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Desenvolvimento de estrategias de leitura e compreensao de textos tecnicos em lingua inglesa na area de computacao e sistemas de informacao. Vocabulario tecnologico, manuais de software, documentacao de linguagens e APIs.",
      competencias: [
        "Leitura autonoma de especificacoes tecnicas e documentacoes em ingles",
        "Extracao rapida de informacoes essenciais de artigos e manuais de TI",
        "Compreensao de terminologia padrao da industria global de software"
      ],
      carreirasRelacionadas: ["dev_fullstack", "eng_software", "infra_redes_cloud", "data_ai"]
    },
    {
      id: "metodos_pesq",
      codigo: "OBBGSIN.002",
      nome: "Metodos e Tecnicas de Pesquisa",
      periodo: 2,
      cargaHoraria: 32,
      eixoId: "complementar",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "O conhecimento cientifico e seus metodos de investigacao. Normas da ABNT aplicadas a trabalhos academicos. Tipologias de pesquisa aplicadas a computacao. Elaboracao de projetos de pesquisa, revisoes de literatura e relatorios tecnicos.",
      competencias: [
        "Aplicacao de rigor metodologico em pesquisas tecnologicas",
        "Formatacao e estruturacao de trabalhos conforme normas ABNT",
        "Revisao bibliografica e sintese critica de publicacoes cientificas"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software", "gestao_ti_pm", "ux_ui_designer"]
    },
    {
      id: "poo1",
      codigo: "OBBGSIN.010",
      nome: "Programacao Orientada a Objetos I",
      periodo: 2,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Paradigma de orientacao a objetos. Classes, objetos, atributos, metodos e mensagens. Encapsulamento, controle de visibilidade e construtores. Relacionamentos entre classes: associacao, agregacao e composicao. Heranca e polimorfismo. Implementacao em Java.",
      competencias: [
        "Modelagem conceitual baseada em classes e objetos",
        "Aplicacao de principios de encapsulamento, heranca e polimorfismo",
        "Desenvolvimento orientado a objetos com a linguagem Java",
        "Criacao de sistemas desacoplados e de facil manutencao"
      ],
      carreirasRelacionadas: ["dev_fullstack", "eng_software", "dev_mobile", "dba_data_eng"]
    },
    {
      id: "sist_digitais",
      codigo: "OBBGSIN.013",
      nome: "Sistemas Digitais e Circuitos Combinacionais",
      periodo: 2,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Sistemas de numeracao binario, octal e hexadecimal e operacoes aritmeticas. Postulados e teoremas da algebra booleana. Simplificacao de expressoes com Mapas de Karnaugh. Portas logicas. Analise e sintese de circuitos logicos combinacionais.",
      competencias: [
        "Conversao de bases numericas e representacao binaria de dados",
        "Minimizacao de funcoes logicas e otimizacao booleana",
        "Projeto e simulacao de circuitos logicos fundamentais para computacao"
      ],
      carreirasRelacionadas: ["infra_redes_cloud", "eng_software"]
    },

    /* 3o PERIODO */
    {
      id: "aed2",
      codigo: "OBBGSIN.015",
      nome: "Algoritmos e Estrutura de Dados II",
      periodo: 3,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Estruturas nao lineares: arvores binarias, arvores de busca binaria e arvores balanceadas (AVL e Rubro-Negra). Filas de prioridades (Heaps). Tabelas de dispersao (Hash tables) e funcoes de hashing. Introducao a grafos e processamento de cadeias.",
      competencias: [
        "Implementacao de estruturas em arvore e algoritmos de balanceamento",
        "Utilizacao de tabelas hash para indexacao com busca O(1)",
        "Manipulacao e percursos em estruturas hierarquicas complexas",
        "Selecao precisa de estruturas de dados conforme requisitos de desempenho"
      ],
      carreirasRelacionadas: ["eng_software", "dev_fullstack", "data_ai", "dba_data_eng"]
    },
    {
      id: "arq_comp",
      codigo: "OBBGSIN.024",
      nome: "Arquitetura e Organizacao de Computadores",
      periodo: 3,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Arquitetura de Von Neumann e evolucao dos processadores. Organizacao da UCP: registradores, unidade de controle e unidade logica e aritmetica (ULA). Ciclo de busca e execucao de instrucoes. Hierarquia de memoria e memoria cache. Barramentos e E/S.",
      competencias: [
        "Compreensao da microarquitetura do processador e do ciclo de instrucoes",
        "Analise de impacto da hierarquia de memoria e caches no desempenho",
        "Entendimento do funcionamento de subsistemas de barramento e E/S"
      ],
      carreirasRelacionadas: ["infra_redes_cloud", "eng_software", "dba_data_eng"]
    },
    {
      id: "banco_dados1",
      codigo: "OBBGSIN.016",
      nome: "Banco de Dados I",
      periodo: 3,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Conceitos de Sistemas Gerenciadores de Bancos de Dados (SGBD). Modelagem conceitual com Diagrama Entidade-Relacionamento (DER). Mapeamento para o modelo relacional. Algebra relacional. Teoria da normalizacao (1FN, 2FN, 3FN). Linguagem SQL (DDL e DML).",
      competencias: [
        "Modelagem conceitual de dados organizacionais com modelo ER",
        "Normalizacao de dados para eliminacao de redundancias e anomalias",
        "Escrita de consultas e manipulacao de dados relacionais com SQL avancado",
        "Implementacao de esquemas de banco de dados em SGBDs relacionais"
      ],
      carreirasRelacionadas: ["dba_data_eng", "dev_fullstack", "data_ai", "analista_sistemas_negocios", "dev_mobile"]
    },
    {
      id: "contabilidade",
      codigo: "OBBGSIN.018",
      nome: "Contabilidade",
      periodo: 3,
      cargaHoraria: 64,
      eixoId: "administrativa",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Conceito, objeto e importancia da contabilidade para a gestao. Patrimonio empresarial: ativo, passivo e patrimonio liquido. Mecanismo das partidas dobradas. Demonstracoes contabeis essenciais: Balanco Patrimonial e DRE. Nocoes de custos e fluxo de caixa.",
      competencias: [
        "Interpretacao de demonstracoes financeiras e contabeis corporativas",
        "Compreensao de fluxos de custos para especificacao de sistemas ERP",
        "Analise economica e financeira basica para projetos organizacionais"
      ],
      carreirasRelacionadas: ["analista_sistemas_negocios", "gestao_ti_pm", "empreendedor_consultor"]
    },
    {
      id: "eng_soft1",
      codigo: "OBBGSIN.017",
      nome: "Engenharia de Software I",
      periodo: 3,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Introducao aos processos de software e modelos de ciclo de vida (tradicionais e ageis). Engenharia de requisitos: elicitacao, analise, especificacao e validacao. Modelagem orientada a objetos com a linguagem UML (casos de uso, classes, sequencia e atividades).",
      competencias: [
        "Elicitacao e documentacao de requisitos funcionais e nao-funcionais",
        "Modelagem de sistemas de software complexos utilizando notacao UML",
        "Aplicacao de boas praticas do ciclo de vida de desenvolvimento",
        "Comunicacao entre equipe tecnica e stakeholders de negocio"
      ],
      carreirasRelacionadas: ["eng_software", "analista_sistemas_negocios", "dev_fullstack", "gestao_ti_pm", "ux_ui_designer"]
    },

    /* 4o PERIODO */
    {
      id: "alga",
      codigo: "OBBGSIN.021",
      nome: "Algebra Linear e Geometria Analitica",
      periodo: 4,
      cargaHoraria: 64,
      eixoId: "matematica",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Vetores no plano e no espaco. Operacoes com matrizes e determinantes. Sistemas de equacoes lineares. Espacos e subespacos vetoriais, base e dimensao. Transformacoes lineares. Autovalores e autovetores com aplicacoes computacionais.",
      competencias: [
        "Manipulacao vetorial e matricial para processamento de dados multidimensionais",
        "Solucao algebrica de sistemas lineares de grande escala",
        "Aplicacao de autovalores/autovetores em analise de dados e computacao grafica"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software"]
    },
    {
      id: "mat_discreta",
      codigo: "OBBGSIN.020",
      nome: "Matematica Discreta",
      periodo: 4,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Teoria dos conjuntos e relacoes binarias (ordem, equivalencia). Funcoes injetoras, sobrejetoras e bijetoras. Principios de inducao matematica e relacoes de recorrencia. Nocoes de contagem e analise combinatoria. Introducao formal a teoria dos grafos.",
      competencias: [
        "Formulacao de provas formais e raciocinio matematico rigoroso",
        "Analise de relacoes e estruturas discretas aplicadas a computacao",
        "Modelagem de problemas estruturais atraves de teoria dos grafos"
      ],
      carreirasRelacionadas: ["eng_software", "data_ai"]
    },
    {
      id: "poo2",
      codigo: "OBBGSIN.022",
      nome: "Programacao Orientada a Objetos II",
      periodo: 4,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Aprofundamento no paradigma OO. Construcao de interfaces graficas (GUI) baseadas em eventos. Tratamento de excecoes. Programacao concorrente e threads. Padroes de projeto de software (Design Patterns). Persistencia e conexao com bancos de dados relacionais via JDBC.",
      competencias: [
        "Construcao de aplicacoes corporativas estruturadas em camadas",
        "Aplicacao dos padroes de projeto essenciais (GoF: Singleton, Factory, MVC, Observer)",
        "Desenvolvimento de rotinas multithreading e sincronizacao de execucao",
        "Integracao robusta entre camada de aplicacao e bancos de dados (JDBC)"
      ],
      carreirasRelacionadas: ["dev_fullstack", "eng_software", "dev_mobile", "dba_data_eng"]
    },
    {
      id: "prog_web",
      codigo: "OBBGSIN.023",
      nome: "Programacao WEB",
      periodo: 4,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Arquitetura da Web e protocolo HTTP/HTTPS. Desenvolvimento frontend com HTML5 semantico, CSS3 moderno e JavaScript puro no cliente. Desenvolvimento backend no servidor: processamento de requisicoes, controle de sessoes, cookies e persistencia de dados. Criacao e consumo de APIs REST.",
      competencias: [
        "Criacao de interfaces ricas, acessiveis e responsivas com HTML5, CSS3 e JS",
        "Desenvolvimento de servicos de backend e manipulacao segura de requisicoes HTTP",
        "Integracao completa de sistemas cliente-servidor e APIs RESTful",
        "Gerenciamento de autenticacao, sessoes de usuario e seguranca na web"
      ],
      carreirasRelacionadas: ["dev_fullstack", "ux_ui_designer", "dev_mobile", "eng_software"]
    },
    {
      id: "sist_operacionais",
      codigo: "OBBGSIN.030",
      nome: "Sistemas Operacionais",
      periodo: 4,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Estrutura e funcoes dos sistemas operacionais. Conceito de processo, thread e escalonamento da CPU. Concorrencia, sincronizacao entre processos e prevencao de deadlocks. Gerenciamento de memoria real e virtual (paginacao e segmentacao). Sistemas de arquivos e seguranca.",
      competencias: [
        "Compreensao do funcionamento do kernel e escalonamento de processos",
        "Resolucao de condicoes de corrida e impasses (deadlocks) via sincronizacao",
        "Administracao de memoria virtual e mecanismos de swapping/paginacao",
        "Gestao de sistemas de arquivos, permissoes e chamadas de sistema (syscalls)"
      ],
      carreirasRelacionadas: ["infra_redes_cloud", "eng_software", "dba_data_eng"]
    },

    /* 5o PERIODO */
    {
      id: "eng_soft2",
      codigo: "OBBGSIN.041",
      nome: "Engenharia de Software II",
      periodo: 5,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Arquiteturas de software modernas: monolitica, camadas, microsservicos e orientada a eventos. Principios SOLID e Clean Architecture. Testes automatizados: unitarios, integracao e aceitacao. Praticas de integracao continua (CI) e entrega continua (CD). Reuso e refatoracao.",
      competencias: [
        "Definicao e especificacao de arquiteturas de software escalaveis",
        "Criacao e automacao de suites de testes (TDD, testes unitarios e integrados)",
        "Aplicacao de principios SOLID e boas praticas de refatoracao de codigo",
        "Implementacao de esteiras de automacao DevOps e pipelines CI/CD"
      ],
      carreirasRelacionadas: ["eng_software", "dev_fullstack", "gestao_ti_pm", "dev_mobile"]
    },
    {
      id: "gov_ti",
      codigo: "OBBGSIN.019",
      nome: "Governanca e Gestao da Informacao",
      periodo: 5,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Papel estrategico da informacao nas organizacoes. Modelos e frameworks de governanca e gestao de servicos de TI (COBIT e ITIL). Planejamento Estrategico de TI (PETI). Gestao de niveis de servico (SLA). Gestao do conhecimento e inteligencia competitiva. Sustentabilidade e Green IT.",
      competencias: [
        "Alinhamento estrategico entre a tecnologia e os objetivos corporativos",
        "Aplicacao de frameworks de governanca (COBIT) e gestao de servicos (ITIL)",
        "Elaboracao de acordos de nivel de servico (SLA) e metricas de TI",
        "Gestao de ativos de informacao e politicas de sustentabilidade tecnologica"
      ],
      carreirasRelacionadas: ["gestao_ti_pm", "analista_sistemas_negocios", "empreendedor_consultor"]
    },
    {
      id: "prob_est",
      codigo: "OBBGSIN.031",
      nome: "Probabilidade e Estatistica",
      periodo: 5,
      cargaHoraria: 64,
      eixoId: "matematica",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Estatistica descritiva: distribuicoes de frequencia, medidas de posicao e de dispersao. Teoria da probabilidade, probabilidade condicional e Teorema de Bayes. Variaveis aleatorias discretas e continuas. Distribuicoes Binomial, Poisson e Normal. Intervalos de confianca e testes de hipoteses.",
      competencias: [
        "Analise exploratoria e sintese descritiva de conjuntos de dados",
        "Modelagem estocastica com distribuicoes de probabilidade",
        "Formulacao e interpretacao de testes de hipoteses para tomada de decisao",
        "Dominio da fundamentacao quantitativa para ciencia de dados e analytics"
      ],
      carreirasRelacionadas: ["data_ai", "dba_data_eng", "analista_sistemas_negocios"]
    },
    {
      id: "redes1",
      codigo: "OBBGSIN.029",
      nome: "Redes de Computadores I",
      periodo: 5,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Topologias e modelos de referencia em camadas: OSI e TCP/IP. Camada de enlace e protocolos locais (Ethernet). Camada de rede: protocolo IPv4/IPv6, enderecamento, mascaras e tecnicas de roteamento. Camada de transporte: protocolos TCP e UDP. Camada de aplicacao (DNS, HTTP, DHCP).",
      competencias: [
        "Analise da pilha de protocolos TCP/IP e do modelo em camadas OSI",
        "Calculo e planejamento de sub-redes IPv4 e enderecamento IPv6",
        "Configuracao e diagnostico de comunicacao e roteamento de dados",
        "Compreensao da mecanica de protocolos de transporte e de aplicacao"
      ],
      carreirasRelacionadas: ["infra_redes_cloud", "eng_software", "dev_fullstack"]
    },

    /* 6o PERIODO */
    {
      id: "prog_movel",
      codigo: "OBBGSIN.039",
      nome: "Programacao para Dispositivos Moveis",
      periodo: 6,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Arquitetura e caracteristicas de plataformas para dispositivos moveis (Android). Ciclo de vida de aplicacoes moveis. Desenvolvimento de interfaces graficas adaptadas ao toque. Armazenamento e persistencia local (SQLite/Room). Consumo de servicos web remotos e APIs RESTful.",
      competencias: [
        "Construcao de aplicativos para dispositivos moveis",
        "Gerenciamento do ciclo de vida de aplicacoes e otimizacao de bateria/memoria",
        "Persistencia local de dados estruturados em dispositivos moveis",
        "Integracao de apps com APIs de backend e servicos na nuvem"
      ],
      carreirasRelacionadas: ["dev_mobile", "dev_fullstack", "ux_ui_designer"]
    },
    {
      id: "paa",
      codigo: "OBBGSIN.038",
      nome: "Projeto e Analise de Algoritmos",
      periodo: 6,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Analise assintotica de complexidade de tempo e espaco (Notacoes O, Omega e Teta). Resolucao de equacoes de recorrencia e Teorema Mestre. Tecnicas de projeto de algoritmos: divisao e conquista, algoritmos gulosos, programacao dinamica e backtracking. Teoria da complexidade (Classes P e NP).",
      competencias: [
        "Avaliacao formal do desempenho e escalabilidade assintotica de algoritmos",
        "Projeto de algoritmos eficientes com programacao dinamica e divisao e conquista",
        "Reconhecimento de limites de computabilidade e problemas NP-completos",
        "Otimizacao profunda de rotinas computacionais criticas"
      ],
      carreirasRelacionadas: ["eng_software", "data_ai", "dev_fullstack"]
    },
    {
      id: "sad",
      codigo: "OBBGSIN.036",
      nome: "Sistemas de Apoio a Decisao",
      periodo: 6,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Modelos conceituais de tomada de decisao em organizacoes. Arquitetura de Sistemas de Apoio a Decisao (SAD) e Business Intelligence (BI). Modelagem multidimensional: tabelas de fatos e dimensoes (esquemas Estrela e Floco de Neve). Processos de ETL e consultas analiticas OLAP.",
      competencias: [
        "Modelagem de data warehouses multidimensionais para suporte analitico",
        "Desenvolvimento de fluxos de extracao, transformacao e carga (ETL)",
        "Construcao de cubos OLAP e paineis gerenciais estrategicos (Dashboards)",
        "Suporte a lideranca organizacional por meio de analise de dados corporativos"
      ],
      carreirasRelacionadas: ["analista_sistemas_negocios", "data_ai", "dba_data_eng", "gestao_ti_pm", "empreendedor_consultor"]
    },
    {
      id: "sist_distribuidos",
      codigo: "OBBGSIN.037",
      nome: "Sistemas Distribuidos",
      periodo: 6,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Caracterizacao e modelos de sistemas distribuidos. Comunicacao entre processos por sockets de rede, RPC (Remote Procedure Call) e RMI. Sincronizacao de processos, relogios logicos e algoritmos de eleicao. Replicacao, consistencia de dados, tolerancia a falhas e escalabilidade.",
      competencias: [
        "Projeto de sistemas distribuidos com alta disponibilidade e tolerancia a falhas",
        "Implementacao de comunicacao por sockets e chamadas remotas de procedimentos",
        "Gerenciamento de consistencia de dados em ambientes replicados",
        "Analise de desafios de sincronizacao e particionamento em rede (Teorema CAP)"
      ],
      carreirasRelacionadas: ["eng_software", "infra_redes_cloud", "dev_fullstack", "dba_data_eng"]
    },

    /* 7o PERIODO */
    {
      id: "gestao_projetos",
      codigo: "OBBGSIN.040",
      nome: "Gestao de Projetos",
      periodo: 7,
      cargaHoraria: 32,
      eixoId: "administrativa",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Conceito de projeto, programa e portfolio. Areas de conhecimento em gerenciamento de projetos conforme boas praticas do PMI/PMBOK: escopo, tempo, custo, qualidade, riscos, comunicacao e partes interessadas. Metodologias ageis (Scrum e Kanban) e abordagens hibridas de gestao.",
      competencias: [
        "Elaboracao e controle de planos de projeto (escopo, cronograma, custos)",
        "Gestao de riscos, comunicacao com stakeholders e resolucao de conflitos",
        "Aplicacao pratica de cerimonias e artefatos ageis (Scrum Master / Product Owner)"
      ],
      carreirasRelacionadas: ["gestao_ti_pm", "eng_software", "analista_sistemas_negocios", "empreendedor_consultor"]
    },
    {
      id: "ia",
      codigo: "OBBGSIN.034",
      nome: "Inteligencia Artificial",
      periodo: 7,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Fundamentos historicos e teoricos da Inteligencia Artificial. Agentes inteligentes. Algoritmos de busca em espacos de estados: busca cega e busca heuristica (A*). Representacao do conhecimento e raciocinio. Introducao ao aprendizado de maquina (Machine Learning) e redes neurais artificiais.",
      competencias: [
        "Implementacao de algoritmos de busca heuristica e otimizacao",
        "Construcao e avaliacao de modelos de aprendizado supervisionado e nao supervisionado",
        "Compreensao do funcionamento e treinamento de redes neurais artificiais",
        "Formulacao de solucoes inteligentes para problemas computacionais complexos"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software", "dev_fullstack"]
    },
    {
      id: "ihc",
      codigo: "OBBGSIN.026",
      nome: "Interface Humano Computador",
      periodo: 7,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Fundamentos teoricos da interacao humano-computador. Fatores humanos cognitivos e ergonomicos. Design Centrado no Usuario (UCD). Diretrizes e heuristicas de usabilidade (Nielsen). Padroes internacionais de acessibilidade web (WCAG). Tecnicas de prototipagem e metodos de avaliacao de IHC.",
      competencias: [
        "Concepcao e conducao de processos de Design Centrado no Usuario",
        "Construcao de wireframes, fluxos de navegacao e prototipos de alta fidelidade",
        "Avaliacao de usabilidade, heuristica e realizacao de testes com usuarios reais",
        "Aplicacao rigorosa de padroes de acessibilidade digital e design inclusivo"
      ],
      carreirasRelacionadas: ["ux_ui_designer", "dev_fullstack", "dev_mobile", "analista_sistemas_negocios"]
    },
    {
      id: "tcc1",
      codigo: "OBBGSIN.091",
      nome: "Trabalho de Conclusao de Curso I",
      periodo: 7,
      cargaHoraria: 64,
      eixoId: "profissional_social",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Planejamento e formulacao da proposta do Trabalho de Conclusao de Curso na area de Sistemas de Informacao. Identificacao do tema, delimitacao do problema, justificativa e objetivos. Revisao sistematica da literatura. Definicao do referencial teorico e da metodologia cientifico-tecnologica.",
      competencias: [
        "Concepcao e delimitacao rigorosa de um projeto de pesquisa ou desenvolvimento",
        "Levantamento de fundamentacao teorica em bases cientificas qualificadas",
        "Elaboracao formal do projeto metodologico conforme padroes academicos"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software", "gestao_ti_pm", "empreendedor_consultor", "analista_sistemas_negocios"]
    },

    /* 8o PERIODO */
    {
      id: "empreendedorismo",
      codigo: "OBBGSIN.102",
      nome: "Empreendedorismo",
      periodo: 8,
      cargaHoraria: 64,
      eixoId: "administrativa",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "O espirito empreendedor e o papel da inovacao tecnologica. Metodologias para criacao e validacao de startups: Lean Startup, Customer Discovery e Design Thinking. Modelagem com Business Model Canvas. Elaboracao de plano de negocios: viabilidade economica, financeira e de mercado.",
      competencias: [
        "Criacao e validacao de modelos de negocios inovadores de base tecnologica",
        "Utilizacao de metodologias ageis de validacao de mercado (Lean Startup/Canvas)",
        "Elaboracao de analise de viabilidade economico-financeira para novos produtos",
        "Apresentacao de ideias e projetos de tecnologia para captacao de investimento"
      ],
      carreirasRelacionadas: ["empreendedor_consultor", "gestao_ti_pm", "analista_sistemas_negocios"]
    },
    {
      id: "qualidade_software",
      codigo: "OBBGSIN.103",
      nome: "Qualidade de Software",
      periodo: 8,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Obrigatoria",
      preRequisitos: [],
      ementaResumida: "Conceitos de qualidade de produto e processo de software. Normas de qualidade (familia ISO/IEC 25000 / SQuaRE). Modelos de maturidade de processo de desenvolvimento (CMMI e MPS.BR). Metricas de codigo e de processo. Planejamento, estrategias e tipos de testes de software. Garantia da qualidade (SQA).",
      competencias: [
        "Avaliacao de conformidade de produtos de software com a norma ISO/IEC 25010",
        "Compreensao e aplicacao de modelos de melhoria de processos (CMMI/MPS.BR)",
        "Elaboracao de planos de garantia de qualidade e estrategias abrangentes de teste",
        "Calculo e analise de metricas de complexidade, cobertura e confiabilidade de codigo"
      ],
      carreirasRelacionadas: ["eng_software", "gestao_ti_pm", "dev_fullstack", "ux_ui_designer"]
    },
    {
      id: "tcc2",
      codigo: "OBBGSIN.092",
      nome: "Trabalho de Conclusao de Curso II",
      periodo: 8,
      cargaHoraria: 64,
      eixoId: "profissional_social",
      tipo: "Obrigatoria",
      preRequisitos: ["tcc1"],
      ementaResumida: "Execucao, desenvolvimento e implementacao da solucao ou pesquisa proposta no TCC I. Coleta e discussao de dados experimentais ou avaliacao do software implementado. Redacao da monografia final segundo normas tecnicas e de publicacao. Apresentacao e defesa publica perante banca examinadora.",
      competencias: [
        "Execucao e entrega final de projeto computacional integrador",
        "Validacao experimental e analise critica de resultados obtidos",
        "Comunicacao oral e escrita de alto nivel em defesa publica de trabalho cientifico"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software", "gestao_ti_pm", "empreendedor_consultor", "analista_sistemas_negocios"]
    },

    /* DISCIPLINAS OPTATIVAS DO CURRICULO */
    {
      id: "bd2",
      codigo: "OBBGSIN.033",
      nome: "Banco de Dados II",
      periodo: 5,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Optativa",
      preRequisitos: ["banco_dados1"],
      ementaResumida: "Processamento e otimizacao de consultas SQL (Query Tuning). Controle de concorrencia e mecanismos de recuperacao de falhas em SGBDs. Bancos de dados NoSQL (chave-valor, documentos, grafos e colunares). Bancos de dados distribuidos, particionamento e replicacao de dados.",
      competencias: [
        "Otimizacao e sintonia de planos de execucao de consultas relacionais",
        "Modelagem e administracao de bancos de dados NoSQL e grafos",
        "Implementacao de estrategias de escalabilidade e replicacao de bases de dados"
      ],
      carreirasRelacionadas: ["dba_data_eng", "dev_fullstack", "data_ai"]
    },
    {
      id: "mineracao_dados",
      codigo: "OBBGSIN.068",
      nome: "Mineracao de Dados",
      periodo: 6,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Optativa",
      preRequisitos: ["banco_dados1"],
      ementaResumida: "Processo de descoberta de conhecimento em bases de dados (KDD). Limpeza, integracao e transformacao de dados. Algoritmos de regras de associacao (Apriori). Algoritmos de classificacao e agrupamento (clustering). Mineracao de texto e avaliacao de modelos descritivos.",
      competencias: [
        "Conducao completa de pipelines de extracao de padroes em grandes volumes de dados",
        "Aplicacao de algoritmos de associacao, classificacao e agrupamento",
        "Extracao de conhecimento util para suporte a decisoes de negocio"
      ],
      carreirasRelacionadas: ["data_ai", "dba_data_eng", "analista_sistemas_negocios"]
    },
    {
      id: "redes2",
      codigo: "OBBGSIN.032",
      nome: "Redes de Computadores II",
      periodo: 6,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Optativa",
      preRequisitos: ["redes1"],
      ementaResumida: "Redes sem fio e padroes IEEE 802.11. Protocolos de roteamento dinamico avancado (OSPF, BGP). Qualidade de servico em redes (QoS). Seguranca em redes de computadores: firewalls, VPNs, protocolos seguros (TLS/IPSec) e sistemas de deteccao de intrusao (IDS/IPS).",
      competencias: [
        "Configuracao e manutencao de protocolos de roteamento dinamico em redes corporativas",
        "Implementacao de politicas de seguranca de perimetro e tuneis virtuais protegidos",
        "Diagnostico e controle de qualidade de servico para comunicacoes em tempo real"
      ],
      carreirasRelacionadas: ["infra_redes_cloud", "eng_software"]
    },
    {
      id: "ger_proj_soft",
      codigo: "OBBGSIN.049",
      nome: "Gerencia de Projetos de Software",
      periodo: 7,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Optativa",
      preRequisitos: ["gestao_projetos"],
      ementaResumida: "Tecnicas especificas de gestao para projetos de software. Metricas de software e modelos de estimativa de tamanho, custo e prazo (Analise de Pontos de Funcao, COCOMO). Planejamento de releases em metodologias ageis. Gerenciamento de divida tecnica e de configuracao.",
      competencias: [
        "Estimativa de prazos e orcamentos de software utilizando metricas padronizadas",
        "Coordenacao de releases e sprints em times multidisciplinares de desenvolvimento",
        "Monitoramento de qualidade de entrega e controle de divida tecnica de software"
      ],
      carreirasRelacionadas: ["gestao_ti_pm", "eng_software", "analista_sistemas_negocios"]
    },
    {
      id: "comp_grafica",
      codigo: "OBBGSIN.070",
      nome: "Computacao Grafica",
      periodo: 5,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Optativa",
      preRequisitos: [],
      ementaResumida: "Conceitos fundamentais de sintese e renderizacao de imagens. Modelos de cores. Algoritmos classicos de rasterizacao de retas e poligonos. Transformacoes geometricas 2D e 3D. Projecoes, iluminacao, sombreamento e utilizacao de bibliotecas graficas.",
      competencias: [
        "Implementacao de rotinas graficas vetoriais e matriciais",
        "Aplicacao de transformacoes geometricas e modelos de iluminacao",
        "Desenvolvimento com bibliotecas e frameworks graficos modernos"
      ],
      carreirasRelacionadas: ["ux_ui_designer", "dev_fullstack", "data_ai"]
    },
    {
      id: "proc_imagens",
      codigo: "OBBGSIN.095",
      nome: "Processamento de Imagens",
      periodo: 7,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Optativa",
      preRequisitos: [],
      ementaResumida: "Representacao digital de imagens e transformacoes de intensidade. Filtragem espacial e convolucao. Processamento no dominio da frequencia. Segmentacao de imagens, deteccao de bordas e tecnicas de morfologia matematica. Introducao a visao computacional.",
      competencias: [
        "Aplicacao de filtros espaciais e transformadas para realce de imagens",
        "Segmentacao de regioes de interesse e extracao de atributos visuais",
        "Construcao de etapas iniciais de reconhecimento em visao computacional"
      ],
      carreirasRelacionadas: ["data_ai", "eng_software"]
    },
    {
      id: "jogos_digitais",
      codigo: "OBBGSIN.097",
      nome: "Topicos em Jogos Digitais",
      periodo: 8,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Optativa",
      preRequisitos: [],
      ementaResumida: "Historia e design de jogos eletronicos. Arquitetura de motores de jogos (Game Engines). Game loop, colisao e simulacao fisica em tempo real. Inteligencia artificial para comportamento de entidades em jogos. Design de interfaces e audio interativo.",
      competencias: [
        "Desenvolvimento de mecanicas de jogo com Game Engines contemporaneas",
        "Programacao de rotinas de fisica, colisao e interacao em tempo real",
        "Integracao de design visual, animacao e jogabilidade fluida"
      ],
      carreirasRelacionadas: ["dev_fullstack", "ux_ui_designer"]
    },
    {
      id: "robotica",
      codigo: "OBBGSIN.099",
      nome: "Topicos Especiais em Robotica",
      periodo: 7,
      cargaHoraria: 64,
      eixoId: "computacional",
      tipo: "Optativa",
      preRequisitos: [],
      ementaResumida: "Fundamentos de robotica movel e manipuladores. Sensores, atuadores e integracao com microcontroladores (Arduino e ESP32). Cinematica direta e inversa basica. Algoritmos de navegacao, mapeamento e desvio de obstaculos.",
      competencias: [
        "Integracao de hardware e software para controle de sistemas mecatronicos",
        "Leitura e tratamento de sinais de sensores analogicos e digitais em tempo real",
        "Implementacao de logica de locomocao e desvio autonomo de obstaculos"
      ],
      carreirasRelacionadas: ["infra_redes_cloud", "data_ai"]
    },
    {
      id: "seguranca_redes",
      codigo: "OBBGSIN.066",
      nome: "Seguranca e Criptografia",
      periodo: 8,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Optativa",
      preRequisitos: ["redes1"],
      ementaResumida: "Fundamentos de seguranca da informacao: confidencialidade, integridade e disponibilidade. Algoritmos de criptografia simetrica e assimetrica. Funcoes de hash e assinaturas digitais. Infraestrutura de Chaves Publicas (PKI). Gestao de vulnerabilidades e defesa contra ataques ciberneticos.",
      competencias: [
        "Aplicacao correta de primitivas criptograficas e certificados digitais",
        "Analise de vulnerabilidades de seguranca em software e infraestrutura de rede",
        "Desenvolvimento de sistemas seguros aderentes a normas de protecao cibernetica"
      ],
      carreirasRelacionadas: ["infra_redes_cloud", "eng_software", "dba_data_eng"]
    },
    {
      id: "gestao_inovacao",
      codigo: "OBBGSIN.054",
      nome: "Gestao da Inovacao",
      periodo: 8,
      cargaHoraria: 64,
      eixoId: "administrativa",
      tipo: "Optativa",
      preRequisitos: [],
      ementaResumida: "Conceitos de inovacao tecnologica, tipos e graus de novidade. Modelos de gestao do processo de inovacao. Propriedade intelectual, patentes e protecao de ativos intangiveis. Inovacao aberta e ecossistemas regionais de inovacao. Fontes de fomento a pesquisa e desenvolvimento.",
      competencias: [
        "Gestao de iniciativas de inovacao corporativa e transformacao digital",
        "Compreensao dos processos de protecao patentaria e propriedade intelectual",
        "Articulacao em ecossistemas de inovacao para alavancagem de produtos tecnologicos"
      ],
      carreirasRelacionadas: ["empreendedor_consultor", "gestao_ti_pm"]
    },
    {
      id: "consultoria_emp",
      codigo: "OBBGSIN.081",
      nome: "Consultoria Empresarial",
      periodo: 6,
      cargaHoraria: 64,
      eixoId: "administrativa",
      tipo: "Optativa",
      preRequisitos: [],
      ementaResumida: "O papel do consultor de sistemas e organizacoes. Etapas do processo de consultoria: diagnostico situacional, formulacao de propostas de intervencao, plano de acao e avaliacao de resultados. Gestao da mudanca organizacional durante a implantacao de sistemas corporativos.",
      competencias: [
        "Conducao de diagnosticos organizacionais com foco em melhoria de processos",
        "Elaboracao de propostas tecnicas de consultoria em tecnologia da informacao",
        "Conducao da gestao da mudanca e capacitacao de equipes organizacionais"
      ],
      carreirasRelacionadas: ["empreendedor_consultor", "analista_sistemas_negocios"]
    },
    {
      id: "topicos_avanc_bd",
      codigo: "OBBGSIN.063",
      nome: "Topicos Avancados em Banco de Dados",
      periodo: 8,
      cargaHoraria: 64,
      eixoId: "ti",
      tipo: "Optativa",
      preRequisitos: ["banco_dados1"],
      ementaResumida: "Arquiteturas para processamento de Big Data. Armazenamento distribuido em larga escala. Frameworks para computacao distribuida (MapReduce e ecossistema Spark). Data Lakes e pipelines de ingestao de dados em tempo real (Streaming). Governanca corporativa de dados.",
      competencias: [
        "Construcao de infraestrutura para armazenamento e processamento de Big Data",
        "Desenvolvimento de pipelines distribuidos de processamento com Apache Spark",
        "Implementacao de arquiteturas modernas para Data Lakes e fluxos analiticos"
      ],
      carreirasRelacionadas: ["dba_data_eng", "data_ai"]
    }
  ],

  carreiras: [
    {
      id: "dev_fullstack",
      titulo: "Desenvolvedor Full-Stack",
      categoria: "Desenvolvimento de Software",
      descricaoCurta: "Projeta e desenvolve sistemas completos de software, dominando desde a interface grafica do usuario ate as regras de negocio do servidor e o armazenamento seguro de dados.",
      descricaoDetalhada: "O Desenvolvedor Full-Stack formado no BSI IFMG atua de forma abrangente em todas as camadas de uma aplicacao moderna. Possui solida formacao em algoritmos, modelagem orientada a objetos, arquitetura cliente-servidor na web e persistencia relacional e nao-relacional. Ele e capaz de construir solucoes web de alto desempenho, integrando interfaces interativas a microservicos robustos e seguros.",
      eixosChave: ["ti", "computacional"],
      disciplinasChaveIds: [
        "intro_prog",
        "aed1",
        "poo1",
        "aed2",
        "banco_dados1",
        "eng_soft1",
        "poo2",
        "prog_web",
        "eng_soft2",
        "prog_movel",
        "ihc",
        "qualidade_software"
      ],
      tecnologias: ["HTML5 / CSS3", "JavaScript / TypeScript", "Java", "SQL / NoSQL", "APIs RESTful", "Git / GitHub", "Docker"],
      nivelAlinhamento: "Muito Alto",
      areasAtuacao: [
        "Desenvolvimento de sistemas corporativos em nuvem",
        "Construcao de plataformas e portais web complexos",
        "Criacao de microservicos e integracao de sistemas legados",
        "Desenvolvimento de software em startups e empresas de tecnologia"
      ]
    },
    {
      id: "eng_software",
      titulo: "Engenheiro de Software / Arquiteto",
      categoria: "Engenharia de Software",
      descricaoCurta: "Planeja, especifica e supervisiona a arquitetura tecnica, a garantia da qualidade e os processos de desenvolvimento de sistemas computacionais de grande porte.",
      descricaoDetalhada: "Este profissional utiliza principios cientificos e metodologicos para assegurar que sistemas de software sejam construidos de forma confiavel, escalavel, economica e aderente aos requisitos dos usuarios. Atua na definicao de padroes arquiteturais, lideranca tecnica, automacao de testes de software e implantacao de praticas DevOps e integracao continua.",
      eixosChave: ["ti", "computacional"],
      disciplinasChaveIds: [
        "intro_prog",
        "poo1",
        "eng_soft1",
        "poo2",
        "sist_operacionais",
        "eng_soft2",
        "paa",
        "sist_distribuidos",
        "qualidade_software",
        "gestao_projetos"
      ],
      tecnologias: ["Arquitetura de Microsservicos", "Padroes GoF / Clean Arch", "CI/CD Pipelines", "JUnit / Test Automation", "Docker / Kubernetes", "UML"],
      nivelAlinhamento: "Muito Alto",
      areasAtuacao: [
        "Definicao de arquiteturas corporativas de software",
        "Lideranca tecnica de equipes de desenvolvimento (Tech Lead)",
        "Garantia de qualidade e auditoria de codigo corporativo",
        "Engenharia de confiabilidade e desempenho de aplicacoes"
      ]
    },
    {
      id: "data_ai",
      titulo: "Cientista de Dados / Especialista em IA",
      categoria: "Dados e Inteligencia Artificial",
      descricaoCurta: "Extrai valor estrategico de grandes massas de dados e projeta modelos computacionais inteligentes capazes de prever tendencias e automatizar decisoes.",
      descricaoDetalhada: "Unindo a formacao matematica rigorosa (calculo, algebra linear, probabilidade e estatistica) ao poder computacional de algoritmos avancados, o Cientista de Dados formado no IFMG Ouro Branco domina tecnicas de aprendizado de maquina (Machine Learning), mineracao de dados e inteligencia artificial para construir modelos preditivos e sistemas analiticos de decisao.",
      eixosChave: ["matematica", "ti", "computacional"],
      disciplinasChaveIds: [
        "pre_calculo",
        "intro_prog",
        "calculo1",
        "aed1",
        "alga",
        "banco_dados1",
        "prob_est",
        "paa",
        "sad",
        "ia",
        "mineracao_dados"
      ],
      tecnologias: ["Python (NumPy, Pandas, Scikit-Learn)", "SQL Analitico", "Modelos de Machine Learning", "Redes Neurais Artificiais", "Data Visualization", "Jupyter Notebooks"],
      nivelAlinhamento: "Alto",
      areasAtuacao: [
        "Modelagem preditiva e aprendizagem de maquina para organizacoes",
        "Analise avancada de dados corporativos e ciencia de dados",
        "Pesquisa aplicada e desenvolvimento de agentes inteligentes",
        "Analise de sentimento e mineracao de padroes em Big Data"
      ]
    },
    {
      id: "dba_data_eng",
      titulo: "Administrador de Banco de Dados / Engenheiro de Dados",
      categoria: "Banco de Dados e Infraestrutura de Dados",
      descricaoCurta: "Projeta, otimiza e gerencia a integridade, seguranca, desempenho e alta disponibilidade das bases de dados e pipelines analiticos de informacao.",
      descricaoDetalhada: "Responsavel pelo coracao dos sistemas organizacionais: o armazenamento e o fluxo eficiente das informacoes. O DBA e Engenheiro de Dados garante modelagem conceitual solida, execucao performatica de consultas complexas, politicas de backup e contingencia, alem de estruturar pipelines de Big Data e Data Lakes para ambientes corporativos criticos.",
      eixosChave: ["ti", "computacional"],
      disciplinasChaveIds: [
        "aed1",
        "banco_dados1",
        "poo2",
        "sist_operacionais",
        "prob_est",
        "sad",
        "sist_distribuidos",
        "bd2",
        "topicos_avanc_bd"
      ],
      tecnologias: ["PostgreSQL / Oracle / MySQL", "SQL Avancado / PL-SQL", "Bancos NoSQL (MongoDB, Redis)", "Apache Spark / Kafka", "Modelagem Dimensional", "Query Tuning"],
      nivelAlinhamento: "Muito Alto",
      areasAtuacao: [
        "Administracao de SGBDs relacionais corporativos de alta demanda",
        "Construcao e sustentacao de pipelines de Engenharia de Dados",
        "Garantia de conformidade, seguranca e alta disponibilidade de dados",
        "Sintonia e otimizacao de desempenho de consultas e armazenamento"
      ]
    },
    {
      id: "infra_redes_cloud",
      titulo: "Administrador de Redes / Especialista em Nuvem",
      categoria: "Infraestrutura e Redes",
      descricaoCurta: "Planeja, implanta e gerencia redes corporativas, ambientes de computacao em nuvem, sistemas operacionais de servidores e seguranca da informacao.",
      descricaoDetalhada: "O curso de BSI do IFMG Ouro Branco oferece solida base em circuitos digitais, sistemas operacionais, arquitetura de computadores e protocolos de rede. Esse profissional projeta arquiteturas de conectividade seguras, gerencia servidores Linux/Windows, implementa virtualizacao e viabiliza a migracao e manutencao de servicos em provedores de nuvem.",
      eixosChave: ["ti", "computacional"],
      disciplinasChaveIds: [
        "intro_si",
        "sist_digitais",
        "arq_comp",
        "sist_operacionais",
        "redes1",
        "sist_distribuidos",
        "redes2",
        "seguranca_redes"
      ],
      tecnologias: ["Pilha TCP/IP", "Linux Server / Bash Scripting", "Roteamento e Sub-redes (OSPF/BGP)", "Cloud Computing (AWS / Azure)", "Firewalls / VPNs / Zero Trust", "Virtualizacao / Docker"],
      nivelAlinhamento: "Alto",
      areasAtuacao: [
        "Administracao de servidores corporativos e centros de processamento",
        "Projeto e seguranca de infraestrutura de redes locais e de longa distancia",
        "Operacao de ambientes de computacao em nuvem e servicos distribuidos",
        "Implementacao de defesas perimetrais e politicas de seguranca cibernetica"
      ]
    },
    {
      id: "analista_sistemas_negocios",
      titulo: "Analista de Sistemas e Negocios",
      categoria: "Analise, Processos e Negocios",
      descricaoCurta: "Atua como interlocutor estrategico entre as demandas de negocio das organizacoes e as equipes tecnicas, transformando necessidades em requisitos de software.",
      descricaoDetalhada: "Com formacao hibrida e interdisciplinar que equilibra computacao, tecnologia da informacao e ciencia da administracao, o Analista de Sistemas e Negocios diagnostica gargalos em processos organizacionais, modela fluxos com notacao BPMN, especifica requisitos funcionais e avalia o impacto de sistemas integrados de gestao (ERP) e apoio a decisao.",
      eixosChave: ["administrativa", "ti"],
      disciplinasChaveIds: [
        "intro_si",
        "princ_adm1",
        "contabilidade",
        "banco_dados1",
        "eng_soft1",
        "gov_ti",
        "sad",
        "gestao_projetos",
        "ihc"
      ],
      tecnologias: ["Modelagem de Processos BPMN", "UML / Casos de Uso / User Stories", "Sistemas ERP / CRM", "Ferramentas BI (Power BI / Tableau)", "Documentacao de Requisitos"],
      nivelAlinhamento: "Muito Alto",
      areasAtuacao: [
        "Elicitacao e gerenciamento de requisitos em projetos de tecnologia",
        "Mapeamento e redesenho de processos operacionais e de negocio",
        "Implantacao e customizacao de sistemas de gestao empresarial (ERP)",
        "Consultoria e assessoria tecnica em alinhamento estrategico de TI"
      ]
    },
    {
      id: "gestao_ti_pm",
      titulo: "Gerente de Projetos de TI / Product Owner",
      categoria: "Gestao Estrategica de TI",
      descricaoCurta: "Lidera equipes multidisciplinares de tecnologia, planeja cronogramas, monitora orcamentos, gerencia riscos e assegura o valor estrategico das entregas.",
      descricaoDetalhada: "O perfil de gestao no BSI IFMG prepara o profissional para atuar tanto no gerenciamento tradicional de projetos (fundamentado no PMBOK do PMI) quanto em frameworks ageis modernos (Scrum, Kanban). Esse lider articula prazos, custos, comunicacao com a alta gestao e gerencia o portfolio de produtos digitais com foco em inovacao continua.",
      eixosChave: ["administrativa", "ti"],
      disciplinasChaveIds: [
        "etica_leg",
        "princ_adm1",
        "eng_soft1",
        "gov_ti",
        "gestao_projetos",
        "ger_proj_soft",
        "qualidade_software",
        "empreendedorismo"
      ],
      tecnologias: ["Metodologias Ageis (Scrum / Kanban / XP)", "Guia PMBOK / PMI", "Ferramentas de Gestao (Jira / Trello)", "Governanca COBIT e ITIL", "Mapeamento de Valor do Produto"],
      nivelAlinhamento: "Muito Alto",
      areasAtuacao: [
        "Gerenciamento de projetos de transformacao digital corporativa",
        "Atuacao como Scrum Master ou Agile Coach em empresas de software",
        "Gestao de produtos de tecnologia como Product Owner (PO)",
        "Lideranca de operacoes de servicos de tecnologia da informacao"
      ]
    },
    {
      id: "ux_ui_designer",
      titulo: "Especialista em UX/UI e Design de Interacao",
      categoria: "Design e Experiencia do Usuario",
      descricaoCurta: "Projeta interfaces graficas intuitivas, centradas no ser humano, garantindo acessibilidade, facilidade de aprendizagem e satisfacao do usuario final.",
      descricaoDetalhada: "Este especialista combina conhecimentos profundos de Interface Humano-Computador (IHC), psicologia cognitiva, prototipagem rapida e tecnologias de desenvolvimento frontend. Ele investiga como os usuarios pensam e interagem com ferramentas digitais, aplicando testes de usabilidade, heuristicas e padroes de acessibilidade universal (WCAG) para criar experiencias memoraveis.",
      eixosChave: ["ti", "computacional"],
      disciplinasChaveIds: [
        "eng_soft1",
        "prog_web",
        "prog_movel",
        "ihc",
        "qualidade_software",
        "comp_grafica"
      ],
      tecnologias: ["Design Centrado no Usuario (UCD)", "Prototipagem em Figma / Wireframes", "Testes de Usabilidade e Heuristicas", "Diretrizes de Acessibilidade (WCAG 2.1)", "HTML5 Semantico e CSS Responsivo"],
      nivelAlinhamento: "Alto",
      areasAtuacao: [
        "Pesquisa com usuarios e formulacao de personas (UX Research)",
        "Design visual de interfaces para web, desktop e aplicativos moveis (UI)",
        "Avaliacao e auditoria de acessibilidade digital para orgaos publicos e privados",
        "Prototipagem interativa e testes continuos de usabilidade de software"
      ]
    },
    {
      id: "dev_mobile",
      titulo: "Desenvolvedor de Aplicativos Moveis",
      categoria: "Desenvolvimento de Software",
      descricaoCurta: "Cria aplicativos nativos e hibridos para smartphones e tablets, focando em performance, eficiencia de bateria, armazenamento local e experiencia fluida.",
      descricaoDetalhada: "O mercado mobile demanda profissionais capacitados em arquiteturas para dispositivos com restricoes de energia e dados. Formado com disciplinas de programacao orientada a objetos, banco de dados, programacao web e a disciplina dedicada de Programacao para Dispositivos Moveis, o desenvolvedor mobile cria apps modernos integrados a servicos em nuvem.",
      eixosChave: ["ti", "computacional"],
      disciplinasChaveIds: [
        "intro_prog",
        "poo1",
        "banco_dados1",
        "poo2",
        "prog_web",
        "prog_movel",
        "ihc",
        "eng_soft2"
      ],
      tecnologias: ["Android SDK / Kotlin / Java", "Persistencia Local (SQLite / Room)", "Consumo de APIs REST / JSON", "Notificacoes Push e Servicos em Background", "Git"],
      nivelAlinhamento: "Alto",
      areasAtuacao: [
        "Criacao de aplicacoes moveis para servicos bancarios, comerciais e governamentais",
        "Desenvolvimento de aplicativos de consumo massivo em startups",
        "Integracao de apps de campo com sistemas de gestao centralizados",
        "Manutencao e publicacao em lojas virtuais de aplicativos"
      ]
    },
    {
      id: "empreendedor_consultor",
      titulo: "Empreendedor de Tecnologia / Consultor de TI",
      categoria: "Empreendedorismo e Inovacao",
      descricaoCurta: "Identifica oportunidades de mercado nao atendidas, funda novas startups de base tecnologica ou atua prestando consultoria em transformacao digital.",
      descricaoDetalhada: "O egresso do BSI do IFMG Campus Ouro Branco possui veia empreendedora estimulada ao longo de todo o curso. Capaz de dialogar fluentemente tanto com engenheiros de software quanto com executivos de negocio, esse profissional domina tecnicas de validacao de ideias (Lean Startup), elaboracao de modelos de negocio Canvas, analise financeira e gestao de inovacao.",
      eixosChave: ["administrativa", "ti", "profissional_social"],
      disciplinasChaveIds: [
        "etica_leg",
        "intro_si",
        "princ_adm1",
        "contabilidade",
        "gov_ti",
        "sad",
        "gestao_projetos",
        "empreendedorismo",
        "gestao_inovacao",
        "consultoria_emp"
      ],
      tecnologias: ["Metodologia Lean Startup", "Business Model Canvas", "Analise de Viabilidade Economica", "Governanca Corporativa", "Design Thinking", "Pitch e Captacao"],
      nivelAlinhamento: "Muito Alto",
      areasAtuacao: [
        "Criacao e lideranca de startups e empreendimentos tecnologicos",
        "Consultoria estrategica para transformacao digital em empresas tradicionais",
        "Gestao de produtos inovadores em incubadoras e aceleradoras de negocios",
        "Assessoria especializada para otimizacao e modernizacao de processos com TI"
      ]
    }
  ]
};

// Congelamento de integridade para impedir mutacoes acidentais em tempo de execucao
Object.freeze(BSI_DATA);
Object.freeze(BSI_DATA.metricas);
Object.freeze(BSI_DATA.eixos);
Object.freeze(BSI_DATA.disciplinas);
Object.freeze(BSI_DATA.carreiras);
