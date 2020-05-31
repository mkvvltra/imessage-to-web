import get from 'lodash.get'
import APIClient from './APIClient'
import { getCurrentChatroom } from './chatrooms'

const messageBody = ({ text, message_date, id, is_from_me }) => `
    <span class="messageContainer__meta">
        ${message_date}
    </span>
    <div class="messageContainer__meta">
        ${is_from_me ? 'self' : id}
    </div>
    <span class="messageContainer__text">
        ${text && text.replace(/(<([^>]+)>)/ig,"")}
    </span>
`

const MessagesManager = function () {
  const container = document.getElementById('messagesContainer')
  let currentMessages = []

  const appendToContainer = messages => {
    messages.forEach(({ is_from_me, ...row }) => {
      const msg = document.createElement('div')
      msg.className = `messageContainer ${is_from_me ? 'messageContainer--self' : ''}`
      msg.innerHTML = messageBody({ is_from_me, ...row })
      container.appendChild(msg)
    })
  }

  const setMessages = async id => {
    container.innerHTML = null

    const res = get(await APIClient.fetchData(`/messages?id=${encodeURIComponent(id)}`), 'parsedResponse')
    if (!Array.isArray(res)) return

    appendToContainer(res)

    currentMessages = res
  }

  const updateMessages = async () => {
    const id = getCurrentChatroom()

    const previousGUIDs = currentMessages.map(({ guid }) => guid)
    const res = get(await APIClient.fetchData(`/messages?id=${encodeURIComponent(id)}`), 'parsedResponse')
    if (!Array.isArray(res)) return

    const newMessages = res.filter(({ guid }) => !previousGUIDs.includes(guid))

    appendToContainer(newMessages)

    currentMessages = res
  }

  const sendMessage = async () => {
    const inputEl = document.getElementById('messageText')
    const inputValue = inputEl.value

    if(inputValue === "") return

    let recipient = `iMessage;-;${getCurrentChatroom()}`

    const res = await APIClient.postData('/sendMessage', {
      recipient,
      value: inputValue
    })

    if(!res.success) return

    inputEl.value = ""

    setTimeout(updateMessages, 1000)
  }

  return {
    setMessages, updateMessages, sendMessage
  }
}()

export default MessagesManager
