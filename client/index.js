'use strict'
import css from './index.css'

import APIClient from './js/APIClient'
import MessagesManager from './js/MessagesManager'
import { setChatrooms, getCurrentChatroom } from './js/chatrooms'

const main = async () => {
  // await APIClient.signIn()

  await setChatrooms()
  await MessagesManager.setMessages(getCurrentChatroom())

  APIClient.initPolling()

  document.getElementById('sendButton').onclick = MessagesManager.sendMessage
}

window.onload = () => {
  main()
}