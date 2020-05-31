exports.getArg = argName => {
  const pwdArr = process.argv.filter(arg => arg.includes(argName))

  if(!pwdArr.length){
    return null
  }else{
    return pwdArr[0].split('=')[1]
  }
}