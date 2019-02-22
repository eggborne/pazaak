import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

class NameAvatarForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: 'https://pazaak.online/assets/images/avatarsheetlq.jpg'
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
    console.big('NameAvatarForm rendering');
    let imageSource = this.state.imageSource;
    let avatarArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let avatarSize = window.innerHeight / 10;
    let avatarBorderSize = 1;
    let avatarPlusBorderSize = avatarSize + 1;
    let remembered = '';
    if (this.props.userStatus.loggedInAs && this.props.userStatus.loggedInAs !== 'Guest') {
      remembered = 'remembered';
    }
    let avatarIndex = this.props.userAvatarIndex;
    if (avatarIndex === -1) {
      avatarIndex = avatarArray[0];
    }
    let nameFontSize = 'var(--medium-font-size)';
    if (this.props.userStatus.loggedInAs.length > 12) {
      nameFontSize = (window.innerWidth * 0.8) / this.props.userStatus.loggedInAs.length + 'px';
    }
    return (
      <div id="name-avatar-form">
        <style jsx>{`
          #name-avatar-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .input-area,
          .logged-in-area {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;            
            width: var(--intro-width);
            border-top: none;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            padding: var(--menu-border-radius);
          }
          .input-area {
            border-top: 0;
          }         
          .input-label {
            box-sizing: border-box;
            color: var(--main-text-color);
          }
          #logged-in-header.input-label {
            box-sizing: border-box;
            color: var(--main-text-color);
            border-radius: 0.5rem 0.5rem 0 0;
            border-top: var(--menu-border);
          }
          #logged-in-header {
            margin-top: 0;
          }
          #logged-in-header {
            box-sizing: border-box;
            font-size: var(--small-font-size);
            width: var(--intro-width);
            min-height: var(--header-height);
            text-align: center;
            border-bottom: none;
            padding-bottom: 0;
          }
          #logged-in-body {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: auto 1fr;
            justify-items: center;            
            grid-column-gap: var(--menu-border-width);
          }
          .input-area.red-panel {
            padding-top: var(--menu-border-radius);
          }
          #logged-in-text {
            grid-column-start: 0;
            grid-column-end: span 3;
            width: 100%;
            height: 100%;
            padding: calc(var(--menu-border-width) * 3);   
          }
          #intro-portrait {
            flex-grow: 1;
          }
          #name-text {
            color: gold;
            line-height: 150%;
            font-size: ${nameFontSize};
          }
          #intro-log-out-button {
            align-self: start;
            font-size: var(--small-font-size);
            padding: calc(var(--menu-border-width) * 2); 
          }
          #intro-stats {
            font-size: var(--small-font-size);
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
          #unlogged-panel {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #player-name-input {
            font-family: var(--main-font);
            font-size: var(--main-text-size);
            background-color: var(--name-input-color);
            color: var(--name-input-text-color);
            box-sizing: border-box;
            padding: var(--menu-border-radius);
            -webkit-user-select: text; /* Chrome all / Safari all */
            -moz-user-select: text; /* Firefox all */
            -ms-user-select: text; /* IE 10+ */
            user-select: text;
            display: ${remembered && 'none'};
            border-radius: var(--menu-border-width);
            width: 100%;        
          }
          #name-input-label {
            width: 100%;
            display: inline-flex;
            align-items: flex-start;
            justify-content: space-between;
            border: 0;
            padding: 0;
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
          #logged-in-display {
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
          #remember-check-area {
            font-size: var(--small-font-size);
            display: flex;
            align-items: center;
            justify-items: center;
          }
          #remember-checkbox {
            width: var(--medium-font-size);
            height: var(--medium-font-size);
            margin-right: 0.5rem;
            margin-left: 0;
          }
          #name-input-area {
            width: 100%;
            padding: calc(var(--menu-border-width) * 2);
          }
          #avatar-area {
            width: ${avatarPlusBorderSize * 3.5}px;
            width: 72vw;            
            z-index: 0;
          }
          #avatar-select-area {
            height: ${avatarPlusBorderSize}px;
            margin-top: var(--menu-border-radius);
            margin-bottom: var(--menu-border-width);
          }
          #avatar-row {
            width: 100%;
            display: flex;
            overflow-x: scroll;
            padding-top: var(--menu-border-width);
            padding-bottom: var(--menu-border-width);
          }
          .shadowed-box {
            box-shadow: 0 0 ${avatarBorderSize + 2}px ${avatarBorderSize}px #333;
          }
          .avatar-thumb {
            background-image: url(${imageSource});
            background-size: auto ${avatarPlusBorderSize * 3}px;
            background-repeat: no-repeat;
            background-position-y: top;
            opacity: 0.85;
            border-radius: var(--menu-border-radius);
            transform: scale(0.825);
            -webkit-filter: grayscale(80%); /* Safari 6.0 - 9.0 */
            filter: grayscale(80%);
            min-width: ${avatarPlusBorderSize}px;
            min-height: ${avatarPlusBorderSize}px;
            transition: all 150ms linear;
          }
          .selected-avatar {
            transform: scale(0.95);
            opacity: 1;
            -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
            filter: grayscale(0%);
            box-shadow: 0 0 5px 2px #222;
          }
          .button-label {
            pointer-events: none;
          }
          .fading {
            animation: fade 3000ms forwards ease;
          }
          #start-button {
            font-size: 6vh;
            width: 100%;
            height: 14vh;
            min-height: 12vh;
            align-self: center;
            border-color: var(--button-text-color);
            margin-top: var(--menu-border-radius);
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
              transform: scale(1);
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
        `}</style>
        {remembered && (
          <>
            <div id="logged-in-header" className="input-label input-area red-panel shadowed-text">
              <div id="logged-in-text" className="inner-red-panel"> <small>Logged in as</small> <span id="name-text">{this.props.userStatus.loggedInAs}</span> </div>
            </div>
            <div className="input-area red-panel">
              <div id="logged-in-body">
                <div id="intro-portrait">
                  <PlayerPortrait size={Math.round(avatarPlusBorderSize)} spriteIndex={this.props.userAvatarIndex} displayName={''} type={'mini'} />
                </div>
                <div id="intro-stats" className="shadowed-text">
                  <div className="intro-stat-label">Credits: {this.props.userStatus.credits}</div>
                  <div></div>
                  <div className="intro-stat-label">Win rate:</div>
                  <div>
                    {this.props.userStatus.matchWins} / {this.props.userStatus.totalMatches}
                  </div>
                </div>
                <button {...{ [this.props.clickFunction]: this.props.onClickLogOut }} className="balls" id="intro-log-out-button">
                  Log Out
                </button>
              </div>
              <input type='text' name="player-name" id="player-name-input" maxLength="24" placeholder="Guest" defaultValue={this.props.userStatus.loggedInAs} />                              
              <button {...{ [this.props.clickFunction]: this.props.onClickStart }} className="intro-button" id="start-button">
                <div id="start-button-label" className="button-label">
                Play!
                </div>
              </button>
            </div>
            </>
        )}
        {!remembered && (
          <>
            <div id='unlogged-panel' className="red-panel">
              <div id="name-input-label" className="input-label">
                Name
              </div>
              <div id='name-input-area' className='inner-red-panel'>
                <form onSubmit={this.props.onClickStart} className='pointer' id='name-avatar-input-form'>
                  <input type='text' onChange={this.handleInputChange} name="player-name" id="player-name-input" maxLength="24" placeholder="Guest" />
                </form>
                <div id="remember-check-area" className={`shadowed-text ${remembered}`}>
                  <input disabled defaultChecked={false} id="remember-checkbox" type="checkbox" />
                Remember me
                  <div id="name-input-message" />
                </div>
              </div>
              <div id="avatar-area">
                <div id="avatar-label" className="input-label inner-red-panel">
                Avatar
                </div>
                <div id="avatar-select-area" className='inner-red-panel'>
                  <span id="avatar-row">
                    {avatarArray.map(xPos => {
                      let selected = '';
                      if (avatarIndex === xPos) {
                        selected = 'selected-avatar';
                      }
                      let bgPosX = `${-xPos * (avatarSize + avatarBorderSize)}px`;
                      let bgPosY = 'top';
                      if (xPos > 7) {
                        bgPosX = `${-(xPos % 8) * (avatarSize + avatarBorderSize)}px`;
                        if (xPos <= 15) {
                          bgPosY = `-${avatarSize + avatarBorderSize}px`;
                        } else {
                          bgPosY = `-${(avatarSize + avatarBorderSize) * 2}px`;
                        }
                      }
                      return (
                        <div
                          style={{ backgroundPositionX: bgPosX, backgroundPositionY: bgPosY }}
                          {...{ [this.props.clickFunction]: this.handleAvatarClick }}
                          key={xPos}
                          id={`avatar-thumb-${xPos}`}
                          className={`avatar-thumb shadowed-box ${selected}`}
                        />
                      );
                    })}
                  </span>
                </div>
                <button form='name-avatar-input-form' className="intro-button" id="start-button">
                  <div id="start-button-label" className="button-label">
                    Play!
                  </div>
                </button>
              </div>
              {/* </form> */}
            </div>

          </>
        )}
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
