const express = require("express");
const {
    getAllPatients,
    createPatient,
    updatePatient,
    deletePatients,
} = require("../controllers/patient");
const router = express.Router();

// for get we need the HOspital ID ,
// for other HTTP request we need the patientID

router.route("/:id").patch(updatePatient);
router.route("/:delete").delete(deletePatients);
router.route("/:patientId").get(getAllPatients);
router.route("/").post(createPatient);

module.exports = router;
