const { program } = require('commander');
const {
  getContactList,
  getContactById,
  addContact,
  upDateContact,
  removeContact,
} = require('./contacts');

program
  .option('-a, --action, <type>')
  .option('-i, --id, <type>')
  .option('-n, --name, <type>')
  .option('-e, --email, <type>')
  .option('-p, --phone, <type>');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'getList':
      const contactsList = await getContactList();
      console.table(contactsList);
      break;

    case 'getById':
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

invokeAction(options);
