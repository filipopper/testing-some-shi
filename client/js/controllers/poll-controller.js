import { PollView } from "../views/poll-view.js";

export class PollController {
  constructor() { this.view = new PollView(); }
  init() { this.view.render(); }
}
