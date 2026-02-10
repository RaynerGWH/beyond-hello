import React, { useRef, useEffect } from 'react';
import './VideoPlayer.css';

export default function VideoPlayer({ 
  videoUrl, 
  autoPlay = true, 
  onEnded,
  showControls = false
}) {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current && autoPlay && videoUrl) {
      videoRef.current.play();
    }
  }, [videoUrl, autoPlay]);
  
  return (
    <div className="video-container">
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          className="video-player"
          controls={showControls}
          onEnded={onEnded}
        />
      ) : (
        <div className="video-placeholder">
          <div className="play-icon">▶</div>
          <p>Video Preview</p>
        </div>
      )}
    </div>
  );
}