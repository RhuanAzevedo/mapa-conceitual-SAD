/* Interface do mapa conceitual; os dados acadêmicos ficam em data.js. */
(function () {
  "use strict";
  const state = {
    carreira: null,
    disciplina: null,
    view: "connections",
    disciplineSidebarOpen: false,
    careerPanelOpen: false
  };
  const get = id => document.getElementById(id);
  const ui = {
    careers: get("grid-carreiras"), matrix: get("grid-semestres"),
    board: get("connections-board"), empty: get("connections-empty"),
    source: get("connection-source"), list: get("integrated-disciplinas-list"),
    svg: get("connections-svg"), paths: get("svg-paths-group"),
    details: get("sidebar-content"), sidebar: get("sidebar-panel"),
    careerDetails: get("career-content"), careerPanel: get("career-panel"),
    options: get("optativas-panel"),
    layout: get("content-layout"), toggleDetails: get("btn-toggle-details"),
    toggleCareer: get("btn-toggle-career"),
    connectionsView: get("connections-view"), matrixView: get("matrix-view"),
    viewButtons: document.querySelectorAll(".view-button"),
    clear: get("btn-banner-clear"), note: get("matrix-note")
  };
  const discs = new Map(BSI_DATA.disciplinas.map(d => [d.id, d]));
  const careers = new Map(BSI_DATA.carreiras.map(c => [c.id, c]));
  const axes = new Map(BSI_DATA.eixos.map(e => [e.id, e]));
  let frame = 0;
  let renderedCareerId = null;
  let renderedDisciplineId = null;
  let renderedConnectionsCareerId = null;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]);
  }

  function selectCareer(id) {
    const hadCareer = Boolean(state.carreira);
    state.carreira = state.carreira === id ? null : id;
    if (!state.carreira) state.careerPanelOpen = false;
    else if (!hadCareer) state.careerPanelOpen = true;
    update();
  }

  function selectDiscipline(id) {
    state.disciplina = state.disciplina === id ? null : id;
    state.disciplineSidebarOpen = Boolean(state.disciplina);
    ui.options.hidden = true;
    update();
    if (state.disciplineSidebarOpen && window.innerWidth > 900) {
      requestAnimationFrame(() => {
        if (ui.sidebar.getBoundingClientRect().top > window.innerHeight * 0.75) {
          ui.sidebar.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start"
          });
        }
      });
    }
  }

  function clear() {
    state.carreira = null;
    state.disciplina = null;
    state.disciplineSidebarOpen = false;
    state.careerPanelOpen = false;
    ui.options.hidden = true;
    update();
  }

  function setView(view) {
    if (state.view === view) return;
    state.view = view;
    ui.connectionsView.hidden = view !== "connections";
    ui.matrixView.hidden = view !== "matrix";
    ui.viewButtons.forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    scheduleConnections();
  }

  function syncPanels() {
    const disciplineOpen = Boolean(state.disciplina && state.disciplineSidebarOpen);
    const careerOpen = Boolean(state.carreira && state.careerPanelOpen);
    ui.sidebar.hidden = !disciplineOpen;
    ui.careerPanel.hidden = !careerOpen;
    ui.layout.classList.toggle("sidebar-open", disciplineOpen);
    document.body.classList.toggle("discipline-sidebar-open", disciplineOpen);
    document.body.classList.toggle("career-panel-open", careerOpen);
    ui.toggleDetails.hidden = !state.disciplina;
    ui.toggleDetails.textContent = disciplineOpen ? "Recolher disciplina" : "Ver disciplina";
    ui.toggleDetails.setAttribute("aria-expanded", String(disciplineOpen));
    ui.toggleCareer.hidden = !state.carreira;
    ui.toggleCareer.textContent = careerOpen ? "Recolher carreira" : "Ver carreira";
    ui.toggleCareer.setAttribute("aria-expanded", String(careerOpen));
    scheduleConnections();
  }

  function closeDisciplineSidebar() {
    state.disciplineSidebarOpen = false;
    syncPanels();
  }

  function closeCareerPanel() {
    state.careerPanelOpen = false;
    syncPanels();
  }

  function renderCareers() {
    BSI_DATA.carreiras.forEach(c => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "career-card";
      button.dataset.id = c.id;
      button.setAttribute("aria-pressed", "false");
      button.innerHTML =
        '<span class="career-category">' + esc(c.categoria) + '</span>' +
        '<strong class="career-title">' + esc(c.titulo) + '</strong>' +
        '<span class="career-meta">' + c.disciplinasChaveIds.length +
        ' disciplinas relacionadas <span aria-hidden="true">→</span></span>';
      button.addEventListener("click", () => selectCareer(c.id));
      ui.careers.appendChild(button);
    });
  }

  function disciplineCard(d) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "disciplina-card";
    button.dataset.id = d.id;
    button.style.setProperty("--eixo-cor", axes.get(d.eixoId)?.cor || "#64748b");
    button.setAttribute("aria-label", d.nome + ", " + d.cargaHoraria + " horas");
    button.innerHTML =
      '<span class="card-top-row"><span>' + esc(d.codigo) + '</span><span>' + d.cargaHoraria + 'h</span></span>' +
      '<span class="card-name">' + esc(d.nome) + '</span>' +
      '<span class="card-axis">' + esc(axes.get(d.eixoId)?.nome || "") + '</span>';
    button.addEventListener("click", () => selectDiscipline(d.id));
    return button;
  }

  function renderMatrix() {
    const hours = [320, 320, 320, 320, 320, 320, 288, 256];
    for (let p = 1; p <= 8; p++) {
      const column = document.createElement("div");
      column.className = "semestre-column";
      column.innerHTML = '<div class="semestre-header"><strong>' + p + 'º período</strong><span>' + hours[p - 1] + 'h</span></div>';
      BSI_DATA.disciplinas.filter(d => d.periodo === p && d.tipo === "Obrigatoria")
        .forEach(d => column.appendChild(disciplineCard(d)));
      if (p >= 5) {
        const options = BSI_DATA.disciplinas.filter(d => d.periodo === p && d.tipo === "Optativa");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "disciplina-card optativa-card";
        button.dataset.periodo = String(p);
        button.innerHTML =
          '<span class="card-top-row"><span>OPTATIVA</span><span>64h</span></span>' +
          '<span class="card-name">Disciplina Optativa ' + (p - 4) + '</span>' +
          '<span class="card-axis">' + options.length + ' opções</span>';
        button.addEventListener("click", () => showOptions(p, options));
        column.appendChild(button);
      }
      ui.matrix.appendChild(column);
    }
  }

  function renderConnections(career) {
    ui.paths.replaceChildren();
    ui.list.replaceChildren();
    ui.board.hidden = !career;
    ui.empty.hidden = Boolean(career);
    if (!career) return;
    ui.source.innerHTML =
      '<span class="connection-kicker">Carreira selecionada</span>' +
      '<strong>' + esc(career.titulo) + '</strong>' +
      '<span>' + career.disciplinasChaveIds.length + ' disciplinas na trilha</span>';
    for (let p = 1; p <= 8; p++) {
      const matches = career.disciplinasChaveIds.map(id => discs.get(id)).filter(d => d && d.periodo === p);
      if (!matches.length) continue;
      const group = document.createElement("div");
      group.className = "integrated-period-group";
      group.innerHTML = '<h3>' + p + 'º período</h3>';
      matches.forEach(d => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "integrated-item";
        button.dataset.id = d.id;
        button.innerHTML = '<span>' + esc(d.codigo) + ' · ' + d.cargaHoraria + 'h</span><strong>' + esc(d.nome) + '</strong>';
        button.addEventListener("click", () => selectDiscipline(d.id));
        group.appendChild(button);
      });
      ui.list.appendChild(group);
    }
    scheduleConnections();
  }

  function heading(type, title, closeAction) {
    return '<div class="detail-heading"><span>' + type +
      '</span><button type="button" class="text-button" ' + closeAction + '>Fechar</button></div><h2>' + esc(title) + '</h2>';
  }

  function careerDetail(c) {
    const groups = [];
    for (let p = 1; p <= 8; p++) {
      const matches = c.disciplinasChaveIds.map(id => discs.get(id)).filter(d => d && d.periodo === p);
      if (matches.length) groups.push(
        '<li><strong>' + p + 'º período:</strong> ' +
        matches.map(d => '<button type="button" class="inline-link" data-career-disc-id="' + esc(d.id) + '">' + esc(d.nome) + '</button>').join(", ") +
        '</li>'
      );
    }
    const careerAxes = c.eixosChave.map(id => axes.get(id)?.nome).filter(Boolean);
    ui.careerDetails.innerHTML =
      heading("Trilha de Carreira", c.titulo, "data-close-career") +
      '<p>' + esc(c.descricaoDetalhada) + '</p>' +
      '<p class="detail-meta">Alinhamento com o PPC: ' + esc(c.nivelAlinhamento) + '</p>' +
      '<h3>Eixos de formação</h3><p>' + careerAxes.map(esc).join(" · ") + '</p>' +
      '<h3>Disciplinas da trilha</h3><ul>' + groups.join("") + '</ul>' +
      '<h3>Tecnologias e conceitos</h3><p>' + c.tecnologias.map(esc).join(" · ") + '</p>' +
      '<h3>Áreas de atuação</h3><ul>' + c.areasAtuacao.map(a => '<li>' + esc(a) + '</li>').join("") + '</ul>';
  }

  function disciplineDetail(d) {
    const prereqs = d.preRequisitos.map(id => discs.get(id)?.nome).filter(Boolean);
    const related = d.carreirasRelacionadas.map(id => careers.get(id)?.titulo).filter(Boolean);
    ui.details.innerHTML =
      heading("Disciplina", d.nome, "data-close-discipline") +
      '<p class="detail-meta">' + esc(d.codigo) + ' · ' + d.cargaHoraria + 'h · ' + esc(d.tipo) + ' · ' + d.periodo + 'º período</p>' +
      '<p class="detail-meta">' + esc(axes.get(d.eixoId)?.nome || "") + '</p>' +
      '<h3>Ementa resumida</h3><p>' + esc(d.ementaResumida) + '</p>' +
      '<h3>Competências</h3><ul>' + d.competencias.map(item => '<li>' + esc(item) + '</li>').join("") + '</ul>' +
      '<h3>Pré-requisitos</h3><p>' + (prereqs.length ? prereqs.map(esc).join(", ") : "Nenhum pré-requisito obrigatório") + '</p>' +
      '<h3>Carreiras relacionadas</h3><p>' + related.map(esc).join(" · ") + '</p>';
  }

  function showOptions(period, options) {
    state.disciplina = null;
    state.disciplineSidebarOpen = false;
    update();
    ui.options.innerHTML =
      heading("Optativas", "Optativas do " + period + "º período", "data-close-options") +
      '<p>O estudante cursa uma disciplina optativa de 64 horas neste período.</p><ul>' +
      options.map(d => '<li><button type="button" class="inline-link" data-disc-id="' + esc(d.id) + '">' + esc(d.nome) + '</button></li>').join("") + '</ul>';
    ui.options.hidden = false;
  }

  function update() {
    const career = careers.get(state.carreira);
    const disc = discs.get(state.disciplina);
    const ids = new Set(career?.disciplinasChaveIds || []);
    ui.careers.querySelectorAll(".career-card").forEach(card => {
      const selected = card.dataset.id === state.carreira;
      card.classList.toggle("selected", selected);
      card.setAttribute("aria-pressed", String(selected));
    });
    ui.matrix.querySelectorAll(".disciplina-card").forEach(card => {
      const id = card.dataset.id;
      const optativa = !id && career?.disciplinasChaveIds.some(did => {
        const d = discs.get(did);
        return d?.tipo === "Optativa" && d.periodo === Number(card.dataset.periodo);
      });
      card.classList.toggle("highlighted", Boolean(career && (ids.has(id) || optativa)));
      card.classList.toggle("muted", Boolean(career && !ids.has(id) && !optativa));
      card.classList.toggle("selected", id === state.disciplina);
    });
    ui.clear.hidden = !career;
    ui.note.textContent = career
      ? career.disciplinasChaveIds.length + ' disciplinas destacadas para ' + career.titulo + '.'
      : "Selecione uma carreira para destacar as disciplinas na matriz.";
    if (renderedConnectionsCareerId !== state.carreira) {
      renderConnections(career);
      renderedConnectionsCareerId = state.carreira;
    }
    ui.list.querySelectorAll(".integrated-item").forEach(item =>
      item.classList.toggle("selected", item.dataset.id === state.disciplina));
    if (renderedDisciplineId !== state.disciplina) {
      if (disc) disciplineDetail(disc);
      else ui.details.innerHTML = "";
      renderedDisciplineId = state.disciplina;
    }
    if (renderedCareerId !== state.carreira) {
      if (career) careerDetail(career);
      else ui.careerDetails.innerHTML = "";
      renderedCareerId = state.carreira;
    }
    syncPanels();
  }

  function scheduleConnections() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(drawConnections);
  }

  function drawConnections() {
    ui.paths.replaceChildren();
    if (!state.carreira || ui.connectionsView.hidden || ui.board.hidden || window.innerWidth < 768) return;
    const box = ui.board.getBoundingClientRect();
    const source = ui.source.getBoundingClientRect();
    if (box.width < 390 || !box.height) return;
    ui.svg.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
    const clamp = (n, max) => Math.max(0, Math.min(max, n));
    const x1 = clamp(source.right - box.left, box.width);
    const y1 = clamp(source.top - box.top + source.height / 2, box.height);
    ui.list.querySelectorAll(".integrated-item").forEach(item => {
      const target = item.getBoundingClientRect();
      const x2 = clamp(target.left - box.left, box.width);
      const y2 = clamp(target.top - box.top + target.height / 2, box.height);
      const mid = (x1 + x2) / 2;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M " + x1 + " " + y1 + " C " + mid + " " + y1 + ", " + mid + " " + y2 + ", " + x2 + " " + y2);
      path.setAttribute("class", "connection-path");
      ui.paths.appendChild(path);
    });
  }

  ui.clear.addEventListener("click", clear);
  ui.viewButtons.forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
  ui.toggleDetails.addEventListener("click", () => {
    state.disciplineSidebarOpen = !state.disciplineSidebarOpen;
    syncPanels();
  });
  ui.toggleCareer.addEventListener("click", () => {
    state.careerPanelOpen = !state.careerPanelOpen;
    syncPanels();
  });
  ui.details.addEventListener("click", event => {
    if (event.target.closest("[data-close-discipline]")) closeDisciplineSidebar();
  });
  ui.careerDetails.addEventListener("click", event => {
    if (event.target.closest("[data-close-career]")) closeCareerPanel();
    const link = event.target.closest("[data-career-disc-id]");
    if (link) selectDiscipline(link.dataset.careerDiscId);
  });
  ui.options.addEventListener("click", event => {
    if (event.target.closest("[data-close-options]")) ui.options.hidden = true;
    const link = event.target.closest("[data-disc-id]");
    if (link) selectDiscipline(link.dataset.discId);
  });
  window.addEventListener("resize", scheduleConnections);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleConnections).observe(ui.board);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && state.disciplineSidebarOpen) closeDisciplineSidebar();
    else if (event.key === "Escape" && state.careerPanelOpen) closeCareerPanel();
    else if (event.key === "Escape" && (state.carreira || state.disciplina)) clear();
  });
  renderCareers();
  renderMatrix();
  update();
})();
