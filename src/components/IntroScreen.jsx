import React from 'react';
import PropTypes from 'prop-types';
import NameAvatarForm from './NameAvatarForm';

function IntroScreen(props) {
  console.orange('INTROSCREEN RENDERING ----');
  let mainOpacity = document.documentElement.style.getPropertyValue('--main-opacity');
  if (props.readyToShow && !mainOpacity) {
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--main-opacity', 1);
      document.getElementById('intro-screen-body').style.transform = 'none';
      document.getElementById('intro-screen-body').style.opacity = 1;
    });
  } else if (props.readyToShow && props.phase === 'splashScreen') {
    requestAnimationFrame(() => {
      document.getElementById('intro-screen-body').style.transform = 'none';
      document.getElementById('intro-screen-body').style.opacity = 1;
      document.getElementById('intro-screen-body').style.pointerEvents = 'all';
    });
  }
  return (
    <div id="intro-screen">
      <style jsx>{`
        #intro-screen {
          //display: ${props.phase === 'splashScreen' ? 'flex' : 'none'};
          position: absolute;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          top: 0;
        }
        #intro-screen-body {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          
          pointer-events: ${props.readyToShow && 'all'};
          //flex-grow: 1;
          height: 100%;
          transform: scale(0.9);
          opacity: 0;
        }
        .intro-button {
          display: flex;
          justify-content: center;
          align-items: center;
          /* min-width: 64vw; */
          border-radius: var(--button-radius);
          margin-top: 1vh;
          margin-bottom: 1vh;
        }
        .small-intro-button {
          height: 9vh;
          min-width: 33vw;
          max-width: 33vw;
        }
        #small-button-area {
          width: 72vw;
          display: inline-flex;
          justify-content: space-between;
          margin-top: 1vh;
        }
        .input-label {
          color: var(--main-text-color);
          font-family: var(--main-font);
          font-size: 1rem;
          padding: 0.5rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        .selected-avatar {
          transform: scale(0.95);
          opacity: 1;
          -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
          filter: grayscale(0%);
          box-shadow: 0 0 1px 1px #222;
        }
        .button-label {
          pointer-events: none;
        }
        #options-button {
          font-size: 2.25vh;
        }
        #how-button {
          font-size: 2.25vh;
        }
        #hall-of-fame-button {
          font-size: 3.5vh;
          width: 72vw;
          min-height: calc(var(--normal-card-width) * 1.25);
          color: var(--special-button-text-color);
          transition: color 300ms linear;
          will-change: color;
        }
        #hall-of-fame-button::after {
          content: 'Hall of Fame';
        }
        .hof-loading-message {
          color: white !important;
          font-size: 3vh !important;
        }
        .hof-loading-message::after {
          content: 'Retrieving...' !important;
        }
      `}</style>
      <div id="intro-screen-body">
        {/* <form onSubmit={(event) => event.preventDefault()} action='https://www.eggborne.com/scripts/upload.php' method='post' id='avatar-form' encType='multipart/form-data'> */}
        <NameAvatarForm
          userStatus={props.userStatus}
          userAvatarIndex={props.userStatus.avatarIndex}
          onClickAvatar={props.onClickAvatar}
          onClickStart={props.onClickStart}
          onClickLogOut={props.onClickLogOut}
          clickFunction={props.clickFunction}
        />
        <div id="small-button-area">
          <button {...{ [props.clickFunction]: props.onClickOptions }} className="intro-button small-intro-button" id="options-button">
            <div className="button-label">Options</div>
          </button>
          <button {...{ [props.clickFunction]: props.onClickHow }} className="intro-button small-intro-button" id="how-button">
            <div className="button-label">How to Play</div>
          </button>
        </div>
        <button {...{ [props.clickFunction]: props.onClickHallOfFame }} className="intro-button" id="hall-of-fame-button">
          <div className="button-label" />
        </button>
      </div>
    </div>
  );
}
IntroScreen.propTypes = {
  phase: PropTypes.string,
  userStatus: PropTypes.object,
  readyToShow: PropTypes.bool,
  userAvatarIndex: PropTypes.number,
  onClickAvatar: PropTypes.func,
  onClickStart: PropTypes.func,
  onClickHow: PropTypes.func,
  onClickOptions: PropTypes.func,
  onClickHallOfFame: PropTypes.func,
  onClickLogOut: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  if (prevProps.phase == 'splashScreen' && nextProps.phase != 'splashScreen') {
    document.getElementById('intro-screen-body').style.transform = 'scale(0.9)';
    document.getElementById('intro-screen-body').style.opacity = 0;
    document.getElementById('intro-screen-body').style.pointerEvents = 'none';
  }
  let equalTest =
    prevProps.readyToShow == nextProps.readyToShow &&
    prevProps.userAvatarIndex == nextProps.userAvatarIndex &&
    prevProps.phase == nextProps.phase;
  console.warn('---------------------------- IntroScreen equalTest', equalTest);
  return equalTest;
}

// export default IntroScreen;
export default React.memo(IntroScreen, areEqual);
