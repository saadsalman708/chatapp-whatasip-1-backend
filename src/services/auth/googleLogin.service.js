const User = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");
const { verifyGoogleIdToken } = require("../../utils/googleTokenVerifier");
const createError = require("../../utils/createError");

/**
 * Generates a unique username from an email prefix.
 * Strategy (better than random digits):
 * 1. Try the raw prefix: sam1
 * 2. Try prefix + sequential number: sam1_2, sam1_3 ... up to sam1_99
 * 3. Fallback to prefix + last 6 hex chars of timestamp: sam1_1a2b3c
 */
const generateUniqueUsername = async (emailPrefix) => {
  // Clean the prefix: lowercase, replace non-alphanumeric with underscore
  const base = emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, "_");

  // 1. Try exact
  if (!(await User.findOne({ username: base }))) return base;

  // 2. Try sequential numbers 2–99
  for (let i = 2; i <= 99; i++) {
    const candidate = `${base}_${i}`;
    if (!(await User.findOne({ username: candidate }))) return candidate;
  }

  // 3. Fallback: hex suffix from timestamp
  const hex = Date.now().toString(16).slice(-6);
  return `${base}_${hex}`;
};

const googleLoginService = async (idToken) => {
  if (!idToken) throw createError("Google idToken is required", 400);

  // Verify the token with Google
  const payload = await verifyGoogleIdToken(idToken);
  const { email, name, picture, sub: googleId } = payload;

  if (!email) throw createError("Could not get email from Google account", 400);

  // Check if user already exists by email OR googleId
  let user = await User.findOne({ $or: [{ email }, { googleId }] });

  if (user) {
    // Update avatar/name in case they changed on Google
    let changed = false;
    if (name && user.name !== name) { user.name = name; changed = true; }
    if (picture && user.avatar !== picture) { user.avatar = picture; changed = true; }
    if (!user.googleId) { user.googleId = googleId; changed = true; }
    if (changed) await user.save();
  } else {
    // New user — create account
    const emailPrefix = email.split("@")[0];
    const username = await generateUniqueUsername(emailPrefix);

    user = await User.create({
      name: name || emailPrefix,
      username,
      email,
      googleId,
      avatar: picture || "",
      password: undefined, // Google users have no password
    });
  }

  const token = generateToken(user._id, user.email);
  user.password = undefined;

  return { user, token };
};

module.exports = { googleLoginService };
