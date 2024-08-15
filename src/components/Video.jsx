import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  
    const driveUrl = "https://drive.google.com/uc?export=download&id=1fWFmoxY78LhYmsD6yWCuzQQD5fz5QOHi"
  return (
    <div className="video-player">
      <ReactPlayer
        url={driveUrl}
        controls
       
        width="100%"
        height="100%"
//         config={{
//   youtube: {
//     playerVars: { showinfo: 0 }, // Hides YouTube info
//   },
// }}

      />
    </div>
  );
};




const InstagramEmbed = ({ embedHtml }) => {
  return (
    <div className="instagram-reel-embed" dangerouslySetInnerHTML={{ __html: embedHtml }} />
  );
};



export {InstagramEmbed,VideoPlayer};
