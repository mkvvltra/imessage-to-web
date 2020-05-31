exports.getArg = argName => {
  const argArr = process.argv.slice(2).filter(arg => arg.includes(argName))

  if(!argArr.length){
    return null
  }else{
    const [ key, value ] = argArr[0].split('=')
    return value || !!key
  }
}