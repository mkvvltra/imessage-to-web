const Queries = {
  getChatrooms: 'SELECT chat_identifier, display_name, guid FROM chat',
  getAllMessages: `SELECT * FROM message`,
  getAllHandles: `SELECT * FROM handle`,
  getMessages: id => `
  SELECT * FROM
  (SELECT
    datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") AS message_date,
    message.text,
    message.is_from_me,
    message.handle_id,
    message.cache_roomnames,
    message.guid,
    chat.guid,
    handle.id
  FROM
    chat
  JOIN chat_message_join ON chat. "ROWID" = chat_message_join.chat_id
  JOIN message ON chat_message_join.message_id = message. "ROWID"
  LEFT JOIN handle ON message.handle_id = handle. "ROWID"
  WHERE chat_identifier LIKE '${id}'
  ORDER BY message_date DESC LIMIT 30)
  ORDER BY message_date ASC;
  `,
}

exports.Queries = Queries