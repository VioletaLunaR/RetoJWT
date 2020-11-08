const mdbconn = require("../lib/mongoUtils");
const bcrypt = require('bcrypt');
const dataBase = 'jwt_db';

function getUsers() {
  return mdbconn.conn().then((client) => {
    return client.db(dataBase).collection('users').find({}).toArray();
  });
}

async function insertUser(user) {
  //Encripataso la contraseña
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  return mdbconn.conn().then(async (client) => {
    const nUser = await client
      .db(dataBase)
      .collection('users')
      .insertOne(user)
      .finally(() => client.close())

    return nUser;
  });
}


module.exports = [getUsers, insertUser];