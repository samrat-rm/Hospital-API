const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Hospital = require("../model/hospital");
const Psychiatrist = require("../model/psychiatrist");

const register = async (req, res) => {
    const { name, hospitalName } = req.body;
    const hospital = await Hospital.find({ name: hospitalName });
    if (!hospital) {
        throw new NotFoundError("Hospital not found");
    }
    const psychiatrist = await Psychiatrist.create({
        name,
        hospitalID: hospital[0]._id,
    });
    res.status(StatusCodes.CREATED).json({
        msg: "Psychiatrist is created successfully ",
        data: { psychiatrist },
    });
};

const getPsychiatrist = async (req, res) => {
    const { id: hospitalID } = req.params;
    const hospital = await Hospital.findOne({ _id: hospitalID });
    if (!hospital) {
        throw new NotFoundError("Hospital not found");
    }
    const psychiatrist = await Psychiatrist.find({ hospitalID });
    res.status(StatusCodes.OK).json({
        msg: `All the psychatrists from the ${hospital.name} hospital `,
        numOfPsychiatrists: psychiatrist.length,
        data: { psychiatrist, hospital },
    });
};

const getAllPsychiatrists = async (req, res) => {
    const psychiatrists = await Psychiatrist.find({}).sort("createdAt");
    res.status(StatusCodes.OK).json({
        msg: "All the existing psychiatrists from all the hospitals",
        numOfPsychiatrists: psychiatrists.length,
        data: { psychiatrists },
    });
};

module.exports = {
    register,
    getPsychiatrist,
    getAllPsychiatrists,
};
