import { Router } from "express"
import { bookAppointment, getAppointments } from "../controllers/appointment.controller.js"

const router = Router()

router.route("/").post(bookAppointment)
router.route("/").get(getAppointments)

export default router