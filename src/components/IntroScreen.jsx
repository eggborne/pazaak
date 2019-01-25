import React from 'react';
import PropTypes from 'prop-types';
import NameAvatarForm from './NameAvatarForm';
import Footer from './Footer';

function IntroScreen(props) {
  console.error('----------------- IntroScreen rendered', props);
  let avatarBorderSize = 1;
  let buttonLabelSize = props.cardSize.height / 4;
  let buttonHeight = buttonLabelSize * 4;
  return (
    <div style={props.style} id='intro-screen'>
      <style jsx>{`
        #intro-screen {
          display: ${props.phase === 'splashScreen' ? 'flex' : 'none' };
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }
        #intro-screen-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: ${props.readyToShow && 1};
          pointer-events: ${props.readyToShow && 'all'};
          transform: none;
          flex-grow: 1;
          transition: transform 600ms ease, opacity 200ms ease;
        }
        .small-intro-button {
          font-size: ${buttonLabelSize * 0.8}px;
          height: ${buttonHeight * 0.75}px;
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
          font-family: 'Nova Square';
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
        #hall-of-fame-button {
          font-size: ${buttonLabelSize * 1.1}px;
          width: 65vw;
          height: ${buttonHeight}px;
          color: var(--special-button-text-color);
        }
        #hall-of-fame-button::after {
          content: 'Hall of Fame';
        }  
      `}</style>
      <div id='intro-screen-body'>
        {/* <form onSubmit={(event) => event.preventDefault()} action='https://www.eggborne.com/scripts/upload.php' method='post' id='avatar-form' encType='multipart/form-data'> */}
        <NameAvatarForm cardSize={props.cardSize}
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
  cardSize: PropTypes.object,  
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
  let equalTest =
    prevProps.readyToShow == nextProps.readyToShow &&
    prevProps.style.display == nextProps.style.display &&
    prevProps.userAvatarIndex == nextProps.userAvatarIndex;
  console.warn('---------------------------- IntroScreen equalTest', equalTest);
  return equalTest;
}

// export default IntroScreen;
export default React.memo(IntroScreen, areEqual);




















