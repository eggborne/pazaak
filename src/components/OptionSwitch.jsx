import React from 'react';
import PropTypes from 'prop-types';

function OptionSwitch(props) {
  console.pink('OptionSwitch rendering - ' + props.home + ' ' + props.type);
  let clickFunction = props.clickFunction;
  let toggled = props.toggled;
  if (props.type === 'full-screen') {
    clickFunction = 'onClick';
  }
  let toggleSize = 'var(--micro-card-width)';
  if (props.home === 'options-screen') {
    toggleSize = 'calc(var(--mini-card-width) * 0.9)';
  }
  return (
    <div id={`${props.type}-toggle`} {...{ [clickFunction]: props.onClick }} className={`option-switch inner-red-panel ${toggled ? 'toggle-on' : 'toggle-off'} ${props.disabled && 'switch-disabled'}`}>
      <style jsx>{`
        .option-switch {
          --toggle-size: ${toggleSize};
          --groove-width: calc(var(--toggle-size));
          box-sizing: content-box;
          min-width: calc(var(--toggle-size) * 2);
          height: var(--toggle-size);
          max-height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0;
          justify-content: center; 
          background-color: var(--trans-black-bg-color);
        }
        .option-groove {
          box-sizing: border-box;
          position: absolute;
          width: var(--groove-width);
          height: 1px;
          z-index: 0;
          pointer-events: none;
          background-color: #222;
          transition-delay: 75ms;
        }
        .option-toggle {
          box-sizing: border-box;
          font-family: var(--title-font);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--dark-red-bg-color);
          background-color: var(--option-on-color);
          font-size: calc(var(--toggle-size) / 3);
          width: var(--toggle-size);
          height: var(--toggle-size);
          border-radius: var(--menu-border-width);
          z-index: 1;
          transition: transform 150ms ease-out;
          will-change: transform;
          pointer-events: none;
        }
        .toggle-on > .option-toggle {
          background-color: var(--option-on-color);
          transform: translateX(calc(var(--groove-width) / 2)) !important;
        }
        .toggle-on > .option-toggle::before {
          content: 'ON';
        }
        .toggle-off > .option-toggle {
          background-color: var(--option-off-color);
          transform: translateX(calc(var(--groove-width) / -2));
        }
        .toggle-off > .option-toggle::before {
          content: 'OFF';
        }
        .toggle-on > .option-groove {
          background-color: var(--option-on-color) !important;
        }
        .toggle-off > .option-groove {
          background-color: #222 !important;
        }
        .switch-disabled {
          background-color: rgba(35,35,35,0.2);
          pointer-events: none;
        }
        .switch-disabled > .option-toggle {
          background-color: #555;
        }
        .switch-disabled > .option-groove {
          background-color: #555 !important;
        }
      `}</style>
      <div className={'option-toggle'} />
      <div className={'option-groove'} />
    </div>
  );
}

OptionSwitch.defaultProps = {
  toggled: false,
  disabled: false
};

OptionSwitch.propTypes = {
  home: PropTypes.string,
  type: PropTypes.string,
  toggled: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return (prevProps.toggled == nextProps.toggled)
    && (prevProps.disabled == nextProps.disabled);
}

// export default OptionSwitch;
export default React.memo(OptionSwitch, areEqual);
