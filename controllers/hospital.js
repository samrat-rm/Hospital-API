const Hospital = require("../model/hospital");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const register = async (req, res) => {
    const hospital = await Hospital.create(req.body);
    res.status(StatusCodes.CREATED).json({
        msg: "Hospital created!",
        data: { hospital },
    });
};

const deleteHospital = async (req, res) => {
    const hospital = await Hospital.findOneAndDelete({ _id: [req.params.id] });
    if (!hospital) {
        throw new NotFoundError("No hospitals created");
    }
    res.status(StatusCodes.OK).json({
        msg: "Hospital with the given id is deleted",
        data: {
            hospital,
        },
    });
};

const getAllHospital = async (req, res) => {
    const hospitals = await Hospital.find({}).sort("createdAt");
    if (!hospitals) {
        throw new NotFoundError("No hospitals created");
    }
    res.status(StatusCodes.OK).json({
        msg: "Hospitals data ordered by data of creation",
        numOfHospials: hospitals.length,
        data: { hospitals },
    });
};

module.exports = { register, deleteHospital, getAllHospital };
