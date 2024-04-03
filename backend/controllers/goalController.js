const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
//@desc Goal controller
//@
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
});

//setGoal
const setGoal = asyncHandler(async (req, res) => {
    //console.log(req.body);
    if (!req.body.text) {
        res.status(400); //.json({ message: `Bad request!` });
        throw new Error(`Please add a text field!`);
    }

    const goal = await Goal.create({
        text: req.body.text,
    });
    res.status(200).json(goal);
});

//updateGoal
const updateGoal = asyncHandler(async (req, res) => {
const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
    if (!goal) {
        res.status(400);
        throw new Error(`Goal not found!`);
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
    //const goal = await Goal.findById(req.params.id);
    const deleteGoal = await Goal.findByIdAndDelete(req.params.id);

    if (!deleteGoal) { 
        res.status(400);
        throw new Error(`Goal not found!`);
    }
    //await goal.remove
    res.status(200).json({ message: `Delete goal!${req.params.id}` });
});
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
