const crypto = require('crypto');
const token = crypto.randomBytes(20).toString('hex');
console.log(token);

user.passwordResetToken = token;
user.passwordResetExpires = Date.now() + 3600000;
