const HandleLogin = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
}

exports.registerUser = async (req, res) => {
    try{
        const handleLogin = new HandleLogin(req.body);
        await handleLogin.register();

        if(handleLogin.errors.length > 0){
            req.flash('errors', handleLogin.errors);
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
