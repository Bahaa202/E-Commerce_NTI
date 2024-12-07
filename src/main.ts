import { Server } from "http";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import i18n from "i18n";
import dbConnection from "./config/database";
import mountRoutes from ".";

const app: express.Application = express();
app.use(express.json({ limit: "10kb" }));
let server: Server;
dotenv.config();
i18n.configure({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
});
app.use(i18n.init);
dbConnection();
mountRoutes(app);

server = app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

process.on("unhandledRejection", (err: Error) => {
  console.log(`Unhandled rejection ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Server is closing due to unhandled rejection");
    process.exit(1);
  });
});
