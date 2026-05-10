import { Model } from "./state/model.js";
import { viewRegistry } from "./router/view-registry.js";
import { urgencyBannerConfig } from "./features/urgency-banner/config.js";
import { UrgencyBannerManager } from "./features/urgency-banner/component.js";

const REGISTRY = viewRegistry;

let lastNormalizedHash = "";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  new UrgencyBannerManager(urgencyBannerConfig).init();

  lastNormalizedHash = normalizeHash();
  loadFromHash();

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-view]");
    if (a) { e.preventDefault(); navigateTo(a.getAttribute("data-view")); }
  });

  window.addEventListener("hashchange", () => {
    const currentNormalizedHash = normalizeHash();

    // Ignore hash changes that only append/remove #pic so the current view
    // is not reinitialized right before capture.
    if (currentNormalizedHash !== lastNormalizedHash) {
      lastNormalizedHash = currentNormalizedHash;
      loadFromHash();
    }

    updateActiveNav();
  });
  updateActiveNav();
});


function normalizeHash(rawHash = location.hash) {
  return rawHash.endsWith("#pic") ? rawHash.slice(0, -4) : rawHash;
}

function navigateTo(viewId, postId = "") {
  location.hash = `#/${viewId}${postId ? `/${postId}` : ""}`;
}

async function loadFromHash() {
  const content = document.getElementById("content");
  if (!content) return;

  // Lock overflow so no scrollbar can flash during the swap
  document.body.style.overflow = "hidden";

  // Fade out current content
  content.style.transition = "opacity 0.15s ease";
  content.style.opacity = "0";

  // Smooth scroll to top while content is invisible
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Wait for scroll to settle (capped at 300ms)
  await new Promise(resolve => {
    const start = performance.now();
    const check = () => {
      const elapsed = performance.now() - start;
      if (window.scrollY < 2 || elapsed > 300) return resolve();
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });

  // Swap content while overflow is still locked — no scrollbar possible
  content.style.transition = "";
  content.style.opacity = "";
  content.classList.remove("slide-in", "fade-in");
  void content.offsetWidth;
  content.classList.add("slide-in");

  let path = normalizeHash().replace(/^#\/?/, "");
  if (!path) path = "home";
  const [viewId, postId] = path.split("/");

  const ControllerClass = REGISTRY[viewId] ?? REGISTRY["home"];
  const model = new Model();
  const controller = new ControllerClass(model);

  if (viewId === "news" && postId) {
    try {
      const item = await model.getNewsById(postId);
      if (item) {
        controller.view.render(item);
      } else {
        // Article not found — fall back to news list
        await controller.init();
      }
    } catch (e) {
      console.error("Error loading article:", e);
      await controller.init();
    }
  } else {
    await controller.init();
  }

  // Unlock overflow after new content is painted
  requestAnimationFrame(() => {
    document.body.style.overflow = "";
  });
}

function updateActiveNav() {
  const view = normalizeHash().replace("#/", "").split("/")[0] || "home";
  document.querySelectorAll("#nav-links a[data-view]").forEach(a =>
    a.classList.toggle("active", a.getAttribute("data-view") === view)
  );
}
