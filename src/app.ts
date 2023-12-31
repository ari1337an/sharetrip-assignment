// Express, CORS
import express from "express";
import cors from "cors";

// Utils
import config from "@/utils/config";
import middlewares from "@/utils/middlewares"

// Express Instance
const app = express()

// Set port
app.set("port", config.PORT)

// Make ip address available to express requests
app.set('trust proxy', true)

// Routes
import searchRoute from '@/routes/searchRoute'

/**
 * Use all core packages
 * 
 * CORS, ExpressJSON
 */
app.use(cors())
app.use(express.json())

// Start Logging Requests in the console
// app.use(middlewares.requestLogger)

/**
 * Use the Routes
 */
app.use('/search', searchRoute)

/**
 * Handle the unknown endpoint, if no controller is defined for requested endpoint
 * Which is a 404 Error Code
 */
app.use(middlewares.unknownEndpoint)

export default app