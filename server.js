const express = require('express');
const connectDb = require("./utils/dbConnect");
require("dotenv").config({ path: "./config.env" });
const postRoute = require('./routes/postRoute')
const app = express();
const port = process.env.PORT || 8080; 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); 
}
app.use(express.json());

connectDb().then(() => {
    app.listen(port, err => {
        if (err) throw err;

        app.use(postRoute)
       
        console.log(`Express server  running ${port}`);

    }


    );
});