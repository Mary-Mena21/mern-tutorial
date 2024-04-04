const express = require("express");
const router = express.Router();

const {
    loginUser,
    registerUser,
    getMe,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

router.get("/me", getMe);

router.post("/login", loginUser);
router.post("/register", registerUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
