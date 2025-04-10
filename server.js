const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");

const app = express();
const port = process.env.port || 5000;

connectDb();

// this thing is the parser to convert json so i can understad it
app.use(express.json());

// goes to like diff routers and all
app.use("/api/contacts",require("./routes/contactroute"))

app.use("/api/users",require("./routes/userroutes"))

// good error handling skills ezz gg
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server running on port ${port}`);

});

