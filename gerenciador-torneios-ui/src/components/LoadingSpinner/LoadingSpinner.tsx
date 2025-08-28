import React from 'react';
import './style.css';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};