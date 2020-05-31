const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { exec } = require('child_process')
const { DBClient } = require('./server/DBClient')
const { Queries } = require('./server/Queries')
const { withAuth } = require('./server/withAuth')
const { getScript } = require('./server/sendscript')

const app = express()
app.use(express.static(__dirname + "/public/"))
app.use(bodyParser.urlencoded())

const main = async () => {
  await DBClient.init()

  console.log(await DBClient.execQuery(Queries.getAllHandles))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
  })

  app.get('/signIn', withAuth(async (req, res) => {
    res.send(202)
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

    if(!recipient || !value) res.send(400)

    exec(getScript(recipient, value), error => {
      if (error) {
        res.send('error!')
      }
    })

    res.send('message sent!')
  }))

  app.listen(8000, () => {
    console.log('imessage-to-http on 8000!')
  })
}

main()