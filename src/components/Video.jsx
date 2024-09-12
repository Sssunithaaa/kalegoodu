import React from 'react';

const VideoPlayer = ({ url }) => {
  return (
    <div className="video-player flex mx-auto">
      <iframe
        className='video'
        title='YouTube player'
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
        src={url}
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
