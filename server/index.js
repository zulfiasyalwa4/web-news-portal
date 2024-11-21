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
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log('Error connecting to MongoDB');
    console.log(error);
});

app.get('/api/articles', async (req, res) => {
    try {
      const authors = await Author.find(); // Retrieve all authors
  
      // Flatten all articles and include additional fields
      const allArticles = authors.flatMap(author =>
        author.articles.map(article => ({
          articleId: article.articleId, // Include articleId explicitly
          title: article.title,
          category: article.category,
          content: article.content,
          mainImage: article.mainImage,
          advertisementImage: article.advertisementImage,
          sections: article.sections,
          blockquote: article.blockquote,
          publishDate: article.publishDate, // Include the publish date
          authorName: author.name, // Include author's name
          profileImage: author.profileImage, // Include author's profile image
        }))
      );
  
      res.status(200).json(allArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Error fetching articles", error });
    }
  });
  
  

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

app.put('/api/articles/:articleId', async (req, res) => {
    try {
        const articleId = req.params.articleId.trim();
        const { title, category, content, mainImage, advertisementImage, sections, blockquote } = req.body;

        console.log(`Updating article with ID: ${articleId}`); // Debugging log

        const author = await Author.findOneAndUpdate(
            { 'articles.articleId': articleId },
            {
                $set: {
                    'articles.$.title': title,
                    'articles.$.category': category,
                    'articles.$.content': content,
                    'articles.$.mainImage': mainImage,
                    'articles.$.advertisementImage': advertisementImage,
                    'articles.$.sections': sections,
                    'articles.$.blockquote': blockquote,
                },
            },
            { new: true }
        );

        if (!author) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const updatedArticle = author.articles.find(article => article.articleId.toString() === articleId);
        res.status(200).json(updatedArticle);
    } catch (error) {
        console.error(`Error updating article: ${error.message}`);
        res.status(500).json({ message: 'Error updating article', error: error.message });
    }
});




// 
app.get('/api/single-post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // Jika ID tidak valid sebagai ObjectId, tetapi Anda ingin tetap mencari dengan string
        const author = await Author.findOne({ authorId: id });

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error(`Error fetching author profile: ${error.message}`);
        res.status(500).json({ message: 'Error fetching author', error: error.message });
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
// Endpoint untuk mendapatkan profil penulis berdasarkan authorId



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

app.delete('/api/articles/:articleId', verifyFirebaseToken, async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const author = await Author.findOneAndUpdate(
            { authorId: req.user.uid, 'articles.articleId': articleId },
            { $pull: { articles: { articleId } } },
            { new: true }
        );

        if (!author) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error(`Error deleting article: ${error.message}`);
        res.status(500).json({ message: 'Error deleting article', error });
    }
});

// Menjalankan server

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000");
});

