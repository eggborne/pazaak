import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

function HeaderMenu(props) {
  console.error('((((((((((((((((((  HHEEEAAAADDDDEEERRRRRRMMMMEEEEEENNNNNNUUUUUU ))))))))))))))))))))))');

  return (
    <div id='user-info-panel' className='user-info-panel-off shadowed-text'>
      <style jsx>{`
      #user-info-panel {
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          min-width: 100vw;
          left: 0;
          top: calc(var(--header-height) - var(--menu-border-width));
          background-color: var(--red-bg-color);
          border: var(--menu-border-width) solid var(--dark-red-bg-color);
          border-radius: 0 0 var(--menu-border-radius) var(--menu-border-radius);
          border-top: transparent;          
          padding: var(--menu-border-radius);
          padding-top: 0;
          transition: transform 300ms ease;
          will-change: transform;
          padding-top: var(--menu-border-width);
        }
        .user-info-panel-off {
          //transform: translateY( calc(-100% + calc(var(--header-height) - calc(var(--header-height) - calc(var(--menu-border-width) * 3))))) !important;
          transform: translateY(calc(-100% + var(--menu-border-width))) !important;
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

// export default HeaderMenu;

function areEqual(prevProps, nextProps) {
  // return prevProps.playerObject.loggedInAs == nextProps.playerObject.loggedInAs;
  let equalTest = (
    prevProps.playerObject.avatarIndex == nextProps.playerObject.avatarIndex &&
    prevProps.playerObject.loggedInAs == nextProps.playerObject.loggedInAs
  );
  console.warn('HeaderMenu equalTest ----------- ', equalTest);
  return equalTest;
}

export default React.memo(HeaderMenu, areEqual);