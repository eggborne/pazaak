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
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent') {
      requestAnimationFrame(() => {
        document.getElementById('opponent-select-screen').style.transform = 'none';
      });
    }
    if (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent') {
      document.getElementById('opponent-select-screen').style.transform = 'scale(0.95)';
    }
    return (
      (this.props.phase != 'selectingOpponent' && nextProps.phase == 'selectingOpponent') ||
      (this.props.phase == 'selectingOpponent' && nextProps.phase != 'selectingOpponent') ||
      this.state.selectedOpponent != nextState.selectedOpponent ||
      this.state.showDefeated != nextState.showDefeated
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
    console.log('toggling defeaeted', this.state.selectedOpponent);
    let lowestUndefeated = 0;
    let newOpponentName;
    [...this.props.userDefeated].map(defeatedOpponentName => {
      console.log('chararr', this.props.characterArray);
      let rank = 0;      
      this.props.characterArray.map((charObj, r, arr) => {
        if (charObj.name === defeatedOpponentName) {
          rank = r;
        }
      })
      console.log(defeatedOpponentName, 'ranks', rank);
      if (rank > lowestUndefeated) {
        lowestUndefeated = rank;
        newOpponentName = defeatedOpponentName;
      }
    });
    if (lowestUndefeated < this.state.selectedOpponent) {
      lowestUndefeated = this.state.selectedOpponent-1;
    }
    let newSelectedOpponent = this.state.selectedOpponent;

    console.info('lowestUndefeated', lowestUndefeated)
    console.info('this.props.userDefeated', this.props.userDefeated)
    console.info('newOpponentName', newOpponentName)
    if (this.props.userDefeated.indexOf(newOpponentName) > -1) {
      console.green(newOpponentName,'defeated')
      newSelectedOpponent = lowestUndefeated + 1;
    } else {
      console.pink(newOpponentName,' ---- NOT defeated')
    }
    console.orange('newSelectedOpponent ' + newSelectedOpponent);

    this.setState({
      showDefeated: !this.state.showDefeated,
      selectedOpponent: newSelectedOpponent
    });
  }

  render() {
    console.big('OpponentSelectScreen rendering');
    let opponentIndex = this.state.selectedOpponent;
    let opponentList = this.props.characterArray.slice(0, 16);
    let opponentArray = [];
    let opponentListIndexes = [];
    let actualList = [...opponentList];
    for (var i = 0; i < 16; i++) {
      let character = opponentList[i];
      let available = this.props.userCredits >= character.prize.credits;
      let slideAmount = this.state.selectedOpponent > this.state.lastSelectedOpponent ? 50 : -50;
      let opponentDefeated = this.props.userDefeated.indexOf(character.name) > -1;
      if (this.state.showDefeated || (!this.state.showDefeated && !opponentDefeated)) {
        opponentArray.push(
          <OpponentPanel
            key={i}
            selected={this.state.selectedOpponent === i}
            defeated={opponentDefeated}
            available={available}
            slideAmount={slideAmount}
            portraitSource={this.props.portraitSources.opponent}
            index={i}
            character={character}
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
    let selectedAvailable = this.props.userCredits >= opponentList[this.state.selectedOpponent].prize.credits;
    setTimeout(() => {
      if (!selectedAvailable) {
        document.getElementById('opponent-ready-button').classList.add('disabled-button');
      } else {
        document.getElementById('opponent-ready-button').classList.remove('disabled-button');
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
            opacity: ${(this.state.selectedOpponent > 0 && opponentListIndexes.indexOf(this.state.selectedOpponent - 1) > -1) || '0.25'};
            pointer-events: ${(this.state.selectedOpponent > 0 && opponentListIndexes.indexOf(this.state.selectedOpponent - 1) > -1) || 'none'};
          }
          #next-opponent-button {
            opacity: ${(this.state.selectedOpponent < 15 && opponentListIndexes.indexOf(this.state.selectedOpponent + 1) > -1) || '0.25'};
            pointer-events: ${(this.state.selectedOpponent < 15 && opponentListIndexes.indexOf(this.state.selectedOpponent + 1) > -1) || 'none'};
          }
          #show-defeated-toggle {
            display: flex;
            justify-content: space-between;
            width: 34vw;
            text-align: center;
            background-color: var(--button-bg-color);
            border-radius: var(--menu-border-radius);
            padding: 3vw;
            padding-left: 3vw;
            padding-right: 3vw;
            font-size: 3.5vw;
            color: #ddd;
            align-self: center;
            margin-bottom: 2vh;
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
          Choose Your Opponent
        </div>
        
        <div id='opponent-select-area' className='shadowed-text'>
        <div id='show-defeated-toggle' onClick={this.onToggleDefeated}>
          Show defeated: <span id='defeated'>{this.state.showDefeated ? 'ON' : 'OFF'}</span>
        </div>
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
