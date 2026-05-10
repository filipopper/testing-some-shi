export const urgencyBannerConfig = {
  storageKey: "urgency-dismissed-oct2026",
  defaultPriority: 100,
  banners: [
    {
      id: "main",
      selector: "#urgency-banner",
      closeSelector: "#urgency-close",
      dismissMode: "session",
      priority: 100,
      media: { type: "none", lazy: true },
      countdown: null,
      cta: { selector: ".urgency-cta" },
    },
  ],
};
