import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

function UserInfoModal(props) {
  return (
    <div id='info-modal-bg' className={props.showing && 'user-info-modal-showing'}>
      <style jsx>{`
        #info-modal-bg {
          position: fixed;
          box-sizing: border-box;
          background-color: rgba(0, 0, 0, 0.2);
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          z-index: 18;
          transition: all 200ms ease;
        }
        #user-info-modal {
          padding: 1rem;
          box-sizing: border-box;
          border: 0.5vw solid var(--dark-red-bg-color);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90%;
          //height: 50%;
          min-width: 300px;       
          font-family: sans-serif;
          background-color: var(--red-bg-color);
          font-size: 1.5vmax;
          //border: 0.5vw solid rgba(0, 0, 0, 0.2);
          transform: scale(0.9);
          pointer-events: none;
          opacity: 0;
          transition: all 200ms ease;
        }
        .user-info-modal-showing {
          transform: scale(1) !important;
          opacity: 1 !important;
          pointer-events: all !important;
        }
        #info-modal-close-button {
          font-size: 1.25rem;
          padding: 0;
          margin: 0;
          width: 90%;
          height: 100%;
        }
      `}
      </style>
      <div id='user-info-modal' className={props.showing && 'user-info-modal-showing'}>
        <UserCard playerObj={props.playerObj}
          cardSize={props.cardSize}
          portraitSource={props.portraitSource}
          onClickCloseButton={props.onClickCloseButton}
          onClickLogOut={props.onClickLogOut}
          onClickSignIn={props.onClickSignIn} />
      </div>
    </div>
  );
}

UserInfoModal.propTypes = {
  playerObj: PropTypes.object,
  cardSize: PropTypes.object,
  portraitSource: PropTypes.string,
  onClickCloseButton: PropTypes.func,
  onClickLogOut: PropTypes.func,
  onClickSignIn: PropTypes.func
};


export default UserInfoModal;