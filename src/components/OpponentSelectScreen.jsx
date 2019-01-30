
import React from 'react';
import PropTypes from 'prop-types';
import OpponentPanel from './OpponentPanel';

class OpponentSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRange: props.listRange
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('now', this.props);
    console.log('nextProps', nextProps);
    if (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent') {
      requestAnimationFrame(() => { 
        document.getElementById('opponent-select-screen').style.opacity = '1';
        document.getElementById('opponent-select-screen').style.transform = 'none';
      }); 
    }
    if (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent') {
      document.getElementById('opponent-select-screen').style.opacity = '0';
      document.getElementById('opponent-select-screen').style.transform = 'scale(1.05)';
    }
    return (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent')
      || (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent')
      || (this.props.opponentSelected != nextProps.phase.opponentSelected);
  }

  render() {    
    console.error('----------------- OpponentSelectScreen rendering', this.props);
    
    let opponentList = this.props.characterArray;
    // let opponentList = this.props.characterArray.slice(0,2);  

    let cpuOpponent = this.props.opponentSelected;

    let listBegin = this.state.listRange.begin;
    let listEnd = this.state.listRange.end;
    let opponentArray = [];
    for (var i = listBegin; i < listEnd; i++) {
      let character = opponentList[i];
      opponentArray.push(
        <OpponentPanel key={i}
          selected={cpuOpponent === character.name}
          portraitSource={this.props.portraitSources.opponent}
          index={i}
          character={this.props.characters[character.name]}
          onClickPanel={this.props.onClickPanel}
          clickFunction={this.props.clickFunction}
        />
      );
    }
    console.error('converted cpuOpponent', cpuOpponent);
    return (
      <div id='opponent-select-screen' className={this.props.phase === 'selectingOpponent' || 'obscured'}>
        <style jsx>{`
        #opponent-select-screen {
          font-size: 1.25rem;
          font-family: var(--main-font);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;         
          flex-grow: 1;

          opacity: 0;
          transform: scale(1.1);
          transition: transform 300ms ease, opacity 300ms ease;
        }
        #opponent-select-title {
          box-sizing: border-box;
          align-items: center;
          justify-content: center;
          width: 100vh;
          border-bottom: 1px solid black;
        }
        #opponent-select-area {
          overflow-y: scroll;
        }
        .opponent-type-label {
          font-size: 1em;
          line-height: 100%;
          width: 100%;
          height: 1rem;
          text-align: center;
        }
        .pre-footer {
          border-top: 1px solid black;
          box-sizing: border-box;
        }
        #opponent-ready-button {
          min-width: 8rem;
        }
        #nobody-here-message {
          width: 100%;
          text-align: center;
          margin-top: 1rem;
          margin-bottom: 1rem;
          color: #333;
          text-shadow: none;
        }
        .obscured {
          max-height: 0;
          pointer-events: none;
        }
      `}</style>
        <div className='pre-header' id='opponent-select-title'>
          <div className='shadowed-text'>Choose Your Opponent</div>
        </div>
        {true &&
          <div id='opponent-select-area' className='shadowed-text'>
            {opponentArray}
          </div>
        }
        <div className='pre-footer' id='opponent-select-footer'>
          <button id='opponent-select-back-button' {...{ [this.props.clickFunction]: (event) => this.props.onClickBack(event, 'selectingMode') }} className='footer-back-button shadowed-text'>{'<'}</button>
          <button {...{ [this.props.clickFunction]: this.props.onClickOpponentReady }} className='ready-button' id='opponent-ready-button'>OK</button>
        </div>
      </div>
    );
  }
}

OpponentSelectScreen.propTypes = {
  phase: PropTypes.string,
  readyToList: PropTypes.bool,
  listRange: PropTypes.object,
  portraitSources: PropTypes.object,
  characters: PropTypes.object,
  characterArray: PropTypes.array,
  opponentSelected: PropTypes.string,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

export default OpponentSelectScreen;




















