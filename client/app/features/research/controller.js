import { ResearchRepository } from './model.js';
import { ResearchView } from './view.js';

export class ResearchController {
  constructor() {
    this.repository = new ResearchRepository();
    this.view = new ResearchView(this.repository);
  }

  async init() {
    await this.repository.load();
    this.view.selectedId = this.repository.selectedInitialId;
    this.view.render();
    this.view.bindInteractions();
  }
}
