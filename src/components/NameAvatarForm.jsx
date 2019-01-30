

import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

class NameAvatarForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: 'https://pazaak.online/assets/images/avatarsheet.jpg'
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
    console.error('----------------- NameAvatarForm rendered -------------');
    let imageSource = this.state.imageSource;
    let avatarArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let avatarSize = window.innerHeight / 10;
    let avatarBorderSize = 1;
    let avatarPlusBorderSize = avatarSize + 1;
    let playLabelSize = avatarSize / 2;
    console.warn('avatarBorderSize', avatarBorderSize);
    console.warn('avatarPlusBorderSize', avatarPlusBorderSize);
    let remembered = '';
    if (this.props.userStatus.cookieId) {
      remembered = 'remembered';
    }
    let avatarIndex = this.props.userAvatarIndex;
    if (avatarIndex === -1) {
      avatarIndex = avatarArray[0];
    }
    let nameFontSize = '1rem';
    if (this.props.userStatus.loggedInAs.length > 12) {
      nameFontSize = ((window.innerWidth * 0.8) / (this.props.userStatus.loggedInAs.length)) + 'px';
    }
    return (
      <div id='name-avatar-form'>
        <style jsx>{`
          #name-avatar-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .input-area, .logged-in-area {
            display: flex;
            flex-flow: column;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem 0.5rem 0 0;
            border-radius: ${remembered && '0.5rem'};
            width: var(--intro-width);
          }
          .input-label {
            color: var(--main-text-color);
            font-family: var(--main-font);
            font-size: 1rem;
            padding: 0.5rem;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem 0.5rem 0 0;
          }
          #logged-in-header {
            text-align: center;
            background: rgba(0, 0, 0, 0.1);
          }
          #logged-in-body {
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: auto 1fr;
            align-items: center;
            justify-items: center;
            padding: 1.5rem;
            grid-column-gap: 0.5rem;  
          }
          #logged-in-text {
            grid-column-start: 0;
            grid-column-end: span 3;
          }
          #intro-portrait {
            flex-grow: 1;
          }
          #name-text {
            color: gold;
            line-height: 150%;
            font-size: ${nameFontSize}px;
          }
          #intro-log-out-button {
            align-self: start;
            font-size: 0.75rem;
            padding: 0.5rem;
          }
          #intro-stats {
            font-size: 0.7rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            justify-self: start;
            height: 100%;
          }
          .intro-stat-label {
            box-sizing: border-box;
            align-self: stretch;
            font-size: 0.8rem;
            color: gold;
          }
          #player-name-input {
            font-family: var(--main-font);
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
            display: ${remembered && 'none'}
          }
          #name-input-label {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
          #name-input-message {
            box-sizing: border-box;
            position: absolute;
            font-family: var(--title-font);
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
            transition: transform 400ms ease-in-out, opacity 600ms ease;
          }
          .slid-on {
            transform: translateY(-50%) translateX(0) !important;
            opacity: 1 !important;
          }
          #remember-check-area, #logged-in-display {
            font-family: var(--main-font);
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
            margin: ${avatarSize * 0.1}px;
          }
          #avatar-row {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            overflow-x: scroll;
            opacity: 0;
          }
          .shadowed-box {
            box-shadow: 0 0 ${avatarBorderSize + 2}px ${avatarBorderSize}px #333;
          }
          .avatar-thumb {
            background-image: url(${imageSource});
            background-size: auto ${avatarPlusBorderSize * 3}px;
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
            //min-width: 68vw;
            font-size: 6vh;
            //max-width: 68vw;
            width: 80%;
            height: 12vh;
            min-height: 12vh;
            margin: 1rem;
            margin: ${!remembered && '0 1rem 1rem 1rem'};
            align-self: center;   
            border-color: #040
          }
          #start-button-label {
            animation: throb 1200ms infinite;
            animation-delay: 200ms;
            z-index: 0;
          }
          .throbbing {
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
              transform: scale(0.96);
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
             //max-width: 90vw;
            }
          }
        `}</style>
        {remembered &&
          <div className='input-area'>
            <div id='logged-in-header' className='input-label shadowed-text'>
              <div id='logged-in-text'><small>Logged in as</small> <span id='name-text'>{this.props.userStatus.loggedInAs}</span></div>
            </div>
            <div id='logged-in-body'>
              <div id='intro-portrait'>
                <PlayerPortrait size={Math.round(avatarPlusBorderSize * 0.75)} spriteIndex={this.props.userAvatarIndex} displayName={''} type={'mini'} />
              </div>
              <div id='intro-stats' className='shadowed-text'>
                <div className='intro-stat-label'>Credits:</div>
                <div>{this.props.userStatus.credits}</div>
                <div className='intro-stat-label'>Win rate:</div>
                <div>{this.props.userStatus.setWins} / {this.props.userStatus.totalSets}</div>
                <div>{this.props.userStatus.matchWins} / {this.props.userStatus.totalMatches}</div>
              </div>
              <button {...{[this.props.clickFunction]: this.props.onClickLogOut}} className='balls' id='intro-log-out-button'>Log Out</button>
            </div>
            <input name='player-name' id='player-name-input' maxLength='24' placeholder='Guest' defaultValue={this.props.userStatus.loggedInAs}></input>
            <button {...{[this.props.clickFunction]: this.props.onClickStart}} className='intro-button' id='start-button'><div id='start-button-label' className='button-label'>Play!</div></button>
          </div>
        }
        {!remembered &&
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
        }
        {!remembered &&
          <div id='avatar-area'>
            <div id='avatar-label' className='input-label'>Select avatar</div>
            <div id='avatar-select-area'>
              <span id='avatar-row'>
                &nbsp;
                {avatarArray.map((xPos) => {
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
                      bgPosY = `-${(avatarSize + avatarBorderSize) * 2}px`;
                    }
                  }
                  return <div style={{ backgroundPositionX: bgPosX, backgroundPositionY: bgPosY }} {...{[this.props.clickFunction]: this.handleAvatarClick}} key={xPos} id={`avatar-thumb-${xPos}`} className={`avatar-thumb shadowed-box ${selected}`}></div>;
                })}
                &nbsp;
              </span>
            </div>
            <button {...{[this.props.clickFunction]: this.props.onClickStart}} className='intro-button' id='start-button'><div id='start-button-label' className='button-label'>Play!</div></button>
          </div>
        }
      </div>
    );
  }
}
NameAvatarForm.propTypes = {
  userAvatarIndex: PropTypes.number,
  onClickAvatar: PropTypes.func,
  onClickStart: PropTypes.func,
  onClickLogOut: PropTypes.func,
  userStatus: PropTypes.object,
  clickFunction: PropTypes.string
};

export default NameAvatarForm;