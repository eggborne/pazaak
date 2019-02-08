import React from 'react';
import PropTypes from 'prop-types';

function Toast(props) {
  return (
    <div id={`toast-${props.direction}`} className={'toast'}>
      <style jsx>
        {`
          .toast {
            position: fixed;
            left: ${props.position.left};
            top: ${props.position.top};
            opacity: 0;
            pointer-events: none;
            background-color: #111;
            color: var(--main-text-color);
            z-index: 34;
            transform: ${props.direction === 'vertical' && 'translateY(25%) translateX(-50%)'};
            padding: var(--menu-border-width);
            padding-left: var(--menu-border-radius);
            padding-right: var(--menu-border-radius);
            border-radius: var(--menu-border-width);
            transition: transform 300ms ease, opacity 300ms ease;
          }
          .toast-on {
            opacity: 1;
            transform: ${props.direction === 'vertical' && 'translateY(0%) translateX(-50%)'};
          }
        `}
      </style>
      {props.message}
    </div>
  );
}

Toast.defaultProps = {
  direction: 'vertical',
  position: {
    left: (window.innerWidth/2) + 'px',
    top: 'calc(var(--header-height) + (var(--control-footer-height) * 0.9))'
  }
};

Toast.propTypes = {
  message: PropTypes.string,
  direction: PropTypes.string,
  position: PropTypes.object,
};

export default Toast;
