const reviewModel = require("../models/review-model")

/* ***************************
 * Add review to a vehicle
 * ************************** */
async function addReview(req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  const { review_rating, review_text } = req.body

  // Logged-in user info comes from your JWT middleware
  const account_id = res.locals.accountData.account_id

  const result = await reviewModel.addReview(
    review_text,
    parseInt(review_rating),
    inv_id,
    account_id
  )

  if (result && result.review_id) {
    req.flash("notice", "Review added successfully.")
    return res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, the review could not be added.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
}

module.exports = { addReview }
