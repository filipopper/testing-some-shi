import { ContactView } from "../views/contact-view.js";
export class ContactController {
  constructor() { this.view = new ContactView(); }
  init() { this.view.render(); }
}
