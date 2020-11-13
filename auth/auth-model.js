const db = require('../database/dbConfig');

module.exports = {
    create,
    findBy,

};

async function create(user) {
   const [id] = await db("users").insert(user)
    return db("users").where({ id }).first()
}

async function findBy(username) {
     return db("users").where( username ).orderBy("id")
 }