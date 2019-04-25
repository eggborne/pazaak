import React from 'react';
import PropTypes from 'prop-types';
import OpponentPanel from './OpponentPanel';

class OpponentSelectScreen extends React.Component {
  constructor(props) {
    console.big('const')
    super(props);
    this.state = {
      selectedOpponent: 0,
      lastSelectedOpponent: 0,
      lastChanged: 0,
      showDefeated: true
    };
  }
  componentDidMount() {
    document.getElementById('prev-opponent-button').addEventListener('touchstart', () => {
      document.getElementById('prev-opponent-button').style.backgroundColor = '#080808';
      document.getElementById('prev-opponent-button').style.transform = 'scale(0.95)';
    }, true);
    document.getElementById('prev-opponent-button').addEventListener('touchend', () => {
      document.getElementById('prev-opponent-button').style.backgroundColor =
        'var(--button-bg-color)';
      document.getElementById('prev-opponent-button').style.transform = 'scale(1)';
    }, true);
    document.getElementById('next-opponent-button').addEventListener('touchstart', () => {
      document.getElementById('next-opponent-button').style.backgroundColor = '#080808';
      document.getElementById('next-opponent-button').style.transform = 'scale(0.95)';
    }, true);
    document.getElementById('next-opponent-button').addEventListener('touchend', () => {
      document.getElementById('next-opponent-button').style.backgroundColor = 'var(--button-bg-color)';
      document.getElementById('next-opponent-button').style.transform = 'scale(1)';
    }, true);
  }
  shouldComponentUpdate(prevProps, nextState) {
    if (this.props.phase != 'selectingOpponent' && prevProps.phase == 'selectingOpponent') {
      requestAnimationFrame(() => {
        document.getElementById('opponent-select-screen').style.transform = 'none';
      });
    }
    if (this.props.phase == 'selectingOpponent' && prevProps.phase != 'selectingOpponent') {
      document.getElementById('opponent-select-screen').style.transform = 'scale(0.95)';
    }
    return (
      (this.props.phase != 'selectingOpponent' && prevProps.phase == 'selectingOpponent') ||
      (this.props.phase == 'selectingOpponent' && prevProps.phase != 'selectingOpponent') ||
      this.props.userDefeated.length != prevProps.userDefeated.length ||
      this.props.userCredits != prevProps.userCredits ||
      this.state.selectedOpponent != nextState.selectedOpponent ||
      this.state.showDefeated != nextState.showDefeated ||
      prevProps.currentWager != this.props.currentWager
    );
  }
  onClickPrev = () => {
    if (this.state.selectedOpponent > 0 && Date.now() - this.state.lastChanged > 210) {
      let prevIndex = this.state.selectedOpponent - 1;
      document.getElementById( `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.opacity = 0;
      document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.transform = `scale(0.95)`;
      this.setState({
        lastChanged: Date.now()
      });
      setTimeout(() => {
        this.setState(
          {
            selectedOpponent: prevIndex,
            lastSelectedOpponent: this.state.selectedOpponent,            
          },
          () => {
            this.props.onClickPanel(this.props.characterArray[this.state.selectedOpponent].name);
            document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).classList.add('flickering');
          }
        );
      }, 105);
    }
  };
  onClickNext = () => {
    if (this.state.selectedOpponent < 15 && Date.now() - this.state.lastChanged > 210) {
      let nextIndex = this.state.selectedOpponent + 1;
      document.getElementById( `${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.opacity = 0;
      document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).style.transform = `scale(0.95)`;
      this.setState({
        lastChanged: Date.now()
      });
      setTimeout(() => {
        this.setState(
          {
            selectedOpponent: nextIndex,
            lastSelectedOpponent: this.state.selectedOpponent
          },
          () => {
            this.props.onClickPanel(this.props.characterArray[this.state.selectedOpponent].name);
            document.getElementById(`${this.props.characterArray[this.state.selectedOpponent].name}-panel`).classList.add('flickering');
          }
        );
      }, 105);
    }
  };
  onToggleDefeated = () => {
    let lowestUndefeated = 0;
    let newOpponentName;
    [...this.props.userDefeated].map(defeatedOpponentName => {
      let rank = 0;      
      this.props.characterArray.map((charObj, r, arr) => {
        if (charObj.name === defeatedOpponentName) {
          rank = r;
        }
      })
      if (rank > lowestUndefeated) {
        lowestUndefeated = rank;
        newOpponentName = defeatedOpponentName;
      }
    });
    if (lowestUndefeated < this.state.selectedOpponent) {
      lowestUndefeated = this.state.selectedOpponent-1;
    }
    let newSelectedOpponent = this.state.selectedOpponent;
    if (this.props.userDefeated.indexOf(newOpponentName) > -1) {
      newSelectedOpponent = lowestUndefeated + 1;
    }
    this.setState({
      showDefeated: !this.state.showDefeated,
      selectedOpponent: newSelectedOpponent,
    }, () => {
       this.props.onClickPanel(this.props.characterArray[this.state.selectedOpponent].name);
    });
  }

  render() {
    console.big('OpponentSelectScreen rendering');
    let opponentIndex = this.state.selectedOpponent;
    let opponentList = this.props.characterArray.slice(0, 16);
    let opponentArray = [];
    let opponentListIndexes = [];
    let actualList = [...opponentList];
    let numberDefeated = [...this.props.userDefeated].filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    }).length;
    console.orange('numdef', numberDefeated)
    for (var i = 0; i < 16; i++) {
      let character = opponentList[i];
      let available = this.props.userCredits >= character.prize.credits;
      let slideAmount = opponentIndex > this.state.lastSelectedOpponent ? 50 : -50;
      let opponentDefeated = this.props.userDefeated.indexOf(character.name) > -1;
      if ((this.state.showDefeated || numberDefeated === 16)|| (!this.state.showDefeated && !opponentDefeated)) {
        opponentArray.push(
          <OpponentPanel
            key={i}
            selected={opponentIndex === i}
            defeated={opponentDefeated}
            available={available}
            slideAmount={slideAmount}
            portraitSource={this.props.portraitSources.opponent}
            index={i}
            character={character}
            onClickWagerMore={this.props.onClickWagerMore}
            currentWager={this.props.currentWager}
            clickFunction={this.props.clickFunction}
          />
        );
        opponentListIndexes.push(i);
      } else {
        actualList.splice(i, 1)
      }
    }
    console.info('actualList', actualList)
    console.info('opponentArray', opponentArray)
    console.info('opponentListIndexes', opponentListIndexes)
    let selectedAvailable = this.props.userCredits >= opponentList[opponentIndex].prize.credits;
    setTimeout(() => {
      if (!selectedAvailable) {
        document.getElementById('opponent-ready-button').classList.add('disabled-button');
        document.getElementById('opponent-ready-button').classList.remove('throbbing');
      } else if (document.getElementById('opponent-ready-button')) {
        document.getElementById('opponent-ready-button').classList.remove('disabled-button');
        document.getElementById('opponent-ready-button').classList.add('throbbing');
      }
    });
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
            transform: scale(0.95);
            transition: transform 300ms ease, opacity 300ms ease;
          }
          #opponent-select-title {
            font-size: var(--med-large-font-size);
            box-sizing: border-box;
            text-align: center;
            padding-top: 2vh;
            max-height: none;
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
            transition: all 150ms ease;
          }
          #prev-opponent-button {
            opacity: ${(opponentIndex > 0 && opponentListIndexes.indexOf(opponentIndex - 1) > -1) || '0.25'};
            pointer-events: ${(opponentIndex > 0 && opponentListIndexes.indexOf(opponentIndex - 1) > -1) || 'none'};
          }
          #next-opponent-button {
            opacity: ${(opponentIndex < 15 && opponentListIndexes.indexOf(opponentIndex + 1) > -1) || '0.25'};
            pointer-events: ${(opponentIndex < 15 && opponentListIndexes.indexOf(opponentIndex + 1) > -1) || 'none'};
          }
          #show-defeated-toggle {
            display: flex;
            justify-content: space-between;
            width: 34vw;
            text-align: center;
            background-color: var(--button-bg-color);
            border-radius: var(--menu-border-radius);
            padding: 2vw;
            padding-left: 3vw;
            padding-right: 3vw;
            font-size: 3.5vw;
            color: #ddd;
            align-self: center;
            margin-bottom: 2vh;
            border: calc(var(--menu-border-width) / 2) solid var(--button-border-color);
          }
          #defeated {
            color: ${this.state.showDefeated ? '#ddd' : 'red'}
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
        <div className='pre-header shadowed-text' id='opponent-select-title'>
          Choose Opponent
        </div>
        
        <div id='opponent-select-area' className='shadowed-text'>
          {numberDefeated < 16 &&
            <div id='show-defeated-toggle' onClick={this.onToggleDefeated}>
              Show defeated: <span id='defeated'>{this.state.showDefeated ? 'ON' : 'OFF'}</span>
            </div>
          }
          <div id='featured-opponent-area'>{opponentArray}</div>
          <div id='index-display'>{opponentIndex + 1} / ???</div>
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
  currentWager: PropTypes.number,
  listRange: PropTypes.object,
  portraitSources: PropTypes.object,
  characters: PropTypes.object,
  characterArray: PropTypes.array,
  onClickWagerMore: PropTypes.func,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

export default OpponentSelectScreen;
