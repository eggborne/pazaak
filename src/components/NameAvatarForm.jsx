import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

class NameAvatarForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: 'https://pazaak.online/assets/images/avatarsheetlq.jpg',
      mode: 'loggingIn',
      usernameEntered: '',
      passEntered: '',
      confirmPassEntered: '',
      avatarSelected: 0,
      getToken: true,
      usernameError: undefined,
      passError: undefined,
      repeatPassError: undefined
    };
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }
  handleAvatarClick(event, index) {
    this.setState({
      avatarSelected: index
    }, () => {
    });
    return this.props.onClickAvatar(event);        
  }
  handleInputChange = (event) => {
    let usernameInput = document.getElementById('player-name-input').value;
    let passInput = document.getElementById('player-pass-input').value;
    let confirmPassInput = document.getElementById('player-repeat-pass-input') ? document.getElementById('player-repeat-pass-input').value : this.state.confirmPassEntered;
    if (this.state.mode === 'registering') {      
      let passError = undefined;
      let repeatPassError = undefined;
      console.log('passInp', passInput)
      console.log('confirmPassInput', confirmPassInput)
      if (passInput.length && passInput.length < 6) {
        passError = 'too short'
      }
      if (passInput !== confirmPassInput) {
        repeatPassError = 'no match';
      }
      this.props.checkUsername(usernameInput).then(response => {
        if (response.data) {
          console.log('username taken!', usernameInput)
          this.setState({
            usernameError: 'name taken',
            passError: passError,
            repeatPassError: repeatPassError
          })
        } else {
          console.log('OK!', usernameInput)
          this.setState({
            usernameError: undefined,
            passError: passError,
            repeatPassError: repeatPassError
          });
        }
      });
    }
    this.setState({
      usernameEntered: usernameInput,
      passEntered: passInput,
      confirmPassEntered: confirmPassInput   
    });
    // let checkbox = document.getElementById('remember-checkbox');
    // if (event.target.value.length < 3) {
    //   if (!checkbox.disabled) {
    //     checkbox.disabled = true;
    //     checkbox.checked = false;
    //   }
    // } else {
    //   if (checkbox.disabled) {
    //     checkbox.disabled = false;
    //     checkbox.checked = true;
    //   }
    // }
  }
  changeMode = (event) => {
    event.preventDefault();
    let newMode = this.state.mode === 'loggingIn' ? 'registering' : 'loggingIn';
    this.setState({
      mode: newMode
    });
  }
  handleClickRegister = (event) => {
    event.preventDefault();
    let loginObj = {
      username: this.state.usernameEntered,
      pass: this.state.passEntered,
      confirmPassEntered: this.state.confirmPassEntered,
      avatarIndex: this.props.userAvatarIndex,
      getToken: this.state.getToken
    }
    this.props.onClickRegister(loginObj);
  }

  handleClickLogIn = (event) => {
    event.preventDefault();
    let loginObj = {
      // userID: this.props.
      username: this.state.usernameEntered,
      pass: this.state.passEntered,
      getToken: this.state.getToken
    }
    console.pink('logging in with')
    console.info(loginObj)
    this.props.onClickLogIn(loginObj);
  }

  render() {
    console.info('NameAvatarForm rendering', this.props);
    let imageSource = this.state.imageSource;
    let avatarArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let avatarSize = window.innerHeight / 10;
    let avatarBorderSize = 1;
    let avatarPlusBorderSize = avatarSize + 1;
    let remembered = '';
    if (this.props.loggedInAs && this.props.loggedInAs !== 'Guest') {
      remembered = 'remembered';
    }
    let avatarIndex = this.props.userAvatarIndex;
    if (avatarIndex === -1 || !avatarIndex) {
      avatarIndex = avatarArray[0];
    }
    let nameFontSize = 'var(--medium-font-size)';
    if (this.props.loggedInAs && this.props.loggedInAs.length > 12) {
      nameFontSize = (window.innerWidth * 0.8) / this.props.loggedInAs.length + 'px';
    }
    let mode = this.state.mode;
    let registerButtonClass = mode === 'registering' ? 'login-button' : 'login-button hollow';
    let loginButtonClass = mode === 'loggingIn' ? 'login-button' : 'login-button hollow';
    let nameOK = this.state.usernameEntered.length && !this.state.usernameError;
    let passOK = !this.state.passEntered.length || this.state.passEntered.length >= 6;
    let passesOK = !this.state.confirmPassEntered.length || (this.state.passEntered === this.state.confirmPassEntered);
    let passesMatch = passOK && (this.state.passEntered === this.state.confirmPassEntered);
    let sendDisabled = !passOK || !nameOK;
    let panelClass = this.state.mode === 'loggingIn' ? 'red-panel' : 'red-panel registering';
    let usernameClass = 'player-input';
    let passClass = 'player-input';
    let repeatPassClass = 'player-input';
    let submitAction = this.handleClickLogIn;
    if (mode === 'registering') {
      sendDisabled = !nameOK || !passOK || !passesMatch || this.state.usernameError || this.state.passError;
      usernameClass = nameOK ? 'player-input' : 'player-input bad-input';
      passClass = passOK && passesMatch ? 'player-input' : 'player-input bad-input';
      repeatPassClass = passOK && passesMatch ? 'player-input' : 'player-input bad-input';
      submitAction = this.handleClickRegister;
    }
    let usernameMessageClass = this.state.usernameError === 'name taken' ? 'input-message name-taken slid-on' :
      this.state.usernameEntered.length ? 'input-message slid-on' : 'input-message';
    let passMessageClass = this.state.passError === 'too short' ? 'input-message too-short slid-on' : 
      this.state.passEntered.length ? 'input-message slid-on' : 'input-message';
      let repeatPassMessageClass = this.state.repeatPassError === 'no match' ? 'input-message no-match slid-on' :
      this.state.passEntered.length ? 'input-message slid-on' : 'input-message';
    return (
      <div id="name-avatar-form">
        <style jsx>{`
          #name-avatar-form {

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
            padding: 1vw;
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
          #player-name-input {
            display: ${!remembered || 'none'};
          }
          #unlogged-panel {
            //display: flex;
            //flex-direction: column;
            //align-items: center;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 0.55fr 0.3fr;
            min-width: var(--intro-width);
            max-width: var(--intro-width);
            grid-row-gap: 1vh;
            
            //border-top-left-radius: 0;
            transition: all 300ms ease;
          }
          #unlogged-panel > * {
            transition: all 300ms ease;
          }
          #unlogged-panel.registering {
            //position: absolute;
            //left: calc((100vw - var(--intro-width)) / 2);
            //top: calc(100vw - var(--intro-width));
            grid-template-rows: 0.55fr 0.15fr 0.15fr;
            justify-content: stretch;
            align-content: stretch;
            align-items: stretch;
          }
          #unlogged-button-area {
            display: flex;
            justify-content: center;
          }
          #unlogged-button-area > button {
            font-size: var(--small-font-size);
            //flex-grow: 1;
            padding: 2vh;
            width: 50%;
          }
          #avatar-area {

          }
          .player-input {
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
            outline-color: green;
            //width: 100%;        
          }
          .player-input.bad-input {
            outline-color: red;
            border-color: red;
          }
          #name-input-label {
            width: 100%;
            display: inline-flex;
            align-items: flex-start;
            justify-content: space-between;
            border: 0;
            padding: 0;
          }
          .login-button:disabled {
            opacity: 0.75;
          }
          .login-button.hollow {
            font-weight: bold;
            font-family: var(--main-font);
            background-color: transparent;
            text-decoration: underline;
            border: 0;
          }         
          .input-message {
            box-sizing: border-box;
            position: absolute;
            right: calc( (100vw - var(--intro-width)) / 2 );
            font-family: var(--title-font);            
            font-size: 0.8em;
            padding-left: 0.5rem;
            padding-right: calc(var(--menu-border-width) * 6);
            text-align: right;
            pointer-events: none;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;            
            opacity: 0;
            transform: translateX(-8%);
            transition: transform 400ms ease-in-out, opacity 600ms ease;
            z-index: 40;
          }
          #username-input-message.slid-on.name-taken::after {
            color: orangered;
            content: 'NAME TAKEN';
          }
          #pass-input-message.slid-on.too-short::after {
            color: orangered;
            content: 'TOO SHORT';
          }
          #pass-input-message {
            padding-top: calc(var(--main-text-size) + 4vh);
          }
          #repeat-pass-input-message {
            padding-top: calc(var(--main-text-size) + 10.5vh);
          }
          .input-message:after {
            //color: green;
            //content: 'OK';
          }
          #repeat-pass-input-message.slid-on.no-match::after {
            color: orangered;
            content: "NO MATCH";
          }
          .slid-on {
            transform: translateX(0) !important;
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
            padding: 0;
            font-size: calc(var(--small-font-size) / 1.1);
            display: flex;
            align-items: center;
          }
          #remember-checkbox {
            width: var(--medium-font-size);
            height: var(--medium-font-size);
            margin-right: 0.5rem;
            margin-left: 0;
          }
          #name-input-area {
            //width: 100%;
            padding: calc(var(--menu-border-width) * 2);
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-row-gap: 1vh;
          }
          #avatar-area {          
            display: flex;
            overflow-x: scroll;            
            //height: ${avatarPlusBorderSize}px;
            //min-height: ${avatarPlusBorderSize}px;
            width: calc(var(--intro-width) - (var(--menu-border-width) * 4));
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
            transform: scale(0.85);
            -webkit-filter: grayscale(80%); /* Safari 6.0 - 9.0 */
            filter: grayscale(80%);
            min-width: ${avatarPlusBorderSize}px;
            width: ${avatarPlusBorderSize}px;
            height: ${avatarPlusBorderSize}px;
            min-height: 0;
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
            font-size: ${remembered ? '6vh' : '3vh'};
            width: 100%;
            height: 14vh;
            min-height: 12vh;
            align-self: center;
            border-color: var(--button-text-color);
            margin-top: calc(var(--menu-border-radius) * 2);
            display: ${(!remembered && mode === 'registering') && 'none'};
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
              <div id="logged-in-text" className="inner-red-panel"> <small>Logged in as</small> <span id="name-text">{this.props.loggedInAs}</span> </div>
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
              <input autoComplete='on' type='text' name="player-name" id="player-name-input" maxLength="24" placeholder="Guest" defaultValue={this.props.loggedInAs} />                              
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
            <form onSubmit={(event) => submitAction(event)} className='pointer' id='name-avatar-input-form'>
              <div id='unlogged-panel' className={panelClass}>
                <div id='name-input-area' className='inner-red-panel'>
                  <input autoComplete='on' type='text' onChange={this.handleInputChange} name="player-name" id="player-name-input" className={usernameClass} maxLength="24" placeholder="Username" />
                  <div id='username-input-message' className={usernameMessageClass}></div>
                  <input autoComplete='on' type='password' onChange={this.handleInputChange} name="player-pass" id="player-pass-input" className={passClass} maxLength="24" placeholder="Password" />
                  {mode === 'registering' &&
                    <>
                    <input autoComplete='on' type='password' onChange={this.handleInputChange} name="player-repeat-pass" id="player-repeat-pass-input" className={repeatPassClass} maxLength="24" placeholder="Repeat Password" />
                    <div id='repeat-pass-input-message' className={repeatPassMessageClass}></div>
                    </>
                  }
                  <div id="remember-check-area" className={`shadowed-text ${remembered}`}>
                    <input defaultChecked={true} id="remember-checkbox" type="checkbox" />
                    Remember me (uses cookie)
                  </div>
                  <div id='pass-input-message' className={passMessageClass}></div>
                </div>
                {mode === 'registering' &&
                  <div>               
                    <div id="avatar-label" className="input-label">
                      Avatar
                    </div>
                    <div id='avatar-area'>
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
                          {...{ [this.props.clickFunction]: (event) => this.handleAvatarClick(event, xPos) }}
                          key={xPos}
                          id={`avatar-thumb-${xPos}`}
                          className={`avatar-thumb shadowed-box ${selected}`}
                        />
                      );
                    })}
                    </div>
                  </div>
                }
                {mode === 'loggingIn' ?
                  <div id='unlogged-button-area'>
                    <button type='button' onClick={(event) => this.changeMode(event)} className={registerButtonClass} id="intro-register-button">
                      Register
                    </button>
                    <button type='submit' disabled={sendDisabled} className={loginButtonClass} id="intro-log-in-button">
                      Log In
                    </button>
                  </div>
                  :
                  // registering
                  <div id='unlogged-button-area'>                      
                    <button type='submit' disabled={sendDisabled} className={registerButtonClass} id="intro-register-button">
                      Register
                    </button>
                    <button type='button' onClick={(event) => this.changeMode(event)} className={loginButtonClass} id="intro-log-in-button">
                      Log In
                    </button>                      
                  </div>
                }
              </div>
              <button type='button' className="intro-button" id="start-button">
                <div id="start-button-label" className="button-label">
                  Play as guest
                </div>
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}
NameAvatarForm.propTypes = {
  // mode: PropTypes.string,
  userAvatarIndex: PropTypes.number,
  loggedInAs: PropTypes.string,
  checkUsername: PropTypes.func,
  onClickAvatar: PropTypes.func,
  onClickStart: PropTypes.func,
  onClickLogOut: PropTypes.func,
  userStatus: PropTypes.object,
  clickFunction: PropTypes.string
};

export default NameAvatarForm;
