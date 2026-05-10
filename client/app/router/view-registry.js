import { NewsController } from "../../js/controllers/news-controller.js";
import { AboutController } from "../../js/controllers/about-controller.js";
import { ContactController } from "../../js/controllers/contact-controller.js";
import { StoreController } from "../../js/controllers/store-controller.js";
import { HomeController } from "../../js/controllers/home-controller.js";
import { ProposalsController } from "../../js/controllers/proposals-controller.js";
import { JoinController } from "../../js/controllers/join-controller.js";
import { PollController } from "../../features/polls/poll-controller.js";

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
