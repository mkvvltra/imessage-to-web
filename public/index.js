'use strict'

import getChatrooms from './js/getChatrooms'

let authToken = 'test'
let pollingCounter = 5

const messageBody = ({ text, message_date, id, is_from_me }) => `
      <div class="messageContainer__meta">
          ${message_date} ${is_from_me ? 'self' : id}
      </div>
      <span class="messageContainer__text">
          ${text}
      </span>
  `

const updateMessages = async id => {
  const container = document.getElementById('messagesContainer')

  container.innerHTML = null

  const res = await fetchResource(`/messages?id=${encodeURIComponent(id)}`)
  if (!Array.isArray(res)) return

  res.forEach(({ is_from_me, ...row }) => {
    const msg = document.createElement('div')
    msg.className = `messageContainer ${is_from_me ? 'messageContainer--self' : ''}`
    msg.innerHTML = messageBody({ is_from_me, ...row })
    container.appendChild(msg)
  })
}

const setMessages = async id => {
  const container = document.getElementById('messagesContainer')
  container.innerHTML = null

  const res = await fetchResource(`/messages?id=${encodeURIComponent(id)}`)
  if (!Array.isArray(res)) return

  res.forEach(({ is_from_me, ...row }) => {
    const msg = document.createElement('div')
    msg.className = `messageContainer ${is_from_me ? 'messageContainer--self' : ''}`
    msg.innerHTML = messageBody({ is_from_me, ...row })
    container.appendChild(msg)
  })
}

const getCurrentChatroom = () => {
  const select = document.getElementById('chatrooms')
  return select.options[select.selectedIndex].value
}

const fetchResource = async url => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authToken
      },
    })
    if (res.status === 200) {
      return res.json()
    }
    return 'Request failed'
  } catch (e) {
    console.log(e)
  }
}

const decrementPollingCounter = () => {
  const select = document.getElementById('pollingCounter')
  select.innerText = pollingCounter
  if(pollingCounter === 1){
    pollingCounter = 5
    updateMessages(getCurrentChatroom())
    return
  }

  pollingCounter--
}

const initPolling = () => setInterval( decrementPollingCounter, 1000)

const main = async () => {
  // authToken = prompt('Passphrase')

  await setChatrooms()
  setMessages(getCurrentChatroom())
  initPolling()
}

window.onload = () => {
  main()
}

// const containerHeight = container.getBoundingClientRect().height
// if(currentChatroom === getCurrentChatroom()){
//   container.style.minHeight = `${containerHeight}px`
// } else {
//   container.style.minHeight = `0px`
//   currentChatroom = getCurrentChatroom()
// }