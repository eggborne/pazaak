

import React from 'react';
import PropTypes from 'prop-types';

class NameAvatarForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatarSize: this.props.cardSize.height,
      avatarBorderSize: 1,
      avatarArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    };
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }
  handleAvatarClick(event) {
    return this.props.onClickAvatar(event);
  }
  handleInputChange(event) {
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
    let avatarIndex = this.props.userAvatarIndex;
    if (avatarIndex === -1) {
      avatarIndex = this.state.avatarArray[0];
    }
    return (
      <form id='name-avatar-form' onSubmit={this.props.onClickStart}>
        <style jsx>{`
          #name-avatar-form {
            position: relative;
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
            width: 80vw;
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
            margin-bottom: 0.25rem;
            margin-bottom: 0;
          }
          #name-input-label {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
          #name-input-message {
            box-sizing: border-box;
            position: absolute;
            font-family: 'Bungee';
            width: calc(66vw - 2.25rem);
            font-size: 1.1em;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            text-align: right;
            color: red;
            opacity: 0;
            pointer-events: none;
            text-shadow: 0 !important;
            transform: translateY(-50%) translateX(-8%);
            transition: all 400ms ease-in-out, opacity 600ms ease;
          }
          .slid-on {
            transform: translateY(-50%) translateX(0) !important;
            opacity: 1 !important;
          }
          #remember-check-area {
            font-family: 'Nova Square';
            font-size: 0.75em;
            box-sizing: border-box;
            margin: 1rem;
            margin-top: 0;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            height: 2.5rem;
            color: var(--main-text-color);
          }
          #remember-checkbox {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            margin-left: 0;
            background-color: white;
          }
          #remember-check-area::after {
            content: 'Remember me (uses cookie)'
          }
          .remembered::after {
            content: 'Remembered' !important;
            color: var(--option-on-color);
          }
          #avatar-area {
            box-sizing: border-box;
            padding: 0;
            width:  ${avatarPlusBorderSize * 3.5}px;
            min-width: 50vw;
            max-width: 80vw;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            display: flex;
            flex-direction: column;
          }
          #avatar-select-area {
            height: ${avatarPlusBorderSize}px;
            margin: ${avatarSize*0.1}px;
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
            background-size: auto ${avatarPlusBorderSize*3}px;
            background-repeat: no-repeat;
            background-position-y: top;
            opacity: 0.7;
            border-radius: 0.5rem;
            transform: scale(0.825);
            -webkit-filter: grayscale(80%); /* Safari 6.0 - 9.0 */
            filter: grayscale(80%);
            min-width: ${avatarPlusBorderSize}px;
            min-height:  ${avatarPlusBorderSize}px;          
            transition: all 150ms linear;
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
          .fading {
            animation: fade 3000ms forwards ease;
          }
          #start-button {
            min-width: 68vw;
            max-width: 68vw;
            min-height: 12vh;
            margin: 0 1rem 1rem 1rem;
            align-self: center;      
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
          .bouncing {
            animation: bounce 600ms forwards;
          }
          .bouncing-inverted {
            animation: bounce-inverted 600ms forwards;
          }
          @keyframes bounce {
            0% {
              transform: scale(1);
            }
            25% {
              transform: scale(1.04);
            }
            50% {
              transform: scale(1);
            }
            75% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes bounce-inverted {            
            0% {
              transform: scale(1.04);
            }
            25% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
            75% {
              transform: scale(1);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes throb {
            0% {
              transform: scale(1)
            }
            50% {

              transform: scale(0.95);
            }
          }
          @keyframes fade {
            0% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          @media (orientation: portrait) {
            #avatar-area {              
              max-width: 90vw;
            }
          }
        `}</style>
        <div className='input-area'>
          <div id='name-input-label' className='input-label'>
            <div>Enter name</div>
          </div>
          <input name='player-name' id='player-name-input' maxLength='24' placeholder='Guest'></input>
          <div id='remember-check-area' className={`shadowed-text ${remembered}`}>
            <input defaultChecked={true} id='remember-checkbox' type='checkbox' />
            <div id='name-input-message'></div>
          </div>
        </div>
        <div id='avatar-area'>
          <div id='avatar-label' className='input-label'>Select avatar</div>
          <div id='avatar-select-area'>
            <span id='avatar-row'>
              &nbsp;
              {this.state.avatarArray.map((xPos, i) => {
                let selected = '';
                if (avatarIndex === xPos) {
                  selected = 'selected-avatar';
                }
                let bgPosX = `${(-xPos * (avatarSize + avatarBorderSize))}px`;
                let bgPosY = 'top';
                if (xPos > 7) {
                  bgPosX = `${(-(xPos % 8) * (avatarSize + avatarBorderSize))}px`;
                  if (xPos <= 15) {
                    bgPosY = `-${avatarSize + avatarBorderSize}px`;
                  } else {
                    bgPosY = `-${(avatarSize + avatarBorderSize)*2}px`;
                  }
                }
                return <div style={{ backgroundPositionX: bgPosX, backgroundPositionY: bgPosY }} onClick={this.handleAvatarClick} key={xPos} id={`avatar-thumb-${xPos}`} className={`avatar-thumb shadowed-box ${selected}`}></div>;
              })}
              &nbsp;
            </span>
          </div>
          <button className='intro-button' id='start-button'><div className='button-label'>Play!</div></button>
        </div>
      </form>
    );
  }
}
NameAvatarForm.propTypes = {
  cardSize: PropTypes.object,
  userAvatarSource: PropTypes.string,
  userAvatarIndex: PropTypes.number,
  onClickAvatar: PropTypes.func,
  onClickStart: PropTypes.func,
  onUnfocusNameInput: PropTypes.func,
  onFocusNameInput: PropTypes.func,
  userStatus: PropTypes.object
};

export default NameAvatarForm;