require("dotenv").config();
const express= require('express');

const authRoutes = require("./routes/auth.routes.js")
const app = express();

// Routes
const healthRoutes = require("./routes/health.routes.js");
const versionRoutes = require("./routes/version.routes.js");
const userRoutes = require("./routes/users.routes.js");

//Middlewares
const loggermiddleware = require("./middlewares/logger.middleware.js");

app.use(express.json());

app.use (loggermiddleware)

app.use("/api", versionRoutes)
app.use("/api",healthRoutes)
app.use("/api", userRoutes)

app.use("/api", authRoutes)


app.get ("/test", (req,res)=>{
    res.send("TEST OK")
})

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running in ${PORT}`)
});


