# Mapa Digital Interativo &bull; Bacharelado em Sistemas de Informacao
### Instituto Federal de Minas Gerais (IFMG) &bull; Campus Ouro Branco

O **Mapa Digital Interativo do Curso de Bacharelado em Sistemas de Informacao** e uma ferramenta web educacional desenvolvida para estudantes do ensino medio, ingressantes universitarios e a comunidade academica explorarem a estrutura curricular oficial, as areas de conhecimento e os percursos profissionais em Tecnologia da Informacao viabilizados pelo curso no IFMG Campus Ouro Branco.

---

## 1. Visao Geral e Objetivos Academicos

* **Apresentar a Matriz Curricular Real:** Exibe todas as 37 disciplinas obrigatorias do curso, organizadas ao longo dos 8 semestres letivos, com cargas horarias, codigos oficiais do IFMG (`OBBGSIN.XXX`), ementas autenticas e pre-requisitos.
* **Mapear os 6 Eixos de Formacao:** Representa fielmente os percentuais e contextos formativos definidos no PPC (Matematica, Computacional, Tecnologia da Informacao, Administrativa, Complementar e Profissional/Social).
* **Trajetorias de Carreira em TI:** Demonstra a conexao pratica entre as disciplinas estudadas e 10 perfis profissionais consolidados no mercado tecnologico (Engenharia de Software, Desenvolvimento Full-Stack, Ciencia de Dados/IA, DBA/Engenharia de Dados, Infraestrutura/Nuvem, Gestao de TI, UX/UI, Mobile, Analise de Sistemas e Empreendedorismo).
* **Interatividade Bidirecional:** Permite cruzar dados em tempo real: ao clicar em uma disciplina, o sistema destaca as carreiras favorecidas; ao selecionar uma carreira, o mapa ilumina toda a trilha curricular correspondente.

---

## 2. Tecnologias Utilizadas

O projeto foi concebido estritamente dentro dos padroes da web moderna sem necessidade de frameworks ou dependencias externas:

* **HTML5 Semantico:** Estruturacao acessivel com tags semanticas (`header`, `main`, `section`, `aside`, `nav`, `footer`) e atributos ARIA.
* **CSS3 Moderno:** Arquitetura limpa utilizando CSS Grid, Flexbox, variaveis CSS personalizadas (Custom Properties) e design responsivo.
* **JavaScript Puro (ES6+ Vanilla):** Gerenciamento reativo de estado, manipulacao eficiente do DOM e controle de eventos sem frameworks como React, Vue ou Angular.
* **SVG Nativo:** Renderizacao vetorial de curvas cubicas de Bezier para demonstrar visualmente os fluxos de requisitos e conexoes entre componentes curriculares.

---

## 3. Estrutura do Projeto

```
mapa-digital-bsi/
|-- index.html            # Estrutura semantica principal e contêineres de visualizacao
|-- css/
|   `-- style.css         # Estilizacao completa, variaveis, responsividade e visual academico
|-- js/
|   |-- data.js           # Dataset imutavel com metricas, 6 eixos, 49 disciplinas e 10 carreiras
|   `-- app.js            # Logica de renderizacao, estado, calculo de SVG e eventos
|-- assets/
|   `-- logo-ifmg.svg     # Vetor oficial institucional do IFMG Campus Ouro Branco
|-- PLANO_EXECUCAO_MAPA_SI_IFMG.md  # Especificacao tecnica detalhada do projeto
|-- PPC_SI_IFMG.pdf       # Documento norteador academico oficial do campus
`-- README.md             # Documentacao e guia operacional
```

---

## 4. Modos de Visualizacao e Recursos

1. **Matriz Curricular (Semestres):** Grade completa de 8 colunas representando os 8 semestres letivos, com cartoes coloridos pela borda do eixo formativo correspondente, badges de carga horaria, codigos e indicadores de pre-requisitos.
2. **Trilhas de Carreira (Roadmap):** Painel focado nas 10 carreiras de TI mapeadas a partir do perfil do egresso, exibindo nivel de alinhamento com o curso, tecnologias dominadas e as disciplinas-chave.
3. **Conexoes Interativas:** Visao lado a lado relacionando diretamente as disciplinas curriculares aos caminhos profissionais com linhas dinamicas em SVG.
4. **Filtro por Eixos Formativos:** Botoes de selecao rapida para filtrar disciplinas por formacao (Matematica, Computacional, TI, Administrativa, Complementar ou Profissional/Social).
5. **Busca em Tempo Real:** Campo de busca com filtro reativo por nome de disciplina, codigo institucional, ementa, competencia profissional ou tecnologia.
6. **Painel Lateral Contextual:** Apresenta a ementa oficial detalhada do PPC, carga horaria, pre-requisitos e links diretos para navegacao entre disciplinas e carreiras.

---

## 5. Como Executar Localmente

Nao e necessaria a instalacao de Node.js, Webpack, Vite ou qualquer gerenciador de pacotes:

1. Clone o repositorio:
   ```bash
   git clone https://github.com/SEU_USUARIO/mapa-digital-bsi-ifmg.git
   ```
2. Abra a pasta do projeto e dê dois cliques no arquivo `index.html` para abri-lo em qualquer navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. Alternativamente, para servir via servidor HTTP local (opcional):
   ```bash
   # Utilizando Python 3:
   py -m http.server 8000
   # Em seguida acesse: http://localhost:8000
   ```

---

## 6. Publicacao no GitHub Pages

O projeto foi desenvolvido com caminhos totalmente relativos, estando pronto para publicacao estatica no GitHub Pages:

1. Inicialize o repositorio Git local e realize o primeiro commit:
   ```bash
   git init
   git add .
   git commit -m "feat: implementacao completa do mapa digital BSI IFMG"
   ```
2. Conecte ao seu repositorio remoto no GitHub:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/mapa-digital-bsi-ifmg.git
   git branch -M main
   git push -u origin main
   ```
3. No GitHub, acesse **Settings** > **Pages**.
4. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, clicando em **Save**.
6. A aplicacao estara disponivel publicamente em:
   `https://SEU_USUARIO.github.io/mapa-digital-bsi-ifmg/`

---

## 7. Fontes de Dados e Referencias Oficiais

* **Projeto Pedagogico do Curso (PPC) de Bacharelado em Sistemas de Informacao:** Instituto Federal de Educacao, Ciencia e Tecnologia de Minas Gerais &bull; Campus Ouro Branco. Aprovado pela Resolucao No 016/2017 e alteracoes vigentes.
* **Diretrizes Curriculares Nacionais (DCNs) para a Area de Computacao:** Resolucao CNE/CES No 05 de 16 de novembro de 2016 &bull; Ministerio da Educacao (MEC).
* **Guia Metodologico e Curricular:** Atividade Academica da disciplina de Sistemas de Apoio a Decisao &bull; IFMG Campus Ouro Branco.

---

## 8. Licenca

Projeto desenvolvido para fins educacionais e academicos no ambito do IFMG Campus Ouro Branco.
