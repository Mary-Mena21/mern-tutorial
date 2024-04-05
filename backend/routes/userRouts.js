const express = require("express");
const router = express.Router();

const {
    getMe,
    getAllUsers,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMe);

router.get("/all", getAllUsers);

router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
