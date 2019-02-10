import React from 'react';
import OptionSwitch from './OptionSwitch';
import SliderKnob from './SliderKnob';
import Slider from './Slider';
import { HuePicker } from 'react-color';
import PropTypes from 'prop-types';
import { isFullScreen, getColorValues } from '../scripts/util';

const sliderStyle = {  // Give the slider some width
  position: 'relative',
  width: '100%',
  height: 80,
  border: '1px solid steelblue',
}

const railStyle = { 
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: '#8B9CB6',
}

class OptionsPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 3,
      pageShowing: 0,
      alphaLevelSelected: 2,
      colorChoices: ['blue','red','green', 'purple']
    };
    this.pages = ['game-options', 'video-options', 'sound-options'];
  }

  componentDidMount() {
    console.big('OptionsPanel MOUNTED', 'white');
    this.forceUpdate();
    let currentBgColor = this.props.currentOptions.backgroundColor;
    let currentValues = getColorValues(currentBgColor);
    if (currentValues.a === 1) {
      this.state.alphaLevelSelected = 3
    }
    if (currentValues.a === 0.6) {
      this.state.alphaLevelSelected = 2
    }
    if (currentValues.a === 0.3) {
      this.state.alphaLevelSelected = 1
    }
    if (currentValues.a === 0.1) {
      this.state.alphaLevelSelected = 0
    }
    if (currentBgColor != 'var(--main-bg-color)') {
      console.log('sucka is', currentBgColor)
      let rgbaColor = this.props.currentOptions.backgroundColor;
      console.orange('componentDidMount -------------- rgbaColor ')
      console.info(rgbaColor)
      //this.onChangeBackgroundColor(rgbaColor);
    }
  }
  componentDidUpdate() {
    console.big('OptionsPanel updating', 'green');
    console.pink('using ' + this.props.currentOptions.backgroundColor);
  }
  handleClickOptionTab = () => {
    this.setState({
      pageShowing: this.pages.indexOf(event.target.name)
    });
    event.preventDefault();
  }
  getAlpha = (rgbaString) => {
    console.log('slicedn is ' + rgbaString.slice(0, rgbaString.length))
    return parseFloat(rgbaString.slice(0, rgbaString.length-3));
  }
  getRGBAFromString = (str) => {
    console.info('getrgbafromsdtr took in', str)
    let arr = str.slice(5, str.length-3).split(', ');
    let color = {};
    color.rgb = {};
    color.rgb.r = parseInt(arr[0]);
    color.rgb.g = parseInt(arr[1]);
    color.rgb.b = parseInt(arr[2]);
    color.rgb.a = parseFloat(arr[3]);
    console.big('rgb')
    console.info(color.rgb)
    return color;
  }
  onChangeBackgroundColor = (rgbaColor) => {
    if (rgbaColor.rgb) {
      rgbaColor = rgbaColor.rgb;
    } else {
      rgbaColor = getColorValues(rgbaColor);
    }
    console.info(' onChangeBackgroundColor TOOK IN');
    console.info(rgbaColor);
    let newColorChoices = [ ...this.state.colorChoices ];
    newColorChoices.map((colorChoice, i) => {
      let alpha = 0.1;
      if (i === 1) {
        alpha = 0.3;
      }
      if (i === 2) {
        alpha = 0.6;
      }
      if (i === 3) {
        alpha = 1;
      }
      let sampleColor = {r: rgbaColor.r, g: rgbaColor.g, b: rgbaColor.b, a: parseFloat(alpha)}
      newColorChoices[i] = sampleColor;
    });
    console.info('newColorChoices')
    console.info(newColorChoices)
    this.setState({
      colorChoices: newColorChoices
    }, () => {      
      console.info(newColorChoices[this.state.alphaLevelSelected])
      this.props.onChangeBackgroundColor(newColorChoices[this.state.alphaLevelSelected]);
    });
  }
  onChangeAlphaLevel = () => {
    let level = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
    console.log('bgColor?', this.state.colorChoices[level]);
    // let baseBgColor = this.props.currentOptions.backgroundColor.slice(0, this.props.currentOptions.backgroundColor.length - 3);
    // let newColor = baseBgColor + ((level + 1) / 5) + ')';
    this.setState({
      alphaLevelSelected: level
    }, () => {
      this.props.onChangeBackgroundColor(this.state.colorChoices[level]);
    })
  }
  handleSliderChange = (type, newValue) => {
    console.info('log', event);
    console.info('newValue', newValue.toPrecision(2));
    if (newValue < 0.1) { 
      newalue = 0;
    }
    newValue = newValue.toPrecision(2);
    this.props.changeSliderValue(type, newValue);
  }
  render() {
    let rowHeight = 'calc(var(--micro-card-height) * 1.1)';
    if (this.props.id === 'hamburger') {
      rowHeight = 'calc(var(--micro-card-height) * 0.9)';
    }
    console.pink('rendering ' + this.props.id + ' OptionsPanel options ');
    let fullScreen = isFullScreen() !== undefined;
    console.big(fullScreen, 'pink');
    let currentPage = `on-page-${this.state.pageShowing + 1}`;
    console.info(this.props.currentOptions)
    let colorChoice0 = `rgba(${this.state.colorChoices[0].r}, ${this.state.colorChoices[0].g}, ${this.state.colorChoices[0].b}, ${this.state.colorChoices[0].a})`;
    let colorChoice1 = `rgba(${this.state.colorChoices[1].r}, ${this.state.colorChoices[1].g}, ${this.state.colorChoices[1].b}, ${this.state.colorChoices[1].a})`;
    let colorChoice2 = `rgba(${this.state.colorChoices[2].r}, ${this.state.colorChoices[2].g}, ${this.state.colorChoices[2].b}, ${this.state.colorChoices[2].a})`;
    let colorChoice3 = `rgba(${this.state.colorChoices[3].r}, ${this.state.colorChoices[3].g}, ${this.state.colorChoices[3].b}, ${this.state.colorChoices[3].a})`;
    let solidBg = this.props.currentOptions.solidBackground;
    return (
      <div id={`${this.props.id}-options-panel`} className='options-panel shadowed-text'>
        <style jsx>{`
          .pickr {
            width: 50vw !important;
          }
          .options-panel {            
            box-sizing: border-box;
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
            //justify-content: space-between;
            padding: calc(var(--menu-border-width) * 2);
            transition: transform 300ms ease;
          }
          .option-label {
            box-sizing: border-box;
            margin-right: calc(var(--menu-border-width) * 1.5);
          }
          .option-row {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: calc(var(--menu-border-width) * 2);
            padding-bottom: calc(var(--menu-border-width) * 2);
            height: ${rowHeight};
          }
          .option-row:first-child {
            padding-top: 0;
          }
          .more-panel {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            align-self: center;
            padding-top: calc(var(--small-font-size) / 2);
            padding-bottom: calc(var(--small-font-size) / 4);
          }
          .option-tab-button {            
            font-family: var(--main-font);            
            line-height: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .color-controls {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 100%;
            margin-top: calc(var(--menu-border-width) * 2);
            padding: calc(var(--micro-card-width) * 0.45);
            opacity: ${solidBg || 0};
            transition: opacity 300ms ease;        
          }
          .page-indicator {
            font-family: var(--title-font);            
          }
          .option-tab-button.selected-tab {
            //border-color: var(--option-on-color);
            border-width: var(--menu-border-width);
          }
          .option-tab-button.selected-tab > .tab-button-label {
            opacity: 1;
          }
          .option-tab-button.selected-tab > i {
            opacity: 1;
          }
          .option-tab-button {
            width: calc(33.33% - (var(--menu-border-width) / 1.5));
            padding: calc(var(--small-font-size) / 1.5);
            display: flex;
            border-color: var(--dark-red-bg-color);
            flex-direction: column;
            justify-content: center;
            align-items: center;  
          }
          .tab-button-label {
            font-size: var(--main-text-size);
            pointer-events: none;
            display: ${this.props.id === 'options-screen' || 'none'};
            opacity: 0.4;
          }          
          .on-page-2 > div {
            transform: translateX(-100%);
          }
          .on-page-3 > div {
            transform: translateX(-200%);
          }
          i {
            font-size: var(--medium-font-size);
            opacity: 0.4;
            pointer-events: none;
          }
          .alpha-selection-row {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: calc(var(--micro-card-width) * 1.5);
            padding-top: calc(var(--micro-card-width) * 0.45);
          }
          .selection-backing {
            box-sizing: border-box;
            flex-grow: 1;
            margin: calc(var(--menu-border-width) / 2);
            display: flex;
            align-items: center;
            justify-content:center;
            background-color: black;
            border: 1px solid black;
            border-radius: var(--menu-border-width);
            z-index: 3;
          }
          .alpha-selection {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            opacity: 1;
          }          
          .alpha-selection-row > div:first-child {
            margin-left: 0;
            background-color: ${colorChoice0};
          }
          .alpha-selection-row > div:nth-child(2) {
            background-color: ${colorChoice1};
          }
          .alpha-selection-row > div:nth-child(3) {
            background-color: ${colorChoice2};
          }
          .alpha-selection-row > div:last-child {
            background-color: ${colorChoice3};
            margin-right: 0;
          }
          .selected {
            border-color: white;
            border-width: 2px;            
          }
          
        `}</style>
        <div id={`${this.props.id}-options-page-area`} className={`option-page-area ${currentPage}`}>
          <div id={`${this.props.id}-options-page-0`} className={`option-page inner-red-panel`}>            
            <div className='option-row'>
              <div className='option-label'>Quick Turns</div>
              <OptionSwitch home={this.props.id} type={'quick-turns'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.quickTurns} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Auto Stand at 20</div>
              <OptionSwitch home={this.props.id} type={'auto-stand'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.autoStand} clickFunction={this.props.clickFunction} />
            </div> 
            
            {/* <div className='option-row'>
              <div className='option-label'>Dark Cards</div>
              <OptionSwitch home={this.props.id} type={'dark-cards'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.darkCards} clickFunction={this.props.clickFunction} />
            </div>                */}
            <div className='option-row'></div>               
            <div className='option-row'></div>             
          </div>
          <div id={`${this.props.id}-options-page-1`} className={`option-page inner-red-panel`}>
            <div className='option-row'>
              <div className='option-label'>Full Screen</div>
              <OptionSwitch home={this.props.id} type={'full-screen'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.fullScreen} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Dark Theme</div>
              <OptionSwitch home={this.props.id} type={'dark-theme'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.darkTheme} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <div className='option-label'>Animated<br />Starfield</div>
              <OptionSwitch home={this.props.id} type={'animated-starfield'} onClick={this.props.onToggleOption} disabled={this.props.currentOptions.solidBackground} toggled={this.props.currentOptions.animatedStarfield} clickFunction={this.props.clickFunction} />
            </div> 
            <div className='option-row'>
              <div className='option-label'>Solid Background</div>
              <OptionSwitch home={this.props.id} type={'solid-background'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.solidBackground} clickFunction={this.props.clickFunction} />
            </div>
            <div id={`${this.props.id}-color-controls`} className='color-controls inner-red-panel'>
              <HuePicker
                pointer={SliderKnob}
                width={'100%'}
                height={'calc(var(--micro-card-width) * 0.45)'}
                color={this.props.currentOptions.backgroundColor || '#fff'}
                onChangeComplete={this.onChangeBackgroundColor}
              /> 
              <div id={`${this.props.id}-alpha-selection-row`} className='alpha-selection-row'>
                <div className={`selection-backing ${this.state.alphaLevelSelected === 0 && 'selected'}`}>
                  <div {...{ [this.props.clickFunction]: this.onChangeAlphaLevel }} className={`alpha-selection`}>
                  </div>
                </div>
                <div className={`selection-backing ${this.state.alphaLevelSelected === 1 && 'selected'}`}>
                  <div {...{ [this.props.clickFunction]: this.onChangeAlphaLevel }} className={`alpha-selection`}>
                  </div>
                </div>
                <div className={`selection-backing ${this.state.alphaLevelSelected === 2 && 'selected'}`}>
                  <div {...{ [this.props.clickFunction]: this.onChangeAlphaLevel }} className={`alpha-selection`}>
                  </div>
                </div>                          
                <div className={`selection-backing ${this.state.alphaLevelSelected === 3 && 'selected'}`}>
                  <div {...{ [this.props.clickFunction]: this.onChangeAlphaLevel }} className={`alpha-selection`}>
                  </div>
                </div>                          
              </div>
            </div>
          </div>

          <div id={`${this.props.id}-options-page-2`} className={`option-page inner-red-panel`}>
            <div className='option-row'>
              <div className='option-label'>Sound FX</div>
              <OptionSwitch home={this.props.id} type={'sound-fx'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.sound} clickFunction={this.props.clickFunction} />
            </div>
            <div className='option-row'>
              <Slider type='ambience-volume' id='ambience-volume-slider' value={this.props.currentOptions.ambienceVolume} home={this.props.id} height={rowHeight+'px'} changeSliderValue={this.handleSliderChange} /> 
            </div>
            <div className='option-row'>
              <div className='option-label'>Ambience</div>
              <OptionSwitch home={this.props.id} type={'ambience'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.ambience} clickFunction={this.props.clickFunction} />
            </div>                                         
            <div className='option-row'>
              <div className='option-label'>Music</div>
              <OptionSwitch home={this.props.id} type={'music'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.music} clickFunction={this.props.clickFunction} />
            </div>                                         
          </div>

        </div>
        {this.state.totalPages > 1 &&
          <div className='more-panel'>
          <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='game-options' id={`${this.props.id}-game-option-tab-button`} className={`option-tab-button ${this.state.pageShowing === 0 && 'selected-tab'}`}>
          {/* <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='game-options' id={`${this.props.id}-game-option-tab-button`} className={`option-tab-button ${this.state.pageShowing > 0 || 'disabled-button'}`}> */}
              <i className='material-icons'>settings</i>
              <div className='tab-button-label'>General</div>
            </button>
            {/* <div className='page-indicator'>
              {this.state.pageShowing + 1} / {this.state.totalPages}
            </div> */}
            <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='video-options' id={`${this.props.id}-video-option-tab-button`} className={`option-tab-button ${this.state.pageShowing === 1 && 'selected-tab'}`}>
              <i className='material-icons'>personal_video</i>
              <div className='tab-button-label'>Display</div>
            </button>
            <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='sound-options' id={`${this.props.id}-sound-option-tab-button`} className={`option-tab-button ${this.state.pageShowing === 2 && 'selected-tab'}`}>
            {/* <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='sound-options' id={`${this.props.id}-sound-option-tab-button`} className={`option-tab-button ${this.state.pageShowing > 0 || 'disabled-button'}`}> */}
              <i className='material-icons'>volume_up</i>
              <div className='tab-button-label'>Sound</div>
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
  onToggleOption: PropTypes.func,
  onChangeBackgroundColor: PropTypes.func,
  changeSliderValue: PropTypes.func,
  clickFunction: PropTypes.string,
};

export default OptionsPanel;
