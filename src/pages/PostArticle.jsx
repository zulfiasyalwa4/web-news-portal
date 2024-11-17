import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {auth } from '../firebase/setup';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



export default function PostArticle() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [authorName, setAuthorName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [content, setContent] = useState('');
  const [advertisementImage, setAdvertisementImage] = useState('');
  const [sections, setSections] = useState([{ heading: '', text: '' }]);
  const [blockquote, setBlockquote] = useState('');
  const [error, setError] = useState(null);
  

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await auth.currentUser?.getIdToken(); // Ensure token is fetched asynchronously
      const response = await axios.post(
        'http://localhost:5000/api/articles',
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
      console.log('Article posted:', response.data);
      navigate(`/articlesec/${response.data.article.articleId}`);
      alert('Article posted successfully!');
    } catch (error) {
      console.error('Error posting article:', error);
      alert('Error posting article');
    }
  };
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const photo = currentUser?.photoURL;
  const name = currentUser?.displayName;
  
  useEffect(() => {
    setAuthorName(name);
  })

  useEffect(() => {
    setProfileImage(photo);
  }, [photo]);

  return (
    <div className="container mt-5">
      <h1>Post an Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={mainImage}
            onChange={(e) => setMainImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Advertisement Image URL</label>
          <input
            type="text"
            className="form-control"
            value={advertisementImage}
            onChange={(e) => setAdvertisementImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Blockquote</label>
          <input
            type="text"
            className="form-control"
            value={blockquote}
            onChange={(e) => setBlockquote(e.target.value)}
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
                value={section.heading}
                onChange={(e) =>
                  handleSectionChange(index, 'heading', e.target.value)
                }
              />
              <label className="mt-2 form-label">Text</label>
              <textarea
                className="form-control"
                rows="3"
                value={section.text}
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
  );
}




