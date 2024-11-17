/*************  ✨ Codeium Command 🌟  *************/
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require('morgan');
const Author = require('./models/index');
const verifyFirebaseToken = require('./middleware/authMiddleware');

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Koneksi ke MongoDB
const connectToMongoDB = async () => {
    try {
        const dotenv = require('dotenv');
        dotenv.config();
        const mongoose = require("mongoose");
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB');
        console.log(error);
    }
};

connectToMongoDB();

// Endpoint untuk mendapatkan artikel berdasarkan `articleId`
app.get('/api/articles/:articleId', async (req, res) => {
    try {
        console.log(`Received articleId: ${req.params.articleId}`);  // Debugging log
        const author = await Author.findOne({ 'articles.articleId': req.params.articleId }, { 'articles.$': 1 });
        if (!author || !author.articles || author.articles.length === 0) {
            console.log("Article not found");  // Debugging log
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(author.articles[0]);
    } catch (error) {
        console.error(`Error fetching article: ${error.message}`);  // Log the error to see more details
        res.status(500).json({ message: 'Error fetching article', error: error.message });
    }
});


// Endpoint untuk mendapatkan semua artikel
app.get('/api/articles', async (req, res) => {
    try {
        const authors = await Author.find();
        const allArticles = authors.flatMap(author => author.articles);
        res.status(200).json(allArticles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
});

// Endpoint untuk membuat artikel baru
app.post('/api/articles', verifyFirebaseToken, async (req, res) => {
    const { title, category, authorName, profileImage, mainImage, content, advertisementImage, sections, blockquote } = req.body;

    // Validasi input
    if (!title || !category || !content || !mainImage || !authorName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let author = await Author.findOne({ authorId: req.user.uid });

        // Buat penulis baru jika belum ada
        if (!author) {
            author = new Author({
                authorId: req.user.uid,
                name: authorName,
                profileImage: profileImage,
                articles: [],
            });
        }

        // Buat artikel baru dengan `articleId` otomatis
        const newArticle = {
            articleId: new mongoose.Types.ObjectId(), // Generate ObjectId untuk articleId
            title,
            category,
            content,
            mainImage,
            advertisementImage,
            sections,
            blockquote,
        };

        author.articles.push(newArticle);
        await author.save();

        res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: 'Error creating article', error });
    }
});

// Menjalankan server
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000");
});

/******  6194269c-bb6d-4af8-a161-0f8d7a6c0aa1  *******/