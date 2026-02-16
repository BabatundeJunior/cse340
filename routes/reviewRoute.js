const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const reviewController = require("../controllers/reviewController")
const reviewValidate = require("../utilities/review-validation")

// Add a review for a specific vehicle
router.post(
  "/:inv_id",
  utilities.checkLogin,
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  utilities.handleErrors(reviewController.addReview)
)

module.exports = router
