// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const asyncHandler = require("../utilities/asyncHandler")


// Route to build inventory by classification view
router.get("/type/:classificationId", asyncHandler(invController.buildByClassificationId));

router.get("/detail/:invId", asyncHandler(invController.buildByInventoryId));

router.get("/trigger-error", (req, res, next) => {
  throw new Error("Intentional 500 error for Assignment 3")
})


module.exports = router;