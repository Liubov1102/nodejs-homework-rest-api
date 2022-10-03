const contacts = require('../../models/contacts');

const addContact = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
  return newContact;
};

module.exports = addContact;

 