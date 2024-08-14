import React, { useState } from 'react';
import './Post.css';

function Post() {
  const [postType, setPostType] = useState('text');
  const [textData, setTextData] = useState({ text: '' });
  const [mediaData, setMediaData] = useState({ caption: '', photos: [], videos: [] });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextData({ ...textData, [name]: value });
  };

  const handleMediaChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos' || name === 'videos') {
      setMediaData({ ...mediaData, [name]: [...files] });
    } else {
      setMediaData({ ...mediaData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postType === 'text') {
      console.log('Text Post Created:', textData);
    } else {
      console.log('Media Post Created:', mediaData);
    }
    // Reset form data
    setTextData({ text: '' });
    setMediaData({ caption: '', photos: [], videos: [] });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Create a Post</h2>
      <div className="form-group">
        <label htmlFor="postType">Post Type</label>
        <select id="postType" value={postType} onChange={(e) => setPostType(e.target.value)}>
          <option value="text">Text Post</option>
          <option value="media">Media Post</option>
        </select>
      </div>

      {postType === 'text' && (
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            name="text"
            value={textData.text}
            onChange={handleTextChange}
          ></textarea>
        </div>
      )}

      {postType === 'media' && (
        <>
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <input
              type="text"
              id="caption"
              name="caption"
              value={mediaData.caption}
              onChange={handleMediaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photos">Photos</label>
            <input
              type="file"
              id="photos"
              name="photos"
              accept="image/*"
              multiple
              onChange={handleMediaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="videos">Videos</label>
            <input
              type="file"
              id="videos"
              name="videos"
              accept="video/*"
              multiple
              onChange={handleMediaChange}
            />
          </div>
        </>
      )}

      <button type="submit">Create Post</button>
    </form>
  );
}

export default Post;
