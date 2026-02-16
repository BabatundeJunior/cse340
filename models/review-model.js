const pool = require("../database/")

/* ***************************
 * Add a review
 * ************************** */
async function addReview(review_text, review_rating, inv_id, account_id) {
  try {
    const sql = `
      INSERT INTO review (review_text, review_rating, inv_id, account_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `
    const data = await pool.query(sql, [review_text, review_rating, inv_id, account_id])
    return data.rows[0]
  } catch (error) {
    return error.message
  }
}

/* ***************************
 * Get reviews for a vehicle
 * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const sql = `
      SELECT r.review_id, r.review_text, r.review_rating, r.review_date,
             a.account_firstname, a.account_lastname
      FROM review r
      JOIN account a ON r.account_id = a.account_id
      WHERE r.inv_id = $1
      ORDER BY r.review_date DESC;
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    return error.message
  }
}

module.exports = { addReview, getReviewsByInvId }
