module.exports = (fn) => {
    return (req,res,next) => {
        fn(req, res, next).catch(next); // Sends any error to the Global Middleware
    };
};