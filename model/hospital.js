const mongoose = require("mongoose");
const { BadRequestError } = require("../errors/index");

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: [true, "Please provide a Hospital name"],
        unique: [true, "Please enter a unique hospital name"],
    },
});

HospitalSchema.pre("save", async function (next) {
    if (!this.name) {
        throw new BadRequestError("Please provide a hospital name");
    }
    return next();
});

module.exports = mongoose.model("Hospital", HospitalSchema);
