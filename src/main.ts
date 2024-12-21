import { Server } from "http";
import hpp from "hpp";
import helmet from "helmet";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import i18n from "i18n";
import dbConnection from "./config/database";
import mountRoutes from ".";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import expressMongoSanitize from "express-mongo-sanitize";

const app: express.Application = express();
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["X-CSRF-Token", "Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(expressMongoSanitize());
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(compression());

let server: Server;
dotenv.config();

app.use(express.static("uploads"));
app.use(hpp({ whitelist: ["price"] }));

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
