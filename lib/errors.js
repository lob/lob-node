'use strict';

// Helper to easily create errors.
function createError (name, message) {
  function ErrorCotr () {
    this.name = name;
    /* istanbul ignore else */
    if (typeof message === 'string') {
      this.message = message;
    } else if (typeof message === 'function') {
      this.message = message.apply(undefined, arguments);
    } else {
      throw new Error('bad input');
    }
  }
  ErrorCotr.prototype = Object.create(Error.prototype);
  ErrorCotr.prototype.constructor = ErrorCotr;
  ErrorCotr.prototype.name = name;
  exports[name] = ErrorCotr;
}

createError('LobError', function (msg) { return msg; });
