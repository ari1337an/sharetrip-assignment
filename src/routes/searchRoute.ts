import express from "express"
const router = express.Router()

/**
 * Controller Imports
 */
import searchController from "@/controllers/searchController"

/**
 * Routes
 */
router.get('/', searchController)

export default router;