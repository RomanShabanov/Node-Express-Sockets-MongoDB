require("dotenv").config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV;
export const isDev = process.env.NODE_ENV === "dev";
export const isTest = process.env.NODE_ENV === "test";
export const isProd = process.env.NODE_ENV === "prod";
export const JWT_SECRET = process.env.JWT_SECRET;
export const isSecure = process.env.HTTPS === "true";
