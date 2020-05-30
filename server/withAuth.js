const getPwd = () => {
  const pwdArr = process.argv.filter(arg => arg.includes('-p'))

  if(!pwdArr.length){
    return null
  }else{
    return pwdArr[0].split('=')[1]
  }
}

exports.withAuth = fn => (req, res) => {
  const pwd = getPwd()
  if(pwd){
    const { authorization } = req.headers
    if(pwd !== authorization){
      res.send(401)
      return
    }
  }

  fn(req, res)
}