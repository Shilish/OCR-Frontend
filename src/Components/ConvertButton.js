import React from 'react';
import { FaHistory } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import './ConvertButton.css';
import TopBar from './TopBar';
import History from './History';
import Saved from './Saved';
import ConvertedText from './ConvertedText';
import axios from 'axios';

const ConvertButton = () => {

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [theme, setTheme] = React.useState('light');
  const fileInputRef = React.useRef(null);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showSaved, setShowSaved] = React.useState(false);
  const [historyList, setHistoryList] = React.useState([]);
  const [savedData, setSavedData] = React.useState([]);
  const [convertedText, setConvertedText] = React.useState('');
  const [convertedfileurl, setConvertedFileUrl] = React.useState('');

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleButtonClick = () => {
    setConvertedText('');
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleConvert = async () => {
    setConvertedText('');
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const API_URI = process.env.REACT_APP_API_URI || "http://localhost:3001";
      try {
        const response = await axios.post(`${API_URI}/convert`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setConvertedText(response.data.text);
        setConvertedFileUrl(response.data.imageUrl);
        setHistoryList(prevHistory => [...prevHistory, `Converted ${selectedFile.name} on ${new Date().toLocaleString()}`]);
      } catch (error) {
        console.error('Error converting image:', error);
        alert('Error converting image. Please try again.');
      }
    } else {
      alert('Please select an image file first.');
    }
  };

  const fetchHistory = () => {
    setShowHistory(true);
  };

  const fetchSaved = async () => {
    const API_URI = process.env.REACT_APP_API_URI || "http://localhost:3001";
    try {
      const response = await axios.get(`${API_URI}/saved`);
      setSavedData(response.data);
      setShowSaved(true);
    } catch (error) {
      console.error('Error fetching saved data:', error);
      alert('Error fetching saved data. Please try again.');
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <TopBar theme={theme} toggleTheme={toggleTheme} />
      <div className="content">
        <div className="button-container">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button className="convert-button" onClick={handleButtonClick}>
            {selectedFile ? 'Change Image' : 'Select Image'}
          </button>
          {selectedFile && (
            <div className="file-info">
              <p>Selected: {selectedFile.name}</p>
              {previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Selected" />
                </div>
              )}
              <button className="convert-button" onClick={handleConvert}>
                Convert to text
              </button>
            </div>
          )}
          {convertedText && (
            <ConvertedText text={convertedText} imageUrl={convertedfileurl} fileName={selectedFile.name} />
          )}
        </div>
      </div>
      <button className={`history-button ${theme}`} onClick={fetchHistory}>
      <FaHistory />
      </button>
      {showHistory && (
        <History theme={theme} historyList={historyList} onClose={() => setShowHistory(false)} />
      )}
      <button className={`saved-button ${theme}`} onClick={fetchSaved}>
      <IoImages />
      </button>
      {showSaved && (
        <Saved theme={theme} savedData={savedData} onClose={() => setShowSaved(false)} />
      )}
    </div>
  );
};

export default ConvertButton;