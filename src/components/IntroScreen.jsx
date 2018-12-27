
import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

class IntroScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatarSize: this.props.cardSize.height,
      avatarBorderSize: 1
    };
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }

  handleAvatarClick(event) {
    return this.props.onClickAvatar(event);
  }

  render() {
    let avatarSize = this.state.avatarSize;
    let avatarSource = this.props.userAvatarSource;
    let avatarBorderSize = this.state.avatarBorderSize;
    let avatarPlusBorderSize = avatarSize + avatarBorderSize;
    return (
      <div style={this.props.style} id='intro-screen'>
        <style jsx>{`
        #intro-screen {
          //position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
          opacity: 0;
          width: 100%;
          //height: 100%;
          
          transition: opacity 800ms ease;
        }
        #intro-screen-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 2;
          justify-content: center;
        }
        .input-area {
          display: flex;
          flex-direction: column;
          width: 66vw;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        .intro-button {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 64vw;
          min-height: 12vh;
          max-height: 12vh;
          border-radius: 0.5rem;
          margin-top: 1vh;
          margin-bottom: 1vh;
        }
        .small-intro-button {
          min-width: 34vw;
          max-width: 34vw;
          min-height: 9vh;
          max-height: 9vh;
        }
        #small-button-area {
          width: 72vw;
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
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        #player-name-input {
          font-family: 'Nova Square';
          font-size: var(--main-text-size);
          background-color: var(--name-input-color);
          color: var(--name-input-text-color);
          box-sizing: border-box;
          padding: 0.5rem;
          -webkit-user-select: text;  /* Chrome all / Safari all */
          -moz-user-select: text;     /* Firefox all */
          -ms-user-select: text;      /* IE 10+ */
          user-select: text;
          margin: 1rem;
        }
        #avatar-area {
          box-sizing: border-box;
          padding: 0;
          width:  ${avatarPlusBorderSize * 3.5}px;
          min-width: 50vw;
          max-width: 72vw;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
        }
        #avatar-select-area {
          height: ${avatarPlusBorderSize}px;
          margin: 1vh;
        }
        #avatar-row {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          overflow-x: scroll;
          //vertical-align: middle;
        }
        .shadowed-box {
          box-shadow: 0 0 ${avatarBorderSize + 2}px ${avatarBorderSize}px #333;
        }
        .avatar-thumb {
          background-image: url(${avatarSource});
          background-size: cover;
          background-repeat: no-repeat;
          background-position-y: center;
          opacity: 0.5;
          border-radius: 0.5rem;
          transform: scale(0.85);
          -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
          filter: grayscale(100%);
          min-width: ${avatarPlusBorderSize}px;
          min-height:  ${avatarPlusBorderSize}px;          
          transition: all 150ms ease;
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
        #start-button {
          min-width: 68vw;
          max-width: 68vw;
          min-height: 12vh;
          margin: 0 1rem 1rem 1rem;
          align-self: center;      
        }
        #hall-of-fame-button {
          min-width: 72vw;
          color: var(--special-button-text-color);
        }
        #start-button > div {
          animation: throb 1000ms infinite;
        }
        .user-avatar-area {
          min-width: 0;
          max-width: 100%;
        }
        .keyboard-showing-start-button {
          max-height: 20vh;
        }
        @keyframes throb {
          0% {
            transform: scale(1)
          }
          50% {
            transform: scale(0.95);
          }
        }
        @media (orientation: portrait) {
          #avatar-area {
            min-width: 90vw;
            max-width: 90vw;
          }
        }
      `}</style>
        <div id='intro-screen-body'>
          <form onSubmit={(event) => event.preventDefault()} action='https://www.eggborne.com/scripts/upload.php' method='post' id='avatar-form' encType='multipart/form-data'>
            <div className='input-area'>
              <div className='input-label'>Enter name</div>
              <input name='player-name' id='player-name-input' placeholder='Player'></input>
            </div>
            <div id='avatar-area'>
              <div id='avatar-label' className='input-label'>Select avatar</div>
              <div id='avatar-select-area'>
                <span id='avatar-row'>
                  &nbsp;
                  {[0, 1, 2, 3, 4, 5].map((xPos, i) => {
                    let selected = '';
                    if (this.props.userAvatarIndex === i) {
                      selected = 'selected-avatar';
                    }
                    return <div style={{ backgroundPositionX: `${(-i * (avatarSize + avatarBorderSize))}px` }} onClick={this.handleAvatarClick} key={i} id={`avatar-thumb-${i}`} className={`avatar-thumb shadowed-box ${selected}`}></div>;
                  })}
                  &nbsp;
                </span>
              </div>
              <button onClick={this.props.onClickStart} className='intro-button' id='start-button'><div className='button-label'>Play!</div></button>
            </div>
          </form>
          <div id='small-button-area'>
            <button onClick={this.props.onClickOptions} className='intro-button small-intro-button' id='options-button'><div className='button-label'>Options</div></button>
            <button onClick={this.props.onClickHow} className='intro-button small-intro-button' id='how-button'><div className='button-label'>How to Play</div></button>
          </div>
          <button onClick={this.props.onClickHallOfFame} className='intro-button' id='hall-of-fame-button'><div className='button-label'>Hall of Fame</div></button>
        </div>
        <Footer />
      </div >
    );
  }
}
IntroScreen.propTypes = {
  style: PropTypes.object,
  cardSize: PropTypes.object,
  avatars: PropTypes.array,
  userAvatarSource: PropTypes.string,
  userAvatarIndex: PropTypes.number,
  onClickAvatar: PropTypes.func,
  onClickStart: PropTypes.func,
  onClickHow: PropTypes.func,
  onClickOptions: PropTypes.func,
  onClickHallOfFame: PropTypes.func,
  onUnfocusNameInput: PropTypes.func,
  onFocusNameInput: PropTypes.func,
};

export default IntroScreen;




















