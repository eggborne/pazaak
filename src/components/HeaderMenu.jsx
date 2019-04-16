import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

function HeaderMenu(props) {
  console.info('HeaderMenu rendering', props);
  return (
    <div id='user-info-panel' className='red-panel user-info-panel-off shadowed-text'>
      <style jsx>{`
        #user-info-panel {
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          left: 0;
          top: calc(var(--header-height) - var(--menu-border-width) - var(--menu-border-width));
          border-top-left-radius: 0 !important;   
          border-top-right-radius: 0 !important;   
          border-top: 0 !important;   
          padding: var(--menu-border-width);
          padding: 1.5vw;
          padding-top: 0.75vw;
          transition: transform 300ms ease;
          will-change: transform;
          z-index: 1;
          border-left: 0;
          border-right: 0;
          border-radius: 0;
        }
        .user-info-panel-off {
          transform: translateY(calc(-100% + var(--menu-border-width) + var(--menu-border-width))) !important;
        }           
      `}</style>
      <UserCard playerObj={props.playerObject}
        loggedInAs={props.loggedInAs}
        userID={props.userID}
        totalSets={props.playerObject.totalSets}
        totalMatches={props.playerObject.totalMatches}
        setWins={props.playerObject.setWins}
        matchWins={props.playerObject.matchWins}
        wonCards={props.playerObject.wonCards}
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
    prevProps.playerObject.loggedInAs == nextProps.playerObject.loggedInAs &&
    prevProps.playerObject.totalSets == nextProps.playerObject.totalSets 
  );
  return false;
}

export default HeaderMenu;