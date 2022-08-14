import validator from "validator";

export default class ContactFormValidator{
    constructor(){
        this.form = document.querySelector('.contact-form');
    }

    eventHandle(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const validInputs = this.validateInputs();
        if(validInputs) this.form.submit();
    }

    validateInputs(){
        let validInputs = true;

        for(let errorDiv of this.form.querySelectorAll('.text-danger')){
            errorDiv.remove();
        }

        const emailInput = this.form.querySelector('input[name="email"]');
        const firstName = this.form.querySelector('input[name="firstName"]');
        const phoneNumber = this.form.querySelector('input[name="phoneNumber"]');

        // E-mail checks
        if(!emailInput.value && !phoneNumber.value){
            this.createErrorText(emailInput, 'A contact must have an e-mail or phone number.');
            this.createErrorText(phoneNumber, 'A contact must have an e-mail or phone number.');
            validInputs = false;
        }

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            this.createErrorText(emailInput, 'Invalid Email.');
            validInputs = false;
        }

        if(!firstName.value){
            this.createErrorText(firstName, 'First name required.');
            validInputs = false;
        }

        

        return validInputs;
    }

    createErrorText(field, msg){
        const errorDiv = document.createElement('p');
        errorDiv.innerHTML = msg;
        errorDiv.classList.add('text-danger', 'font-monospace', 'fw-light', 'fs-6', 'fst-italic');
        field.insertAdjacentElement('afterend', errorDiv);
    }
}