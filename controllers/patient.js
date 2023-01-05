const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Psychiatrist = require("../model/psychiatrist");
const Patient = require("../model/patient");

const getAllPatients = async (req, res) => {
    // we get psychiatrist ID
    let psychiatristID = req.params.patientId;
    const psychiatrist = await Psychiatrist.findOne({ _id: psychiatristID });
    if (!psychiatrist) {
        throw new NotFoundError("Please enter a valid Psychiatrist ID");
    }
    const patients = await Patient.find({ psychiatristID });
    res.status(StatusCodes.OK).json({
        msg: `Patients list of ${psychiatrist.name}`,
        numOfPatients: patients.length,
        data: { patients },
    });
};

const createPatient = async (req, res) => {
    const patientData = req.body;
    const psychiatrist = await Psychiatrist.findOne({
        name: patientData.psychiatristName,
    });
    if (!psychiatrist) {
        throw new NotFoundError("Please enter  a valid Psychiatrist name");
    }
    delete patientData.psychiatristName;
    patientData.psychiatristID = psychiatrist._id;
    const patient = await Patient.create(patientData);
    res.status(StatusCodes.CREATED).json({
        msg: "Patient created successfully !",
        data: { patient },
    });
};

const updatePatient = async (req, res) => {
    // we get patient ID
    const patientId = req.params.id;
    const updatePatient = req.body;
    if (!updatePatient || !patientId) {
        throw new BadRequestError("Please provide valid Id and request body");
    }
    for (let p in updatePatient) {
        if (updatePatient[p] === "") {
            throw new BadRequestError("Please enter valid details");
        }
    }
    const patient = await Patient.findOneAndUpdate(
        { _id: patientId },
        updatePatient,
        { new: true, runValidators: true }
    );
    if (!patient) {
        throw new NotFoundError("Patient not found");
    }
    res.status(StatusCodes.GONE).json({
        msg: "Updated the patient ",
        data: { patient },
    });
};

const deletePatients = async (req, res) => {
    // we get patient ID
    const patientId = req.params.delete;
    const patient = await Patient.findOneAndDelete({ _id: patientId });
    if (!patient) {
        throw new NotFoundError("Patient not found");
    }
    res.status(StatusCodes.GONE).json({
        msg: "Deleted the patient ",
        data: { patient },
    });
};

module.exports = {
    createPatient,
    updatePatient,
    getAllPatients,
    deletePatients,
};
