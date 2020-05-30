const getScript = (recipient, text) => `
osascript -e '
on run argv
\ttell application "Messages"
\t\tset chatGUID to "${recipient}"
\t\tset messageText to "${text}"
\t\tset chatReference to a reference to text chat id chatGUID
\t\tsend messageText to chatReference
\tend tell
end run
'
`

exports.getScript = getScript