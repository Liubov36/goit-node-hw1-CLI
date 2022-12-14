const fs = require("fs/promises");
const path = require("path");


const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if(!result) {
    return null;

  }
  return result ;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};