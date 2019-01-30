import React from 'react';
import PropTypes from 'prop-types';
import NameAvatarForm from './NameAvatarForm';
import Footer from './Footer';

function IntroScreen(props) {
  console.error('----------------- IntroScreen rendered', props);
  let avatarBorderSize = 1;
  let buttonLabelSize = 'var(--button-text-size)';
  let buttonHeight = 'var(--normal-card-width)';
  if (props.readyToShow && props.phase === 'splashScreen') {   
    requestAnimationFrame(() => {
      document.getElementById('intro-screen').style.opacity = 1;
      document.getElementById('intro-screen').style.transform = 'none';
    });
  }
  return (
    <div style={props.style} id='intro-screen'>
      <style jsx>{`
        #intro-screen {
          display: ${props.phase === 'splashScreen' ? 'flex' : 'none' };
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        #intro-screen-body {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          //opacity: ${props.readyToShow && 1};
          //pointer-events: ${props.readyToShow && 'all'};
          //transform: ${props.readyToShow && 'none'};
          flex-grow: 1;
          transition: transform 600ms ease, opacity 200ms ease;
        }
        .small-intro-button {          
          height: 9vh;
          min-width: 30vw;
          max-width: 30vw;
        }
        #small-button-area {
          width: 65vw;
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
          box-shadow: 0 0 ${avatarBorderSize}px 1px #222;
        }
        .button-label {
          pointer-events: none;
        }
        #options-button {
          font-size: 2.5vh;
        }
        #how-button {
          font-size: 2.5vh;
        }
        #hall-of-fame-button {
          font-size: 3.5vh;
          width: 65vw;
          min-height: calc(${buttonHeight} * 1.25);
          color: var(--special-button-text-color);
        }
        #hall-of-fame-button::after {
          content: 'Hall of Fame';
        }  
      `}</style>
      <div id='intro-screen-body'>
        {/* <form onSubmit={(event) => event.preventDefault()} action='https://www.eggborne.com/scripts/upload.php' method='post' id='avatar-form' encType='multipart/form-data'> */}
        <NameAvatarForm
          userStatus={props.userStatus}
          userAvatarIndex={props.userStatus.avatarIndex}
          onClickAvatar={props.onClickAvatar}
          onClickStart={props.onClickStart}
          onClickLogOut={props.onClickLogOut}
          clickFunction={props.clickFunction} />
        <div id='small-button-area'>
          <button {...{ [props.clickFunction]: props.onClickOptions }} className='intro-button small-intro-button' id='options-button'><div className='button-label'>Options</div></button>
          <button {...{ [props.clickFunction]: props.onClickHow }} className='intro-button small-intro-button' id='how-button'><div className='button-label'>How to Play</div></button>
        </div>
        <button {...{ [props.clickFunction]: props.onClickHallOfFame }} className='intro-button' id='hall-of-fame-button'><div className='button-label'></div></button>
      </div>
      <Footer readyToShow={props.readyToShow} />
    </div >
  );
}
IntroScreen.propTypes = {
  style: PropTypes.object,
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
    document.getElementById('intro-screen').style.opacity = '0';
    document.getElementById('intro-screen').style.transform = 'scale(1.05)';
  }
  let equalTest =
    prevProps.readyToShow == nextProps.readyToShow
    && prevProps.style.display == nextProps.style.display
    && prevProps.userAvatarIndex == nextProps.userAvatarIndex
    && (prevProps.phase == nextProps.phase);
  console.warn('---------------------------- IntroScreen equalTest', equalTest);
  return equalTest;
}

// export default IntroScreen;
export default React.memo(IntroScreen, areEqual);




















