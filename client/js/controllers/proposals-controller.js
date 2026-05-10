import { ProposalsView } from "../views/proposals-view.js";
export class ProposalsController {
  constructor() { this.view = new ProposalsView(); }
  init() { this.view.render(); }
}
