const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc   get all goals
//@route  GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    // const goals = await Goal.find();
    // res.status(200).json(goals);
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

//----------------------------------------------------------------
//@desc   set new goal
//@route  POST /api/goals
//@access private
const setGoal = asyncHandler(async (req, res) => {
    //console.log(req.body);
    if (!req.body.text) {
        res.status(400); //.json({ message: `Bad request!` });
        throw new Error(`Please add a text field!`);
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });
    res.status(200).json(goal);
    //res.status(200).json({message:"test"});
});

//----------------------------------------------------------------
//@desc   update goal
//@route  PUT /api/goals/id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
    if (!goal) {
        res.status(400);
        throw new Error(`Goal not found!`);
    }
    //check for user
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error(`User not found!`);
    }
    //make sure the logged in user matches the goal user
    if (goal.user.toString) {
        if (goal.user.toString() !== user.id) {
            res.status(401);
            throw new Error(`User not authorized!`);
        }
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedGoal);
});

//----------------------------------------------------------------
//@desc   delete goal
//@route  DELETE /api/goals/id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    //const goal = await Goal.findById(req.params.id);
    const goal = await Goal.findByIdAndDelete(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error(`Goal not found!`);
    }
    //check for user
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error(`User not found!`);
    }
    //make sure the logged in user matches the goal user
    if (goal.user.toString) {
        if (goal.user.toString() !== user.id) {
            res.status(401);
            throw new Error(`User not authorized!`);
        }
    }

    await goal.remove;
    res.status(200).json({ id: req.params.id });
});
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
