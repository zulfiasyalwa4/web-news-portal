/**
 * Middleware untuk memverifikasi token Firebase
 */
const admin = require('../firebaseAdmin');

async function verifyFirebaseToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Simpan data pengguna yang terverifikasi di `req.user`
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = verifyFirebaseToken;


