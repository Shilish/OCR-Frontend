import React from 'react';
import './ConvertedText.css';
import axios from 'axios';

const saveResult = async (convertedText, imgUrl, fileName, comnts) => {

  if (convertedText) {

    const API_URI = process.env.REACT_APP_API_URI || "http://localhost:3001";
    
    try {
      const response = await axios.post(`${API_URI}/save`, {
        text: convertedText,
        imagePath: imgUrl,
        fileName: fileName,
        comments: comnts
      });
      console.log("Save Successful");
      alert("Saved Successfully");
    } catch (error) {
      console.error('Error Saving:', error);
      alert('Error Saving. Please try again.');
    }

  } else {
    alert('Converted Text and Image are required');
  }
    
};

const ConvertedText = ({ text , imageUrl , fileName}) => {

  const [comments, setComments] = React.useState('');

  if (!text) return null;

  return (
    <div className="converted-text">
      <h3>Converted Text:</h3>
      <p>{text}</p>
      <textarea
        className="comments-input"
        placeholder="Enter your comments here before saving"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <button className="save-button" onClick={() => saveResult(text , imageUrl, fileName, comments)}>
        Save
      </button>
    </div>
  );
};

export default ConvertedText;