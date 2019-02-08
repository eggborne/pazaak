import React from 'react';
import OptionSwitch from './OptionSwitch';
import PropTypes from 'prop-types';
import { isFullScreen } from '../scripts/util';

class OptionsPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 2,
      pageShowing: 0,
      panelWidth: null
    };
  }

  componentDidMount() {
    console.big('OptionsPanel MOUNTED', 'white');
    console.green(document.getElementById(`${this.props.id}-options-panel`).getBoundingClientRect().width);
    this.state.panelWidth = Math.floor(document.getElementById(`${this.props.id}-options-panel`).getBoundingClientRect().width);
    this.forceUpdate();
  }
  componentDidUpdate() {
    console.big('OptionsPanel updating', 'green');
    //this.state.panelWidth = Math.floor(document.getElementById(`${this.props.id}-options-panel`).getBoundingClientRect().width);
  }
  handleClickLessOptions = () => {
    if (this.state.pageShowing > 0) {      
      this.setState({
        pageShowing: this.state.pageShowing - 1
      }, () => {
        // setTimeout(() => {
        //   document.getElementById(`${this.props.id}-options-page-1`).style.display = 'none';
        // }, 300);
      });
    }
  };
  handleClickMoreOptions = () => {
    if (this.state.pageShowing < 1) {
      // document.getElementById(`${this.props.id}-options-page-1`).style.display = 'flex';
      this.setState({
        pageShowing: this.state.pageShowing + 1
      });
    }
  };
  render() {
    let panelWidth = this.state.panelWidth;
    let panelHeight = '52vh';
    let rowHeight = 'calc(var(--micro-card-height) * 1.1)';
    if (this.props.id === 'hamburger') {
      panelHeight = '42vh';
      rowHeight = 'calc(var(--micro-card-height) * 0.9)';
    }
    
    if (document.getElementById(`${this.props.id}-options-panel`)) {
      panelWidth = Math.floor(document.getElementById(`${this.props.id}-options-panel`).getBoundingClientRect().width);
    }
    console.pink('rendering ' + this.props.id + ' OptionsPanel options ');
    console.info(this.props.currentOptions)
    let fullScreen = isFullScreen() !== undefined;
    console.big(fullScreen, 'pink')
    return (
      <div id={`${this.props.id}-options-panel`} className='options-panel shadowed-text'>
        <style jsx>{`
          .options-panel {            
            box-sizing: border-box;
            height: ${panelHeight};
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .option-page-area {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            height: 100%;
            overflow-x: hidden;   
            min-width: 0;
            
          }
          .option-page {
            box-sizing: border-box;
            min-width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 300ms ease;
          }
          .option-label {
            box-sizing: border-box;
            //margin-right: calc(var(--menu-border-width) * 1.5);
          }
          .option-row {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: calc(var(--menu-border-radius));
            height: ${rowHeight};
            border-radius: 0;
            border-left: 0;
            border-right: 0;
          }
          .option-row:first-child {
            //margin-top: 0;
          }
          .more-panel {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            align-self: center;
            padding: calc(var(--small-font-size) / 2);
          }
          .more-button {
            font-size: var(--large-font-size);
            font-family: var(--main-font);
            line-height: 100%;
            width: 35%;
            height: 100%;
          }
          .page-indicator {
            font-family: var(--title-font);            
          }
          small {
            font-family: var(--title-font);
            font-size: 0.35em;
          }
          .option-page:nth-of-type(2) {
            //margin-left: calc(var(--menu-border-width) / 2);
            //display: ${this.state.pageShowing === 1 || 'none'};
            //display: none;
            //opacity: ${this.state.pageShowing === 1 || '0.5'};
          }
          .obscured.option-row {
            opacity: 0;
            pointer-events: none;
          }
          .on-page-2 {
            
            //transform: translateX(-${panelWidth}px);
            transform: translateX(-100%);
          }
        `}</style>

        <div id={`${this.props.id}-options-page-area`} className='option-page-area'>
          <div id={`${this.props.id}-options-page-0`} className={`option-page ${this.state.pageShowing === 1 && 'on-page-2'}`}>
            <div className='option-row'>
              <div className='option-label'>Full Screen</div>
              <OptionSwitch home={this.props.id} type={'full-screen'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.fullScreen} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Sound FX</div>
              <OptionSwitch home={this.props.id} type={'sound-fx'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.sound} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Ambience</div>
              <OptionSwitch home={this.props.id} type={'ambience'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.ambience} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Quick Mode</div>
              <OptionSwitch home={this.props.id} type={'quick-mode'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.quickMode} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Dark Theme</div>
              <OptionSwitch home={this.props.id} type={'dark-theme'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.darkTheme} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Animated<br />Starfield</div>
              <OptionSwitch home={this.props.id} type={'animated-starfield'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.animatedStarfield} clickFunction={this.props.clickFunction} />
            </div>   
          </div>
          <div id={`${this.props.id}-options-page-1`} className={`option-page ${this.state.pageShowing === 1 && 'on-page-2'}`}>
            <div className='option-row'>
              <div className='option-label'>Quick Mode</div>
              <OptionSwitch home={this.props.id} type={'quick-mode'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.quickMode} clickFunction={this.props.clickFunction} />
            </div>
            
          </div>
        </div>
        {this.state.totalPages > 1 &&
          <div className='more-panel'>
            <button {...{ [this.props.clickFunction]: this.handleClickLessOptions }} id={`${this.props.id}-left-more-button`} className={`more-button ${this.state.pageShowing > 0 || 'disabled-button'}`}>
              {'<'}
              {/* <small>&nbsp;More</small> */}
            </button>
            <div className='page-indicator'>
              {this.state.pageShowing + 1} / {this.state.totalPages}
            </div>
            <button {...{ [this.props.clickFunction]: this.handleClickMoreOptions }} id={`${this.props.id}-right-more-button`} className={`more-button ${this.state.pageShowing < this.state.totalPages - 1 || 'disabled-button'}`}>
              {/* <small>More&nbsp;</small> */}
              {'>'}
            </button>
          </div>
        }
      </div>
    );
  }
}

OptionsPanel.propTypes = {
  id: PropTypes.string,
  currentOptions: PropTypes.object,
  clickFunction: PropTypes.string,
  onToggleOption: PropTypes.func
};

export default OptionsPanel;
