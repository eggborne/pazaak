import React from 'react';
import PropTypes from 'prop-types';
import OpponentPanel from './OpponentPanel';

class OpponentSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOpponent: 0,
      lastSelectedOpponent: 0,
      lastChanged: 0
    };
  }
  componentDidMount() {
    document.getElementById('prev-opponent-button').addEventListener('touchstart', () => {
      document.getElementById('prev-opponent-button').style.backgroundColor = '#080808';
      document.getElementById('prev-opponent-button').style.transform = 'scale(0.9)';
    }, true);
    document.getElementById('prev-opponent-button').addEventListener('touchend', () => {
      document.getElementById('prev-opponent-button').style.backgroundColor =
        'var(--button-bg-color)';
      document.getElementById('prev-opponent-button').style.transform = 'scale(1)';
    }, true);
    document.getElementById('next-opponent-button').addEventListener('touchstart', () => {
      document.getElementById('next-opponent-button').style.backgroundColor = '#080808';
      document.getElementById('next-opponent-button').style.transform = 'scale(0.9)';
    }, true);
    document.getElementById('next-opponent-button').addEventListener('touchend', () => {
      document.getElementById('next-opponent-button').style.backgroundColor = 'var(--button-bg-color)';
      document.getElementById('next-opponent-button').style.transform = 'scale(1)';
    }, true);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent') {
      if (this.props.phase == 'selectingMode') {
        this.state.selectedOpponent = 0;
      }
      requestAnimationFrame(() => {
        document.getElementById('opponent-select-screen').style.transform = 'none';
      });
    }
    if (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent') {
      // document.getElementById('opponent-select-screen').style.transform = 'translateY(calc(var(--shift-distance)/2))';
      document.getElementById('opponent-select-screen').style.transform = 'scale(0.95)';
      if (nextProps.phase != 'selectingDeck') {
        this.state.selectedOpponent = 0;
      }
    }
    
    return (
      (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent') ||
      (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent') ||
      this.state.selectedOpponent != nextState.selectedOpponent
    );
  }
  onClickPrev = () => {
    if (this.state.selectedOpponent > 0 && Date.now() - this.state.lastChanged > 210) {
      document.getElementById( `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.opacity = 0;
      document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.transform = `scale(0.85)`;
      this.setState({
        lastChanged: Date.now()
      });
      setTimeout(() => {
        this.setState(
          {
            selectedOpponent: this.state.selectedOpponent - 1,
            lastSelectedOpponent: this.state.selectedOpponent,            
          },
          () => {
            this.props.onClickPanel(this.props.characterArray[this.state.selectedOpponent].name);
            document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).classList.add('flickering');
          }
        );
      }, 210);
    }
  };
  onClickNext = () => {
    if (this.state.selectedOpponent < 15 && Date.now() - this.state.lastChanged > 210) {
      document.getElementById( `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.opacity = 0;
      document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.transform = `scale(0.85)`;
      this.setState({
        lastChanged: Date.now()
      });
      setTimeout(() => {
        this.setState(
          {
            selectedOpponent: this.state.selectedOpponent + 1,
            lastSelectedOpponent: this.state.selectedOpponent
          },
          () => {
            this.props.onClickPanel(this.props.characterArray[this.state.selectedOpponent].name);
            document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).classList.add('flickering');
          }
        );
      }, 210);
    }
  };

  render() {
    console.big('OpponentSelectScreen rendering');
    let opponentIndex = this.state.selectedOpponent;
    let opponentList = this.props.characterArray;
    let opponentArray = [];
    for (var i = 0; i < 16; i++) {
      let character = opponentList[i];
      let available = this.props.userCredits >= character.prize.credits;
      let slideAmount = this.state.selectedOpponent > this.state.lastSelectedOpponent ? 50 : -50;
      opponentArray.push(
        <OpponentPanel
          key={i}
          selected={this.state.selectedOpponent === i}
          defeated={this.props.userDefeated.indexOf(character.name) > -1}
          available={available}
          slideAmount={slideAmount}
          portraitSource={this.props.portraitSources.opponent}
          index={i}
          character={character}
          clickFunction={this.props.clickFunction}
        />
      );
    }
    let selectedAvailable = this.props.userCredits >= opponentList[this.state.selectedOpponent].prize.credits;
    if (document.getElementById('opponent-ready-button')) {
      if (!selectedAvailable) {
        document.getElementById('opponent-ready-button').classList.add('disabled-button');
      } else {
        document.getElementById('opponent-ready-button').classList.remove('disabled-button');
      }
    }
    return (
      <div
        id='opponent-select-screen'
        className={this.props.phase === 'selectingOpponent' || 'obscured'}
      >
        <style jsx>{`
          #opponent-select-screen {
            font-size: 1.25rem;
            font-family: var(--main-font);
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            //transform: translateY(calc(var(--shift-distance) / 4));
            transform: scale(0.95);
            transition: transform 300ms ease, opacity 300ms ease;
          }
          #opponent-select-title {
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          #opponent-select-area {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          #featured-opponent-area {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          #opponent-select-button-area {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .opponent-change-button {
            height: var(--normal-card-width);
            padding-left: calc(var(--menu-border-width) * 2);
            padding-right: calc(var(--menu-border-width) * 2);
            transition: all 150ms ease;
          }
          #prev-opponent-button {
            opacity: ${this.state.selectedOpponent > 0 || '0.25'};
            pointer-events: ${this.state.selectedOpponent > 0 || 'none'};
          }
          #next-opponent-button {
            opacity: ${this.state.selectedOpponent < 15 || '0.25'};
            pointer-events: ${this.state.selectedOpponent < 15 ||
              'none'};
          }
          #index-display {
            font-family: var(--main-font);
            font-size: var(--small-font-size);
            width: 100%;
            margin-top: calc(var(--menu-border-width) * 2);
            margin-bottom: calc(var(--menu-border-width) * 2);
            text-align: center;
          }
          .obscured {
            max-height: 0;
            pointer-events: none;
            bottom: 0;
            display: none !important;
          }
        `}</style>
        <div className='pre-header' id='opponent-select-title'>
          <div className='shadowed-text'>Choose Your Opponent</div>
        </div>
        <div id='opponent-select-area' className='shadowed-text'>
          <div id='featured-opponent-area'>{opponentArray}</div>
          <div id='index-display'>{this.state.selectedOpponent + 1} / ???</div>
          <div id='opponent-select-button-area'>
            <button
              {...{ [this.props.clickFunction]: this.onClickPrev }}
              id='prev-opponent-button'
              className={`opponent-change-button`}
            >
              {'< Prev'}
            </button>
            <button
              {...{ [this.props.clickFunction]: this.onClickNext }}
              id='next-opponent-button'
              className={`opponent-change-button`}
            >
              {'Next >'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

OpponentSelectScreen.propTypes = {
  phase: PropTypes.string,
  userCredits: PropTypes.number,
  userDefeated: PropTypes.array,
  readyToList: PropTypes.bool,
  listRange: PropTypes.object,
  portraitSources: PropTypes.object,
  characters: PropTypes.object,
  characterArray: PropTypes.array,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

export default OpponentSelectScreen;
