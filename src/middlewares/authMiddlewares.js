exports.userSession = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'You have to login in order to access that page.')
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}