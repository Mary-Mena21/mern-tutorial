const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc   get me
//@route  GET /api/users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
    const { _id, email, password, name } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        email,
        password,
        name,
    });
});

// const getMe2 = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response

//     if (!user) {
//         res.status(404);
//         throw new Error("User not found");
//     }

//     res.status(200).json({
//         id: user._id,
//         email: user.email,
//     });
// });

//----------------------------------------------------------------
//@desc   get all users
//@route  GET /api/users/all
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
    res.json({ message: "success" });
});

//-----------------------------JWT--------------------------------
//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

//-----------------------------register----------------------------------
//@desc   registerUser new user
//@route  POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400); //.json({ message: `Bad request!` });
        throw new Error(`Please add a text field!`);
    }
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error(`User already found!`);
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        //token: generateToken(user._id),
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            //password: hashedPassword,
            token: generateToken(user._id),
            //token: generateToken("5"),
        });
    } else {
        res.status(400);
        throw new Error(`User not found!`);
    }

    //res.json({ message: 'register user!!!!!!!!' });
});

//-----------------------------login----------------------------------
//@desc   authenticate new user
//@route  POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        //const accessToken = jwt.sign(
        res.json(
            {
                _id: user.id,
                name: user.name,
                email: user.email,
                //password: user.password,
                token: generateToken(user._id),
                //token: generateToken("5"),
            }
            // process.env.ACCESS_TOKEN_SECRET,
            // { expiresIn: "30s" }
        );
        //res.json({ accessToken });
    } else {
        res.status(400);
        throw new Error(`Invalid credentials!`);
    }
    //res.json(User);
    //res.status(200).json({ message: `User created!` });
});

//------------------------------PUT----------------------------------
//@desc   update user
//@route  PUT /api/users/id
//@access private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    if (!user) {
        res.status(400);
        throw new Error(`User not found!`);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedUser);
});

//-----------------------------DELETE-----------------------------------
//@desc   delete user
//@route  DELETE /api/users/id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error(`User not found!`);
    }
    await user.remove;
    res.status(200).json({ message: `Delete user!${req.params.id}` });
});

//-----------------------------JWT-2-------------------------------
/**
 * Generates a JSON Web Token (JWT) with the provided user ID and expiration time.
 * @param {string} id - The ID of the user to be included in the token.
 * @returns {string} The generated JWT.
 */
const generateToken_2 = (id) => {
    // The payload of the JWT, which includes the user's ID.
    const payload = {
        id,
    };

    // The secret key used to sign the JWT.
    const secret = process.env.JWT_SECRET;

    // The expiration time of the JWT, set to 30 days.
    const options = {
        expiresIn: "30d",
    };

    // Generate and return the JWT.
    return jwt.sign(payload, secret, options);
};

module.exports = {
    loginUser,
    getMe,
    getAllUsers,
    updateUser,
    deleteUser,
    registerUser,
};

////mongodb+srv://mariana1mena1:RMFJZHhLJ3KiVWkP@mern-app-cluster.ciufomr.mongodb.net/
