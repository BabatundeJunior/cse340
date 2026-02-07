// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const asyncHandler = require("../utilities/asyncHandler")
const invValidate = require("../utilities/inventory-validation")



// Route to build inventory by classification view
router.get("/type/:classificationId", asyncHandler(invController.buildByClassificationId));

router.get("/detail/:invId", asyncHandler(invController.buildByInventoryId));

router.get("/trigger-error", (req, res, next) => {
  throw new Error("Intentional 500 error for Assignment 3")
})





router.get("/", utilities.handleErrors(invController.buildManagement))
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))


router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)



module.exports = router;