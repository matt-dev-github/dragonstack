const { hash } = require("../account/helper");
const Session = require("../account/session");
const AccountTable = require("../account/table");

//Sets session cookie for username on the client
const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    // dont create new session ID if the current one is valid
    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId });
      // Set cookie for user with valid session
      setSessionCookie({ sessionString, res });

      resolve({ message: "session restored" });
    } else {
      session = new Session({ username });
      sessionString = session.toString();

      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username),
      })
        .then(() => {
          setSessionCookie({ sessionString, res });

          resolve({ message: "session created" });
        })
        .catch((error) => reject(error));
    }
  });
};

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie("sessionString", sessionString, {
    expire: Date.now() + 3600000,
    //httpOnly: true,
    //secure: true // can only be sent over https
  });
};

module.exports = { setSession };
