import MessagesManager from './MessagesManager'

const getFormBody = data => {
  let formBody = []
  for (let key in data) {
    let encodedKey = encodeURIComponent(key)
    let encodedValue = encodeURIComponent(data[key])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  return formBody.join('&')
}

const APIClient = function() {
  let authToken = 'test'

  const fetchData = async url => {
    if(!authToken) return
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authToken
        },
      })
      if (res.status === 202) {
        return { success: true, res }
      }

      if (res.status === 200) {
        const parsedResponse = await res.json()
        return {
          success: true,
          parsedResponse,
          res
        }
      }

      return { success: false, res }
    } catch (e) {
      console.log(e)
    }
  }

  const postData = async (url, data) => {
    if(!authToken) return

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: getFormBody(data)
      })
      if (res.status === 200) return { success: true, res }

      return { success: false, res }
    } catch (e) {
      console.log(e)
    }
  }

  const signIn = async () => {
    authToken = prompt('Passphrase')
    if(authToken === null) return

    const res = await fetchData('/signIn')
    if(res.success) return
    await signIn()
  }

  const initPolling = () => setInterval( handlePolling, 5000)
  const handlePolling = () => MessagesManager.updateMessages()

  return {
    fetchData, postData, signIn, initPolling
  }
}()

export default APIClient