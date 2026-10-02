import { Router } from "express";
import * as logsServices from "./logs.services.js"

const router = Router()

router.post("/logs",logsServices.createLog)

export default router