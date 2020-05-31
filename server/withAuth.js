const { getArg } = require('./utils')

exports.withAuth = fn => (req, res) => {
  const pwd = getArg('-p')
  if(pwd){
    const { authorization } = req.headers
    if(pwd !== authorization){
      res.sendStatus(401)
      return
    }
  }

  fn(req, res)
}