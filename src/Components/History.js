import React from 'react';
import './History.css';

const History = ({ theme, historyList, onClose }) => {
  return (
    <div className="history-overlay">
      <div className={`history-content ${theme}`}>
        <h2>Conversion History Text</h2>
        <ul>
          {historyList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {historyList.length === 0 && <p>No history found.</p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default History;