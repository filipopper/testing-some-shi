import { StoreView } from "../views/store-view.js";
export class StoreController {
  constructor() { this.view = new StoreView(); }
  init() { this.view.render(); }
}
