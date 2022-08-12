// Assing testing variable
exports.globalMiddleware = (req, res, next) => {
    res.locals.resVariable = "Local variable's value";
    next();
};
