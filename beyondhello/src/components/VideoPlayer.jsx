import React, { useRef, useEffect, useState } from 'react';
import './VideoPlayer.css';

export default function VideoPlayer({ 
  videoUrl, 
  autoPlay = true, 
  onEnded,
  showControls = false
}) {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (videoRef.current && autoPlay && videoUrl && !hasError) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, but that's okay
      });
    }
  }, [videoUrl, autoPlay, hasError]);
  
  const handleError = () => {
    setHasError(true);
  };
  
  return (
    <div className="video-container">
      {videoUrl && !hasError ? (
        <video
          ref={videoRef}
          src={videoUrl}
          className="video-player"
          controls={showControls}
          onEnded={onEnded}
          onError={handleError}
        />
      ) : (
        <div className="video-placeholder">
          <div className="play-icon">▶</div>
          <p>Video Preview</p>
          {hasError && <p className="error-text">Video not found</p>}
        </div>
      )}
    </div>
  );
}