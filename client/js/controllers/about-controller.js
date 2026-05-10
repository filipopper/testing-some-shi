import { AboutView } from "../views/about-view.js";
export class AboutController {
  constructor() { this.view = new AboutView(); }
  init() { this.view.render(); }
}
