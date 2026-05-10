export class UrgencyBannerService {
  constructor(config) {
    this.config = config;
  }

  isDismissed(key, mode = "session") {
    try {
      const storage = mode === "local" ? localStorage : sessionStorage;
      return storage.getItem(key) === "1";
    } catch {
      return false;
    }
  }

  setDismissed(key, mode = "session") {
    try {
      const storage = mode === "local" ? localStorage : sessionStorage;
      storage.setItem(key, "1");
    } catch {}
  }

  clearDismissed(key, mode = "session") {
    try {
      const storage = mode === "local" ? localStorage : sessionStorage;
      storage.removeItem(key);
    } catch {}
  }
}
