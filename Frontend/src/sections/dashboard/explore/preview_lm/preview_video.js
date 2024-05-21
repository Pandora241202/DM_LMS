import React ,{useState, useEffect, useRef} from 'react';

// export default function PreviewVideo({lmId}) {

//     const viewer = useRef(null);

//     useEffect(() => {
//       import('@pdftron/webviewer').then(() => {
//         WebViewer(
//           {
//             path: '/lib',
//             selectAnnotationOnCreation: true,
//           },
//           viewer.current,
//         ).then(async instance => {
//         // Extends WebViewer to allow loading HTML5 videos (.mp4, ogg, webm).
//         const {
//             loadVideo,
//         } = await window.WebViewerVideo.initializeVideoViewer(
//             instance,
//             // { license },
//         );

//         // Load a video at a specific url. Can be a local or public link
//         // If local it needs to be relative to lib/ui/index.html.
//         // Or at the root. (eg '/video.mp4')
//         const videoUrl = 'https://pdftron.s3.amazonaws.com/downloads/pl/video/video.mp4';
//         loadVideo(videoUrl);
//       });
//     })
//     }, []);

//     return (
//         <div className="MyComponent">
//           <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
//         </div>
//       );
    
//   }

const PreviewVideo = ({lmId}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const videoRef = useRef(null);
  
    // const getFile = async (lmId) => {
    //   const response = await fileApi.getFileFromGGDrive(lmId)
    //   console.log(response)
    //   return response.data
    // }
  
    // useEffect(()=>{
    //   getFile(lmId)
    // },[])
  
    useEffect(() => {
      const video = videoRef.current;
  
      if (!video) {
        return;
      }
  
      const updateCurrentTime = () => {
        setCurrentTime(video.currentTime);
      };
  
      const handleSeekStart = () => {
        setIsSeeking(true);
      };
  
      const handleSeekEnd = () => {
        setIsSeeking(false);
      };
  
      video.addEventListener('timeupdate', updateCurrentTime);
      video.addEventListener('seeking', handleSeekStart);
      video.addEventListener('seeked', handleSeekEnd);
  
      return () => {
        video.removeEventListener('timeupdate', updateCurrentTime);
        video.removeEventListener('seeking', handleSeekStart);
        video.removeEventListener('seeked', handleSeekEnd);
      };
    }, [videoRef.current]);
  
    const handleVideoSeek = (event) => {
      const video = videoRef.current;
      const time = parseFloat(event.target.value);
  
      // Kiểm tra xem giá trị thời gian có hợp lệ không
      if (!isNaN(time) && isFinite(time)) {
        setCurrentTime(time);
        if (video) {
          video.currentTime = time;
        }
      }
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <video
          ref={videoRef}
          width="100%"
          // height="70%"
          controls
          preload="none"
          onTimeUpdate={handleVideoSeek}
        >
          <source src={`${process.env.NEXT_PUBLIC_SERVER_API}/learning-materials/${lmId}`} type="video/mp4" />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
        {/* {!isSeeking && (
          <p>Current Time: {currentTime.toFixed(2)} seconds</p>
        )} */}
      </div>
        )
  }

export default PreviewVideo; 