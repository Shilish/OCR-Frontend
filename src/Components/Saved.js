import React from 'react';
import './Saved.css';

const Saved = ({ theme, savedData, onClose }) => {
  return (
    <div className="saved-overlay">
      <div className={`saved-content ${theme}`}>
        <h2>Saved Conversions</h2>
        <ul>
        {savedData.map((item, index) => (
            <li key={index} className="saved-item">
              <h3>File Name: {item.fileName}</h3>
              <div className="saved-item-content">
                <div className="saved-item-image">
                  <h4>Image:</h4>
                  <img src={item.imageUrl} alt={item.fileName} />
                </div>
                <div className="saved-item-details">
                  <h4>Converted Text:</h4>
                  <p>{item.text}</p>
                  <h4>Comments:</h4>
                  <p>{item.comments || 'No comments'}</p>
                  <h4>Date Created:</h4>
                  <p>{new Date(item.dateCreated).toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {savedData.length === 0 && <h3>No saved conversions found.</h3>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Saved;