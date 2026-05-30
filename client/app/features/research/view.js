const liveEvents = [
  ['08:42', 'Nueva observación registrada', 'Aula 3 · secuencia de lectura inferencial', 'observation'],
  ['08:57', 'Hipótesis actualizada', 'La pausa metacognitiva aumenta persistencia en resolución abierta', 'hypothesis'],
  ['09:11', 'Dataset expandido', '124 nuevas evidencias cualitativas vinculadas a colaboración', 'dataset'],
  ['09:28', 'Correlación encontrada', 'Ritmo de feedback docente ↔ autonomía percibida', 'signal'],
  ['09:46', 'Metodología evaluada', 'Seminario socrático breve en cohorte de ciclo básico', 'method'],
  ['10:03', 'Experimento replicado', 'Transferencia de estrategia visual a matemática aplicada', 'replication'],
];

const papers = [
  {
    code: 'EDU-R-041',
    state: 'En revisión metodológica',
    title: 'Micro-pausas metacognitivas y persistencia cognitiva en tareas abiertas',
    hypothesis: 'Una pausa de 90 segundos para verbalizar estrategia aumenta la continuidad atencional sin elevar carga afectiva.',
    method: 'Observación mixta · 4 cohortes · rúbrica de autonomía · entrevistas breves',
    metric: '+18%',
    metricLabel: 'persistencia observada',
    tags: ['metacognición', 'autonomía', 'feedback'],
  },
  {
    code: 'MTH-X-017',
    state: 'Replicación activa',
    title: 'Transferencia visual entre razonamiento geométrico y modelado algebraico',
    hypothesis: 'El bocetado estructural previo reduce fricción simbólica en estudiantes con inteligencia espacial dominante.',
    method: 'A/B pedagógico · 6 docentes · dataset multimodal · revisión semanal',
    metric: '3.2x',
    metricLabel: 'conexiones declaradas',
    tags: ['espacial', 'matemática', 'transferencia'],
  },
  {
    code: 'HUM-O-029',
    state: 'Síntesis editorial',
    title: 'Conversación socrática breve como arquitectura de escucha profunda',
    hypothesis: 'La pregunta de seguimiento cuidadosamente demorada eleva densidad argumental y escucha entre pares.',
    method: 'Codificación discursiva · seminarios de 18 min · matriz de evidencia',
    metric: '+31%',
    metricLabel: 'calidad argumental',
    tags: ['lenguaje', 'ética', 'colaboración'],
  },
];

const graphNodes = [
  ['Metacognición', 'research-node-large', '18 papers'],
  ['Feedback docente', '', '7 metodologías'],
  ['Inteligencia espacial', '', '5 cohortes'],
  ['Lectura inferencial', '', '216 observaciones'],
  ['Autonomía', 'research-node-quiet', '12 señales'],
  ['Dataset C-24', '', '842 evidencias'],
  ['Seminario socrático', '', '4 réplicas'],
  ['Persistencia', 'research-node-quiet', '9 correlaciones'],
];

export class ResearchView {
  constructor() {
    this.content = document.getElementById('content');
  }

