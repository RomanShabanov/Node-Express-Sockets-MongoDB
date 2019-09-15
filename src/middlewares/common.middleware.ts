import express, { Router, Request, Response, NextFunction } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import path from "path";

import { isProd } from "../config/variables";
import { expressLogger } from "../utils/logger";

export const handleStaticFiles = (router: Router) => {
  console.log(__dirname);
  router.use(
    express.static(path.join(__dirname, "../../static"), { dotfiles: "allow" })
  );
};

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

/** TODO: Compression should be handled by NGINX. Node is single-threaded and compression is CPU intensive task. */
export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const handleHeanders = (router: Router) => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
    );
    next();
  });
};

export const handleLogging = (router: Router) => {
  if (isProd) {
    router.use(expressLogger);
  }
};

export default [
  handleStaticFiles,
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleHeanders
];
