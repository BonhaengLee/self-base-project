// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
// import videojs from 'video.js';
// import Play from '../../assets/play.svg';
// import Pause from '../../assets/pause.svg';
// import Mute from '../../assets/volume-muted.svg';
// import Volume1 from '../../assets/volume-1.svg';
// import Volume2 from '../../assets/volume-2.svg';
// import Volume3 from '../../assets/volume-3.svg';
// import Maximize from '../../assets/maximize.svg';
// import Minimize from '../../assets/minimize.svg';
// import 'video.js/dist/video-js.css';

// const VideoContainer = styled.div`
//   .vjs-amnis.video-js {
//     * {
//       outline: none;
//     }

//     .vjs-tech {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//     }

//     .vjs-big-play-button {
//       border: none;
//       background: none;

//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Play});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }

//     .vjs-control-bar {
//       background: none;
//       margin: 0.5rem 0rem;
//     }

//     .vjs-play-control.vjs-paused {
//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Play});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }

//     .vjs-play-control.vjs-playing {
//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Pause});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }

//     .vjs-mute-control.vjs-vol-0 {
//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Mute});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }

//     .vjs-mute-control.vjs-vol-1 {
//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Volume1});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }

//     .vjs-mute-control.vjs-vol-2 {
//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Volume2});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }

//     .vjs-mute-control.vjs-vol-3 {
//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Volume3});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }

//     .vjs-volume-level:before {
//       color: rgba(255, 255, 255, 1);
//     }

//     .vjs-progress-control .vjs-progress-holder {
//       background: none;
//     }

//     .vjs-progress-control .vjs-play-progress {
//       background: rgba(255, 255, 255, 1);

//       &:before {
//         color: rgba(255, 255, 255, 1);
//       }
//     }

//     .vjs-progress-control .vjs-load-progress {
//       background: rgba(255, 255, 255, 0.5);
//     }

//     .vjs-picture-in-picture-control {
//       display: none;
//     }

//     .vjs-remaining-time {
//       display: none;
//     }

//     .video-js .vjs-time-control {
//       display: block;
//     }
//     .video-js .vjs-remaining-time {
//       display: none;
//     }

//     .vjs-fullscreen-control {
//       .vjs-icon-placeholder:before {
//         content: '';
//         background-image: url(${Maximize});
//         background-repeat: no-repeat;
//         background-position: center;
//         background-size: contain;
//       }
//     }
//   }

//   .vjs-amnis.vjs-fullscreen .vjs-fullscreen-control {
//     .vjs-icon-placeholder:before {
//       content: '';
//       background-image: url(${Minimize});
//       background-repeat: no-repeat;
//       background-position: center;
//       background-size: contain;
//     }
//   }
//   .vjs-resize-manager {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border: none;
//     z-index: -1000;
//   }

//   .vjs-workinghover .vjs-menu-button-popup.vjs-hover .vjs-menu,
//   .vjs-menu-button-popup .vjs-menu.vjs-lock-showing {
//     display: block;
//   }
// `;

// const Player = (props) => {
//   const [player, setPlayer] = useState();
//   const ref = useRef();
//   const playerRef = props.video ? props.video : ref;

//   useEffect(() => {
//     setPlayer(videojs(playerRef.current, props));

//     return () => player && player.dispose();
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <VideoContainer
//       className="video-js vjs-amnis vjs-fluid vjs-big-play-centered example-video-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-has-started vjs-paused vjs-user-inactive"
//       style={{ width: '100%', height: '600px', marginTop: '40px' }}
//     >
//       <div data-vjs-player>
//         <video
//           ref={playerRef}
//           // className="video-js vjs-amnis vjs-fluid vjs-big-play-centered"

//           style={{ width: '100%' }}
//         ></video>
//       </div>
//     </VideoContainer>
//   );
// };

// export default Player;
