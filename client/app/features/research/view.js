const escapeHTML = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const parseMarkdown = (text = '') => {
  const source = String(text || '');
  return window.marked?.parse ? window.marked.parse(escapeHTML(source)) : escapeHTML(source).replace(/\n/g, '<br>');
};

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('es-UY', { day: '2-digit', month: 'short', year: 'numeric' });
}

export class ResearchView {
  constructor(repository) {
    this.repository = repository;
    this.content = document.getElementById('content');
    this.activeTag = 'all';
    this.activeType = 'all';
    this.activeSection = 'all';
    this.query = '';
    this.selectedId = repository?.selectedInitialId || null;
  }

  render() {
    const { entities, hubSections, inclusiveSections, navItems, typeOrder, entityTypes } = this.repository.getSnapshot();
    const typeLabels = { all: 'Todo', ...entityTypes };
    const uniqueTags = this.repository.getUniqueTags();

    this.content.innerHTML = `
      <main class="research-page" aria-labelledby="research-title">
        <nav class="research-system-header" aria-label="Navegación del repositorio de investigación">
          ${navItems.map(([id, label]) => `<a href="#${id}" data-research-jump="${id}">${label}</a>`).join('')}
        </nav>

        <section class="research-hero" aria-labelledby="research-title">
          <div class="research-hero-copy">
            <span class="research-kicker">Infraestructura institucional de conocimiento</span>
            <h1 id="research-title">Ecosistema de Investigación Educativa Continua</h1>
            <p>La escuela no solo enseña. Produce, conecta y versiona conocimiento sobre cómo aprenden las personas.</p>
          </div>
          <aside class="research-hero-index" aria-label="Resumen del sistema">
            <a href="#research-archive" data-filter-type="research"><strong>${entities.filter((entity) => entity.type === 'research').length}</strong><span>papers vivos</span></a>
            <a href="#knowledge-graph"><strong>${this.repository.graphEdges().length}</strong><span>relaciones semánticas</span></a>
            <a href="#inclusive-education" data-filter-section="Inclusive Education"><strong>${this.repository.filterEntities({ section: 'Inclusive Education' }).length}</strong><span>recursos de inclusión</span></a>
          </aside>
        </section>

        <section class="research-index" id="knowledge-index" aria-labelledby="knowledge-index-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Arquitectura de información</span>
              <h2 id="knowledge-index-title">Sub-vistas especializadas interconectadas</h2>
            </div>
            <p>El repositorio se organiza como una biblioteca viva: cada sub-vista comparte entidades, tags, citas internas y relaciones de evidencia.</p>
          </div>
          <div class="research-hub-grid">
            ${hubSections.map(([title, desc]) => `
              <button class="research-hub-card" type="button" data-filter-section="${title}">
                <span>${title}</span>
                <small>${desc}</small>
              </button>
            `).join('')}
          </div>
        </section>

        <section class="research-archive" id="research-archive" aria-labelledby="archive-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Repositorio navegable</span>
              <h2 id="archive-title">Descubrimiento, filtros y trazabilidad</h2>
            </div>
            <p>Buscar por hipótesis, normativa, docente, cohorte, dataset, habilidad cognitiva o relación conceptual.</p>
          </div>

          <form class="research-controls" role="search" aria-label="Búsqueda contextual del repositorio">
            <label class="research-search">
              <span>Buscar</span>
              <input id="research-query" type="search" autocomplete="off" placeholder="Ej. Salamanca, metacognición, AYEX, cohorte 2024…" />
            </label>
            <label class="research-select">
              <span>Tipo de entidad</span>
              <select id="research-type">
                ${typeOrder.map((type) => `<option value="${type}">${typeLabels[type]}</option>`).join('')}
              </select>
            </label>
            <label class="research-select">
              <span>Sub-vista</span>
              <select id="research-section">
                <option value="all">Todas</option>
                ${hubSections.map(([title]) => `<option value="${title}">${title}</option>`).join('')}
              </select>
            </label>
          </form>

          <div class="research-tag-rail" role="group" aria-label="Tags semánticos">
            <button class="is-active" type="button" data-filter-tag="all">Todos los tags</button>
            ${uniqueTags.map((tag) => `<button type="button" data-filter-tag="${tag}">${tag}</button>`).join('')}
          </div>

          <p class="research-results-count" id="research-results-count" aria-live="polite"></p>
          <div class="research-results" id="research-results"></div>
        </section>

        <section class="research-graph-section" id="knowledge-graph" aria-labelledby="graph-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Knowledge graph real</span>
              <h2 id="graph-title">Mapa epistemológico navegable</h2>
            </div>
            <p>Cada nodo representa una entidad del repositorio. Las conexiones se calculan por citas internas explícitas y tags compartidos.</p>
          </div>
          <div class="research-graph-layout">
            <div class="research-node-list" id="research-node-list" aria-label="Nodos del grafo"></div>
            <div class="research-edge-list" aria-labelledby="edge-title">
              <h3 id="edge-title">Relaciones detectadas</h3>
              <div id="research-edge-list"></div>
            </div>
            <aside class="research-entity-panel" id="research-entity-panel" aria-live="polite"></aside>
          </div>
        </section>

        <section class="research-inclusive" id="inclusive-education" aria-labelledby="inclusive-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Sub-vista especializada</span>
              <h2 id="inclusive-title">Educación Inclusiva como biblioteca jurídica viva</h2>
            </div>
            <p>Normativa, prestaciones estatales, bibliografía y recursos pedagógicos conectados con investigaciones y observaciones.</p>
          </div>
          <div class="inclusive-sections" aria-label="Secciones de educación inclusiva">
            ${inclusiveSections.map((section) => `<button type="button" data-inclusive-section="${section}">${section}</button>`).join('')}
          </div>
          <div class="inclusive-grid" id="inclusive-grid"></div>
        </section>

        <section class="research-reader" id="research-reader" aria-labelledby="reader-title">
          <div class="research-section-header">
            <div>
              <span class="research-kicker">Experiencia de lectura</span>
              <h2 id="reader-title">Paper interactivo, versionado y citable</h2>
            </div>
            <p>Lectura larga con hipótesis, metodología, evidencia, timeline, datasets, normativa y bibliografía relacionada.</p>
          </div>
          <div class="research-reader-shell" id="research-reader-shell"></div>
        </section>
      </main>
    `;

    this.updateResults();
    this.updateGraph();
    this.updateInclusive();
    this.updateReader();
  }

