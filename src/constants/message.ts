enum Message {
  OK = 'OK',
  CREATED = 'Created',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  INCORRECT_EMAIL = 'Email is incorrect',
  INCORRECT_PASSWORD = 'Password is incorrect',
  TAKEN_EMAIL = 'Email is taken',
  DUPLICATED = 'Duplicated',
}

export default Message;
