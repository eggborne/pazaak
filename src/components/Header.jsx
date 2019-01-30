import React from 'react';
import PropTypes from 'prop-types';
import PlayingAsIndicator from './PlayingAsIndicator';
import PlayerPortrait from './PlayerPortrait';
import HeaderMenu from './HeaderMenu';

function Header(props) {
  console.error('((((((((((((((((((  HHEEEAAAADDDDEEERRRRRR RENDERING');
  let convertedBorderWidth = parseInt(getComputedStyle(document.documentElement).fontSize) * 0.3; // this is var(--menu-border-width)

  let iconSize = (window.innerHeight * 0.07); // this is var(--header-height) - var(--menu-border-width)
  return (
    <div id='header-container'>
      <style jsx>{`
        #header-container {       
          //position: relative; 
          opacity: ${props.readyToFill && '1'};                             
          //transition: opacity 300ms ease;
          //will-change: opacity;
          z-index: 2;
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
          align-items: center;          
          font-size: var(--header-text-size);
          color: var(--main-text-color);
          border: var(--menu-border);
          border-top: 0;
          border-bottom: 0;
          padding-bottom: var(--menu-border-width);
          clip-path: inset(0 0 var(--menu-border-radius) 0);
          padding-left: calc(var(--header-height) / 8);
          z-index: 1;
        }
        #user-info-area {
          box-sizing: border-box;
          display: inline-flex;
          justify-content: space-between;
          box-sizing: border-box;
          text-align: right;
          flex-grow: 1;
          opacity: ${!props.readyToFill && 0};
          margin-right: var(--header-height);
        }
        #header-title {
          font-family: var(--title-font);
          line-height: 100%;
          align-self: flex-start;
          margin-top: calc(var(--header-height) / 6);
        }
        #user-account-icon {
          box-sizing: border-box;
          opacity: ${props.readyToFill && 0.8};
          width: auto;
          height: calc(var(--header-height) - var(--menu-border-width));          
          transition: opacity 150ms ease, background-color 150ms ease;
          transition-delay: 5ms;
          border-bottom-left-radius: var(--menu-border-width);
          border-top-left-radius: var(--menu-border-width);
          position: absolute;
          //background: salmon;
          //margin-right: 10px;
          right: var(--menu-border-width);
          top: 0;
          z-index: 2;
          pointer-events: none;
          will-change: background-color, opacity;
        }
        #inner-account-icon {
          fill: var(--main-text-color);
          stroke: #333;
          stroke-width: 1;
        }
        .corner-button-on {
          background-color: var(--dark-red-bg-color);
          opacity: 1 !important;
        }
        .no-bottom {
          border-bottom: 0 !important;
          clip-path: inset(0 0 var(--menu-border-width) 0);
        }
      `}</style>

      <div  {...{ [props.clickFunction]: props.onClickAccountArea }} className='pointer' id='header'>
        <div id='header-title' className='shadowed-text'>
          <div>Pazaak.online</div>
        </div>
        <div id='user-info-area'>
          <PlayingAsIndicator playerName={props.playerName} uniqueId={props.uniqueId} />
          <div></div>
        </div>
        
        {/* <svg id='user-account-icon' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='2 2 20 20'> 
          <path fill='none' d='M0 0h24v24H0V0z'/>
          <path id='inner-account-icon' d='M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z' />
        </svg> */}
      </div>
      
      {props.readyToFill &&
        <HeaderMenu
          playerObject={props.userStatus}
          onClickSignIn={props.onClickSignIn}
          onClickLogOut={props.onClickLogOut}
          characterNames={props.characterNames}
          clickFunction={props.clickFunction} />
      }
      <>
        <svg id='user-account-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='2 0 20 24'>
          <path fill='none' d='M0 0h24v24H0V0z' />
          <path id='inner-account-icon' d='M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z' />
        </svg>
        </>
    </div>
  );
}

Header.propTypes = {
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
    prevProps.readyToFill === nextProps.readyToFill
    && prevProps.avatarIndex === nextProps.avatarIndex
  );
  console.warn('Header equalTest ------------- ', equalTest);
  return equalTest;
}
export default React.memo(Header, areEqual);