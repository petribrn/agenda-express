import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import LoginFormValidator from './modules/loginFormValidator';
import RegisterFormValidator from './modules/registerFormValidator';
import ContactFormValidator from './modules/contactFormValidator';

const loginFormValidator = new LoginFormValidator();
const registerFormValidator = new RegisterFormValidator();
const contactFormValidator = new ContactFormValidator();
loginFormValidator.eventHandle();
registerFormValidator.eventHandle();
contactFormValidator.eventHandle();
