
import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import NameAvatarForm from './NameAvatarForm';
import { sizeElements } from '../scripts/util';

class IntroScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatarSize: this.props.cardSize.height,
      avatarBorderSize: 1
    };
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }

  componentDidMount() {
    sizeElements(false, true);
    // if (this.props.userStatus.loggedInAs) {
    //   document.getElementById('player-name-input').value = this.props.userStatus.loggedInAs;
    // }
    // setTimeout(() => {
    //   document.getElementById('intro-screen').style.opacity = 1;
    //   document.getElementById('footer').style.transform = 'none';
    // }, 5);
  }

  handleAvatarClick(event) {
    return this.props.onClickAvatar(event);
  }

  handleInputChange() {
    let checkbox = document.getElementById('remember-checkbox');
    if (event.target.value.length < 3) {
      if (!checkbox.disabled) {
        checkbox.disabled = true;
        checkbox.checked = false;
      }
    } else {
      if (checkbox.disabled) {
        checkbox.disabled = false;
        checkbox.checked = true;
      }
    }
  }

  render() {
    let avatarSize = this.state.avatarSize;
    let avatarSource = this.props.userAvatarSource;
    let avatarBorderSize = this.state.avatarBorderSize;
    let avatarPlusBorderSize = avatarSize + avatarBorderSize;
    let remembered = '';
    if (this.props.userStatus.cookieId) {
      remembered = 'remembered';
    }
    return (
      <div style={this.props.style} id='intro-screen'>
        <style jsx>{`
        #intro-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
          opacity: 0.1;
          width: 100%;
          //height: 100%;
          //height: 100%;
          transition: opacity 300ms ease;
        }
        #intro-screen-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 2;
          justify-content: center;
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
        #hall-of-fame-button {
          min-width: 72vw;
          color: var(--special-button-text-color);
        }        
      `}</style>
        <div id='intro-screen-body'>
          {/* <form onSubmit={(event) => event.preventDefault()} action='https://www.eggborne.com/scripts/upload.php' method='post' id='avatar-form' encType='multipart/form-data'> */}
          <NameAvatarForm cardSize={this.props.cardSize}
            userStatus={this.props.userStatus}
            userAvatarSource={this.props.userAvatarSource}
            userAvatarIndex={this.props.userStatus.avatarIndex}
            onClickAvatar={this.props.onClickAvatar}
            onClickStart={this.props.onClickStart} />
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
  userStatus: PropTypes.object
};

export default IntroScreen;




















