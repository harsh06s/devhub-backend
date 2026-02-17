const express = require("express");

const {signup,login} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(signupSchema), signup);

module.exports = router;

