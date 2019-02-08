import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  console.error('footer rendering???', props.readyToShow);
  requestAnimationFrame(() => {
    document.getElementById('footer').style.transform = 'none';
  });
  return (
    <div id='footer'>
      <style jsx>{`
        #footer {
          box-sizing: border-box;
          width: 100%;
          font-family: sans-serif;
          height: var(--header-height);
          background-color: var(--red-bg-color);
          display: inline-flex;
          align-items: center;
          font-size: 1.5vmax;
          border-radius: var(--menu-border-radius) var(--menu-border-radius) 0 0;
          border: var(--menu-border);
          border-bottom: 0;
          transition: transform 200ms ease;
          //will-change: opacity;
          //z-index: 8;
          //transform: translateY(100%);
          //transition-delay: 100ms;
          //will-change: transform;

        }
        #footer-contents {
          color: var(--main-text-color);
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

export default Footer;