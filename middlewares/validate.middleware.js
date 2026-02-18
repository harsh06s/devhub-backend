const validate = (schema) =>(req,res,next) =>{
    try {
        // .parse() checks the data. If it fails, it throws an error.
        schema.parse({
            body: req.body,
        });
        next();

    } catch (err) {
        // If invalid, return a 400 error with the specific Zod messages
        console.error("Validation Middleware Error:", err);
        return res.status(400).json({
            status: "fail",
            //errors: err.errors.map(e =>({ field: e.path[e.path.length - 1], message: e.message}))
        });
        
        
    }
}
module.exports = validate;