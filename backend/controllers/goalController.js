//@desc Goal controller
//@
const getGoals = (req, res) => {
    res.status(200).json({ message: `Get goals!` });
};

const setGoal = (req, res) => {
    //console.log(req.body);
    if (req.body.text) {
        res.status(200).json({ message: `It Works!` });
    } else {
        
        res.status(400)//.json({ message: `Bad request!` });
        throw new Error(`Please add a text field!`);
    }
    res.status(200).json({ message: `Post goal!` });
};

const updateGoal = (req, res) => {
    res.status(200).json({ message: `Update goal!${req.params.id}` });
};

const deleteGoal = (req, res) => {
    res.status(200).json({ message: `Delete goal!${req.params.id}` });
};
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
