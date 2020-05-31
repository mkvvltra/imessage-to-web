const sqlite3 = require('sqlite3').verbose()

let username = process.env.USER || ""

const DBClient = function() {
  let db = null

  const init = async () => new Promise(((resolve, reject) => {
    db = new sqlite3.Database(`/Users/${username}/Library/Messages/chat.db`, async err => {
      if (err) {
        reject(err.message)
      }
      resolve()
    })
  }))

  const getDbInstance = () => this.db

  const execQuery = (query, parse = arg => arg) => new Promise((resolve, reject) => {
    db.all(query, (err, all) => {
      if (err) {
        reject(err.message)
      }
      resolve(parse(all))
    })
  })

  return {
    init,
    getDbInstance,
    execQuery
  }
}()

exports.DBClient = DBClient
