import { NewsController      } from "./controllers/news-controller.js";
import { StoreController     } from "./controllers/store-controller.js";
import { ContactController   } from "./controllers/contact-controller.js";
import { AboutController     } from "./controllers/about-controller.js";
import { HomeController      } from "./controllers/home-controller.js";
import { ProposalsController } from "./controllers/proposals-controller.js";

export const controllersRegistry = {
  home:      HomeController,
  news:      NewsController,
  store:     StoreController,
  contact:   ContactController,
  about:     AboutController,
  proposals: ProposalsController,
};
