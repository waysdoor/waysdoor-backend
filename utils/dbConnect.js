const mongoose = require('mongoose')

 const connectDb = async () => {
    console.log("mongouri logged",process.env.MONGOURL)
     try {
        
         await mongoose.connect(process.env.MONGOURL);
         console.log("Connected to the database");
     } catch (error) {
         console.error("Error connecting to MongoDB:", error.message);
         // Optionally, you may throw the error to indicate a failed connection
         // throw error;
     }
};

module.exports =  connectDb ;
