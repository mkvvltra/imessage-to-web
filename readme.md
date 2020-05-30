uses: osascript -e 'tell application "Messages" to send "test disregard plx" to buddy "UNISM"'

sqlite> .tables
_SqliteDatabaseProperties  deleted_messages
attachment                 handle
chat                       message
chat_handle_join           message_attachment_join
chat_message_join


ROWID == HANDLE ID ?