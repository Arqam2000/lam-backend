import { Router } from "express";
import { addReview, getAllReviews, getReviews } from "../controllers/customer.controller.js";

const router = Router()

router.route("/add-review").post(addReview)
// router.route("/get-reviews").get(getAllReviews)
router.route("/get-reviews").get(getReviews)

export default router