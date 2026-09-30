/**
 * MAPA CONCEITUAL BSI IFMG - CAMPUS OURO BRANCO
 * Logica Minimalista em Vanilla JavaScript (ES6+)
 * Fonte de Dados: PPC BSI IFMG Campus Ouro Branco
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. ESTADO DA APLICACAO
     -------------------------------------------------------------------------- */
  const state = {
    selectedCarreiraId: null,
    modalDisciplinaId: null
  };

  /* Cache de elementos DOM */
  const dom = {
    carreirasSelector: document.getElementById("carreiras-selector"),
    btnLimparCarreira: document.getElementById("btn-limpar-carreira"),
    conexoesContainer: document.getElementById("conexoes-container"),
    conexoesContent: document.getElementById("conexoes-content"),
    conexoesStatus: document.getElementById("conexoes-status"),
    conexoesLead: document.getElementById("conexoes-lead"),
    svgConnectionsLayer: document.getElementById("svg-connections-layer"),
    matrizGrid: document.getElementById("matriz-grid"),
    modalDisciplina: document.getElementById("modal-disciplina"),
    modalDiscCodigo: document.getElementById("modal-disc-codigo"),
    modalDiscPeriodo: document.getElementById("modal-disc-periodo"),
    modalDiscCh: document.getElementById("modal-disc-ch"),
    modalDiscEixo: document.getElementById("modal-disc-eixo"),
    modalDiscTitulo: document.getElementById("modal-disc-titulo"),
    modalDiscPrereq: document.getElementById("modal-disc-prereq"),
    modalDiscEmenta: document.getElementById("modal-disc-ementa"),
    modalDiscCompetencias: document.getElementById("modal-disc-competencias"),
    modalDiscCarreiras: document.getElementById("modal-disc-carreiras"),
    btnModalFechar: document.getElementById("btn-modal-fechar")
  };

  /* Mapeamento em memoria para acesso instantaneo */
  const disciplinasMap = new Map();
  BSI_DATA.disciplinas.forEach(d => disciplinasMap.set(d.id, d));

  const carreirasMap = new Map();
  BSI_DATA.carreiras.forEach(c => carreirasMap.set(c.id, c));

  const eixosMap = new Map();
  BSI_DATA.eixos.forEach(e => eixosMap.set(e.id, e));

  /* --------------------------------------------------------------------------
     2. INICIALIZACAO
     -------------------------------------------------------------------------- */
  function init() {
    renderCarreirasSelector();
    renderMatrizCurricular();
    renderConexoesEmptyState();
    setupEventListeners();
  }

  /* --------------------------------------------------------------------------
     3. RENDERIZACAO DAS TRILHAS DE CARREIRA (PONTO CENTRAL)
     -------------------------------------------------------------------------- */
  function renderCarreirasSelector() {
    if (!dom.carreirasSelector) return;

    dom.carreirasSelector.innerHTML = "";

    BSI_DATA.carreiras.forEach(carreira => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "carreira-btn";
      btn.id = `btn-carreira-${carreira.id}`;
      btn.dataset.id = carreira.id;
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", "false");

      btn.innerHTML = `
        <span class="carreira-btn-category">${escapeHtml(carreira.categoria)}</span>
        <span class="carreira-btn-title">${escapeHtml(carreira.titulo)}</span>
        <span class="carreira-btn-count">${carreira.disciplinasChaveIds.length} disciplinas na trilha</span>
      `;

      btn.addEventListener("click", () => handleSelectCarreira(carreira.id));
      dom.carreirasSelector.appendChild(btn);
    });
  }

  /* --------------------------------------------------------------------------
     4. RENDERIZACAO DA MATRIZ CURRICULAR (VISAO GERAL DO CURSO)
     -------------------------------------------------------------------------- */
  function renderMatrizCurricular() {
    if (!dom.matrizGrid) return;

    dom.matrizGrid.innerHTML = "";

    const periodosInfo = [
      { num: 1, ch: 320 },
      { num: 2, ch: 320 },
      { num: 3, ch: 320 },
      { num: 4, ch: 320 },
      { num: 5, ch: 320 },
      { num: 6, ch: 320 },
      { num: 7, ch: 288 },
      { num: 8, ch: 256 }
    ];

    periodosInfo.forEach(periodo => {
      const col = document.createElement("div");
      col.className = "matriz-col";
      col.dataset.periodo = periodo.num;

      const header = document.createElement("div");
      header.className = "matriz-col-header";
      header.innerHTML = `
        <div class="matriz-col-title">${periodo.num}o Periodo</div>
        <div class="matriz-col-hours">${periodo.ch}h totais</div>
      `;
      col.appendChild(header);

      const list = document.createElement("div");
      list.className = "matriz-disciplinas-list";

      // Disciplinas do periodo
      const disciplinasPeriodo = BSI_DATA.disciplinas.filter(
        d => d.periodo === periodo.num && d.tipo === "Obrigatoria"
      );

      disciplinasPeriodo.forEach(disc => {
        const item = createMatrizItemElement(disc);
        list.appendChild(item);
      });

      // Indicador de optativa (5o ao 8o periodos)
      if (periodo.num >= 5) {
        const optItem = createMatrizOptativaElement(periodo.num);
        list.appendChild(optItem);
      }

      col.appendChild(list);
      dom.matrizGrid.appendChild(col);
    });
  }

  function createMatrizItemElement(disc) {
    const item = document.createElement("div");
    item.className = "matriz-item";
    item.id = `matriz-disc-${disc.id}`;
    item.dataset.id = disc.id;
    item.dataset.periodo = disc.periodo;
    item.setAttribute("role", "button");
    item.tabIndex = 0;

    const eixo = eixosMap.get(disc.eixoId);
    const eixoCor = eixo ? eixo.cor : "#6b7280";
    const eixoNome = eixo ? eixo.nome.replace("Formacao ", "") : "";

    item.innerHTML = `
      <div class="matriz-item-top">
        <span>${escapeHtml(disc.codigo)}</span>
        <span>${disc.cargaHoraria}h</span>
      </div>
      <div class="matriz-item-name">${escapeHtml(disc.nome)}</div>
      <div class="matriz-item-eixo">
        <span class="axis-dot" style="background-color: ${eixoCor};"></span>
        <span>${escapeHtml(eixoNome)}</span>
      </div>
    `;

    item.addEventListener("click", () => openModalDisciplina(disc.id));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModalDisciplina(disc.id);
      }
    });

    return item;
  }

  function createMatrizOptativaElement(periodo) {
    const item = document.createElement("div");
    item.className = "matriz-item matriz-optativa-slot";
    item.dataset.periodo = periodo;
    item.style.borderStyle = "dashed";

    item.innerHTML = `
      <div class="matriz-item-top">
        <span>OPTATIVA</span>
        <span>64h</span>
      </div>
      <div class="matriz-item-name">Optativa ${periodo - 4}</div>
      <div class="matriz-item-eixo">
        <span class="axis-dot" style="background-color: #854d0e;"></span>
        <span>Complementar</span>
      </div>
    `;

    return item;
  }

  /* --------------------------------------------------------------------------
     5. CONEXOES INTERATIVAS (ESTADO VAZIO E ESTADO ATIVO)
     -------------------------------------------------------------------------- */
  function renderConexoesEmptyState() {
    clearSvgConnections();

    if (dom.conexoesLead) {
      dom.conexoesLead.textContent = "Selecione uma carreira acima para visualizar as disciplinas correspondentes.";
    }

    if (dom.conexoesStatus) {
      dom.conexoesStatus.textContent = "";
    }

    if (!dom.conexoesContent) return;

    dom.conexoesContent.innerHTML = `
      <div class="conexoes-empty-state">
        <p class="empty-state-title">Nenhuma trilha de carreira selecionada</p>
        <p class="empty-state-desc">
          Escolha uma das 10 carreiras de TI acima para derivar o fluxo de disciplinas, competencias e eixos de formacao relacionados.
        </p>
      </div>
    `;
  }

  function renderConexoesCarreira(carreira) {
    clearSvgConnections();

    if (!dom.conexoesContent) return;

    if (dom.conexoesLead) {
      dom.conexoesLead.textContent = `Visualizando percurso formativo para ${carreira.titulo}.`;
    }

    if (dom.conexoesStatus) {
      dom.conexoesStatus.textContent = `${carreira.disciplinasChaveIds.length} disciplinas relacionadas na trilha.`;
    }

    // Obter SOMENTE as disciplinas relacionadas a carreira
    const disciplinasTrilha = carreira.disciplinasChaveIds
      .map(id => disciplinasMap.get(id))
      .filter(Boolean);

    // Agrupar disciplinas por periodo
    const periodosMap = new Map();
    disciplinasTrilha.forEach(disc => {
      if (!periodosMap.has(disc.periodo)) {
        periodosMap.set(disc.periodo, []);
      }
      periodosMap.get(disc.periodo).push(disc);
    });

    const periodosOrdenados = Array.from(periodosMap.keys()).sort((a, b) => a - b);

    // Renderizar colunas dos periodos presentes na trilha
    const periodosColsHtml = periodosOrdenados.map(p => {
      const discs = periodosMap.get(p);
      const cardsHtml = discs.map(disc => {
        const eixo = eixosMap.get(disc.eixoId);
        const eixoCor = eixo ? eixo.cor : "#6b7280";
        const eixoNome = eixo ? eixo.nome.replace("Formacao ", "") : "";

        return `
          <div class="diagram-node-card" id="flow-disc-${disc.id}" data-id="${disc.id}" role="button" tabindex="0" title="Clique para ver a ementa de ${escapeHtml(disc.nome)}">
            <span class="diagram-node-code">${escapeHtml(disc.codigo)} &bull; ${disc.cargaHoraria}h</span>
            <span class="diagram-node-name">${escapeHtml(disc.nome)}</span>
            <div class="diagram-node-meta">
              <span>
                <span class="axis-dot" style="background-color: ${eixoCor};"></span>
                ${escapeHtml(eixoNome)}
              </span>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="diagram-period-col" id="flow-period-${p}" data-periodo="${p}">
          <div class="diagram-period-header">${p}o Periodo</div>
          ${cardsHtml}
        </div>
      `;
    }).join("");

    const techPillsHtml = carreira.tecnologias.map(t => {
      return `<span class="diagram-tech-pill">${escapeHtml(t)}</span>`;
    }).join("");

    dom.conexoesContent.innerHTML = `
      <div class="diagram-active-layout">
        <div class="diagram-career-summary">
          <div class="diagram-summary-main">
            <span style="font-size: 0.72rem; font-weight: 700; color: #006633; text-transform: uppercase;">
              ${escapeHtml(carreira.categoria)} &bull; Alinhamento PPC: ${escapeHtml(carreira.nivelAlinhamento)}
            </span>
            <h3 class="diagram-career-title">${escapeHtml(carreira.titulo)}</h3>
            <p class="diagram-career-desc">${escapeHtml(carreira.descricaoCurta)}</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <span style="font-size: 0.7rem; font-weight: 700; color: #6b7280; text-transform: uppercase;">Tecnologias e Conceitos-Chave:</span>
            <div class="diagram-tech-list">
              ${techPillsHtml}
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 0.75rem; font-weight: 700; color: #374151; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.03em;">
            Sequencia de Disciplinas da Trilha no Curso:
          </div>
          <div class="diagram-flow-container" id="diagram-flow-container">
            ${periodosColsHtml}
          </div>
        </div>
      </div>
    `;

    // Conectar eventos de clique nos nós do fluxo
    dom.conexoesContent.querySelectorAll(".diagram-node-card").forEach(node => {
      const discId = node.dataset.id;
      node.addEventListener("click", () => openModalDisciplina(discId));
      node.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModalDisciplina(discId);
        }
      });
    });

    // Calcular e desenhar conexões no SVG delimitado
    requestAnimationFrame(() => {
      drawConnectionsForCareer(carreira, periodosOrdenados);
    });
  }

  /* --------------------------------------------------------------------------
     6. CALCULO E TRAÇADO DAS LINHAS EM SVG (ESTRITAMENTE DELIMITADO)
     -------------------------------------------------------------------------- */
  function clearSvgConnections() {
    if (dom.svgConnectionsLayer) {
      dom.svgConnectionsLayer.innerHTML = "";
    }
  }

  function drawConnectionsForCareer(carreira, periodosOrdenados) {
    clearSvgConnections();

    if (!dom.conexoesContainer || !dom.svgConnectionsLayer) return;

    const containerRect = dom.conexoesContainer.getBoundingClientRect();
    const flowContainer = document.getElementById("diagram-flow-container");
    if (!flowContainer) return;

    // Conectar as colunas sequenciais de períodos da carreira
    for (let i = 0; i < periodosOrdenados.length - 1; i++) {
      const p1 = periodosOrdenados[i];
      const p2 = periodosOrdenados[i + 1];

      const col1 = document.getElementById(`flow-period-${p1}`);
      const col2 = document.getElementById(`flow-period-${p2}`);

      if (col1 && col2) {
        const r1 = col1.getBoundingClientRect();
        const r2 = col2.getBoundingClientRect();

        // Coordenadas relativas ao container pai estrito
        const x1 = Math.min(containerRect.width, Math.max(0, r1.right - containerRect.left));
        const y1 = Math.min(containerRect.height, Math.max(0, r1.top - containerRect.top + 16));

        const x2 = Math.min(containerRect.width, Math.max(0, r2.left - containerRect.left));
        const y2 = Math.min(containerRect.height, Math.max(0, r2.top - containerRect.top + 16));

        // Curva de transicao suave entre estagios da trilha
        const deltaX = Math.abs(x2 - x1);
        const cp1x = x1 + deltaX * 0.5;
        const cp1y = y1;
        const cp2x = x2 - deltaX * 0.5;
        const cp2y = y2;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`);
        path.setAttribute("class", "svg-conn-line active");
        path.setAttribute("marker-end", "url(#arrow)");

        dom.svgConnectionsLayer.appendChild(path);
      }
    }
  }

  /* --------------------------------------------------------------------------
     7. GERENCIAMENTO DE SELECAO E ATUALIZACAO VISUAL
     -------------------------------------------------------------------------- */
  function handleSelectCarreira(carreiraId) {
    if (state.selectedCarreiraId === carreiraId) {
      // Clique na mesma carreira desmarca
      handleClearCarreira();
      return;
    }

    state.selectedCarreiraId = carreiraId;
    updateUI();
  }

  function handleClearCarreira() {
    state.selectedCarreiraId = null;
    updateUI();
  }

  function updateUI() {
    const carreira = state.selectedCarreiraId ? carreirasMap.get(state.selectedCarreiraId) : null;

    // 1. Atualizar botoes de carreira
    document.querySelectorAll(".carreira-btn").forEach(btn => {
      const isSelected = Boolean(carreira && btn.dataset.id === carreira.id);
      btn.classList.toggle("active", isSelected);
      btn.setAttribute("aria-checked", isSelected ? "true" : "false");
    });

    if (dom.btnLimparCarreira) {
      dom.btnLimparCarreira.hidden = !carreira;
    }

    // 2. Atualizar area de Conexoes Interativas
    if (carreira) {
      renderConexoesCarreira(carreira);
    } else {
      renderConexoesEmptyState();
    }

    // 3. Atualizar Matriz Curricular (destaque somente visual, sem setas)
    const activeDisciplineIds = carreira ? new Set(carreira.disciplinasChaveIds) : null;

    document.querySelectorAll(".matriz-item").forEach(item => {
      const id = item.dataset.id;
      if (!id) return; // Optativas neutras

      if (!activeDisciplineIds) {
        // Nenhuma carreira selecionada: tudo neutro
        item.classList.remove("highlighted", "muted");
      } else if (activeDisciplineIds.has(id)) {
        // Disciplina pertencente a carreira
        item.classList.add("highlighted");
        item.classList.remove("muted");
      } else {
        // Disciplina nao relacionada
        item.classList.remove("highlighted");
        item.classList.add("muted");
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. MODAL / INSPETOR DISCRETO DE DISCIPLINA
     -------------------------------------------------------------------------- */
  function openModalDisciplina(discId) {
    const disc = disciplinasMap.get(discId);
    if (!disc || !dom.modalDisciplina) return;

    state.modalDisciplinaId = discId;

    const eixo = eixosMap.get(disc.eixoId);
    const eixoNome = eixo ? eixo.nome : "Geral";

    if (dom.modalDiscCodigo) dom.modalDiscCodigo.textContent = disc.codigo;
    if (dom.modalDiscPeriodo) dom.modalDiscPeriodo.textContent = `${disc.periodo}o Periodo`;
    if (dom.modalDiscCh) dom.modalDiscCh.textContent = `${disc.cargaHoraria} Horas`;
    if (dom.modalDiscEixo) dom.modalDiscEixo.textContent = eixoNome;
    if (dom.modalDiscTitulo) dom.modalDiscTitulo.textContent = disc.nome;
    if (dom.modalDiscEmenta) dom.modalDiscEmenta.textContent = disc.ementaResumida;

    // Pre-requisitos
    if (dom.modalDiscPrereq) {
      if (disc.preRequisitos && disc.preRequisitos.length > 0) {
        const prereqNames = disc.preRequisitos.map(pid => {
          const p = disciplinasMap.get(pid);
          return p ? `${p.nome} (${p.codigo})` : pid;
        }).join(", ");
        dom.modalDiscPrereq.textContent = `Exige conclusao previa de: ${prereqNames}.`;
      } else {
        dom.modalDiscPrereq.textContent = "Nenhum pre-requisito obrigatorio.";
      }
    }

    // Competencias
    if (dom.modalDiscCompetencias) {
      dom.modalDiscCompetencias.innerHTML = (disc.competencias || []).map(comp => {
        return `<li><span>${escapeHtml(comp)}</span></li>`;
      }).join("");
    }

    // Carreiras relacionadas
    if (dom.modalDiscCarreiras) {
      dom.modalDiscCarreiras.innerHTML = (disc.carreirasRelacionadas || []).map(cid => {
        const c = carreirasMap.get(cid);
        if (!c) return "";
        return `
          <button type="button" class="modal-career-chip" data-career-id="${c.id}">
            ${escapeHtml(c.titulo)} &rarr;
          </button>
        `;
      }).join("");

      dom.modalDiscCarreiras.querySelectorAll(".modal-career-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const cid = chip.dataset.careerId;
          closeModalDisciplina();
          handleSelectCarreira(cid);
        });
      });
    }

    dom.modalDisciplina.hidden = false;
    dom.modalDisciplina.setAttribute("aria-hidden", "false");
  }

  function closeModalDisciplina() {
    state.modalDisciplinaId = null;
    if (dom.modalDisciplina) {
      dom.modalDisciplina.hidden = true;
      dom.modalDisciplina.setAttribute("aria-hidden", "true");
    }
  }

  /* --------------------------------------------------------------------------
     9. EVENTOS GLOBAIS
     -------------------------------------------------------------------------- */
  function setupEventListeners() {
    if (dom.btnLimparCarreira) {
      dom.btnLimparCarreira.addEventListener("click", handleClearCarreira);
    }

    if (dom.btnModalFechar) {
      dom.btnModalFechar.addEventListener("click", closeModalDisciplina);
    }

    if (dom.modalDisciplina) {
      dom.modalDisciplina.addEventListener("click", (e) => {
        if (e.target === dom.modalDisciplina) {
          closeModalDisciplina();
        }
      });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (dom.modalDisciplina && !dom.modalDisciplina.hidden) {
          closeModalDisciplina();
        } else if (state.selectedCarreiraId) {
          handleClearCarreira();
        }
      }
    });

    // Recalcular conexoes no redimensionamento da janela
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state.selectedCarreiraId) {
          const carreira = carreirasMap.get(state.selectedCarreiraId);
          if (carreira) {
            const periodosOrdenados = Array.from(new Set(
              carreira.disciplinasChaveIds
                .map(id => disciplinasMap.get(id))
                .filter(Boolean)
                .map(d => d.periodo)
            )).sort((a, b) => a - b);

            drawConnectionsForCareer(carreira, periodosOrdenados);
          }
        }
      }, 100);
    });
  }

  /* --------------------------------------------------------------------------
     10. UTILITARIOS
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
