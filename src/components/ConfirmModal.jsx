import React from 'react';
import PropTypes from 'prop-types';

function ConfirmModal(props) {
  
  return (
    <div id='confirm-modal-bg' className={props.showing && 'confirm-modal-showing'}>
      <style jsx>{`
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
          padding: var(--menu-border-width);
          padding-bottom: 4vh;
          box-sizing: border-box;
          border: var(--menu-border);
          border-radius: var(--menu-border-radius);
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 3.5fr 4fr 3fr 3fr;
          align-items: center;
          justify-items: center;
          grid-row-gap: 1em;
          width: 70vw;
          min-height: 50vh;
          min-width: 300px;       
          background-color: var(--red-bg-color);
          font-size: var(--small-font-size);
          transform: scale(0.95);
          opacity: 0;
          transition: all 300ms ease;
          margin-bottom: var(--control-footer-height);
        }
        .confirm-modal-showing {
          transform: scale(1) !important;
          opacity: 1 !important;
          pointer-events: all !important;
        }        
        #confirm-title {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          font-size: 2rem;
          line-height: 100%;
          border-radius: var(--menu-border-width);
        }
        .confirm-button, #confirm-body {
          justify-self: center;
        }
        #confirm-body {
          width: 80%;
          align-self: center;
          text-align: center;
          margin-bottom: 1vh;]
        }
        .confirm-button {
          font-size: 1.25rem;
          width: 75%;
          height: 100%;
          padding-top: 2vh;
          padding-bottom: 2vh;
        }
        #confirm-ok-button {
          font-size: 2rem;
          color: var(--option-off-color);
        }
      `}
      </style>
      <div id='confirm-modal' className={props.showing && 'confirm-modal-showing'}>
        <div className='modal-title shadowed-text' id='confirm-title'>
          {props.messageData.titleText}
        </div>
        <div className='modal-body shadowed-text' id='confirm-body'>
          {props.messageData.bodyText}
        </div>
        <button className='confirm-button' id='confirm-ok-button'>{props.buttonText.confirm}</button>
        <button {...{ [props.clickFunction]: props.onClickCancelButton }} className='confirm-button' id='confirm-cancel-button'>{props.buttonText.cancel}</button>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  showing: PropTypes.bool,
  messageData: PropTypes.object,
  buttonText: PropTypes.object,
  buttonData: PropTypes.object,
  onClickCancelButton: PropTypes.func,
  clickFunction: PropTypes.string
};

export default ConfirmModal;