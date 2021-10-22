const router = require("express").Router();
const usersController = require("../controllers/users");
const withAuth = require("../middleware/auth");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.post("/me", withAuth, usersController.getMe);

module.exports = router;
