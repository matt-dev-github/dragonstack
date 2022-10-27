const { v4: uuidv4 } = require("uuid");
const { hash } = require("./helper");

const SEPARATOR = "|";

class Session {
  constructor({ username }) {
    this.username = username;
    this.id = uuidv4();
  }

  toString() {
    const { username, id } = this;
    return Session.sessionString({ username, id });
  }

  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);

    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2],
    };
  }

  static verify(sessionString) {
    const { username, id, sessionHash } = Session.parse(sessionString);

    const accountData = Session.accountData({ username, id });

    return hash(accountData) === sessionHash;
  }

  // String of session cookie
  static accountData({ username, id }) {
    return `${username}${SEPARATOR}${id}`;
  }

  static sessionString({ username, id }) {
    const accountData = Session.accountData({ username, id });

    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }
}

// node .\session.js
// const foo = new Session({ username: "foo" });
// const fooString = foo.toString();
// console.log("Session.parse(fooString): ", Session.parse(fooString));
// console.log("Session.verify(fooString)", Session.verify(fooString));
// const fakeFooString = `admin_${fooString}`;
// console.log("Session.verify(fakeFooString)", Session.verify(fakeFooString));

module.exports = Session;
