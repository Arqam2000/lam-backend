import { Router } from "express";
import { addReview, getAllReviews } from "../controllers/customer.controller.js";

const router = Router()

router.route("/add-review").post(addReview)
router.route("/get-reviews").get(getAllReviews)

export default router