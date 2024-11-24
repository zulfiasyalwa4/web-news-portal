import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/setup';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

export default function EditPages() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [content, setContent] = useState('');
  const [advertisementImage, setAdvertisementImage] = useState('');
  const [sections, setSections] = useState([{ heading: '', text: '' }]);
  const [blockquote, setBlockquote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const articleId = useParams().articleId; 
  const navigate = useNavigate();
  

  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { heading: '', text: '' }]);
  };

  const handleDeleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/articles/${articleId}`
        );
        const data = response.data;
        setTitle(data.title);
        setCategory(data.category);
        setAuthorName(data.authorName);
        setProfileImage(data.profileImage);
        setMainImage(data.mainImage);
        setContent(data.content);
        setAdvertisementImage(data.advertisementImage);
        setSections(data.sections || [{ heading: '', text: '' }]);
        setBlockquote(data.blockquote);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating article with ID:', articleId);
  
      // Validate articleId
      if (typeof articleId !== 'string' || articleId.trim() === '') {
        console.error('Invalid article ID');
        alert('Invalid article ID');
        return;
      }
  
      const cleanedArticleId = encodeURIComponent(articleId.trim()); 
      const token = await auth.currentUser?.getIdToken();
  
      const response = await axios.put(
        `http://localhost:5000/api/articles/${cleanedArticleId}`,
        {
          title,
          category,
          authorName,
          profileImage,
          mainImage,
          content,
          advertisementImage,
          sections,
          blockquote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Article updated:', response.data);
  
      // Navigate using the `articleId` directly from `response.data`
      navigate(`/articlesec/${response.data.articleId}`);
      alert('Article updated successfully!');
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Error updating article');
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <MainLayout>
      <div className="container mt-5">
        <h1>Edit Article</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title} // Bind to state
              onChange={(e) => setTitle(e.target.value)} // Update state on input
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category} // Bind to state
              onChange={(e) => setCategory(e.target.value)} // Update state on input
              required
            >
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Main Image URL</label>
            <input
              type="text"
              className="form-control"
              value={mainImage} // Bind to state
              onChange={(e) => setMainImage(e.target.value)} // Update state on input
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows="5"
              value={content} // Bind to state
              onChange={(e) => setContent(e.target.value)} // Update state on input
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Advertisement Image URL</label>
            <input
              type="text"
              className="form-control"
              value={advertisementImage} // Bind to state
              onChange={(e) => setAdvertisementImage(e.target.value)} // Update state on input
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Blockquote</label>
            <input
              type="text"
              className="form-control"
              value={blockquote} // Bind to state
              onChange={(e) => setBlockquote(e.target.value)} // Update state on input
            />
          </div>
          <div>
            <h5>Sections</h5>
            {sections.map((section, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Heading {index + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  value={section.heading} // Bind to state
                  onChange={(e) =>
                    handleSectionChange(index, 'heading', e.target.value)
                  }
                />
                <label className="mt-2 form-label">Text</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={section.text} // Bind to state
                  onChange={(e) =>
                    handleSectionChange(index, 'text', e.target.value)
                  }
                ></textarea>
                <button
                  type="button"
                  className="mt-2 btn btn-danger"
                  onClick={() => handleDeleteSection(index)}
                >
                  Delete Section
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mb-3 btn btn-secondary"
              onClick={handleAddSection}
            >
              Add Section
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Article
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

