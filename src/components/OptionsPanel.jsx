import React from 'react';
import PropTypes from 'prop-types';
import OptionSwitch from './OptionSwitch';
import ButtonRange from './ButtonRange';
import SliderKnob from './SliderKnob';
import Slider from './Slider';
import { HuePicker } from 'react-color';
import { getColorValues, shadeRGBAColor } from '../scripts/util';

class OptionsPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 3,
      pageShowing: 0,
      alphaLevelSelected: getColorValues(this.props.currentOptions.backgroundColor).a,
      panelBgColorSelected: this.props.currentOptions.panelColor,
      panelShadeLevelSelected: this.props.currentOptions.panelShade,
      editingElementColor: 'panel',
      colorChoices: ['blue','red','green','purple']
    };
    this.pages = ['game-options', 'video-options', 'sound-options'];
  }

  componentDidMount() {
    console.big('OptionsPanel mounted')
    this.forceUpdate();    
  }
  handleClickOptionTab = (event) => {
    this.setState({
      pageShowing: this.pages.indexOf(event.target.name)
    });
  }
  getAlpha = (rgbaString) => {
    return parseFloat(rgbaString.slice(0, rgbaString.length-3));
  }
  getRGBAFromString = (str) => {
    let arr = str.slice(5, str.length-3).split(', ');
    let color = {};
    color.rgb = {};
    color.rgb.r = parseInt(arr[0]);
    color.rgb.g = parseInt(arr[1]);
    color.rgb.b = parseInt(arr[2]);
    color.rgb.a = parseFloat(arr[3]);
    return color;
  }
  onChangeBackgroundColor = (rgbaColor) => {
    if (rgbaColor.rgb) {
      rgbaColor = rgbaColor.rgb;
    } else {
      rgbaColor = getColorValues(rgbaColor);
    }
    if (this.state.editingElementColor === 'background') {
      rgbaColor = `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${this.state.alphaLevelSelected})`;
      this.props.onChangeBackgroundColor(rgbaColor, this.state.editingElementColor);
    } else {
      rgbaColor = `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a})`;
      this.setState({
        panelBgColorSelected: rgbaColor
      }, () => {
        this.props.onChangeBackgroundColor([rgbaColor, this.state.panelShadeLevelSelected], this.state.editingElementColor);
      })
    }
  }
  onChangeAlphaLevel = () => {
    let level = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
    this.setState({
      alphaLevelSelected: level
    }, () => {
      this.onChangeBackgroundColor(this.state.colorChoices[level]);
    })
  }
  handleSliderChange = (type, newValue) => {
    if (type === 'panel-size') {
      this.props.changeSliderValue(type, newValue);       
    }
    if (type === 'bg-alpha-control') {
      this.setState({
        alphaLevelSelected: newValue
      }, () => {
        let bgColor = getColorValues(this.props.currentOptions.backgroundColor);
        newValue = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${newValue})`;
        this.props.changeSliderValue(type, newValue);          
      })
    }
    if (type === 'panel-alpha-control') {
      this.setState({
        panelShadeLevelSelected: newValue
      }, () => {
        let bgColor = this.state.panelBgColorSelected;
        this.props.changeSliderValue(type, [this.state.panelBgColorSelected, newValue]);
      })
    }
    if (type.split('-')[1] === 'volume') {
      this.props.changeSliderValue(type, newValue, true);  
    }
  }
  handleClickColorControlTab = (event) => {
    this.setState({
      editingElementColor: (event.target.id).split('-')[0]
    });
  }
  render() {
    console.big('OptionsPanel rendering');
    console.info(this.props)
    let rowHeight = 'calc(var(--micro-card-height) * 1.05)';
    if (this.props.id === 'hamburger') {
      rowHeight = 'calc(var(--micro-card-height) * 0.9)';
    }
    let currentPage = `on-page-${this.state.pageShowing + 1}`;
    let colorChoice0 = `rgba(${this.state.colorChoices[0].r}, ${this.state.colorChoices[0].g}, ${this.state.colorChoices[0].b}, ${this.state.colorChoices[0].a})`;
    let colorChoice1 = `rgba(${this.state.colorChoices[1].r}, ${this.state.colorChoices[1].g}, ${this.state.colorChoices[1].b}, ${this.state.colorChoices[1].a})`;
    let colorChoice2 = `rgba(${this.state.colorChoices[2].r}, ${this.state.colorChoices[2].g}, ${this.state.colorChoices[2].b}, ${this.state.colorChoices[2].a})`;
    let colorChoice3 = `rgba(${this.state.colorChoices[3].r}, ${this.state.colorChoices[3].g}, ${this.state.colorChoices[3].b}, ${this.state.colorChoices[3].a})`;
    let solidBg = this.props.currentOptions.solidBackground;
    let bgColorObj = getColorValues(this.props.currentOptions.backgroundColor);
    let panelColorObj = getColorValues(this.props.currentOptions.panelColor);
    let fullAlphaBg = `rgba(${bgColorObj.r}, ${bgColorObj.g}, ${bgColorObj.b}, 1)`;
    let fullAlphaPanel = `rgba(${panelColorObj.r}, ${panelColorObj.g}, ${panelColorObj.b}, 1)`;
    return (
      <div id={`${this.props.id}-options-panel`} className='options-panel shadowed-text'>
        <style jsx>{`
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
            transition: transform 300ms ease;
          }
          .option-row, .option-column {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: calc(var(--menu-border-width));
            margin-bottom: calc(${rowHeight} * 0.1); 
          }
          .double-row {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .option-column {
            flex-direction: column;
            width: calc(50% - (var(--menu-border-width) / 1.5));
          }
          .option-column > .option-label {
            margin-bottom: var(--menu-border-width);
          }
          .option-label {
            box-sizing: border-box;
            margin-left: calc(var(--menu-border-width) * 1.5);
            margin-right: calc(var(--menu-border-width) * 1.5);
          }
          .option-row.button-row {
            margin-top: calc(var(--menu-border-width));
            padding-left: calc(var(--menu-border-width));
            padding-right: calc(var(--menu-border-width));
          }
          .more-panel {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            align-self: center;
            padding: 1%;
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
            height: calc(${rowHeight} * 1.75);
            width: 100%;
            padding-left: calc(var(--menu-border-width) * 4);
            padding-right: calc(var(--menu-border-width) * 4);
            margin-bottom: calc(var(--menu-border-width));
            border-top-left-radius: 0;
            transition: opacity 300ms ease;  
            z-index: 1;
          }
          .color-controls > div {
            transform: translateY(12.5%);
            border-radius: 0;
          }
          .color-controls-tab-area {
            display: flex;
          }
          .color-controls-tab.inner-red-panel {
            margin: 0;
            padding: 0;
            border-bottom: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            padding-top: calc(var(--small-font-size) / 2);
            padding-bottom: calc((var(--small-font-size) / 2) + 2px);
            width: 40%;
            text-align: center;
            background-color: var(--red-bg-color);
            transform: translateY(2px);
            z-index: 0;
          }
          .color-controls-tab.inner-red-panel:first-child {
            margin-right: var(--small-font-size);
          }
          .color-controls-tab.selected-color-control {
            background-color: var(--medium-red-bg-color);
            z-index: 2;
          }
          .option-tab-button.selected-tab > .tab-button-label {
            opacity: 1;
          }
          .option-tab-button.selected-tab > i {
            opacity: 1;
          }
          .option-tab-button {
            width: calc(33.33% - (var(--menu-border-width) / 1.5));
            padding: calc(var(--small-font-size));
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
            //height: calc(var(--micro-card-width) * 1.5);
            height: calc(${rowHeight} * 0.75);
            padding-top: calc(var(--micro-card-width) * 0.45);
          }
          .selection-backing {
            box-sizing: border-box;
            flex-grow: 1;
            margin: calc(var(--menu-border-width) / 2);
            display: flex;
            align-items: center;
            justify-content:center;
            background-color: black !important;
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
          .selection-backing:first-child > div {
            margin-left: 0;
            background-color: ${colorChoice0};
          }
          .selection-backing:nth-child(2) > div {
            background-color: ${colorChoice1};
          }
          .selection-backing:nth-child(3) > div {
            background-color: ${colorChoice2};
          }
          .selection-backing:last-child > div {
            background-color: ${colorChoice3};
            margin-right: 0;
          }
          .selected {
            border-color: white;
            border-width: 2px;            
          }
          .slider-row {
            align-items: center;    
            height: var(--micro-card-height);        
          }        
          .special-area {
            width: calc(100% - 1px);
            box-sizing: border-box;            
            padding: calc(var(--mini-card-height) / 12);
            margin-bottom: 0;
            margin-bottom: calc(var(--mini-card-height) / 12);
          }
          .special-area > div {
            box-sizing: border-box;   
            margin: 0;
            padding: 0;
          }
          .special-area > .slider-row {
            height: auto;
          }
          .special-area > div:first-child {
            margin-bottom: calc(${rowHeight} * 0.1); 
          }           
        `}</style>
        {this.props.readyToShow &&
          <div id={`${this.props.id}-options-page-area`} className={`option-page-area ${currentPage}`}>
            <div id={`${this.props.id}-options-page-0`} className={`option-page`}>
              <div className='option-row inner-red-panel'>
                <div className='option-label'>Quick Turns</div>
                <OptionSwitch home={this.props.id} type={'quick-turns'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.quickTurns} clickFunction={this.props.clickFunction} />
              </div>
              <div className='option-row inner-red-panel'>
                <div className='option-label'>Auto Stand at 20</div>
                <OptionSwitch home={this.props.id} type={'auto-stand'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.autoStand} clickFunction={this.props.clickFunction} />
              </div>
              <div className='option-row inner-red-panel'>
                <div className='option-label'>Auto End at Bust</div>
                <OptionSwitch home={this.props.id} type={'auto-end'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.autoEnd} clickFunction={this.props.clickFunction} />
              </div>
              <div className='option-row inner-red-panel'>
                <div className='option-label'>Other Option</div>
                <OptionSwitch home={this.props.id} type={null} onClick={this.props.onToggleOption} toggled={null} clickFunction={this.props.clickFunction} />
              </div>
              <div className='option-row inner-red-panel'>
                <div className='option-label'>Another Option</div>
                <OptionSwitch home={this.props.id} type={null} onClick={this.props.onToggleOption} toggled={null} clickFunction={this.props.clickFunction} />
              </div>
              {/* <div className='option-row inner-red-panel'>
                <div className='option-label'>Yet Another Option</div>
                <OptionSwitch home={this.props.id} type={null} onClick={this.props.onToggleOption} toggled={null} clickFunction={this.props.clickFunction} />
              </div> */}
            </div>
            <div id={`${this.props.id}-options-page-1`} className={`option-page`}>
              <div className='option-row inner-red-panel'>
                <div className='option-label'>Full Screen</div>
                <OptionSwitch home={this.props.id} type={'full-screen'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.fullScreen} clickFunction={this.props.clickFunction} />
              </div>
              {/* <div className='option-row inner-red-panel'>
                <div className='option-label'>Header</div>
                <OptionSwitch home={this.props.id} type={'header-visible'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.headerVisible} clickFunction={this.props.clickFunction} />
              </div> */}
              <div className='option-row inner-red-panel'>
                <div className='option-label'>Starfield</div>
                <OptionSwitch home={this.props.id} type={'starfield'} onClick={this.props.onToggleOption} toggled={!this.props.currentOptions.solidBackground} clickFunction={this.props.clickFunction} />
              </div>
            {/* <div className='double-row'>
              <div className='option-column inner-red-panel'>
                <div className='option-label'>Starfield</div>
                <OptionSwitch home={this.props.id} type={'starfield'} onClick={this.props.onToggleOption} toggled={!this.props.currentOptions.solidBackground} clickFunction={this.props.clickFunction} />
              </div>
              <div className='option-column inner-red-panel'>
                <div className='option-label'>Animations</div>
                <OptionSwitch home={this.props.id} type={'animations'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.animations} clickFunction={this.props.clickFunction} />
              </div>
            </div> */}
            <div className='color-controls-tab-area'>
              <div id={`background-color-control`}  {...{ [this.props.clickFunction]: this.handleClickColorControlTab }} className={`color-controls-tab inner-red-panel ${this.state.editingElementColor === 'background' && 'selected-color-control'}`}>{this.props.id === 'options-screen' ? 'Background' : 'BG'}</div>
              <div id={`panel-control`} {...{ [this.props.clickFunction]: this.handleClickColorControlTab }} className={`color-controls-tab inner-red-panel ${this.state.editingElementColor === 'panel' && 'selected-color-control'}`}>Menus</div>
            </div>
              {this.state.editingElementColor === 'background' ?
                <div id={`${this.props.id}-hue-color-controls`} className='color-controls inner-red-panel'>
                  <div>
                    <HuePicker
                      id={'background-hue-control'}
                      pointer={SliderKnob}
                      width={'100%'}
                      height={'calc(var(--micro-card-width) * 0.45)'}
                      color={this.props.currentOptions.backgroundColor || '#fff'}
                      onChangeComplete={this.onChangeBackgroundColor}
                    />
                  </div>
                  <div>
                    <Slider type='bg-alpha-control'
                      id='bg-alpha-slider'
                      steps={100}
                      showing={true}
                      bgColor={fullAlphaBg}
                      value={getColorValues(this.props.currentOptions.backgroundColor).a}
                      home={this.props.id}
                      changeSliderValue={this.handleSliderChange} />
                  </div>
                </div>
                :
                <div id={`${this.props.id}-panel-color-controls`} className='color-controls inner-red-panel'>
                  <div>
                    <HuePicker
                      id={'panel-hue-control'}
                      pointer={SliderKnob}
                      width={'100%'}
                      height={'calc(var(--micro-card-width) * 0.45)'}
                      color={this.props.currentOptions.panelColor || '#fff'}
                      onChangeComplete={this.onChangeBackgroundColor}
                    />
                  </div>
                  <div>
                    <Slider type='panel-alpha-control'
                      id='panel-alpha-slider'
                      steps={100}
                      showing={true}
                      bgColor={fullAlphaPanel}
                      value={this.state.panelShadeLevelSelected}
                      home={this.props.id}
                      changeSliderValue={this.handleSliderChange} />
                  </div>
                </div>
              }
              <div className='option-row button-row'>
                <div className='option-label'>Bottom Panel Size</div>
                <ButtonRange home={this.props.id}
                  type={'panel-size'} labels={['SM', 'MED', 'LG']}
                  onClickRangeButton={this.handleSliderChange}
                  toggledButton={this.props.currentOptions.panelSize / 0.5}
                  clickFunction={this.props.clickFunction}
                />
              </div>
            </div>

            <div id={`${this.props.id}-options-page-2`} className={`option-page`}>
              <div className='special-area inner-red-panel'>
                <div className='option-row slider-row'>
                  <div className='option-label'>Sound FX</div>
                  <OptionSwitch home={this.props.id} type={'sound-fx'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.sound} clickFunction={this.props.clickFunction} />
                </div>
                <div id='sound-slider-area' className='option-row slider-row'>
                  <Slider type='sound-volume' id='sound-volume-slider' steps={100} showing={true} value={this.props.currentOptions.soundVolume} home={this.props.id} height={rowHeight + 'px'} changeSliderValue={this.handleSliderChange} />
                </div>
              </div>
              <div className='special-area inner-red-panel'>
                <div className='option-row slider-row'>
                  <div className='option-label'>Ambience</div>
                  <OptionSwitch home={this.props.id} type={'ambience'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.ambience} clickFunction={this.props.clickFunction} />
                </div>
                <div id='ambience-slider-area' className='option-row slider-row'>
                  <Slider type='ambience-volume' id='ambience-volume-slider' steps={100} showing={true} value={this.props.currentOptions.ambienceVolume} home={this.props.id} height={rowHeight + 'px'} changeSliderValue={this.handleSliderChange} />
                </div>
              </div>
              <div className='special-area inner-red-panel'>
                <div className='option-row slider-row'>
                  <div className='option-label'>Music</div>
                  <OptionSwitch home={this.props.id} type={'music'} onClick={this.props.onToggleOption} toggled={this.props.currentOptions.music} clickFunction={this.props.clickFunction} />
                </div>
                <div id='music-slider-area' className='option-row slider-row'>
                  <Slider type='music-volume' id='music-volume-slider' steps={100} showing={true} value={this.props.currentOptions.musicVolume} home={this.props.id} height={rowHeight + 'px'} changeSliderValue={this.handleSliderChange} />
                </div>
              </div>
            </div>

          </div>
        }
        {this.state.totalPages > 1 &&
          <div className='more-panel'>
          <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='game-options' id={`${this.props.id}-game-option-tab-button`} className={`option-tab-button ${this.state.pageShowing === 0 && 'selected-tab'}`}>
              <i className='material-icons'>settings</i>
              <div className='tab-button-label'>General</div>
            </button>
            <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='video-options' id={`${this.props.id}-video-option-tab-button`} className={`option-tab-button ${this.state.pageShowing === 1 && 'selected-tab'}`}>
              <i className='material-icons'>personal_video</i>
              <div className='tab-button-label'>Display</div>
            </button>
            <button {...{ [this.props.clickFunction]: this.handleClickOptionTab }} name='sound-options' id={`${this.props.id}-sound-option-tab-button`} className={`option-tab-button ${this.state.pageShowing === 2 && 'selected-tab'}`}>
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
  readyToShow: PropTypes.bool,
  currentOptions: PropTypes.object,
  onToggleOption: PropTypes.func,
  onChangeBackgroundColor: PropTypes.func,
  onChangePanelColor: PropTypes.func,
  changeSliderValue: PropTypes.func,
  clickFunction: PropTypes.string,
};

export default OptionsPanel;
