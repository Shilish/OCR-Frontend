import React from 'react';
import './TopBar.css';
import { CiDark, CiLight } from "react-icons/ci";

const TopBar = ({ theme, toggleTheme }) => {
  return (
    <header className={`top-bar ${theme}`}>
      <div className="logo">
        <img src="/logo512.png" alt="Logo" />
      </div>
      <h1 className="title">Image to Text [OCR]</h1>
      <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
        {theme === 'light' ? <CiDark /> : <CiLight />}
      </button>
    </header>
  );
};

export default TopBar;