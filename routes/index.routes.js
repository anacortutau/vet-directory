const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const petRoutes = require("./pet.routes.js")
router.use("/pet", petRoutes)

const userRoutes = require("./user.routes.js")
router.use("/user", userRoutes )

const dentroRoutes = require("./dentro.routes.js");
router.use("/dentro", dentroRoutes )

















module.exports = router;
