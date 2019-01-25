import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  console.error('footer rendering???', props.readyToShow);
  return (
    <div id='footer'>
      <style jsx>{`
        #footer {
          box-sizing: border-box;
          bottom: 0;
          font-family: sans-serif;
          min-height: var(--header-height);
          min-width: 320px;
          background-color: var(--red-bg-color);
          display: inline-flex;
          align-items: center;
          font-size: 1.5vmax;
          border: var(--menu-border-width) solid var(--dark-red-bg-color);
          border-bottom: 0;
          border-radius: var(--menu-border-radius) var(--menu-border-radius) 0 0;
          //transform: ${props.readyToShow ? 'none' : 'translateY(100%)'};
          opacity: ${props.readyToShow ? '1' : '0'};
          transition: opacity 500ms ease;
          will-change: opacity;
        }
        #footer-contents {
          display: inline-flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
        }        
      `}
      </style>
      <div id='footer-contents'>
        <div><a href='https://github.com/eggborne'>GitHub</a></div>
        <div><a href='mailto:mike@eggborne.com'>Contact</a></div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  readyToShow: PropTypes.bool,
};

function areEqual(prevProps, nextProps) {
  return prevProps.readyToShow;
}

export default React.memo(Footer, areEqual);