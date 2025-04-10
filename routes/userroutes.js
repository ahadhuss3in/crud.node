const express = require("express");
const router = express.Router();
const { registeruser,Loginuser,currentuser} = require("../controllers/usercontroller")


router.post("/register",registeruser);

router.post("/login",Loginuser );

router.get("/current", currentuser);

module.exports = router;