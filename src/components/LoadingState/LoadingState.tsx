import React from 'react';
import './LoadingState.scss';

const LoadingState: React.FC = () => {
  return (
    <div className="loading-state-container">
      <span className="loading-state-text">Loading...</span>
    </div>
  )
}

export default LoadingState;