const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function getListContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contactsList = await getListContacts();
  const contactItem = contactsList.find(contact => contact.id === contactId);
  return contactItem || null;
}

async function addContact(newContactData) {
  const contactsList = await getListContacts();
  const newContact = { id: nanoid(20), ...newContactData };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

async function upDateContact(contactId, upDatedContact) {
  const contactsList = await getListContacts();
  const index = contactsList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contactsList[index] = { contactId, ...upDatedContact };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
}

async function removeContact(contactId) {
  const contactsList = await getListContacts();
  const index = contactsList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [deletedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return deletedContact;
}

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  upDateContact,
  removeContact,
};
