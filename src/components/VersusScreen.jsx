import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

function VersusScreen(props) {
  console.orange('Rendering VersusScreen');
  let portraitSize = window.innerHeight * 0.15;
  if (props.phase === 'versusScreen') {
    requestAnimationFrame(() => {
      document.getElementById('versus-screen').style.transform = 'none';
      document.getElementById('versus-screen').style.opacity = 1;
      document.getElementById('user-versus-area').style.transform = 'none';
      document.getElementById('user-versus-area').style.opacity = 1;
      document.getElementById('opponent-versus-area').style.transform = 'none';
      document.getElementById('opponent-versus-area').style.opacity = 1;
    });
  }
  return (
    <div id="versus-screen">
      <style jsx>{`
        #versus-screen {
          display: ${(props.phase === 'versusScreen' || props.phase === 'gameStarted') ? 'flex' : 'none'};
          position: absolute;
          width: 100vw;
          height: var(--inner-height);
          margin-top: var(--header-height);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          top: 0;
          opacity: 0;
          transform: scale(1.1);
          transition: transform 900ms ease, opacity 600ms ease;
          will-change: transform, opacity;
          z-index: 100;
          font-size: var(--medium-font-size);
          pointer-events: none; 
        }
        #user-versus-area, #opponent-versus-area {
          color: yellow;
          height: ${portraitSize}px;
          display: grid;
          grid-template-rows: 1fr;
          justify-items: center;
          align-items: center;
          transition: transform 600ms ease, opacity 300ms ease;
          opacity: 0;
        }
        #user-versus-area {
          grid-template-columns: auto ${portraitSize}px;
          transform: translateX(-100%);
        }
        #opponent-versus-area {
          grid-template-columns: ${portraitSize}px auto;
          transform: translateX(100%);
          transition-delay: 600ms;
        }
        #user-versus-name, #opponent-versus-name {
          max-width: ${portraitSize * 1.5}px;
        }
        #user-versus-name {
          padding-right: calc(var(--micro-card-width) / 2);
        }
        #opponent-versus-name {
          padding-left: calc(var(--micro-card-width) / 2);
        }
        #versus-text-area {
          font-family: var(--title-font);
          font-size: var(--med-large-font-size);
          height: var(--control-footer-height);
          display: flex;
          align-items: center;
          transition: transform 600ms ease;
        }
        .leaving {
          transform: scale(2) !important;
          opacity: 0 !important;
        }
      `}</style>
      <div id='user-versus-area'>
        <div id='user-versus-name'>
          {props.userData.playerName}
        </div>
        <PlayerPortrait size={portraitSize} spriteIndex={props.userData.avatarIndex} displayName={''} />
      </div>
      <div id='versus-text-area'>VS.</div>
      <div id='opponent-versus-area'>
        <PlayerPortrait size={portraitSize} cpu={true} spriteIndex={props.opponentAvatarIndex} displayName={''} />
        <div id='opponent-versus-name'>
          {props.opponentData.displayName}
        </div>
      </div>
    </div>
  );
}
VersusScreen.propTypes = {
  phase: PropTypes.string,
  userData: PropTypes.object,
  opponentData: PropTypes.object,
  opponentAvatarIndex: PropTypes.number
};

function areEqual(prevProps, nextProps) {
  if (prevProps.phase == 'versusScreen' && nextProps.phase != 'versusScreen') {
    // document.documentElement.style.setProperty('--main-opacity', 0);
    // document.getElementById('versus-screen').style.transform = 'scale(1.1)';
    // document.getElementById('versus-screen').style.opacity = 0;
    // document.getElementById('versus-screen').style.pointerEvents = 'none';
  }
  let equalTest = prevProps.phase == nextProps.phase;
  return equalTest;
}

// export default VersusScreen;
export default React.memo(VersusScreen, areEqual);
