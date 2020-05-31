const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { exec } = require('child_process')
const { DBClient } = require('./server/DBClient')
const { Queries } = require('./server/Queries')
const { withAuth } = require('./server/withAuth')
const { getArg } = require('./server/utils')
const { getScript } = require('./server/sendscript')

const app = express()
app.use(express.static(__dirname + "/public/"))
app.use(bodyParser.urlencoded(({ extended: true })))

const main = async () => {
  await DBClient.init()

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
  })

  app.get('/signIn', withAuth(async (req, res) => {
    res.sendStatus(202)
  }))

  app.get('/chatrooms', withAuth(async (req, res) => {
    let chatrooms = await DBClient.execQuery(Queries.getChatrooms)
    res.send(chatrooms)
  }))

  app.get('/messages', withAuth(async (req, res) => {
    let { id } = req.query
    let messages = await DBClient.execQuery(Queries.getMessages(decodeURIComponent(id)))
    res.send(messages)
  }))

  app.post('/sendMessage', withAuth(async (req, res) => {
    const { recipient, value } = req.body

    if(!recipient || !value) res.sendStatus(400)

    exec(getScript(recipient, value), error => {
      if (error) {
        res.send('error!')
      }
    })

    res.send('message sent!')
  }))

  const server = app.listen(8000, () => {
    console.log('imessage-to-http on 8000!')
  })

  if(!getArg('-p')){
    console.log(`Please define passphrase in arg, eg; node index.js -p='passphrase'`)
    server.close()
  }
}

main()