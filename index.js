const {
  getListContacts,
  getContactById,
  addContact,
  upDateContact,
  removeContact,
} = require('./contacts');
// const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await getListContacts();
      console.log(contactsList);
      break;

    case 'get':
      const contactItem = await getContactById(id);
      console.log(contactItem);
      break;

    case 'add':
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      break;

    case 'update':
      const upDatedContact = await upDateContact(id, { name, email, phone });
      console.log(upDatedContact);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'vza2RIzNGIwutCVCs4mCL' });
// invokeAction({
//   action: 'add',
//   name: 'Test',
//   email: 'test@mail.com',
//   phone: '1111111',
// });
// invokeAction({
//   action: 'update',
//   id: 'jenR2WKROCAg983FQbzY',
//   name: 'newTest',
//   email: 'test@mail.com',
//   phone: '1111111',
// });
invokeAction({
  action: 'remove',
  id: 'qdggE76Jtbfd9eWJHrssH',
});
