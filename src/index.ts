import "dotenv/config";
import http from "http";
import express, { Express } from "express";
import routes from "./routes";

const router: Express = express();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

router.use("/api", routes);

router.use((_req, res, _next) => {
  const error = new Error("Not found");
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
const PORT = Number(process.env.PORT) ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
