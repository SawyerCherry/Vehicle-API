const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    vin: { type: String, required: true }, 
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vehicle', VehicleSchema);