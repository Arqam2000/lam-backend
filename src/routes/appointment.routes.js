import { Router } from "express"
import { bookAppointment } from "../controllers/appointment.controller.js"

const router = Router()

router.route("/").post(bookAppointment)

export default router