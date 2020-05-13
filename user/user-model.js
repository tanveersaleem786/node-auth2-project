const db = require("../data/config")
const bcrypt = require("bcryptjs")

function getUsersByDept(department) {
 
   return db("users").select("id","username","department").where({department})

}

function findBy(filter) {

    return db("users").where(filter)
}


async function addUser(user) {
    user.password = await bcrypt.hash(user.password,10)
    return db("users")
    .insert(user)
    .then(([id]) => findBy({id}).first() )
}

module.exports = {
    getUsersByDept,
    findBy,
    addUser
}