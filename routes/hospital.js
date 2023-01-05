const express = require("express");
const router = express.Router();
const {
    register,
    deleteHospital,
    getAllHospital,
} = require("../controllers/hospital");

router.route("/").post(register).get(getAllHospital);
router.route("/:id").delete(deleteHospital);

module.exports = router;
