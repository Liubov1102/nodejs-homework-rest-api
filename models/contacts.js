const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

const updateById = async (contacts) =>
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateById(contacts);
    return result;
}

const addContact = async (body) => {
   const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    contacts.push(newContact);
    await updateById(contacts);
    return newContact;
}

const updateContact = async (contactId, body) => {
     const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { contactId, ...body};
    await updateById(contacts);
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
