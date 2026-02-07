const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInvId(inv_id)
  const grid = await utilities.buildInventoryDetail(data)
  let nav = await utilities.getNav()

  res.render("./inventory/detail", {
    title: data.inv_make + " " + data.inv_model,
    nav,
    grid,
  })
}


invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body
  const addResult = await invModel.addClassification(classification_name)

  let nav = await utilities.getNav()

  if (addResult.rowCount === 1) {
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message: `Successfully added "${classification_name}" classification.`,
      errors: null,
    })
  } else {
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: "Sorry, adding the classification failed.",
      errors: null,
    })
  }
}



invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
  })
}


invCont.addInventory = async function (req, res, next) {
  const {
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles, inv_color,
    classification_id
  } = req.body

  const addResult = await invModel.addInventory(
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles, inv_color,
    classification_id
  )

  let nav = await utilities.getNav()

  if (addResult.rowCount === 1) {
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message: "New inventory item added successfully.",
      errors: null,
    })
  } else {
    let classificationList = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      message: "Sorry, the inventory item could not be added.",
      errors: null,
      ...req.body,
    })
  }
}



module.exports = invCont
