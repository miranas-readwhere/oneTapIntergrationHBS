const express = require("express");
const {
    checkLogin,
    logout,
    oneTapLogin,
    getHomePage,
} = require("../controllers/sso-controller");
const router = express.Router();

router.get("/home", getHomePage);

router.post("/oneTapLogin", oneTapLogin);

router.post("/checkLogin", checkLogin);

router.post("/logout", logout);

module.exports = router;
