const mongoose = require('mongoose');

// Schema untuk artikel individual
const articleSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function() {
      return new mongoose.Types.ObjectId(); // Generate ObjectId untuk articleId
    }
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Technology', 'Travel', 'Health', 'Lifestyle'], // Tambahkan kategori lain jika perlu
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String, // URL gambar utama artikel
    required: true,
  },
  advertisementImage: {
    type: String, // URL gambar iklan
  },
  sections: [
    {
      heading: {
        type: String,
      },
      text: {
        type: String,
      },
    },
  ],
  blockquote: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
});



// Schema untuk author yang membungkus semua artikel
const authorSchema = new mongoose.Schema({
  authorId: {
    type: String, // ID dari Firebase Authentication
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // URL gambar profil penulis
  },
  articles: [articleSchema],// Array artikel sebagai subdokumen
  userProfile : {
    type: String
  }
});

// Buat model berdasarkan schema
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
