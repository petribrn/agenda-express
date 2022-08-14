import validator from "validator";

export default class RegisterFormValidator{
    constructor(){
        this.form = document.querySelector('.register-form');
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
        const repeatPasswordInput = this.form.querySelector('input[name="repeatPassword"]');

        // E-mail checks
        if(!emailInput.value){
            this.createErrorText(emailInput, 'Email required.');
            validInputs = false;
        }

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            this.createErrorText(emailInput, 'Invalid Email.');
            validInputs = false;
        }

        // Password checks
        if(passwordInput.value && passwordInput.value.length < 3 || passwordInput.value.length > 50){
            this.createErrorText(passwordInput, 'Password must be 3 to 50 characters long.');
            validInputs = false;
        }

        if(!passwordInput.value){
            this.createErrorText(passwordInput, 'Password required.');
            validInputs = false;
        }

        if(!repeatPasswordInput.value){
            this.createErrorText(repeatPasswordInput, 'Please repeat your password.');
            validInputs = false;
        }

        if(passwordInput.value !== repeatPasswordInput.value){
            this.createErrorText(passwordInput, 'Passwords do not match.');
            this.createErrorText(repeatPasswordInput, 'Passwords do not match.');
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