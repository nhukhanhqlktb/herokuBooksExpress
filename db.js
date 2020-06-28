const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ books: [], users: [], transactions: [], sessions: [], countCookie: 0, wrongLoginCount: 0 })
  .write();

module.exports = db;