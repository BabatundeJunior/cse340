const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* ******************************
 * Review Validation Rules
 * ***************************** */
validate.reviewRules = () => {
  return [
    body("review_rating")
      .trim()
      .notEmpty()
      .withMessage("Rating is required.")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5."),

    body("review_text")
      .trim()
      .notEmpty()
      .withMessage("Review text is required.")
      .isLength({ min: 10 })
      .withMessage("Review must be at least 10 characters."),
  ]
}

/* ******************************
 * Check review data
 * ***************************** */
validate.checkReviewData = async (req, res, next) => {
  const inv_id = parseInt(req.params.inv_id)
  const { review_rating, review_text } = req.body
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    req.flash("notice", "Please correct the review form and try again.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
  next()
}

module.exports = validate
