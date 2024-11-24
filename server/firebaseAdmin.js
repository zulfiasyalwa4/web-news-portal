
const dotenv = require('dotenv');
dotenv.config();
const admin = require('firebase-admin');

const serviceAccount =  JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);// Ganti dengan path file JSON kunci layanan akun Anda

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
