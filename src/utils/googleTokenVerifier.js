const https = require("https");

/**
 * Verifies a Google idToken by calling Google's tokeninfo endpoint.
 * Returns the decoded payload { email, name, picture, sub } on success.
 * Throws an error if the token is invalid.
 */
const verifyGoogleIdToken = (idToken) => {
  return new Promise((resolve, reject) => {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const payload = JSON.parse(data);
            if (payload.error_description || payload.error) {
              return reject(new Error("Invalid Google token: " + (payload.error_description || payload.error)));
            }
            // Optionally verify the audience (client id) here
            resolve(payload);
          } catch (e) {
            reject(new Error("Failed to parse Google token response"));
          }
        });
      })
      .on("error", (err) => {
        reject(new Error("Network error verifying Google token: " + err.message));
      });
  });
};

module.exports = { verifyGoogleIdToken };
