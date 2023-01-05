const mongoose = require("mongoose");

const PsychaitraistSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 30,
        unique: true,
        required: true,
    },
    hospitalID: {
        type: mongoose.Types.ObjectId,
        ref: "Hospitals",
        required: [true, "Please provide a hospital name"],
    },
});

module.exports = mongoose.model("Psychiatrist", PsychaitraistSchema);
