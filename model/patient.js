const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");

const PatientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 50,
            minLength: 5,
            required: [true, "Please provide name"],
        },
        address: {
            type: String,
            maxLength: 50,
            minLength: 10,
            required: [true, "Please provide address"],
        },
        phone: {
            type: String,
            maxLength: 13,
            minLength: 13,
            required: [true, "Please provide phone number"],
        },
        email: {
            type: String,
            minLength: 5,
            unique: true,
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                "Please Enter a valid email",
            ],
            required: [true, "Please provide email"],
        },
        psychiatristID: {
            type: mongoose.Types.ObjectId,
            ref: "Psychiatrists", // which model are we referencing
            required: [true, "Please provide a Hospital Id"],
        },
        photo: {
            type: String,
            minLength: 5,
            required: true,
        },
    },
    {
        timestamps: true, // we get createdAt  and updatedAt properties in every docs
    }
);

PatientSchema.pre("save", async function (next) {
    if (
        !this.name ||
        !this.address ||
        !this.phone ||
        !this.email ||
        !this.psychiatristID ||
        !this.photo
    ) {
        throw new BadRequestError("Please enter the required details");
    }
    return next();
});

module.exports = mongoose.model("Patient", PatientSchema);
