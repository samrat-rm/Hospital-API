const express = require("express");
const router = express.Router();
const {getPsychiatristAndPatientDetails} = require("../controllers/PsychiatristAndPatient");

router.route("/:id").get(getPsychiatristAndPatientDetails);

module.exports = router;