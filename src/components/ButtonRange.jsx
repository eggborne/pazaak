import React from 'react';
import PropTypes from 'prop-types';

function ButtonRange(props) {
  let buttonHeight = 'var(--micro-card-width)';
  if (props.home === 'options-screen') {
    buttonHeight = 'calc(var(--mini-card-width) * 0.9)';
  }
  return (
    <div id={`${props.type}-button-range`} className={`button-range inner-red-panel ${props.disabled && 'switch-disabled'}`}>
      <style jsx>{`
        .button-range {
          --button-height: ${buttonHeight};
          box-sizing: content-box;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          padding: calc(var(--menu-border-width) / 2);          
          background-color:  var(--medium-red-bg-color);
        }
        .range-button {
          box-sizing: border-box;
          font-family: var(--title-font);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--dark-red-bg-color);
          background-color: var(--option-off-color);
          font-size: calc(var(--button-height) / 3);
          width: var(--button-height);
          height: var(--button-height);
          border-radius: var(--menu-border-width);          
          z-index: 1;
          transition: all 300ms ease !important;
        }
        .range-button:nth-child(1) {
          background-color: ${props.toggledButton === 0 && 'var(--option-on-color)'}
        }
        .range-button:nth-child(2) {
          background-color: ${props.toggledButton === 1 && 'var(--option-on-color)'};
          margin-left: calc(var(--menu-border-width) / 2);
          margin-right: calc(var(--menu-border-width) / 2);
        }
        .range-button:nth-child(3) {
          background-color: ${props.toggledButton === 2 && 'var(--option-on-color)'}
        }

        .switch-disabled {
          background-color: rgba(35,35,35,0.2);
          pointer-events: none;
        }
        .switch-disabled > .range-button {
          background-color: #555;
        }
      `}</style>
      <div {...{ [props.clickFunction]: () => props.onClickRangeButton(props.type, 0) }} id={`${props.type}-range-button-0`} className={'range-button'}>{props.labels[0]}</div>
      <div {...{ [props.clickFunction]: () => props.onClickRangeButton(props.type, 0.5) }} id={`${props.type}-range-button-1`} className={'range-button'}>{props.labels[1]}</div>
      <div {...{ [props.clickFunction]: () => props.onClickRangeButton(props.type, 1) }} id={`${props.type}-range-button-2`} className={'range-button'}>{props.labels[2]}</div>
    </div>
  );
}

ButtonRange.defaultProps = {
  toggled: false,
  disabled: false
};

ButtonRange.propTypes = {
  home: PropTypes.string,
  type: PropTypes.string,
  labels: PropTypes.array,
  toggledButton : PropTypes.number,
  disabled: PropTypes.bool,
  onClickRangeButton: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return (prevProps.toggled == nextProps.toggled)
    && (prevProps.disabled == nextProps.disabled);
}

export default ButtonRange;
// export default React.memo(ButtonRange, areEqual);