  render() {
    this.content.innerHTML = `
      <div class="research-page" aria-labelledby="research-title">
        <div class="research-entry-veil" aria-hidden="true"></div>

        <nav class="research-system-header" aria-label="Sistema de investigación educativa">
          <a href="#" data-research-jump="research-papers">Papers</a>
          <a href="#" data-research-jump="research-papers">Experiments</a>
          <a href="#" data-research-jump="research-live">Observations</a>
          <a href="#" data-research-jump="research-papers">Methodologies</a>
          <a href="#" data-research-jump="research-map">Intelligence Map</a>
          <a href="#" data-research-jump="research-live">Live Activity</a>
        </nav>

        <section class="research-hero" aria-labelledby="research-title">
          <div class="research-ambient" aria-hidden="true">
            <span style="--x:12%;--y:22%;--d:0s"></span>
            <span style="--x:68%;--y:18%;--d:1.4s"></span>
            <span style="--x:81%;--y:64%;--d:2.2s"></span>
            <span style="--x:34%;--y:76%;--d:.7s"></span>
            <span style="--x:52%;--y:46%;--d:1.9s"></span>
          </div>
          <div class="research-hero-copy">
            <span class="overline">Repositorio epistemológico · Beta privada</span>
            <h1 id="research-title">Ecosistema de Investigación Educativa Continua</h1>
            <p>La escuela no solo enseña.<br>Produce conocimiento sobre cómo aprenden las personas.</p>
          </div>
          <aside class="research-hero-index" aria-label="Pulso institucional">
            <div><strong>247</strong><span>observaciones activas</span></div>
            <div><strong>38</strong><span>hipótesis en seguimiento</span></div>
            <div><strong>12</strong><span>metodologías replicadas</span></div>
          </aside>
        </section>

        <section class="research-live" id="research-live" aria-labelledby="live-title">
          <div class="research-section-kicker">Live Activity System</div>
          <div class="research-live-shell">
            <div class="research-live-head">
              <h2 id="live-title">Actividad institucional en tiempo real</h2>
              <span>stream académico · UTC-03</span>
            </div>
            <ol class="research-activity-list">
              ${liveEvents.map(([time, title, desc, type], index) => `
                <li class="research-activity-item" style="--i:${index}">
                  <time>${time}</time>
                  <div>
                    <strong>${title}</strong>
                    <span>${desc}</span>
                  </div>
                  <em>${type}</em>
                </li>
              `).join('')}
            </ol>
          </div>
        </section>

        <section class="research-grid-section" id="research-papers" aria-labelledby="papers-title">
          <div class="research-section-header">
            <div>
              <span class="research-section-kicker">Research Grid</span>
              <h2 id="papers-title">Artefactos de investigación vivos</h2>
            </div>
            <p>Cada publicación integra hipótesis, evidencia, metodología, estado experimental y conexiones cognitivas.</p>
          </div>
          <div class="research-paper-grid">
            ${papers.map((paper, index) => `
              <article class="research-paper" style="--i:${index}">
                <div class="research-paper-meta"><span>${paper.code}</span><span>${paper.state}</span></div>
                <h3>${paper.title}</h3>
                <p class="research-hypothesis">${paper.hypothesis}</p>
                <dl>
                  <div><dt>Metodología</dt><dd>${paper.method}</dd></div>
                  <div><dt>${paper.metric}</dt><dd>${paper.metricLabel}</dd></div>
                </dl>
                <div class="research-tags">${paper.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
                <button type="button" data-research-open="${index}">Abrir experiencia editorial</button>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="research-map-section" id="research-map" aria-labelledby="map-title">
          <div class="research-section-header">
            <div>
              <span class="research-section-kicker">Intelligence Map</span>
              <h2 id="map-title">Mapa vivo de inteligencia educativa</h2>
            </div>
            <p>Un grafo de investigaciones, metodologías, docentes, habilidades, resultados y datasets institucionales.</p>
          </div>
          <div class="research-graph" role="img" aria-label="Grafo conceptual de conexiones educativas">
            ${graphNodes.map(([label, className, note], index) => `
              <div class="research-node ${className}" style="--n:${index}">
                <strong>${label}</strong>
                <span>${note}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="research-article" id="research-article" aria-live="polite">
          <div class="research-article-rail">
            <span>Timeline</span><span>Hipótesis</span><span>Evidencia</span><span>Replicabilidad</span>
          </div>
          <article>
            <span class="research-section-kicker">Interactive Paper · EDU-R-041</span>
            <h2>Micro-pausas metacognitivas y persistencia cognitiva</h2>
            <p class="research-article-lede">Experiencia editorial abierta: no es un PDF, es una bitácora metodológica con evidencia, revisiones y conexiones trazables.</p>
            <div class="research-article-grid">
              <div><h3>01 · Hipótesis</h3><p>Las pausas para explicitar estrategia convierten incertidumbre en material observable y mejoran persistencia.</p></div>
              <div><h3>02 · Metodología</h3><p>Cuatro cohortes, observación de aula, entrevista breve, rúbrica de autonomía y revisión docente semanal.</p></div>
              <div><h3>03 · Evidencia</h3><p>84 registros cualitativos, 32 artefactos de clase, 6 patrones recurrentes y un dataset en expansión.</p></div>
              <div><h3>04 · Replicabilidad</h3><p>Protocolo mínimo documentado, condiciones de aula anotadas y comentarios metodológicos versionados.</p></div>
            </div>
          </article>
        </section>
      </div>`;
  }

  bindInteractions() {
    const article = this.content.querySelector('#research-article');
    const buttons = this.content.querySelectorAll('[data-research-open]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        article?.classList.add('is-open');
        article?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    this.content.querySelectorAll('[data-research-jump]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('data-research-jump');
        const target = targetId ? this.content.querySelector(`#${targetId}`) : null;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
}
