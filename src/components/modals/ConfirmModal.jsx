import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
function ConfirmModal(props) {
  const [userWager, changeWager] = useState(props.minimumWager);
  function handleChangeWager() {
    let newWager = event.target.value;
    console.log('newWager', newWager);
    console.log('ok wager', newWager >= props.minimumWager);
    changeWager(newWager);
  }
  let headerFontSize = 'calc(var(--medium-font-size) * 1.5)';
  let wagerSliderValue = userWager / (props.credits);
  return (
    <div id='confirm-modal-bg' className={props.showing && 'confirm-modal-showing'}>
      <style jsx>
        {`
          #confirm-modal-bg {
            position: fixed;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.75);
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 6;
            opacity: 0;
            transition: opacity 200ms ease;
          }
          #confirm-modal {
            box-sizing: border-box;
            width: var(--intro-width);
            min-width: 300px;
            font-size: var(--main-font-size);
            transform: scale(0.95);
            opacity: 0;
            transition: all 300ms ease;
          }
          #modal-inner-border {
            box-sizing: border-box;            
            padding-bottom: calc(var(--button-text-size) / 1.5);
            padding: calc(var(--button-text-size));
          }
          #confirm-button-area {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 24vh;
            width: 100%;
          }
          .confirm-modal-showing {
            transform: scale(1) !important;
            opacity: 1 !important;
            pointer-events: all !important;
          }
          #confirm-title {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(var(--header-height) * 1.5);
            font-size: ${headerFontSize};
            line-height: 100%;
            border: 0;
            border: var(--inner-menu-border);
          }
          .confirm-button, #confirm-body {
            justify-self: center;
            text-align: center;
            height: 11vmax;
          }
          #confirm-body {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4vh 2vmin;
          }
          .slider-knob {
            color: 'none' !important;
            background: green !important;
          }
          .confirm-button {
            font-size: var(--medium-font-size);
            width: 100%;
            height: 50%;
          }
          #confirm-ok-button.disabled {
            opacity: 0.5;
            pointer-events: none;
          }
          #confirm-ok-button {
            font-size: calc(var(--medium-font-size) * 1.5);
            color: var(--option-off-color);
            margin-bottom: 2vh;
            min-height: 11vh;
            padding: 5vh;
            line-height: 0;
          }
          #wager-input-area {
            display: flex;
            flex-direction: column;
          }
          #wager-input {
            font-family: var(--main-font);
            font-size: var(--main-text-size);
            background-color: var(--name-input-color);
            color: var(--name-input-text-color);
            padding: var(--menu-border-radius);
            -webkit-user-select: text; /* Chrome all / Safari all */
            -moz-user-select: text; /* Firefox all */
            -ms-user-select: text; /* IE 10+ */
            user-select: text;
            border-radius: var(--menu-border-width);
            text-align: center;   
            margin-bottom: 1vh; 
          }
          #minimum-message {
            font-size: 0.8em;
            opacity: 0.8;
          }
        `}
      </style>
      <div id='confirm-modal' className={`red-panel ${props.showing && 'confirm-modal-showing'}`}>
        <div id='confirm-title' className='modal-title inner-red-panel shadowed-text'>
          {props.messageData.titleText}
        </div>
        <div className='modal-body shadowed-text' id='confirm-body'>
          {props.messageData.bodyText === 'numberInput' &&
            
            <div id='wager-input-area'>
              <input id='wager-input'
                onChange={handleChangeWager}
                value={userWager}
                type='number'
              />
              <span id='minimum-message'>min. {props.minimumWager}</span>
            </div>
          }
          {props.messageData.bodyText === 'forfeit' &&
            <div>
              You will forfeit the game and lose {props.currentWager} credits.
            </div>

          }
          {props.messageData.bodyText.split(' ').length > 1 &&
            props.messageData.bodyText
          }
        </div>
        <div id='modal-inner-border' className='inner-red-panel'>
          <div id='confirm-button-area'>
            <button className={(props.messageData.bodyText === 'numberInput' && userWager < props.minimumWager) ? 'confirm-button disabled' : 'confirm-button'} id='confirm-ok-button'></button>
            <button {...{ [props.clickFunction]: props.onClickCancelButton }} className={'confirm-button'} id='confirm-cancel-button'>
              {props.buttonText.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  credits: PropTypes.number,
  minimumWager: PropTypes.number,
  currentWager: PropTypes.number,  
  showing: PropTypes.bool,
  messageData: PropTypes.object,
  buttonText: PropTypes.object,
  buttonData: PropTypes.object,
  onClickCancelButton: PropTypes.func,
  clickFunction: PropTypes.string
};

export default ConfirmModal;
