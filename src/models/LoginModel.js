const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class HandleLogin{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.validateLogin();
        if(this.errors.length > 0) return;

        if(await this.userExists()) return;

        const salt = await bcryptjs.genSalt(5);
        this.body.password = await bcryptjs.hash(this.body.password, salt);

        this.user = await LoginModel.create({
            email: this.body.email,
            password: this.body.password
        });
    }

    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email});
        if(user) {
            this.errors.push("An account is already registered with that email.");
            return true;
        }
        return false;
    }

    validateLogin(){
        this.cleanUp();

        if(!this.body.email && !this.body.password){
            this.errors.push('All fields must be filled.');
            return;
        }

        if(!validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail.');

        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.errors.push('Password must be 3 to 50 characters long.');
        }

        if(this.body.password !== this.body.repeatPassword) {
            this.errors.push('Passwords do not match.');
        };
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.createEmail,
            password: this.body.createPassword,
            repeatPassword: this.body.repeatCreatePassword
        };
    }
}

module.exports = HandleLogin;