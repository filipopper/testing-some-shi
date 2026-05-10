import { NewsController } from "../controllers/news-controller.js";
import { AboutController } from "../controllers/about-controller.js";
import { ContactController } from "../controllers/contact-controller.js";
import { StoreController } from "../controllers/store-controller.js";
import { HomeController } from "../controllers/home-controller.js";
import { ProposalsController } from "../controllers/proposals-controller.js";
import { JoinController } from "../controllers/join-controller.js";
import { PollController } from "../controllers/poll-controller.js";

export const viewRegistry = {
  home: HomeController,
  news: NewsController,
  about: AboutController,
  contact: ContactController,
  store: StoreController,
  proposals: ProposalsController,
  join: JoinController,
  poll: PollController,
};
