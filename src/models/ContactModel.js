const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: false, default: ''},
    phoneNumber: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    created: {type: Date, default: Date.now}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async saveContact(){
        this.validateInputs();
        if(this.errors.length > 0) return;

        this.contact = await ContactModel.create(this.body);
    }

    async editContact(id){
        if(typeof id !== 'string') return;
        this.validateInputs();
        if(this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    validateInputs(){
        this.cleanUp();

        if(!this.body.email && !this.body.phoneNumber){
            this.errors.push('A contact must have an e-mail or a phone number.');
        }

        if(this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('Invalid E-mail.');
        }

        if(!this.body.firstName){
            this.errors.push('Name is a required field.');
        }

        // if(this.body.phoneNumber && !validator.isMobilePhone(this.body.phoneNumber)){
        //     this.errors.push('Invalid Phone number.')
        // }
        
    }

    static async findContactById(id){
        if(typeof id !== 'string') return;

        const contact = await ContactModel.findById(id);
        return contact;
    }

    static async findContacts(){
        const contacts = await ContactModel.find()
            .sort({created: -1});
        return contacts;
    }

    static async delete(id){
        if(typeof id !== 'string') return;

        const contact = await ContactModel.findOneAndDelete({_id: id});
        return contact;
    }



    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            firstName: this.body.firstName,
            lastName: this.body.lastName,
            phoneNumber: this.body.phoneNumber,
            email: this.body.email
        }
    }
}

module.exports = Contact;