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





router.get("/",utilities.checkEmployeeOrAdmin, utilities.handleErrors(invController.buildManagement))
router.get("/add-classification",utilities.checkEmployeeOrAdmin, utilities.handleErrors(invController.buildAddClassification))
router.get("/add-inventory",utilities.checkEmployeeOrAdmin, utilities.handleErrors(invController.buildAddInventory))

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to build edit inventory view
router.get(
  "/edit/:inv_id",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.editInventoryView)
)



router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.addClassification)
)

router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.addInventory)
)


// Process inventory update
router.post(
  "/update",
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.updateInventory)
)

// Route to build delete confirmation view
router.get(
  "/delete/:inv_id",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildDeleteConfirmView)
)

// Process inventory delete
router.post(
  "/delete",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.deleteInventoryItem)
)

module.exports = router;