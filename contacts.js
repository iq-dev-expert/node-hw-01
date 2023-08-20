const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function getContactList() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}

async function getContactById(contactId) {
  const contactList = await getContactList();
  const contactItem = contactList.find(contact => contact.id === contactId);
  return contactItem || null;
}

async function addContact(newContactData) {
  const contactList = await getContactList();
  const newContact = { id: nanoid(20), ...newContactData };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
}

async function upDateContact(contactId, upDatedContact) {
  const contactList = await getContactList();
  const index = contactList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contactList[index] = { contactId, ...upDatedContact };
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return contactList[index];
}

async function removeContact(contactId) {
  const contactList = await getContactList();
  const index = contactList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [deletedContact] = contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return deletedContact;
}

module.exports = {
  getContactList,
  getContactById,
  addContact,
  upDateContact,
  removeContact,
};
