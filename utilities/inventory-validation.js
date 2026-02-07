const { body, validationResult } = require("express-validator")
const utilities = require(".")

const validate = {}

/* **********************************
 * Classification Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("Classification name cannot contain spaces or special characters."),
  ]
}

validate.checkClassificationData = async (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors,
    })
    return
  }
  next()
}


validate.inventoryRules = () => {
  return [
    body("inv_make").trim().escape().notEmpty().withMessage("Make is required."),
    body("inv_model").trim().escape().notEmpty().withMessage("Model is required."),
    body("inv_year").trim().isInt({ min: 1900, max: 2099 }).withMessage("Year must be valid."),
    body("inv_description").trim().notEmpty().withMessage("Description is required."),
    body("inv_image").trim().notEmpty().withMessage("Image path is required."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path is required."),
    body("inv_price").trim().isFloat({ min: 0 }).withMessage("Price must be a number."),
    body("inv_miles").trim().isInt({ min: 0 }).withMessage("Miles must be a number."),
    body("inv_color").trim().escape().notEmpty().withMessage("Color is required."),
    body("classification_id").notEmpty().withMessage("Classification is required.")
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(req.body.classification_id)

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors,
      ...req.body,   // makes inputs sticky (includes inv_make etc.)
    })
    return
  }
  next()
}


module.exports = validate
