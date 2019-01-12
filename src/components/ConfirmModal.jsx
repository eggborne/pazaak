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
          opacity: 0;
          pointer-events: none;
          z-index: 19;
          transition: all 200ms ease;
        }
        #confirm-modal {
          padding: 0.1rem;
          padding-bottom: 1.5rem;
          box-sizing: border-box;
          border: 0.5vw solid var(--dark-red-bg-color);
          border-radius: 0.5rem;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 3.5fr 4fr 3fr 3fr;
          align-items: center;
          justify-items: center;
          grid-row-gap: 1em;
          width: 70%;
          height: 60%;
          min-width: 300px;       
          background-color: var(--red-bg-color);
          font-size: 1.5vmax;
          transform: scale(0.9);
          opacity: 0;
          transition: all 300ms ease;
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
          border-radius: 0.5rem;
          font-size: 2rem;
          line-height: 100%;
        }
        .confirm-button, #confirm-body {
          justify-self: center;
        }
        #confirm-body {
          font-size: 1rem;
          width: 80%;
          align-self: center;
        }
        .confirm-button {
          font-size: 1.25rem;
          width: 80%;
          height: 100%;
          border-radius: 0.5rem;
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
          {props.bodyText}
        </div>
        <button onClick={props.onClickOKButton} className='confirm-button' id='confirm-ok-button'>{props.buttonText.confirm}</button>
        <button onClick={props.onClickCancelButton} className='confirm-button' id='confirm-cancel-button'>{props.buttonText.cancel}</button>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  showing: PropTypes.bool,
  titleText: PropTypes.string,
  bodyText: PropTypes.string,
  buttonText: PropTypes.object,
  buttonData: PropTypes.object,
  onClickConfirmButton: PropTypes.func,
  onClickCancelButton: PropTypes.func
};

export default ConfirmModal;