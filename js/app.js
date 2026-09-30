/**
 * APLICACAO PRINCIPAL DO MAPA DIGITAL INTERATIVO BSI IFMG
 * INSTITUTO FEDERAL DE MINAS GERAIS - CAMPUS OURO BRANCO
 * Codigo JavaScript Puro (ES6+ Vanilla) - Sem frameworks ou dependencias externas
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. ESTADO GLOBAL DA APLICACAO
     -------------------------------------------------------------------------- */
  const state = {
    selectedDisciplinaId: null,
    selectedCarreiraId: null,
    activeEixoFilter: "all",
    searchQuery: "",
    activeViewMode: "matriz" // "matriz" | "carreiras" | "integrada"
  };

  /* Cache de referencias a elementos do DOM */
  const dom = {
    gridSemestres: document.getElementById("grid-semestres"),
    gridCarreiras: document.getElementById("grid-carreiras"),
    axisFilterList: document.getElementById("axis-filter-list"),
    integratedDisciplinasList: document.getElementById("integrated-disciplinas-list"),
    integratedCarreirasList: document.getElementById("integrated-carreiras-list"),
    sidebarContent: document.getElementById("sidebar-content"),
    statusBadge: document.getElementById("status-badge"),
    statusMessage: document.getElementById("status-message"),
    btnBannerClear: document.getElementById("btn-banner-clear"),
    searchInput: document.getElementById("search-input"),
    btnClearSearch: document.getElementById("btn-clear-search"),
    btnResetFilters: document.getElementById("btn-reset-filters"),
    footerLegendItems: document.getElementById("footer-legend-items"),
    svgOverlay: document.getElementById("connections-svg"),
    svgPathsGroup: document.getElementById("svg-paths-group"),
    mapWrapper: document.getElementById("map-wrapper"),
    modeButtons: document.querySelectorAll(".btn-mode"),
    viewPanels: {
      matriz: document.getElementById("view-matriz"),
      carreiras: document.getElementById("view-carreiras"),
      integrada: document.getElementById("view-integrada")
    },
    modalDetails: document.getElementById("modal-details"),
    modalTitle: document.getElementById("modal-title"),
    modalBody: document.getElementById("modal-body"),
    btnModalClose: document.getElementById("btn-modal-close")
  };

  /* Mapas rapidos de busca para otimizacao de desempenho */
  const disciplinasMap = new Map();
  BSI_DATA.disciplinas.forEach(d => disciplinasMap.set(d.id, d));

  const carreirasMap = new Map();
  BSI_DATA.carreiras.forEach(c => carreirasMap.set(c.id, c));

  const eixosMap = new Map();
  BSI_DATA.eixos.forEach(e => eixosMap.set(e.id, e));

  /* --------------------------------------------------------------------------
     2. INICIALIZACAO DA APLICACAO
     -------------------------------------------------------------------------- */
  function init() {
    renderAxisFilters();
    renderMatrizSemestres();
    renderCarreirasGrid();
    renderIntegratedView();
    renderFooterLegend();
    renderSidebarWelcome();
    setupEventListeners();
    updateUI();
  }

  /* --------------------------------------------------------------------------
     3. RENDERIZACAO DE COMPONENTES DE INTERFACE
     -------------------------------------------------------------------------- */

  /**
   * Renderiza os botoes da barra de filtro rapido por eixo formativo
   */
  function renderAxisFilters() {
    if (!dom.axisFilterList) return;

    dom.axisFilterList.innerHTML = "";

    // Botao "Todos os Eixos"
    const btnAll = document.createElement("button");
    btnAll.type = "button";
    btnAll.className = "btn-axis-filter active";
    btnAll.dataset.eixoId = "all";
    btnAll.setAttribute("aria-pressed", "true");
    btnAll.innerHTML = `
      <span>Todos</span>
      <span class="axis-filter-count">${BSI_DATA.disciplinas.length}</span>
    `;
    btnAll.addEventListener("click", () => handleFilterAxis("all"));
    dom.axisFilterList.appendChild(btnAll);

    // Botoes individuais para cada eixo do PPC
    BSI_DATA.eixos.forEach(eixo => {
      const count = BSI_DATA.disciplinas.filter(d => d.eixoId === eixo.id).length;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-axis-filter";
      btn.dataset.eixoId = eixo.id;
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = `
        <span class="axis-color-dot" style="background-color: ${eixo.cor};"></span>
        <span>${escapeHtml(eixo.nome)}</span>
        <span class="axis-filter-count">${count}</span>
      `;
      btn.addEventListener("click", () => handleFilterAxis(eixo.id));
      dom.axisFilterList.appendChild(btn);
    });
  }

  /**
   * Renderiza a matriz curricular completa em 8 colunas de semestres
   */
  function renderMatrizSemestres() {
    if (!dom.gridSemestres) return;

    dom.gridSemestres.innerHTML = "";

    // Organizar disciplinas por periodo (1 ao 8)
    const semestresInfo = [
      { num: 1, horas: 320, rotulo: "1o Semestre" },
      { num: 2, horas: 320, rotulo: "2o Semestre" },
      { num: 3, horas: 320, rotulo: "3o Semestre" },
      { num: 4, horas: 320, rotulo: "4o Semestre" },
      { num: 5, horas: 320, rotulo: "5o Semestre" },
      { num: 6, horas: 320, rotulo: "6o Semestre" },
      { num: 7, horas: 288, rotulo: "7o Semestre" },
      { num: 8, horas: 256, rotulo: "8o Semestre" }
    ];

    semestresInfo.forEach(sem => {
      const col = document.createElement("div");
      col.className = "semestre-column";
      col.dataset.periodo = sem.num;

      const header = document.createElement("div");
      header.className = "semestre-header";
      header.innerHTML = `
        <div class="semestre-title-wrap">
          <span class="semestre-title">${sem.num}o Periodo</span>
          <span class="semestre-hours">${sem.horas}h</span>
        </div>
        <div class="semestre-meta">${sem.rotulo}</div>
      `;
      col.appendChild(header);

      const list = document.createElement("div");
      list.className = "semestre-disciplinas-list";

      // Disciplinas obrigatorias deste periodo
      const disciplinasPeriodo = BSI_DATA.disciplinas.filter(
        d => d.periodo === sem.num && d.tipo === "Obrigatoria"
      );

      disciplinasPeriodo.forEach(disc => {
        const card = createDisciplinaCardElement(disc);
        list.appendChild(card);
      });

      // Se houver vaga de Optativa no periodo (5o, 6o, 7o e 8o periodos)
      if (sem.num >= 5) {
        const optativasPeriodo = BSI_DATA.disciplinas.filter(
          d => d.periodo === sem.num && d.tipo === "Optativa"
        );
        const optCard = createOptativaSlotElement(sem.num, optativasPeriodo);
        list.appendChild(optCard);
      }

      col.appendChild(list);
      dom.gridSemestres.appendChild(col);
    });
  }

  /**
   * Cria o elemento HTML de um cartao de disciplina
   */
  function createDisciplinaCardElement(disc) {
    const eixo = eixosMap.get(disc.eixoId);
    const card = document.createElement("div");
    card.className = "disciplina-card";
    card.id = `card-disc-${disc.id}`;
    card.dataset.id = disc.id;
    card.dataset.periodo = disc.periodo;
    card.dataset.eixoId = disc.eixoId;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${disc.nome}, ${disc.cargaHoraria} horas, ${eixo ? eixo.nome : ""}`);

    if (eixo) {
      card.style.borderLeftColor = eixo.cor;
    }

    const hasPrereq = disc.preRequisitos && disc.preRequisitos.length > 0;
    const careersCount = disc.carreirasRelacionadas ? disc.carreirasRelacionadas.length : 0;

    card.innerHTML = `
      <div class="card-top-row">
        <span class="card-code">${escapeHtml(disc.codigo)}</span>
        <span class="card-hours">${disc.cargaHoraria}h</span>
      </div>
      <div class="card-name">${escapeHtml(disc.nome)}</div>
      <div class="card-footer-row">
        <span class="card-axis-pill" style="background-color: ${eixo ? eixo.cor : '#6c757d'};">
          ${escapeHtml(eixo ? eixo.nome.replace("Formacao ", "") : "")}
        </span>
        <div class="card-indicators">
          ${hasPrereq ? `<span class="badge-prereq" title="Pre-requisito exigido">REQ</span>` : ""}
          <span class="badge-careers-count" title="${careersCount} trilhas de carreira associadas">${careersCount} C</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => handleSelectDisciplina(disc.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelectDisciplina(disc.id);
      }
    });

    return card;
  }

  /**
   * Cria o elemento visual que representa o slot de disciplina Optativa no periodo
   */
  function createOptativaSlotElement(periodo, optativasDisponiveis) {
    const card = document.createElement("div");
    card.className = "disciplina-card optativa-card";
    card.id = `card-optativa-${periodo}`;
    card.dataset.periodo = periodo;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Componente Optativo do ${periodo}o Periodo, 64 horas`);
    card.style.borderLeftColor = "#b45309";

    const optativasNomes = optativasDisponiveis.map(o => o.nome).slice(0, 2).join(", ");

    card.innerHTML = `
      <div class="card-top-row">
        <span class="card-code">OPTATIVA</span>
        <span class="card-hours">64h</span>
      </div>
      <div class="card-name">Disciplina Optativa ${periodo - 4}</div>
      <div class="card-footer-row">
        <span class="card-axis-pill" style="background-color: #b45309;">Optativa</span>
        <div class="card-indicators">
          <span class="badge-careers-count" title="Opcoes como ${escapeHtml(optativasNomes)}">${optativasDisponiveis.length} opcoes</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => handleSelectOptativaSlot(periodo, optativasDisponiveis));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelectOptativaSlot(periodo, optativasDisponiveis);
      }
    });

    return card;
  }

  /**
   * Renderiza a grade de carreiras profissionais (Modo Roadmap)
   */
  function renderCarreirasGrid() {
    if (!dom.gridCarreiras) return;

    dom.gridCarreiras.innerHTML = "";

    BSI_DATA.carreiras.forEach(carreira => {
      const card = document.createElement("div");
      card.className = "career-card";
      card.id = `card-career-${carreira.id}`;
      card.dataset.id = carreira.id;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Carreira: ${carreira.titulo}, categoria ${carreira.categoria}`);

      const techBadges = carreira.tecnologias.slice(0, 5).map(
        t => `<span class="tech-tag">${escapeHtml(t)}</span>`
      ).join("");

      card.innerHTML = `
        <div class="career-top">
          <span class="career-category-pill">${escapeHtml(carreira.categoria)}</span>
          <h3 class="career-title">${escapeHtml(carreira.titulo)}</h3>
          <p class="career-desc">${escapeHtml(carreira.descricaoCurta)}</p>
        </div>

        <div class="career-disciplines-summary">
          <span class="career-meta-label">Competencias e Tecnologias-Chave:</span>
          <div class="career-tags-cloud">
            ${techBadges}
          </div>
        </div>

        <div class="career-footer">
          <span class="career-alignment-badge">Alinhamento PPC: ${escapeHtml(carreira.nivelAlinhamento)}</span>
          <span class="btn-career-explore">
            <span>Explorar Trilha</span>
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      `;

      card.addEventListener("click", () => handleSelectCarreira(carreira.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelectCarreira(carreira.id);
        }
      });

      dom.gridCarreiras.appendChild(card);
    });
  }

  /**
   * Renderiza a visualizacao integrada de conexoes bidirecionais
   */
  function renderIntegratedView() {
    if (!dom.integratedDisciplinasList || !dom.integratedCarreirasList) return;

    dom.integratedDisciplinasList.innerHTML = "";
    dom.integratedCarreirasList.innerHTML = "";

    // Agrupar disciplinas por periodo
    for (let p = 1; p <= 8; p++) {
      const discs = BSI_DATA.disciplinas.filter(d => d.periodo === p);
      if (discs.length === 0) continue;

      const group = document.createElement("div");
      group.className = "integrated-period-group";

      const header = document.createElement("div");
      header.className = "integrated-period-header";
      header.textContent = `${p}o Periodo`;
      group.appendChild(header);

      discs.forEach(disc => {
        const item = document.createElement("div");
        item.className = "integrated-item";
        item.id = `integrated-disc-${disc.id}`;
        item.dataset.id = disc.id;
        item.tabIndex = 0;
        item.setAttribute("role", "button");

        const eixo = eixosMap.get(disc.eixoId);
        item.style.borderLeft = `4px solid ${eixo ? eixo.cor : '#6c757d'}`;

        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #6c757d;">
            <span>${escapeHtml(disc.codigo)}</span>
            <span>${disc.cargaHoraria}h</span>
          </div>
          <div style="font-weight: 700; font-size: 0.88rem; margin: 0.2rem 0;">${escapeHtml(disc.nome)}</div>
          <div style="font-size: 0.72rem; color: #6c757d;">${disc.carreirasRelacionadas.length} carreiras associadas</div>
        `;

        item.addEventListener("click", () => handleSelectDisciplina(disc.id));
        group.appendChild(item);
      });

      dom.integratedDisciplinasList.appendChild(group);
    }

    // Lista de carreiras
    BSI_DATA.carreiras.forEach(carreira => {
      const item = document.createElement("div");
      item.className = "integrated-item";
      item.id = `integrated-career-${carreira.id}`;
      item.dataset.id = carreira.id;
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.style.borderLeft = "4px solid #006633";

      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #0284c7; font-weight: 700;">
          <span>${escapeHtml(carreira.categoria)}</span>
          <span>${carreira.disciplinasChaveIds.length} disciplinas</span>
        </div>
        <div style="font-weight: 800; font-size: 0.95rem; margin: 0.25rem 0;">${escapeHtml(carreira.titulo)}</div>
        <p style="font-size: 0.78rem; color: #4b5563; line-height: 1.35;">${escapeHtml(carreira.descricaoCurta)}</p>
      `;

      item.addEventListener("click", () => handleSelectCarreira(carreira.id));
      dom.integratedCarreirasList.appendChild(item);
    });
  }

  /**
   * Renderiza os itens da legenda oficial de eixos formativos no rodape
   */
  function renderFooterLegend() {
    if (!dom.footerLegendItems) return;

    dom.footerLegendItems.innerHTML = "";

    BSI_DATA.eixos.forEach(eixo => {
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `
        <span class="legend-swatch" style="background-color: ${eixo.cor};"></span>
        <div class="legend-text-group">
          <span class="legend-axis-name">${escapeHtml(eixo.nome)} (${eixo.percentualCargaHoraria}% CH)</span>
          <span class="legend-axis-meta">${escapeHtml(eixo.descricao)}</span>
        </div>
      `;
      dom.footerLegendItems.appendChild(item);
    });
  }

  /* --------------------------------------------------------------------------
     4. RENDERIZACAO DO PAINEL LATERAL (DIREITA)
     -------------------------------------------------------------------------- */

  /**
   * Renderiza o conteudo de apresentacao inicial e estatisticas no painel lateral
   */
  function renderSidebarWelcome() {
    if (!dom.sidebarContent) return;

    // Calculo da distribuicao de carga horaria dos 6 eixos
    const distributionRows = BSI_DATA.eixos.map(eixo => {
      return `
        <div class="dist-row">
          <div class="dist-name-group">
            <span class="dist-color-dot" style="background-color: ${eixo.cor};"></span>
            <span>${escapeHtml(eixo.nome)}</span>
          </div>
          <span class="dist-pct">${eixo.percentualCargaHoraria}% (${eixo.horasEstimadas}h)</span>
        </div>
      `;
    }).join("");

    const distributionBars = BSI_DATA.eixos.map(eixo => {
      return `<div class="dist-segment" style="width: ${eixo.percentualCargaHoraria}%; background-color: ${eixo.cor};" title="${escapeHtml(eixo.nome)}: ${eixo.percentualCargaHoraria}%"></div>`;
    }).join("");

    dom.sidebarContent.innerHTML = `
      <div class="panel-welcome">
        <span class="welcome-badge">Guia Academico BSI IFMG</span>
        <h2 class="welcome-title">Explorador Interativo de Formacao Curricular</h2>
        <p class="welcome-desc">
          Este mapa digital apresenta a matriz curricular oficial do <strong>Bacharelado em Sistemas de Informacao do IFMG Campus Ouro Branco</strong>. Navegue entre as disciplinas e descubra quais competencias formam cada perfil de carreira em Tecnologia da Informacao.
        </p>

        <div class="instruction-box">
          <h3 class="instruction-title">Como interagir com o mapa:</h3>
          <ul class="instruction-list">
            <li>
              <span class="instruction-bullet">&bull;</span>
              <span><strong>Clique em qualquer disciplina:</strong> Consulte ementa oficial do PPC, carga horaria, pre-requisitos e as carreiras favorecidas.</span>
            </li>
            <li>
              <span class="instruction-bullet">&bull;</span>
              <span><strong>Selecione uma carreira:</strong> O mapa ilumina automaticamente toda a trilha curricular necessária para alcançar essa atuacao.</span>
            </li>
            <li>
              <span class="instruction-bullet">&bull;</span>
              <span><strong>Use os filtros e a busca:</strong> Encontre disciplinas por palavra-chave, codigo oficial, tecnologia ou eixo de conhecimento.</span>
            </li>
          </ul>
        </div>

        <div class="axes-distribution-card">
          <h3 class="axes-distribution-title">Composicao dos Eixos Formativos (PPC):</h3>
          <div class="distribution-bar">
            ${distributionBars}
          </div>
          <div class="distribution-labels">
            ${distributionRows}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza os detalhes completos de uma disciplina no painel lateral
   */
  function renderSidebarDisciplina(disc) {
    if (!dom.sidebarContent) return;

    const eixo = eixosMap.get(disc.eixoId);

    // Carreiras relacionadas
    const carreirasLinks = (disc.carreirasRelacionadas || []).map(cid => {
      const c = carreirasMap.get(cid);
      if (!c) return "";
      return `
        <button type="button" class="career-link-chip" data-career-id="${c.id}">
          <span>${escapeHtml(c.titulo)}</span>
          <span class="career-chip-arrow">&rarr;</span>
        </button>
      `;
    }).join("");

    // Pre-requisitos
    let prereqHtml = "Nenhum pre-requisito obrigatorio";
    if (disc.preRequisitos && disc.preRequisitos.length > 0) {
      prereqHtml = disc.preRequisitos.map(pid => {
        const p = disciplinasMap.get(pid);
        const nomeP = p ? p.nome : pid;
        return `<button type="button" class="panel-meta-pill" style="border: 1px dashed #dc2626; color: #dc2626; cursor: pointer;" data-disc-id="${pid}">Exige: ${escapeHtml(nomeP)}</button>`;
      }).join(" ");
    }

    // Competencias
    const competenciasItems = (disc.competencias || []).map(comp => {
      return `
        <li>
          <span class="competencia-check">&check;</span>
          <span>${escapeHtml(comp)}</span>
        </li>
      `;
    }).join("");

    dom.sidebarContent.innerHTML = `
      <div class="panel-detail">
        <div class="panel-header">
          <button type="button" class="panel-close-btn" id="btn-panel-close" title="Fechar detalhes">&times;</button>
          <span class="panel-type-badge">${escapeHtml(disc.tipo)} &bull; ${disc.periodo}o Periodo</span>
          <h2 class="panel-title">${escapeHtml(disc.nome)}</h2>
          <div class="panel-meta-tags">
            <span class="panel-meta-pill" style="background-color: ${eixo ? eixo.cor : '#6c757d'}; color: #ffffff;">
              ${escapeHtml(eixo ? eixo.nome : "")}
            </span>
            <span class="panel-meta-pill">Codigo: ${escapeHtml(disc.codigo)}</span>
            <span class="panel-meta-pill">Carga: ${disc.cargaHoraria} Horas</span>
          </div>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Pre-requisitos Curriculares:</h3>
          <div style="font-size: 0.82rem; color: #4b5563;">
            ${prereqHtml}
          </div>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Ementa Oficial (PPC IFMG):</h3>
          <p class="panel-ementa-text">${escapeHtml(disc.ementaResumida)}</p>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Competencias Desenvolvidas:</h3>
          <ul class="panel-competencias-list">
            ${competenciasItems}
          </ul>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Carreiras Profissionais Beneficiadas (${disc.carreirasRelacionadas.length}):</h3>
          <div class="panel-careers-links">
            ${carreirasLinks}
          </div>
        </div>
      </div>
    `;

    // Conectar eventos internos do painel lateral
    const btnClose = dom.sidebarContent.querySelector("#btn-panel-close");
    if (btnClose) {
      btnClose.addEventListener("click", () => handleClearSelection());
    }

    dom.sidebarContent.querySelectorAll("[data-career-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleSelectCarreira(btn.dataset.careerId);
      });
    });

    dom.sidebarContent.querySelectorAll("[data-disc-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleSelectDisciplina(btn.dataset.discId);
      });
    });
  }

  /**
   * Renderiza os detalhes de um slot de disciplina Optativa
   */
  function renderSidebarOptativaSlot(periodo, optativas) {
    if (!dom.sidebarContent) return;

    const optativasHtml = optativas.map(opt => {
      const eixo = eixosMap.get(opt.eixoId);
      return `
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 0.75rem; margin-bottom: 0.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #6b7280;">
            <span style="font-weight: 700;">${escapeHtml(opt.codigo)}</span>
            <span>${opt.cargaHoraria}h</span>
          </div>
          <div style="font-weight: 700; font-size: 0.9rem; margin: 0.25rem 0;">${escapeHtml(opt.nome)}</div>
          <p style="font-size: 0.78rem; color: #4b5563; line-height: 1.4;">${escapeHtml(opt.ementaResumida)}</p>
          <button type="button" class="btn-axis-filter" style="margin-top: 0.5rem; cursor: pointer;" data-disc-id="${opt.id}">
            Ver detalhes desta optativa &rarr;
          </button>
        </div>
      `;
    }).join("");

    dom.sidebarContent.innerHTML = `
      <div class="panel-detail">
        <div class="panel-header">
          <button type="button" class="panel-close-btn" id="btn-panel-close" title="Fechar detalhes">&times;</button>
          <span class="panel-type-badge">Slot de Optativa Curricular</span>
          <h2 class="panel-title">${periodo}o Periodo &bull; 64 Horas</h2>
          <div class="panel-meta-tags">
            <span class="panel-meta-pill">Obrigatorio cumprir 1 optativa neste semestre</span>
          </div>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Sobre as Disciplinas Optativas no BSI IFMG:</h3>
          <p class="panel-ementa-text">
            O estudante tem a liberdade de personalizar sua formacao cursando 4 disciplinas optativas (total de 256h) entre o 5o e o 8o periodos. Essas disciplinas permitem aprofundamento em Banco de Dados Avancado, Redes, Inteligencia Artificial, Visao Computacional ou Gestao da Inovacao.
          </p>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Opcoes Disponiveis no Catalogo do Curso:</h3>
          <div>
            ${optativasHtml}
          </div>
        </div>
      </div>
    `;

    const btnClose = dom.sidebarContent.querySelector("#btn-panel-close");
    if (btnClose) {
      btnClose.addEventListener("click", () => handleClearSelection());
    }

    dom.sidebarContent.querySelectorAll("[data-disc-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleSelectDisciplina(btn.dataset.discId);
      });
    });
  }

  /**
   * Renderiza os detalhes de uma carreira selecionada no painel lateral
   */
  function renderSidebarCarreira(carreira) {
    if (!dom.sidebarContent) return;

    // Disciplinas chave organizadas por periodo
    const disciplinasPeriodos = [];
    for (let p = 1; p <= 8; p++) {
      const discs = carreira.disciplinasChaveIds
        .map(did => disciplinasMap.get(did))
        .filter(d => d && d.periodo === p);

      if (discs.length > 0) {
        disciplinasPeriodos.push({ periodo: p, disciplinas: discs });
      }
    }

    const trilhaCurricularHtml = disciplinasPeriodos.map(item => {
      const discPills = item.disciplinas.map(d => {
        const eixo = eixosMap.get(d.eixoId);
        return `
          <button type="button" class="btn-axis-filter" style="cursor: pointer; background: #ffffff; border-color: ${eixo ? eixo.cor : '#9e9e9e'}; font-size: 0.78rem;" data-disc-id="${d.id}" title="${escapeHtml(d.nome)} (${d.codigo})">
            <span class="axis-color-dot" style="background-color: ${eixo ? eixo.cor : '#9e9e9e'};"></span>
            <span>${escapeHtml(d.nome)}</span>
          </button>
        `;
      }).join(" ");

      return `
        <div style="margin-bottom: 0.75rem;">
          <div style="font-size: 0.75rem; font-weight: 700; color: #006633; margin-bottom: 0.35rem;">
            ${item.periodo}o Periodo:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            ${discPills}
          </div>
        </div>
      `;
    }).join("");

    const techTags = carreira.tecnologias.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("");
    const areasItems = (carreira.areasAtuacao || []).map(a => `<li><span class="competencia-check">&rarr;</span> <span>${escapeHtml(a)}</span></li>`).join("");

    dom.sidebarContent.innerHTML = `
      <div class="panel-detail">
        <div class="panel-header">
          <button type="button" class="panel-close-btn" id="btn-panel-close" title="Fechar detalhes">&times;</button>
          <span class="panel-type-badge" style="background-color: rgba(0, 102, 51, 0.1); color: #006633;">
            Trilha de Carreira &bull; ${escapeHtml(carreira.categoria)}
          </span>
          <h2 class="panel-title">${escapeHtml(carreira.titulo)}</h2>
          <div class="panel-meta-tags">
            <span class="panel-meta-pill" style="background-color: #006633; color: #ffffff;">Alinhamento PPC: ${escapeHtml(carreira.nivelAlinhamento)}</span>
            <span class="panel-meta-pill">${carreira.disciplinasChaveIds.length} Disciplinas na Trilha</span>
          </div>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Perfil e Escopo de Atuacao:</h3>
          <p class="panel-ementa-text">${escapeHtml(carreira.descricaoDetalhada)}</p>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Disciplinas da Trilha no IFMG (Por Semestre):</h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
            ${trilhaCurricularHtml}
          </div>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Tecnologias, Ferramentas e Conceitos:</h3>
          <div class="career-tags-cloud">
            ${techTags}
          </div>
        </div>

        <div class="panel-section">
          <h3 class="panel-section-title">Oportunidades no Mercado de Trabalho:</h3>
          <ul class="panel-competencias-list">
            ${areasItems}
          </ul>
        </div>
      </div>
    `;

    const btnClose = dom.sidebarContent.querySelector("#btn-panel-close");
    if (btnClose) {
      btnClose.addEventListener("click", () => handleClearSelection());
    }

    dom.sidebarContent.querySelectorAll("[data-disc-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleSelectDisciplina(btn.dataset.discId);
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. GESTAO DE EVENTOS E INTERATIVIDADE
     -------------------------------------------------------------------------- */
  function setupEventListeners() {
    // Alternancia de Modos de Visao
    dom.modeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.mode;
        handleChangeViewMode(mode);
      });
    });

    // Campo de busca com debounce
    let searchTimeout = null;
    dom.searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      searchTimeout = setTimeout(() => {
        state.searchQuery = query;
        if (query) {
          state.selectedDisciplinaId = null;
          state.selectedCarreiraId = null;
          dom.btnClearSearch.hidden = false;
        } else {
          dom.btnClearSearch.hidden = true;
        }
        updateUI();
      }, 120);
    });

    // Botao limpar busca
    dom.btnClearSearch.addEventListener("click", () => {
      dom.searchInput.value = "";
      state.searchQuery = "";
      dom.btnClearSearch.hidden = true;
      updateUI();
      dom.searchInput.focus();
    });

    // Botao resetar todos os filtros
    dom.btnResetFilters.addEventListener("click", () => {
      handleResetAll();
    });

    // Botao limpar do banner de status
    dom.btnBannerClear.addEventListener("click", () => {
      handleClearSelection();
    });

    // Modal de detalhes
    if (dom.btnModalClose) {
      dom.btnModalClose.addEventListener("click", () => {
        closeModal();
      });
    }

    // Tecla Escape para fechar selecao ou modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!dom.modalDetails.hidden) {
          closeModal();
        } else if (state.selectedDisciplinaId || state.selectedCarreiraId) {
          handleClearSelection();
        }
      }
    });

    // Recalcular linhas SVG quando a janela mudar de tamanho
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        drawConnections();
      }, 100);
    });
  }

  /* --------------------------------------------------------------------------
     6. HANDLERS DE ACAO DO USUARIO
     -------------------------------------------------------------------------- */

  function handleChangeViewMode(mode) {
    if (state.activeViewMode === mode) return;

    state.activeViewMode = mode;

    dom.modeButtons.forEach(btn => {
      const isActive = btn.dataset.mode === mode;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-checked", isActive ? "true" : "false");
    });

    Object.keys(dom.viewPanels).forEach(key => {
      const panel = dom.viewPanels[key];
      if (panel) {
        if (key === mode) {
          panel.hidden = false;
          panel.classList.add("active");
        } else {
          panel.hidden = true;
          panel.classList.remove("active");
        }
      }
    });

    updateUI();
  }

  function handleFilterAxis(eixoId) {
    state.activeEixoFilter = eixoId;

    // Atualizar visual dos botoes de filtro
    dom.axisFilterList.querySelectorAll(".btn-axis-filter").forEach(btn => {
      const isActive = btn.dataset.eixoId === eixoId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    updateUI();
  }

  function handleSelectDisciplina(discId) {
    if (state.selectedDisciplinaId === discId) {
      // Toggle off se clicado duas vezes
      state.selectedDisciplinaId = null;
    } else {
      state.selectedDisciplinaId = discId;
      state.selectedCarreiraId = null; // Prioriza a disciplina selecionada
    }

    updateUI();

    // Rolar ate o card no grid ou ate o painel lateral no mobile
    if (state.selectedDisciplinaId) {
      if (window.innerWidth <= 768 && dom.sidebarContent) {
        dom.sidebarContent.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const card = document.getElementById(`card-disc-${state.selectedDisciplinaId}`);
        if (card && typeof card.scrollIntoView === "function") {
          card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
    }
  }

  function handleSelectOptativaSlot(periodo, optativas) {
    state.selectedDisciplinaId = null;
    state.selectedCarreiraId = null;

    renderSidebarOptativaSlot(periodo, optativas);

    dom.statusBadge.className = "status-badge disciplina-active";
    dom.statusBadge.textContent = "Slot de Optativa";
    dom.statusMessage.textContent = `Exibindo o catalogo de disciplinas optativas do ${periodo}o Periodo.`;
    dom.btnBannerClear.hidden = false;

    clearSvgConnections();

    if (window.innerWidth <= 768 && dom.sidebarContent) {
      dom.sidebarContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleSelectCarreira(carreiraId) {
    if (state.selectedCarreiraId === carreiraId) {
      // Toggle off se clicado duas vezes
      state.selectedCarreiraId = null;
    } else {
      state.selectedCarreiraId = carreiraId;
      state.selectedDisciplinaId = null;
    }

    updateUI();

    if (state.selectedCarreiraId && window.innerWidth <= 768 && dom.sidebarContent) {
      dom.sidebarContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleClearSelection() {
    state.selectedDisciplinaId = null;
    state.selectedCarreiraId = null;
    updateUI();
  }

  function handleResetAll() {
    state.selectedDisciplinaId = null;
    state.selectedCarreiraId = null;
    state.activeEixoFilter = "all";
    state.searchQuery = "";
    dom.searchInput.value = "";
    dom.btnClearSearch.hidden = true;

    // Restaurar filtro de eixo para 'all'
    dom.axisFilterList.querySelectorAll(".btn-axis-filter").forEach(btn => {
      const isAll = btn.dataset.eixoId === "all";
      btn.classList.toggle("active", isAll);
      btn.setAttribute("aria-pressed", isAll ? "true" : "false");
    });

    updateUI();
  }

  function closeModal() {
    dom.modalDetails.hidden = true;
    dom.modalDetails.setAttribute("aria-hidden", "true");
  }

  /* --------------------------------------------------------------------------
     7. ATUALIZACAO REATIVA DA INTERFACE (UI)
     -------------------------------------------------------------------------- */
  function updateUI() {
    const hasSelection = Boolean(state.selectedDisciplinaId || state.selectedCarreiraId);
    const hasFilter = state.activeEixoFilter !== "all";
    const hasSearch = state.searchQuery.length > 0;

    // 1. Atualizar banner de status
    if (state.selectedDisciplinaId) {
      const disc = disciplinasMap.get(state.selectedDisciplinaId);
      dom.statusBadge.className = "status-badge disciplina-active";
      dom.statusBadge.textContent = "Disciplina";
      dom.statusMessage.textContent = disc ? `${disc.codigo} - ${disc.nome} (${disc.cargaHoraria}h)` : "Disciplina selecionada";
      dom.btnBannerClear.hidden = false;
      renderSidebarDisciplina(disc);
    } else if (state.selectedCarreiraId) {
      const car = carreirasMap.get(state.selectedCarreiraId);
      dom.statusBadge.className = "status-badge career-active";
      dom.statusBadge.textContent = "Trilha Profissional";
      dom.statusMessage.textContent = car ? `Carreira: ${car.titulo} (${car.disciplinasChaveIds.length} disciplinas conectadas)` : "Carreira selecionada";
      dom.btnBannerClear.hidden = false;
      renderSidebarCarreira(car);
    } else if (hasFilter) {
      const eixo = eixosMap.get(state.activeEixoFilter);
      dom.statusBadge.className = "status-badge";
      dom.statusBadge.textContent = "Filtro de Eixo";
      dom.statusMessage.textContent = eixo ? `Filtrando por ${eixo.nome} (${eixo.percentualCargaHoraria}% da carga horaria).` : "Filtro ativo";
      dom.btnBannerClear.hidden = false;
      renderSidebarWelcome();
    } else if (hasSearch) {
      dom.statusBadge.className = "status-badge";
      dom.statusBadge.textContent = "Busca Ativa";
      dom.statusMessage.textContent = `Resultados para o termo "${state.searchQuery}".`;
      dom.btnBannerClear.hidden = false;
      renderSidebarWelcome();
    } else {
      dom.statusBadge.className = "status-badge";
      dom.statusBadge.textContent = "Visao Geral";
      dom.statusMessage.textContent = "Exibindo todos os 8 periodos e disciplinas do curso. Clique em qualquer cartao para detalhar.";
      dom.btnBannerClear.hidden = true;
      renderSidebarWelcome();
    }

    // 2. Atualizar estados dos cartoes de disciplina na Matriz Curricular
    const selectedDisc = state.selectedDisciplinaId ? disciplinasMap.get(state.selectedDisciplinaId) : null;
    const selectedCar = state.selectedCarreiraId ? carreirasMap.get(state.selectedCarreiraId) : null;

    document.querySelectorAll(".disciplina-card").forEach(card => {
      const id = card.dataset.id;
      if (!id) {
        // Slots genericos de optativa
        let isMuted = false;
        if (hasSearch && !normalizeStr("optativa").includes(normalizeStr(state.searchQuery))) {
          isMuted = true;
        }
        if (hasFilter && state.activeEixoFilter !== "complementar") {
          isMuted = true;
        }
        if (selectedDisc) {
          isMuted = true;
        }
        if (selectedCar) {
          const carOptativas = selectedCar.disciplinasChaveIds.filter(did => {
            const d = disciplinasMap.get(did);
            return d && d.tipo === "Optativa" && d.periodo == card.dataset.periodo;
          });
          if (carOptativas.length > 0) {
            card.classList.add("highlighted");
            card.classList.remove("muted");
          } else {
            card.classList.remove("highlighted");
            card.classList.add("muted");
          }
          return;
        }
        card.classList.remove("highlighted");
        card.classList.toggle("muted", isMuted);
        return;
      }

      const disc = disciplinasMap.get(id);
      if (!disc) return;

      let isSelected = false;
      let isHighlighted = false;
      let isMuted = false;
      let isPrereqTarget = false;

      // Correspondencia de busca
      const matchesSearch = !hasSearch || checkDisciplineMatchesSearch(disc, state.searchQuery);
      // Correspondencia de eixo
      const matchesEixo = !hasFilter || disc.eixoId === state.activeEixoFilter;

      if (!matchesSearch || !matchesEixo) {
        isMuted = true;
      }

      // Se houver disciplina selecionada
      if (selectedDisc) {
        if (disc.id === selectedDisc.id) {
          isSelected = true;
        } else if (selectedDisc.preRequisitos && selectedDisc.preRequisitos.includes(disc.id)) {
          isPrereqTarget = true;
          isHighlighted = true;
        } else {
          isMuted = true;
        }
      }

      // Se houver carreira selecionada
      if (selectedCar) {
        if (selectedCar.disciplinasChaveIds.includes(disc.id)) {
          isHighlighted = true;
          isMuted = false;
        } else {
          isMuted = true;
        }
      }

      card.classList.toggle("selected", isSelected);
      card.classList.toggle("highlighted", isHighlighted && !isSelected);
      card.classList.toggle("muted", isMuted && !isSelected && !isHighlighted);
      card.classList.toggle("prereq-target", isPrereqTarget);
    });

    // 3. Atualizar estados dos cartoes de carreira no Grid de Carreiras
    document.querySelectorAll(".career-card").forEach(card => {
      const id = card.dataset.id;
      const car = carreirasMap.get(id);
      if (!car) return;

      let isSelected = (state.selectedCarreiraId === id);
      let isHighlighted = false;
      let isMuted = false;

      if (selectedDisc) {
        if (selectedDisc.carreirasRelacionadas.includes(id)) {
          isHighlighted = true;
        } else {
          isMuted = true;
        }
      }

      if (hasSearch && !checkCareerMatchesSearch(car, state.searchQuery)) {
        isMuted = true;
      }

      card.classList.toggle("selected", isSelected);
      card.classList.toggle("highlighted", isHighlighted && !isSelected);
      card.classList.toggle("muted", isMuted && !isSelected && !isHighlighted);
    });

    // 4. Atualizar itens da visao integrada
    document.querySelectorAll(".integrated-item").forEach(item => {
      const id = item.dataset.id;
      const isDisc = item.id.startsWith("integrated-disc-");
      const isCar = item.id.startsWith("integrated-career-");

      if (isDisc) {
        const isSel = (state.selectedDisciplinaId === id);
        item.classList.toggle("active", isSel);
      } else if (isCar) {
        const isSel = (state.selectedCarreiraId === id);
        item.classList.toggle("active", isSel);
      }
    });

    // 5. Desenhar conexoes visuais SVG
    requestAnimationFrame(() => {
      drawConnections();
    });
  }

  /* --------------------------------------------------------------------------
     8. VERIFICACOES DE BUSCA TEXTUAL E NORMALIZACAO
     -------------------------------------------------------------------------- */

  function normalizeStr(str) {
    if (!str) return "";
    return String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function checkDisciplineMatchesSearch(disc, query) {
    const q = normalizeStr(query);
    if (normalizeStr(disc.nome).includes(q)) return true;
    if (normalizeStr(disc.codigo).includes(q)) return true;
    if (normalizeStr(disc.ementaResumida).includes(q)) return true;
    if (disc.competencias && disc.competencias.some(c => normalizeStr(c).includes(q))) return true;

    // Verificar se termo bate com alguma tecnologia ou titulo de carreira associada
    if (disc.carreirasRelacionadas) {
      for (const cid of disc.carreirasRelacionadas) {
        const car = carreirasMap.get(cid);
        if (car) {
          if (normalizeStr(car.titulo).includes(q)) return true;
          if (car.tecnologias.some(t => normalizeStr(t).includes(q))) return true;
        }
      }
    }
    return false;
  }

  function checkCareerMatchesSearch(car, query) {
    const q = normalizeStr(query);
    if (normalizeStr(car.titulo).includes(q)) return true;
    if (normalizeStr(car.categoria).includes(q)) return true;
    if (normalizeStr(car.descricaoCurta).includes(q)) return true;
    if (normalizeStr(car.descricaoDetalhada).includes(q)) return true;
    if (car.tecnologias.some(t => normalizeStr(t).includes(q))) return true;
    return false;
  }

  /* --------------------------------------------------------------------------
     9. LOGICA DO DESENHO DE CONEXOES EM SVG
     -------------------------------------------------------------------------- */

  function clearSvgConnections() {
    if (dom.svgPathsGroup) {
      dom.svgPathsGroup.innerHTML = "";
    }
  }

  /**
   * Calcula as coordenadas e desenha as curvas de Bezier no overlay SVG
   */
  function drawConnections() {
    clearSvgConnections();

    // Se estiver em tela pequena (< 768px), o overlay de linhas e desativado para garantir clareza
    if (window.innerWidth < 768) return;

    if (!dom.svgOverlay || !dom.svgPathsGroup || !dom.mapWrapper) return;

    const wrapperRect = dom.mapWrapper.getBoundingClientRect();

    // Cenário 1: Disciplina selecionada -> Conecta com seus pré-requisitos no mapa
    if (state.selectedDisciplinaId && state.activeViewMode === "matriz") {
      const disc = disciplinasMap.get(state.selectedDisciplinaId);
      const targetCard = document.getElementById(`card-disc-${disc.id}`);

      if (targetCard && disc.preRequisitos && disc.preRequisitos.length > 0) {
        const targetRect = targetCard.getBoundingClientRect();
        const tx = targetRect.left - wrapperRect.left;
        const ty = targetRect.top - wrapperRect.top + targetRect.height / 2;

        disc.preRequisitos.forEach(pid => {
          const prereqCard = document.getElementById(`card-disc-${pid}`);
          if (!prereqCard) return;

          const prereqRect = prereqCard.getBoundingClientRect();
          const px = prereqRect.right - wrapperRect.left;
          const py = prereqRect.top - wrapperRect.top + prereqRect.height / 2;

          drawBezierCurve(px, py, tx, ty, "prereq");
        });
      }
    }

    // Cenário 2: Carreira selecionada na Matriz -> Conecta as disciplinas consecutivas da trilha
    if (state.selectedCarreiraId && state.activeViewMode === "matriz") {
      const car = carreirasMap.get(state.selectedCarreiraId);
      if (!car) return;

      // Ordenar disciplinas-chave por período para criar o fluxo sequencial
      const sortedDiscs = car.disciplinasChaveIds
        .map(did => disciplinasMap.get(did))
        .filter(Boolean)
        .sort((a, b) => a.periodo - b.periodo);

      for (let i = 0; i < sortedDiscs.length - 1; i++) {
        const d1 = sortedDiscs[i];
        const d2 = sortedDiscs[i + 1];

        // Apenas conecta disciplinas de períodos diferentes e consecutivos ou próximos
        if (d2.periodo > d1.periodo) {
          const card1 = document.getElementById(`card-disc-${d1.id}`);
          const card2 = document.getElementById(`card-disc-${d2.id}`);

          if (card1 && card2) {
            const r1 = card1.getBoundingClientRect();
            const r2 = card2.getBoundingClientRect();

            const x1 = r1.right - wrapperRect.left;
            const y1 = r1.top - wrapperRect.top + r1.height / 2;

            const x2 = r2.left - wrapperRect.left;
            const y2 = r2.top - wrapperRect.top + r2.height / 2;

            drawBezierCurve(x1, y1, x2, y2, "active");
          }
        }
      }
    }

    // Cenário 3: Modo Integrado -> Conexão entre disciplina ativa e carreiras ativas
    if (state.activeViewMode === "integrada") {
      if (state.selectedDisciplinaId) {
        const disc = disciplinasMap.get(state.selectedDisciplinaId);
        const discElem = document.getElementById(`integrated-disc-${disc.id}`);

        if (discElem && disc.carreirasRelacionadas) {
          const dRect = discElem.getBoundingClientRect();
          const x1 = dRect.right - wrapperRect.left;
          const y1 = dRect.top - wrapperRect.top + dRect.height / 2;

          disc.carreirasRelacionadas.forEach(cid => {
            const carElem = document.getElementById(`integrated-career-${cid}`);
            if (!carElem) return;

            const cRect = carElem.getBoundingClientRect();
            const x2 = cRect.left - wrapperRect.left;
            const y2 = cRect.top - wrapperRect.top + cRect.height / 2;

            drawBezierCurve(x1, y1, x2, y2, "active");
          });
        }
      } else if (state.selectedCarreiraId) {
        const car = carreirasMap.get(state.selectedCarreiraId);
        const carElem = document.getElementById(`integrated-career-${car.id}`);

        if (carElem && car.disciplinasChaveIds) {
          const cRect = carElem.getBoundingClientRect();
          const x2 = cRect.left - wrapperRect.left;
          const y2 = cRect.top - wrapperRect.top + cRect.height / 2;

          car.disciplinasChaveIds.forEach(did => {
            const discElem = document.getElementById(`integrated-disc-${did}`);
            if (!discElem) return;

            const dRect = discElem.getBoundingClientRect();
            const x1 = dRect.right - wrapperRect.left;
            const y1 = dRect.top - wrapperRect.top + dRect.height / 2;

            drawBezierCurve(x1, y1, x2, y2, "active");
          });
        }
      }
    }
  }

  /**
   * Constrói e anexa uma curva cúbica de Bezier no SVG
   * Path formula: M x1 y1 C (x1+x2)/2 y1, (x1+x2)/2 y2, x2 y2
   */
  function drawBezierCurve(x1, y1, x2, y2, tipoClasse) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const deltaX = Math.abs(x2 - x1);
    const cp1x = x1 + Math.max(30, deltaX * 0.5);
    const cp1y = y1;
    const cp2x = x2 - Math.max(30, deltaX * 0.5);
    const cp2y = y2;

    const d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
    path.setAttribute("d", d);
    path.setAttribute("class", `connection-path ${tipoClasse || ""}`);

    if (tipoClasse === "prereq") {
      path.setAttribute("marker-end", "url(#arrow-head)");
    }

    dom.svgPathsGroup.appendChild(path);
  }

  /* --------------------------------------------------------------------------
     10. UTILITARIOS GERAIS
     -------------------------------------------------------------------------- */
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Inicializar quando o DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
