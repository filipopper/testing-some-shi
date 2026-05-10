import { PollView } from "./components/poll-view.js";

export class PollController {
  constructor() { this.view = new PollView(); }
  init() { this.view.render(); }
}
