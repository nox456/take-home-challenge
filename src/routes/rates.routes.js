import RateController from "../controllers/rates.controllers.js";
import { Router } from "express";

const router = Router()

router.get("/current", RateController.getCurrent)

export default router
