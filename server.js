const express = require('express');
const connectDb = require("./utils/dbConnect");
require("dotenv").config({ path: "./config.env" });
const postRoute = require('./routes/postRoute')
require('dotenv').config();
const app = express();
const port = 8080;
app.use(express.json());

connectDb().then(() => {
    app.listen(port, err => {
        if (err) throw err;

        app.use(postRoute)
        console.log(`Express server  running ${port}`);

    }


    );
});