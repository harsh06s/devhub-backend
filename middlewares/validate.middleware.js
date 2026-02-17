const validate = (schema) =>(req,res,next) =>{
    try {
        // .parse() checks the data. If it fails, it throws an error.
        schema.parse({
            body: req.body,
        });
        next();

    } catch (error) {
        // If invalid, return a 400 error with the specific Zod messages
        return res.status(400).json({
            status: "fail",
            errors: err.error.map(e =>({ field: e.path[1], message: e.message}))
        });
        
    }
}
module.exports = validate;