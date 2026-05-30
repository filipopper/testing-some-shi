import { ResearchView } from './view.js';

export class ResearchController {
  constructor() {
    this.view = new ResearchView();
  }

  init() {
    this.view.render();
    this.view.bindInteractions();
  }
}
