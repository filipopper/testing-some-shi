/* footer-poll.js — Encuesta de Opinión Pública · Footer */

(function () {
  const rawData = [
    [55, 30, 15],
    [20, 35, 25, 12, 8],
    [30, 25, 20, 25],
    [15, 20, 10, 15, 40],
    [25, 35, 25, 15],
    [30, 25, 20, 25],
    [45, 35, 20],
    [20, 25, 22, 18, 15],
    [40, 35, 25],
    [35, 45, 20],
    [22, 28, 25, 15, 10],
  ];

  const questions = [
    "Nivel de conocimiento",
    "Evaluación de imagen pública",
    "Modalidad de apoyo",
    "Participación política activa",
    "Importancia en vida personal",
    "Intención declarada de voto",
    "Percepción de viabilidad electoral",
    "Principales limitantes",
    "Disposición a recomendar",
    "Necesidad de moderación",
    "Identificación emocional",
  ];

  const answers = [
    ["Alto", "Superficial", "Sin conocimiento"],
    ["Muy favorable", "Favorable", "Neutral", "Desfavorable", "Muy desfav."],
    ["Apoyo público", "Apoyo privado", "Indefinición", "Rechazo"],
    ["Difusión redes", "Defensa arg.", "Aporte económico", "Eventos", "Sin participación"],
    ["Central", "Relevante", "Secundaria", "Prescindible"],
    ["Voto seguro", "Probable voto", "Indefinición", "Rechazo de voto"],
    ["Alta viabilidad", "Baja viabilidad", "Sin opinión"],
    ["Déficit estructural", "Radicalidad", "Baja visibilidad", "Sin alianzas", "Sin limitantes"],
    ["Recomendación activa", "Potencial", "No recomendaría"],
    ["Mantener posición", "Moderar discurso", "Sin opinión"],
    ["Muy alta", "Alta", "Media", "Baja", "Nula"],
  ];

  // Palette adapted to the site's crimson/dark aesthetic
  const palette = [
    ["#4DB891", "#8ECFB5", "#4A3040"],
    ["#2E7D5A", "#5BBF85", "#5A4055", "#D98080", "#C84545"],
    ["#4DB891", "#8ECFB5", "#4A3040", "#C84545"],
    ["#5E9FD0", "#8BBDE8", "#C9A84C", "#E8A056", "#4A3040"],
    ["#4DB891", "#8ECFB5", "#4A3040", "#C84545"],
    ["#2E7D5A", "#5BBF85", "#4A3040", "#C84545"],
    ["#4DB891", "#C84545", "#4A3040"],
    ["#E8A056", "#C84545", "#5E9FD0", "#B07FD8", "#5BBF85"],
    ["#4DB891", "#8ECFB5", "#C84545"],
    ["#4DB891", "#E8A056", "#4A3040"],
    ["#2E7D5A", "#5BBF85", "#4A3040", "#D98080", "#C84545"],
  ];

  // Normalize rows to 100%
  const data = rawData.map((row) => {
    const total = row.reduce((a, b) => a + b, 0);
    return row.map((v) => (v * 100) / total);
  });

  // Build axis ticks
  const axisCont = document.getElementById("pollAxisTicks");
  if (axisCont) {
    [0, 25, 50, 75, 100].forEach((v) => {
      const el = document.createElement("div");
      el.className = "poll-tick";
      el.style.left = v + "%";
      el.textContent = v + "%";
      axisCont.appendChild(el);
    });
  }

  // Build tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "poll-tooltip";
  tooltip.innerHTML = `
    <div class="poll-tt-q" id="pollTtQ"></div>
    <div class="poll-tt-a" id="pollTtA"></div>
    <div class="poll-tt-p" id="pollTtP"></div>
  `;
  document.body.appendChild(tooltip);

  const ttQ = document.getElementById("pollTtQ");
  const ttA = document.getElementById("pollTtA");
  const ttP = document.getElementById("pollTtP");

  // Build chart rows
  const chartEl = document.getElementById("pollChart");
  if (!chartEl) return;

  data.forEach((row, i) => {
    const rowEl = document.createElement("div");
    rowEl.className = "poll-row";

    // Label
    const labelWrap = document.createElement("div");
    labelWrap.className = "poll-row-label-wrap";
    const label = document.createElement("div");
    label.className = "poll-row-label";
    label.textContent = questions[i];
    labelWrap.appendChild(label);
    rowEl.appendChild(labelWrap);

    // Bar wrap
    const barWrap = document.createElement("div");
    barWrap.className = "poll-bar-wrap";

    const track = document.createElement("div");
    track.className = "poll-bar-track";

    // Grid lines
    [25, 50, 75].forEach((pct) => {
      const gl = document.createElement("div");
      gl.className = "poll-bar-gridline";
      gl.style.left = pct + "%";
      track.appendChild(gl);
    });

    // Segments
    row.forEach((val, j) => {
      const seg = document.createElement("div");
      seg.className = "poll-segment";
      seg.style.cssText = `width:${val}%;background:${palette[i][j]};animation-delay:${i * 0.06 + 0.1}s;`;

      const inner = document.createElement("div");
      inner.className = "poll-seg-inner";

      if (val > 14) {
        const lbl = document.createElement("div");
        lbl.className = "poll-seg-label";
        lbl.textContent = answers[i][j];
        const pct = document.createElement("div");
        pct.className = "poll-seg-pct";
        pct.textContent = val.toFixed(1) + "%";
        inner.appendChild(lbl);
        inner.appendChild(pct);
      } else if (val > 7) {
        const pct = document.createElement("div");
        pct.className = "poll-seg-pct-only";
        pct.textContent = val.toFixed(1) + "%";
        inner.appendChild(pct);
      }

      seg.appendChild(inner);

      // Tooltip events
      seg.addEventListener("mousemove", (e) => {
        ttQ.textContent = "P" + (i + 1) + " · " + questions[i];
        ttA.textContent = answers[i][j];
        ttP.textContent = val.toFixed(1) + "%";
        tooltip.classList.add("visible");
        tooltip.style.left = e.clientX + 14 + "px";
        tooltip.style.top = e.clientY - 70 + "px";
      });
      seg.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));

      track.appendChild(seg);
    });

    barWrap.appendChild(track);
    rowEl.appendChild(barWrap);
    chartEl.appendChild(rowEl);
  });

  // Use IntersectionObserver to trigger animations when footer is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chartEl.querySelectorAll(".poll-segment").forEach((seg) => {
            seg.style.animationPlayState = "running";
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  // Start animations paused, play on scroll into view
  chartEl.querySelectorAll(".poll-segment").forEach((seg) => {
    seg.style.animationPlayState = "paused";
  });
  observer.observe(chartEl);
})();
