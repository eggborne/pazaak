import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

function HeaderMenu(props) {
  console.error('((((((((((((((((((  HEADER MENU - RENDERING');

  return (
    <div id='user-info-panel' className='red-panel user-info-panel-off shadowed-text'>
      <style jsx>{`
      #user-info-panel {
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          //min-width: 100vw;
          //max-height: 50vh;
          left: 0;
          top: calc(var(--header-height) - var(--menu-border-width) - var(--menu-border-width));
          //background-color: var(--red-bg-color);
          //border: var(--menu-border);
          //border-radius: 0 0 var(--menu-border-radius) var(--menu-border-radius);
          border-top-left-radius: 0 !important;   
          border-top-right-radius: 0 !important;   
          border-top: 0 !important;   
          padding: var(--menu-border-width);
          padding: 1.5vw;
          padding-top: 0.75vw;
          transition: transform 300ms ease;
          will-change: transform;
          z-index: 1;
        }
        .user-info-panel-off {
          transform: translateY(calc(-100% + var(--menu-border-width) + var(--menu-border-width))) !important;
        }           
        `}</style>
      <UserCard playerObj={props.playerObject}
        onClickCloseButton={props.onClickCloseButton}
        onClickLogOut={props.onClickLogOut}
        onClickSignIn={props.onClickSignIn}
        clickFunction={props.clickFunction} />
    </div>
  );
}
HeaderMenu.propTypes = {
  playerObject: PropTypes.object,
  onClickCloseButton: PropTypes.func,
  onClickLogOut: PropTypes.func,
  onClickSignIn: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let equalTest = (
    prevProps.playerObject.avatarIndex == nextProps.playerObject.avatarIndex &&
    prevProps.playerObject.loggedInAs == nextProps.playerObject.loggedInAs
  );
  return equalTest;
}

export default React.memo(HeaderMenu, areEqual);