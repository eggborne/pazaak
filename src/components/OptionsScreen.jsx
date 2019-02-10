import React from 'react';
import PropTypes from 'prop-types';
import OptionsPanel from './OptionsPanel';

function OptionsScreen(props) {
  console.orange('OptionsScreen rendering');
  if (props.phase === 'showingOptions') {
    requestAnimationFrame(() => {
      document.getElementById('options-screen').style.transform = 'none';
      document.getElementById('options-screen').style.opacity = 1;
    });
  }
  let obscured = props.phase !== 'showingOptions';
  return (
    <div id="options-screen">
      <style jsx>{`
        #options-screen {
          --shift-x-distance: calc(-1 * var(--shift-distance));
          position: absolute;
          top: var(--header-height);
          font-family: var(--main-font);
          opacity: var(--starting-opacity);
          transform: translateX(var(--shift-x-distance));
          pointer-events: ${obscured && 'none'};
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: var(--inner-height);
          min-width: var(--min-width);
          padding-bottom: 3vh;
          transition: opacity var(--shift-duration) ease-out, transform var(--shift-duration) ease-out;
          will-change: transform, opacity;
        }
        #lower-options-screen {
          font-size: var(--small-font-size);
          //flex-grow: 1;
          height: calc(var(--inner-height));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: green !important;
        }
        #options-screen-panel {
          box-sizing: border-box;
          width: 80vw;
          //max-width: calc(var(--mini-card-width) * 5);
          font-size: calc(var(--medium-font-size) * 0.9);
        }               
      `}</style>
      <div className="options-instructions-title shadowed-text">Options</div>
      <div id='options-screen-panel' className="red-panel">
        <OptionsPanel id={'options-screen'} currentOptions={props.currentOptions} clickFunction={props.clickFunction} onToggleOption={props.onToggleOption} onChangeBackgroundColor={props.onChangeBackgroundColor} changeSliderValue={props.changeSliderValue}/>
      </div>
    </div>
  );
}
OptionsScreen.propTypes = {
  phase: PropTypes.string,
  currentOptions: PropTypes.object,
  onToggleOption: PropTypes.func,
  onClickBack: PropTypes.func,
  onChangeBackgroundColor: PropTypes.func,
  changeSliderValue: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let leaving = prevProps.phase == 'showingOptions' && nextProps.phase != 'showingOptions';
  let entering = prevProps.phase != 'showingOptions' && nextProps.phase == 'showingOptions';
  if (leaving) {
    console.orange('optionsscreen leaving');
    document.getElementById('options-screen').style.transitionDuration = 'var(--shift-duration-out)';
    document.getElementById('options-screen').style.opacity = 0;
    setTimeout(() => {
      console.pink('reset OptionsScreen to pre-enter state');
      document.getElementById('options-screen').style.transform = 'translateX(var(--shift-x-distance))';
    }, 300);
  }
  if (entering) {
    console.orange('optionsscreen entering');
    document.getElementById('options-screen').style.transitionDuration = 'var(--shift-duration)';
    document.getElementById('options-screen').style.opacity = 1;
  }
  let equal = true;
  for (let option in prevProps.currentOptions) {
    if (prevProps.currentOptions[option] !== nextProps.currentOptions[option]) {
      equal = false;
    }
  }
  if (leaving || entering) {
    equal = false;
  }
  return equal;
}
// export default OptionsScreen;
export default React.memo(OptionsScreen, areEqual);
