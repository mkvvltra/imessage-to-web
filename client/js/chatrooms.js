import get from 'lodash.get'
import APIClient from './APIClient'
import MessagesManager from './MessagesManager'

const setChatrooms = () => new Promise((async resolve => {
  const select = document.getElementById('chatrooms')
  select.onchange = e => MessagesManager.setMessages(e.target.value)

  const res = get(await APIClient.fetchData('/chatrooms'), 'parsedResponse')
  if (!Array.isArray(res)) return

  res.forEach(({ chat_identifier, display_name }) => {
    const option = document.createElement('option')
    option.value = chat_identifier
    option.textContent = display_name || chat_identifier
    select.appendChild(option)
  })

  resolve()
}))

const getCurrentChatroom = () => {
  const select = document.getElementById('chatrooms')
  return select.options[select.selectedIndex].value
}

export { setChatrooms, getCurrentChatroom }