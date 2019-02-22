import React from 'react';
import PropTypes from 'prop-types';

function ConfirmModal(props) {
  let headerFontSize = 'calc(var(--medium-font-size) * 1.5)';
  return (
    <div id="confirm-modal-bg" className={props.showing && 'confirm-modal-showing'}>
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
            width: 70vw;
            min-height: 50vh;
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
            height: 100%;
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
            min-height: 11vmax;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 2vmin;
            padding-right: 2vmin;
          }
          .confirm-button {
            font-size: var(--medium-font-size);
            width: 100%;
          }
          #confirm-ok-button {
            font-size: calc(var(--medium-font-size) * 1.5);
            color: var(--option-off-color);
            margin-bottom: 2vh;
          }
        `}
      </style>
      <div id="confirm-modal" className={`red-panel ${props.showing && 'confirm-modal-showing'}`}>
        <div id="confirm-title" className="modal-title inner-red-panel shadowed-text">
          {props.messageData.titleText}
        </div>
        <div className="modal-body shadowed-text" id="confirm-body">
          {props.messageData.bodyText}
        </div>
        <div id="modal-inner-border" className="inner-red-panel">
          <div id="confirm-button-area">
            <button className="confirm-button" id="confirm-ok-button">
              {props.buttonText.confirm}
            </button>
            <button {...{ [props.clickFunction]: props.onClickCancelButton }} className="confirm-button" id="confirm-cancel-button">
              {props.buttonText.cancel}
            </button>
          </div>
        </div>
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
