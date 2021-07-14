const express = require("express");
const vehicleOperations = require("./vehicle.js");
const userOperations = require("./user.js");

const router = express.Router();

router.use("/vehicles", vehicleOperations);
router.use("/users", userOperations);

module.exports = router;