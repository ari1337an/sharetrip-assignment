// import components
import http from "http";
import app from "./app";
import config from "@/utils/config";
import logger from "@/utils/logger";

// prepare
const server = http.createServer(app);
const port = app.get("port");
const callback = () => {
  logger.success(`🚀 Server running at port ${config.PORT} 🚀`);
};

// start
server.listen(port, callback);
