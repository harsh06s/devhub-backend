const {z} = require("zod");

const signupSchema = z.object({
    body: z.object({
        // email must be a string and a valid email format
        email: z.string().email("Invalid email format"),
        // password must be at least 6 characters
        password: z.string().min(6,"Password must be at least 6 charachters")
    }),

});

const loginSchema = z.object ({
    body :({
        email: z.string().email("Invalid email format"),
        password: z.string().min(1,"Password must be at least 6 charachters")
    }),
});

module.exports = {signupSchema,loginSchema}
