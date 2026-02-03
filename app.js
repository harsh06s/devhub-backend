const express= require('express');
const app = express();

// Routes
const healthroutes = require("./routes/health.routes.js");
const versionroutes = require("./routes/version.routes.js");
const userroutes = require("./routes/users.routes.js");

//Middlewares
const loggermiddleware = require("./middlewares/logger.middleware.js");

app.use(express.json());

app.use (loggermiddleware)

app.use("/api", versionroutes)
app.use("/api",healthroutes)
app.use("/api", userroutes)


app.get ("/test", (req,res)=>{
    res.send("TEST OK")
})

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running in ${PORT}`)
});


