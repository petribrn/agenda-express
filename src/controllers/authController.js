const Auth = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) {
        // req.flash('success', "You've already logged in.");
        // return res.redirect('/');
        return res.render('logged-in');
    };
    res.render('login');
}

exports.registerUser = async (req, res) => {
    try{
        const auth = new Auth(req.body);
        await auth.register();

        if(auth.errors.length > 0){
            req.flash('errors', auth.errors);
            req.session.save(function(){
                return res.redirect('back');
            });
            return;
        }
        req.flash('success', 'User successfully created, please Sign In.');
        req.session.save(function(){
            return res.redirect('back');
        });

    }catch(err){
        console.log(err);
        return res.render('404');
    }
    
};

exports.loginUser = async (req, res) => {
    try{
        const auth = new Auth(req.body);
        await auth.login();

        if(auth.errors.length > 0){
            req.flash('errors', auth.errors);
            req.session.save(function(){
                return res.redirect('back');
            });
            return;
        }
        req.flash('success', "You've logged in.");
        req.session.user = auth.user;
        req.session.save(function(){
            return res.redirect('back');
            // return res.redirect('/');
        });

    }catch(err){
        console.log(err);
        return res.render('404');
    }
    
};

exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
