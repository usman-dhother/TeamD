const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with the path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'maristhungerexpress.appspot.com', // Use the correct Firebase Storage bucket URL
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
