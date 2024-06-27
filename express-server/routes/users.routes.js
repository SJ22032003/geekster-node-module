const express = require('express');

const data = []

const userRouter = express.Router();

userRouter.get('/get-user', (req, res) => {
    res.status(200).json(data);
});


userRouter.post('/', (req, res) => {
    const bodyData = req.body;

    // check if the bodyData is empty
    if(!bodyData.name) {
      return res.status(400).json({ message: "Please provide data for name"});
    }

    data.push(bodyData);
    return res.status(201).json({ message: "data stored successfully"});
});

module.exports = userRouter;