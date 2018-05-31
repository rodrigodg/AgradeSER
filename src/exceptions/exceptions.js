function NotReadyException(message) {
  this.message = message;
  this.name = 'NotReadyException';
}

function UserNotAllowedToAcessResourceException(message) {
  this.message = message;
  this.name = 'UserNotAllowedToAcessResourceException';
}

export { NotReadyException, UserNotAllowedToAcessResourceException };
