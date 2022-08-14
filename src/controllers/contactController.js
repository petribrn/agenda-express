const { async } = require('regenerator-runtime');
const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    return res.render('contact', {
        contact: {}
    });
}

exports.saveContact = async (req, res) => {
    try{
        const contact = new Contact(req.body);
        await contact.saveContact();

        if(contact.errors.length > 0){
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contact successfully saved.');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return; 
    } catch(err) {
        console.log(err);
        res.render('404');
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contact = await Contact.findContactById(req.params.id);
    if(!contact) return res.render('404');

    res.render('contact', { contact });
}

exports.editContact = async (req, res) => {

    try{
        if(!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.editContact(req.params.id)

        if(contact.errors.length > 0){
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('success', 'Contact successfully saved.');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return; 

    } catch(err){
        console.log(err);
        res.render('404');
    }
}

exports.deleteContact = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contact = await Contact.delete(req.params.id);
    if(!contact) return res.render('404');

    req.flash('success', 'Contact successfully deleted.');
    req.session.save(() => res.redirect('back'));
    return;
}