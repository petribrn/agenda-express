import validator from "validator";

export default class LoginFormValidator{
    constructor(){
        this.form = document.querySelector('.login-form');
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
        const passwordInput = this.form.querySelector('input[name="password"]');

        if(!validator.isEmail(emailInput.value)) {
            this.createErrorText(emailInput, 'Invalid Email.');
            validInputs = false;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
            this.createErrorText(passwordInput, 'Password required.');
            validInputs = false;
        }

        return validInputs;
    }

    createErrorText(field, msg){
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = msg;
        errorDiv.classList.add('text-danger', 'font-monospace', 'fw-light', 'fs-6', 'fst-italic');
        field.insertAdjacentElement('afterend', errorDiv);
    }
}