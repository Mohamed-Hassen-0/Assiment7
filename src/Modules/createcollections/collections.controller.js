import { Router } from "express";
import * as collectionServices from "./collections.services.js"

const router = Router()

router.post("/books",collectionServices.booksCollection)
router.post("/books/index",collectionServices.booksIndex)
router.post("/authors",collectionServices.authorsCollection)
router.post("/logs/capped",collectionServices.cappedLogsCollection)

export default router