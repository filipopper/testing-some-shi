import { NewsController } from "../features/news/controller.js";
import { AboutController } from "../features/about/controller.js";
import { ContactController } from "../features/contact/controller.js";
import { StoreController } from "../features/store/controller.js";
import { HomeController } from "../features/home/controller.js";
import { ProposalsController } from "../features/proposals/controller.js";
import { JoinController } from "../features/join/controller.js";
import { PollController } from "../features/polls/controller.js";

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