  bindInteractions() {
    this.content.querySelectorAll('[data-research-jump]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.content.querySelector(`#${link.dataset.researchJump}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    this.content.querySelector('#research-query')?.addEventListener('input', (event) => {
      this.query = event.target.value.trim().toLowerCase();
      this.updateResults();
      this.updateGraph();
    });

    this.content.querySelector('#research-type')?.addEventListener('change', (event) => {
      this.activeType = event.target.value;
      this.updateResults();
      this.updateGraph();
    });

    this.content.querySelector('#research-section')?.addEventListener('change', (event) => {
      this.activeSection = event.target.value;
      this.updateResults();
      this.updateGraph();
    });

    this.content.querySelectorAll('[data-filter-tag]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeTag = button.dataset.filterTag;
        this.content.querySelectorAll('[data-filter-tag]').forEach((item) => item.classList.toggle('is-active', item === button));
        this.updateResults();
        this.updateGraph();
      });
    });

    this.content.querySelectorAll('[data-filter-type]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeType = button.dataset.filterType;
        const select = this.content.querySelector('#research-type');
        if (select) select.value = this.activeType;
        this.updateResults();
        this.updateGraph();
      });
    });

    this.content.querySelectorAll('[data-filter-section]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeSection = button.dataset.filterSection;
        const select = this.content.querySelector('#research-section');
        if (select) select.value = this.activeSection;
        this.updateResults();
        this.updateGraph();
      });
    });

    this.content.querySelectorAll('[data-inclusive-section]').forEach((button) => {
      button.addEventListener('click', () => {
        const query = button.dataset.inclusiveSection.toLowerCase();
        const input = this.content.querySelector('#research-query');
        this.activeSection = 'Inclusive Education';
        this.query = query.includes('normativa nacional') ? 'normativa nacional' : query.includes('normativa internacional') ? 'normativa internacional' : query.includes('servicios') ? 'servicio de apoyo' : query.includes('bibliográfico') ? 'bibliografía' : query;
        if (input) input.value = this.query;
        const select = this.content.querySelector('#research-section');
        if (select) select.value = this.activeSection;
        this.updateResults();
        this.updateGraph();
        this.content.querySelector('#research-archive')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  filteredEntities() {
    return this.repository.filterEntities({
      query: this.query,
      type: this.activeType,
      section: this.activeSection,
      tag: this.activeTag,
    });
  }

  updateResults() {
    const results = this.filteredEntities();
    const count = this.content.querySelector('#research-results-count');
    const container = this.content.querySelector('#research-results');
    if (!container) return;
    if (count) count.textContent = `${results.length} entidad${results.length === 1 ? '' : 'es'} en la vista actual`;
    container.innerHTML = results.length ? results.map((entity) => this.renderEntityCard(entity)).join('') : '<div class="research-empty">No se encontraron entidades. Ajustá búsqueda, tags o sub-vista.</div>';
    container.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
  }

  updateGraph() {
    const scoped = this.filteredEntities().slice(0, 18);
    const nodes = this.content.querySelector('#research-node-list');
    const edges = this.content.querySelector('#research-edge-list');
    if (!nodes || !edges) return;
    nodes.innerHTML = scoped.map((entity) => `
      <button class="research-node" type="button" data-open-entity="${entity.id}">
        <span>${this.repository.entityTypes[entity.type]}</span>
        <strong>${entity.title}</strong>
        <small>${entity.tags.slice(0, 3).join(' · ')}</small>
      </button>
    `).join('');
    const scopedEdges = this.repository.graphEdges(scoped);
    edges.innerHTML = scopedEdges.length ? scopedEdges.map(({ source, target, shared }) => `
      <button class="research-edge" type="button" data-open-entity="${source.id}">
        <span>${source.title}</span>
        <em>↔ ${target.title}</em>
        <small>${shared.length ? shared.join(' · ') : 'cita interna explícita'}</small>
      </button>
    `).join('') : '<p class="research-empty">No hay relaciones suficientes con los filtros actuales.</p>';
    [...nodes.querySelectorAll('[data-open-entity]'), ...edges.querySelectorAll('[data-open-entity]')].forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
    this.renderEntityPanel(this.repository.getEntityById(this.selectedId) || scoped[0] || this.repository.getSnapshot().entities[0]);
  }

  updateInclusive() {
    const container = this.content.querySelector('#inclusive-grid');
    if (!container) return;
    const inclusive = this.repository.filterEntities({ section: 'Inclusive Education' });
    container.innerHTML = inclusive.map((entity) => this.renderInclusiveCard(entity)).join('');
    container.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
  }

  updateReader() {
    const shell = this.content.querySelector('#research-reader-shell');
    const selected = this.repository.getEntityById(this.selectedId) || this.repository.getEntityById(this.repository.selectedInitialId);
    if (!shell || !selected) return;
    const related = this.repository.relatedEntities(selected, 10);
    shell.innerHTML = `
      <aside class="reader-rail" aria-label="Metadatos del documento">
        <span>${this.repository.entityTypes[selected.type]}</span>
        <strong>${selected.status}</strong>
        <small>Actualizado ${formatDate(selected.updated)}</small>
        <small>${selected.owner}</small>
        <div>${selected.tags.map((tag) => `<button type="button" data-filter-tag-reader="${tag}">${tag}</button>`).join('')}</div>
      </aside>
      <article class="reader-document">
        <header>
          <p class="research-kicker">${selected.id}</p>
          <h3>${selected.title}</h3>
          <p>${selected.subtitle}</p>
        </header>
        <section>
          <h4>Resumen contextual</h4>
          <p>${selected.summary}</p>
        </section>
        ${selected.hypothesis ? `<section><h4>Hipótesis</h4><p>${selected.hypothesis}</p></section>` : ''}
        ${selected.methodology ? `<section><h4>Metodología</h4><p>${selected.methodology}</p></section>` : ''}
        ${selected.evidence ? `<section><h4>Evidencia y datasets</h4><ul>${selected.evidence.map((item) => `<li>${item}</li>`).join('')}</ul></section>` : ''}
        ${selected.articles ? `<section><h4>Artículos / ejes relevantes</h4><ul>${selected.articles.map((item) => `<li>${item}</li>`).join('')}</ul></section>` : ''}
        ${selected.requirements ? `<section><h4>Requisitos orientativos</h4><ul>${selected.requirements.map((item) => `<li>${item}</li>`).join('')}</ul></section>` : ''}
        ${selected.purpose ? `<section><h4>Propósito y elegibilidad</h4><p>${selected.purpose}</p><p><strong>Organismo:</strong> ${selected.responsible}</p><p><strong>Elegibilidad:</strong> ${selected.eligibility}</p></section>` : ''}
        ${selected.authors ? `<section><h4>Ficha bibliográfica</h4><p><strong>Autores:</strong> ${selected.authors}</p><p><strong>ISBN / referencia:</strong> ${selected.isbn}</p></section>` : ''}
        ${selected.markdown ? `<section class="reader-markdown"><h4>Lectura enriquecida</h4>${parseMarkdown(selected.markdown)}</section>` : ''}
        ${selected.versions ? `<section><h4>Timeline de evolución</h4><ol class="reader-timeline">${selected.versions.map(([version, date, note]) => `<li><time>${formatDate(date)}</time><strong>${version}</strong><span>${note}</span></li>`).join('')}</ol></section>` : ''}
        <section>
          <h4>Referencias cruzadas y citación interna</h4>
          <div class="reader-relations">
            ${related.map((entity) => `<button type="button" data-open-entity="${entity.id}"><span>${this.repository.entityTypes[entity.type]}</span><strong>${entity.title}</strong><small>${entity.tags.filter((tag) => selected.tags.includes(tag)).join(' · ') || 'cita interna'}</small></button>`).join('')}
          </div>
        </section>
        ${selected.official ? `<a class="reader-official" href="${selected.official}" target="_blank" rel="noopener noreferrer">Abrir referencia oficial</a>` : ''}
      </article>
    `;
    shell.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
    shell.querySelectorAll('[data-filter-tag-reader]').forEach((button) => {
      button.addEventListener('click', () => {
        this.activeTag = button.dataset.filterTagReader;
        this.content.querySelectorAll('[data-filter-tag]').forEach((item) => item.classList.toggle('is-active', item.dataset.filterTag === this.activeTag));
        this.updateResults();
        this.updateGraph();
      });
    });
  }

  openEntity(id) {
    this.selectedId = id;
    const entity = this.repository.getEntityById(id);
    if (!entity) return;
    this.renderEntityPanel(entity);
    this.updateReader();
    this.content.querySelector('#research-reader')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderEntityPanel(entity) {
    const panel = this.content.querySelector('#research-entity-panel');
    if (!panel || !entity) return;
    const related = this.repository.relatedEntities(entity, 6);
    panel.innerHTML = `
      <span class="research-kicker">Entidad seleccionada</span>
      <h3>${entity.title}</h3>
      <p>${entity.summary}</p>
      <dl>
        <div><dt>Tipo</dt><dd>${this.repository.entityTypes[entity.type]}</dd></div>
        <div><dt>Estado</dt><dd>${entity.status}</dd></div>
        <div><dt>Responsable</dt><dd>${entity.owner}</dd></div>
        <div><dt>Actualización</dt><dd>${formatDate(entity.updated)}</dd></div>
      </dl>
      <div class="panel-tags">${entity.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <h4>Conexiones próximas</h4>
      ${related.map((item) => `<button type="button" data-open-entity="${item.id}">${item.title}<small>${entity.tags.filter((tag) => item.tags.includes(tag)).join(' · ') || 'cita interna'}</small></button>`).join('')}
    `;
    panel.querySelectorAll('[data-open-entity]').forEach((button) => {
      button.addEventListener('click', () => this.openEntity(button.dataset.openEntity));
    });
  }

  renderEntityCard(entity) {
    const related = this.repository.relatedEntities(entity, 4);
    return `
      <article class="research-entity-card">
        <div class="entity-meta">
          <span>${this.repository.entityTypes[entity.type]}</span>
          <time>${formatDate(entity.updated)}</time>
        </div>
        <h3>${entity.title}</h3>
        <p>${entity.summary}</p>
        <dl>
          <div><dt>Estado</dt><dd>${entity.status}</dd></div>
          <div><dt>Responsable</dt><dd>${entity.owner}</dd></div>
          <div><dt>Sub-vista</dt><dd>${entity.section}</dd></div>
        </dl>
        <div class="entity-tags">${entity.tags.slice(0, 6).map((tag) => `<span>${tag}</span>`).join('')}</div>
        <div class="entity-relations" aria-label="Relaciones principales">
          ${related.map((item) => `<button type="button" data-open-entity="${item.id}">${item.title}</button>`).join('')}
        </div>
        <button class="entity-open" type="button" data-open-entity="${entity.id}">Abrir lectura y trazabilidad</button>
      </article>
    `;
  }

  renderInclusiveCard(entity) {
    const details = entity.type === 'law' ? (entity.articles || []).slice(0, 3) : entity.type === 'service' ? (entity.requirements || []).slice(0, 3) : entity.authors ? [entity.authors, entity.isbn] : entity.tags.slice(0, 3);
    return `
      <article class="inclusive-card">
        <span>${this.repository.entityTypes[entity.type]}</span>
        <h3>${entity.title}</h3>
        <p>${entity.summary}</p>
        <ul>${details.map((item) => `<li>${item}</li>`).join('')}</ul>
        <button type="button" data-open-entity="${entity.id}">Explorar entidad conectada</button>
      </article>
    `;
  }
}
