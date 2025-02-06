import { Router } from "express"
import ratesRoutes from "./rates.routes.js"

const router = Router()

router.use("/rates", ratesRoutes)

export default router
