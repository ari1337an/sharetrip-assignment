import 'module-alias/register'; 

// import components
import http from "http";
import app from "./app";
import config from "./utils/config";
import logger from "./utils/logger";

/**
 * Module-Alias Configuration:
 * - Creating the '@' alias for the './src' folder to simplify import paths
 *   and improve code readability.
 * 
 * Usage:
 * - In other files, leverage '@' for importing modules from the 'src' folder.
 *   Example: '@/utils/config' resolves to 'ROOT/src/utils/config'.
 */


// prepare 
const server = http.createServer(app);
const port = app.get("port");
const callback = () => {
  logger.success(`🚀 Server running at port ${config.PORT} 🚀`);
};

// start
server.listen(port, callback);
