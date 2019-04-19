import React from 'react';
import PropTypes from 'prop-types';
import PlayingAsIndicator from './PlayingAsIndicator';
import { isFullScreen } from '../scripts/util';

function Header(props) {
  console.big('Header rendering');
  let headerOffPosition = 'translateY(calc((var(--header-height) - var(--menu-border-width)) * -1))';
  if (isFullScreen()) {
    headerOffPosition = 'translateY(calc((var(--header-height)) * -1))';
  }
  return (
    <div id='header-container'>
      <style jsx>{`
        #header-container {       
          opacity: ${props.readyToFill && '1'};          
        }
        #header {
          position: absolute;
          top: 0;
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
          padding-bottom: var(--menu-border-width);
          padding-left: calc(var(--header-height) / 8);
          clip-path: inset(0 0 var(--menu-border-radius) 0);
          border-top: 0 !important;
          border-top-left-radius: 0 !important;   
          border-top-right-radius: 0 !important;
          border-left: 0;
          border-right: 0;
          border-radius: 0;
          border-bottom-color: transparent;
          z-index: 1;
          transform: ${props.showing || headerOffPosition};
          transition: transform 300ms ease;
          
        }
        #header.intact {          
          //border-radius: 0 0 var(--menu-border-radius) var(--menu-border-radius);
          border-bottom-color: var(--dark-red-bg-color);
          border-top-color: transparent;
          clip-path: none;
        }
        #user-info-area {
          box-sizing: border-box;
          display: inline-flex;
          justify-content: space-between;
          box-sizing: border-box;
          text-align: right;
          flex-grow: 1;
          opacity: ${!props.readyToFill && 0};
          margin-right: calc(var(--header-height));
        }
        #header-title {
          font-family: var(--title-font);
          line-height: 100%;
          align-self: flex-start;
          margin-top: calc(var(--header-height) / 6);
          margin-left: var(--menu-border-width);
        }
        #user-account-icon {
          box-sizing: border-box;
          opacity: ${props.readyToFill && 0.8};
          width: auto;
          height: calc(var(--header-height) - var(--menu-border-width));          
          transition: opacity 150ms ease, background-color 150ms ease, outline 75ms linear;
          transition-delay: 5ms;
          border-bottom-left-radius: var(--menu-border-width);
          border-top-left-radius: var(--menu-border-width);
          position: absolute;
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
          display: ${props.showing || 'none'};
        }
        .corner-button-on {
          opacity: 1 !important;
        }
        #header-title > div:first-child:after {
          content: 'loading...';
          margin-left: 5vw;
          //position: absolute;
          font-family: var(--main-font);
          font-size: var(--small-font-size);
          opacity: ${props.readyToFill && 0};
          transition: opacity 210ms ease;
        }

      `}</style>
      <div id='header' {...{ [props.clickFunction]: props.onClickAccountArea }} className='red-panel intact'>
        <div id='header-title' className='shadowed-text'>
          <div>Pazaak.online</div>
        </div>
        <div id='user-info-area'>
          <PlayingAsIndicator playerName={props.playerName} playerCredits={props.playerCredits} userID={props.userID} />
        </div>      
      </div>
      <svg id='user-account-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='2 0 20 24'>
        <path fill='none' d='M0 0h24v24H0V0z' />
        <path id='inner-account-icon' d='M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z' />
      </svg>
    </div>
  );
}

Header.propTypes = {
  showing: PropTypes.bool,
  readyToFill: PropTypes.bool,
  userStatus: PropTypes.object,
  characterNames: PropTypes.array,
  playerName: PropTypes.string,
  playerCredits: PropTypes.number,
  uniqueId: PropTypes.number,
  avatarIndex: PropTypes.number,
  onClickAccountArea: PropTypes.func,
  onClickSignIn: PropTypes.func,
  onClickLogOut: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let equalTest = (
    prevProps.readyToFill == nextProps.readyToFill
    && prevProps.avatarIndex == nextProps.avatarIndex
    && prevProps.playerCredits == nextProps.playerCredits
    && prevProps.showing == nextProps.showing
    && prevProps.playerName == nextProps.playerName
  );
  return equalTest;
}
export default React.memo(Header, areEqual);
// export default Header;