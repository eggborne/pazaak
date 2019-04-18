import React from 'react';
import PropTypes from 'prop-types';

function LoginModal(props) {
  let headerFontSize = 'calc(var(--medium-font-size) * 1.5)';
  return (
    <div id="login-modal-bg" className={props.showing && 'login-modal-showing'}>
      <style jsx>
        {`
          #login-modal-bg {
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
          #login-modal {
            box-sizing: border-box;
            width: var(--intro-width);
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
          #login-button-area {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 100%;
          }
          .login-modal-showing {
            transform: scale(1) !important;
            opacity: 1 !important;
            pointer-events: all !important;
          }
          #login-title {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(var(--header-height) * 1.5);
            font-size: ${headerFontSize};
            line-height: 100%;
            border: 0;
            border: var(--inner-menu-border);
          }
          .login-button, #login-body {
            justify-self: center;
            text-align: center;
            height: 11vmax;
          }
          #login-body {
            min-height: 11vmax;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 2vmin;
            padding-right: 2vmin;
          }
          .login-button {
            font-size: var(--medium-font-size);
            width: 100%;
          }
          #login-ok-button {
            font-size: calc(var(--medium-font-size) * 1.5);
            color: var(--option-off-color);
            margin-bottom: 2vh;
          }
        `}
      </style>
      <div id="login-modal" className={`red-panel ${props.showing && 'login-modal-showing'}`}>
        <div id="login-title" className="modal-title inner-red-panel shadowed-text">
          LOG IN
        </div>
        <div className="modal-body shadowed-text" id="login-body">
          cocksucker ass balls
        </div>
        <div id="modal-inner-border" className="inner-red-panel">
          <div id="login-button-area">
            <button className="login-button" id="login-ok-button">
              LOG IN
            </button>
            <button {...{ [props.clickFunction]: props.onClickCancelButton }} className="login-button" id="login-cancel-button">
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  showing: PropTypes.bool,
  onClickCancelButton: PropTypes.func,
  clickFunction: PropTypes.string
};

export default LoginModal;
