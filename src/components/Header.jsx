import React from 'react';
import PropTypes from 'prop-types';
import PlayingAsIndicator from './PlayingAsIndicator';
import PlayerPortrait from './PlayerPortrait';
import HeaderMenu from './HeaderMenu';

function Header(props) {
  console.error('((((((((((((((((((  HHEEEAAAADDDDEEERRRRRR ))))))))))))))))))))))');
  let convertedBorderWidth = parseInt(getComputedStyle(document.documentElement).fontSize) * 0.75; // this is var(--menu-border-radius) - 2 borders
  let portraitSize = (window.innerHeight * 0.08) - convertedBorderWidth; // this is var(--header-height) - 2 borders
  return (
    <div id='header-container'>
      <style jsx>{`
        #header-container {       
          //position: relative; 
          opacity: ${props.readyToFill && '1'};                             
          transition: opacity 300ms ease;
          will-change: opacity;
          z-index: 1;
        }
        #header {
          position: relative;  
          box-sizing: border-box;
          width: 100%;
          height: var(--header-height);
          min-height: var(--header-height);        
          max-height: var(--header-height);        
          background-color: var(--red-bg-color);          
          display: flex;
          //align-items: center;          
          font-size: var(--header-text-size);
          color: var(--main-text-color);
          border: var(--menu-border-width) solid var(--dark-red-bg-color);
          border-radius: var(--menu-border-radius);
          border-top: 0;
          border-bottom: 0;
          clip-path: inset(0 0 var(--menu-border-width) 0);
          z-index: 1;
          will-change: transform;
          padding: var(--menu-border-width);          
        }
        #user-info-area {
          display: inline-flex;
          justify-content: space-between;
          box-sizing: border-box;
          text-align: right;
          flex-grow: 1;
          opacity: ${!props.readyToFill && 0};
        }
        #header-title {
          font-family: 'Bungee';
          align-self: center;
          margin-left: var(--menu-border-width);
        }
        #user-account-icon {
          box-sizing: border-box;
          opacity: ${props.readyToFill && 0.7};
          transition: color 300ms ease;
          position: absolute;
          width: ${portraitSize}px;
          height: ${portraitSize}px;
          align-self: stretch;          
          right: var(--menu-border-width);
          top: var(--menu-border-width);
          transform: scale(0.85);
          padding: 0;
          transition: transform 300ms ease, background-color 300ms ease;
          background-color: transparent;
          border-radius: var(--menu-border-radius);
        }
        #inner-account-icon {
          fill: var(--main-text-color);
          stroke: #333;
          stroke-width: 0.5;          
        }
        .corner-button-on {
          background-color: #afa !important;
          transform: scale(1) !important;
          opacity: 1 !important;
        }
      `}</style>

      <div  {...{ [props.clickFunction]: props.onClickAccountArea }} className='pointer' id='header'>
        <div id='header-title' className='shadowed-text'>
          <div>Pazaak.online</div>
        </div>
        <div id='user-info-area'>
          <PlayingAsIndicator playerName={props.playerName} uniqueId={props.uniqueId} cardSize={props.cardSize} />
          <PlayerPortrait style={{ alignSelf: 'start' }} size={portraitSize} spriteIndex={props.avatarIndex} displayName={''} type={'corner'} />
        </div>
        {/* <i className="material-icons shadowed-text" id='user-account-icon'>
            account_circle
          </i> */}
        <svg id='user-account-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='2 2 20 20'> <path fill='none' d='M0 0h24v24H0V0z'/> <path id='inner-account-icon' fill='#fff7d5' d='M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z'/> </svg>
      </div>
      {props.readyToFill &&
        <HeaderMenu
          playerObject={props.userStatus}
          cardSize={props.cardSize}
          onClickSignIn={props.onClickSignIn}
          onClickLogOut={props.onClickLogOut}
          characterNames={props.characterNames}
          clickFunction={props.clickFunction} />
      }
    </div>
  );
}

Header.propTypes = {
  cardSize: PropTypes.object,
  readyToFill: PropTypes.bool,
  userStatus: PropTypes.object,
  characterNames: PropTypes.array,
  playerName: PropTypes.string,
  uniqueId: PropTypes.number,
  avatarIndex: PropTypes.number,
  onClickAccountArea: PropTypes.func,
  onClickSignIn: PropTypes.func,
  onClickLogOut: PropTypes.func,
  clickFunction: PropTypes.string
};
// export default Header;

function areEqual(prevProps, nextProps) {
  let equalTest = (
    prevProps.readyToFill === nextProps.readyToFill &&
    prevProps.avatarIndex === nextProps.avatarIndex &&
    prevProps.cardSize.height === nextProps.cardSize.height
  );
  console.warn('Header equalTest ------------- ', equalTest);
  return equalTest;
}
export default React.memo(Header, areEqual);