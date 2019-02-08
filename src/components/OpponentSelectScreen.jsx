import React from 'react';
import PropTypes from 'prop-types';
import OpponentPanel from './OpponentPanel';

class OpponentSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOpponent: 0,
      lastSelectedOpponent: 0
    };
  }

  componentDidMount() {
    document.getElementById('prev-opponent-button').addEventListener('touchstart', () => {
      document.getElementById('prev-opponent-button').style.backgroundColor = '#080808';
      document.getElementById('prev-opponent-button').style.transform = 'scale(0.95)';
    });
    document.getElementById('prev-opponent-button').addEventListener('touchend', () => {
      document.getElementById('prev-opponent-button').style.backgroundColor =
        'var(--button-bg-color)';
      document.getElementById('prev-opponent-button').style.transform = 'scale(1)';
    });
    document.getElementById('next-opponent-button').addEventListener('touchstart', () => {
      document.getElementById('next-opponent-button').style.backgroundColor = '#080808';
      document.getElementById('next-opponent-button').style.transform = 'scale(0.95)';
    });
    document.getElementById('next-opponent-button').addEventListener('touchend', () => {
      document.getElementById('next-opponent-button').style.backgroundColor =
        'var(--button-bg-color)';
      document.getElementById('next-opponent-button').style.transform = 'scale(1)';
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('now', this.props);
    // console.log('nextProps', nextProps);
    if (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent') {
      requestAnimationFrame(() => {
        document.getElementById('opponent-select-screen').style.transform = 'none';
      });
    }
    if (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent') {
      document.getElementById('opponent-select-screen').style.transform =
        'translateY(calc(var(--shift-distance)/2))';
    }
    return (
      (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent') ||
      (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent') ||
      this.state.selectedOpponent != nextState.selectedOpponent
    );
  }

  onClickPrev = () => {
    if (this.state.selectedOpponent > 0) {
      document.getElementById(
        `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.opacity = 0;
      document.getElementById(
        `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.transform = `translateX(25%) scale(0.9)`;
      setTimeout(() => {
        this.setState(
          {
            selectedOpponent: this.state.selectedOpponent - 1,
            lastSelectedOpponent: this.state.selectedOpponent
          },
          () => {
            this.props.onClickPanel(this.props.characterArray[this.state.selectedOpponent].name);
          }
        );
      }, 200);
    }
  };
  onClickNext = () => {
    if (this.state.selectedOpponent < this.props.characterArray.length - 1) {
      document.getElementById(
        `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.opacity = 0;
      document.getElementById(
        `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.transform = `translateX(-25%) scale(0.9)`;
      setTimeout(() => {
        this.setState(
          {
            selectedOpponent: this.state.selectedOpponent + 1,
            lastSelectedOpponent: this.state.selectedOpponent
          },
          () => {
            this.props.onClickPanel(this.props.characterArray[this.state.selectedOpponent].name);
          }
        );
      }, 200);
    }
  };

  render() {
    console.orange('----------------- OpponentSelectScreen rendering');
    let opponentIndex = this.state.selectedOpponent;
    let opponentList = this.props.characterArray;
    let opponentArray = [];
    for (var i = 0; i < opponentList.length; i++) {
      let character = opponentList[i];
      let available = this.props.userCredits >= character.prize.credits;
      let slideAmount = this.state.selectedOpponent > this.state.lastSelectedOpponent ? 25 : -25;
      opponentArray.push(
        <OpponentPanel
          key={i}
          selected={this.state.selectedOpponent === i}
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
    // opponentArray = opponentArray.slice(this.state.listRange.min, this.state.listRange.max);
    // console.info('made array', opponentArray);
    return (
      <div
        id='opponent-select-screen'
        className={this.props.phase === 'selectingOpponent' || 'obscured'}
      >
        <style jsx>{`
          #opponent-select-screen {
            margin-top: var(--header-height);
            margin-bottom: var(--control-footer-height);
            font-size: 1.25rem;
            font-family: var(--main-font);
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            transform: translateY(calc(var(--shift-distance) / 4));
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
            flex-grow: 1;
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
          }
          #prev-opponent-button {
            opacity: ${this.state.selectedOpponent > 0 || '0.25'};
            pointer-events: ${this.state.selectedOpponent > 0 || 'none'};
          }
          #next-opponent-button {
            opacity: ${this.state.selectedOpponent < this.props.characterArray.length - 1 || '0.25'};
            pointer-events: ${this.state.selectedOpponent < this.props.characterArray.length - 1 ||
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
