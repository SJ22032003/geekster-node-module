const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require("./routes/users.routes");
const app = express(); // initialize express

app.use(bodyParser.json());

app.use('/users',userRouter)

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})