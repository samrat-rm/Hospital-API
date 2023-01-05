const { StatusCodes } = require("http-status-codes");
const Hospital = require("../model/hospital");
const Psychiatrist = require("../model/psychiatrist");
const Patient = require("../model/patient");
const { BadRequestError, NotFoundError } = require("../errors");

const getPsychiatristAndPatientDetails = async (req, res) => {
    const id = req.params.id;
    const hospital = await Hospital.findOne({ _id: id });
    if (!hospital) {
        throw new BadRequestError("Please enter a valid hospital ID");
    }
    const psychiatrists = await Psychiatrist.find({ hospitalID: id });
    if (psychiatrists.length === 0) {
        throw new NotFoundError("No Psychtraist found in the given Hospital");
    }
    const allPsychtraistIDs = psychiatrists.map((psych) => psych._id);
    const patients = [];
    for (let psychiatrist of allPsychtraistIDs) {
        patients.push(
            ...(await Patient.find({ psychiatristID: psychiatrist }))
        );
    }

    res.status(StatusCodes.OK).json({
        msg: "All psychiatrist and patients data for the given hospital ID",
        numOfPsychiatrist: psychiatrists.length,
        numOfPatients: patients.length,
        data: {
            hospital,
            psychiatrists,
            patients,
        },
    });
};

module.exports = { getPsychiatristAndPatientDetails };
