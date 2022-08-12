const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Auth{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login(){
        this.validateLogin();
        if(this.errors.length > 0) return;
        this.user = await this.userExists();

        if(!this.user) {
            this.errors.push('E-mail is not connected to any account. Find your account and try again.');
            return;
        }
        if(!await bcryptjs.compare(this.body.password, this.user.password)){
            this.errors.push('Invalid password. Please try again.');
            this.user = null;
            return;
        }
    }

    async register(){
        this.validateRegister();

        if(await this.userExists()) {
            this.errors.push("An account is already registered with that email.");
            return;
        }

        if(this.errors.length > 0) return;

        const salt = await bcryptjs.genSalt(5);
        this.body.password = await bcryptjs.hash(this.body.password, salt);

        this.user = await LoginModel.create({
            email: this.body.email,
            password: this.body.password
        });
    }

    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email});
        if(user) return user;
        return false;
    }

    async validateRegister(){
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

    validateLogin(){
        this.cleanUp();

        if(!this.body.email && !this.body.password){
            this.errors.push('You must enter e-mail and password to continue.');
            return;
        }
        if(!validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail.');
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        if(!this.body.repeatPassword){
            this.body = {
                email: this.body.email,
                password: this.body.password,
            };
            return;
        }
        this.body = {
            email: this.body.email,
            password: this.body.password,
            repeatPassword: this.body.repeatPassword
        };
    }
}

module.exports = Auth;