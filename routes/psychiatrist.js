const express = require("express");
const router = express.Router();
const {
    register,
    getPsychiatrist,
    getAllPsychiatrists,
} = require("../controllers/psychiatrist");

router.route("/").get(getAllPsychiatrists);
router.route("/register").post(register);
router.route("/:id").get(getPsychiatrist);

module.exports = router;
