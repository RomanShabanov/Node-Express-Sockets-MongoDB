import { Router } from "express";

import routes from "../services/v1/routes";

export const routes_v1 = (router: Router) => {
  router.use("/v1", routes);
};

export default [routes_v1];
