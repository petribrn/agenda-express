// Assing testing variable
exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
};
