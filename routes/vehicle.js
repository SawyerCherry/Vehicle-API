const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Vehicle = require("../models/vehicle.js");

// GET all vehicles
router.get("/all-vehicles", (req, res) => {
  Vehicle.find()
    .then((allVehicles) => {
      return res.json({ allVehicles });
    })
    .catch((err) => {
      throw err.message;
    });
});

// POST a new vehicle
router.post("/new-vehicle", (req, res) => {
  let vehicle = new Vehicle(req.body);

  vehicle
    .save()
    .then((vehicle) => {
      return User.findById(vehicle.creator);
    })
    .then((creator) => {
      creator.vehicles.unshift(vehicle);
      return creator.save();
    })
    .then((creator) => {
      return res.json({
        message: `${vehicle.model} was added.`,
        creator: creator.username,
      });
    })
    .catch((err) => {
      throw err.message;
    });
});

// GET search by id
router.get("/:id", (req, res) => {
  Vehicle.findById(req.params.id)
    .then((searchedVehicle) => {
      return res.json({ searchedVehicle });
    })
    .catch((err) => {
      throw err.message;
    });
});

// Update existing vehicle in database
router.put("/:id", (req, res) => {
  Vehicle.findById(req.params.id)
    .then((pastVehicle) => {
      return pastVehicle;
    })
    .then((pastVehicle) => {
      Vehicle.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
          return Vehicle.findOne({ title: req.body.title });
        })
        .then((updatedVehicle) => {
          return res.json({
            message: "Your vehicle was updated.",
            make: `${pastVehicle.make} -> ${updatedVehicle.make}`,
            model: `${pastVehicle.model} -> ${updatedVehicle.model}`,
            year: `${pastVehicle.year} -> ${updatedVehicle.year}`,
            vin: `${pastVehicle.vin} -> ${updatedVehicle.vin}`,
            creator: `${pastVehicle.creator} -> ${updatedVehicle.creator}`,
          });
        })
        .catch((err) => {
          throw err.message;
        });
    });
});

// Delete an existing vehicle
router.delete("/:id", (req, res) => {
  Vehicle.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result === null) {
        return res.json({ message: "ID did not match anything in our database.≈" });
      } else {
        return res.json({ message: "Vehicle was deleted." });
      }
    })
    .catch((err) => {
      throw err.message;
    });
});
module.exports = router;