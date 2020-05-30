export default () => new Promise((async resolve => {
  const select = document.getElementById('chatrooms')
  select.onchange = e => setMessages(e.target.value)

  const res = await fetchResource('/chatrooms')
  if (!Array.isArray(res)) return

  res.forEach(({ chat_identifier, display_name }) => {
    const option = document.createElement('option')
    option.value = chat_identifier
    option.textContent = display_name || chat_identifier
    select.appendChild(option)
  })

  resolve()
}))