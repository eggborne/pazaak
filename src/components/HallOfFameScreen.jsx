import React from 'react';
import PropTypes from 'prop-types';
import HallOfFameEntry from './HallOfFameEntry';

class HallOfFameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRange: {
        min: 0,
        max: 16
      },
      recordList: this.props.highScores,
      lastCheckedScroll: 0
    };
  }

  componentDidMount() {
    let newRecordList = this.props.highScores;
    console.info('HOFS got', newRecordList)
    // newRecordList = newRecordList.filter(record => record.playerName.slice(0, 5) !== 'Guest' && record.setWins >= 0);
    // newRecordList = newRecordList.slice(this.state.listRange.min, this.state.listRange.max);
    this.setState({
      recordList: newRecordList
    });
    setTimeout(() => {
      console.green('HallOfFameScreen timeout 1 ------------------')
      let newRange = { ...this.state.listRange };
      newRange.max = 6;
      this.setState({
        listRange: newRange
      })
    },500);
    setTimeout(() => {
      console.green('HallOfFameScreen timeout 2 ------------------')

      let newRange = { ...this.state.listRange };
      newRange.max = 13;
      this.setState({
        listRange: newRange
      })
    },1000);
    setTimeout(() => {
      console.green('HallOfFameScreen timeout 3 ------------------')
      let newRange = { ...this.state.listRange };
      newRange.max = 43;
      this.setState({
        listRange: newRange
      })
    },2000);
    setTimeout(() => {
      console.green('HallOfFameScreen timeout 4 ------------------')
      let newRange = { ...this.state.listRange };
      newRange.max = 55;
      this.setState({
        listRange: newRange
      })
    },3000);
  }
  componentDidUpdate() {
    let newRecordList = this.props.highScores;
    // newRecordList = newRecordList.filter(record => record.playerName.slice(0, 5) !== 'Guest' && record.setWins >= 0);
    // newRecordList = newRecordList.slice(this.state.listRange.min, this.state.listRange.max);
    this.setState({
      recordList: newRecordList
    });
  }
  shouldComponentUpdate(prevProps, nextState) {
    return (prevProps.phase != 'showingHallOfFame' && this.props.phase == 'showingHallOfFame') || prevProps.readyToList !== this.props.readyToList || this.state.listRange.max != nextState.listRange.max;
  }
  render() {
    console.info('HallOfFameScreen rendering', this.state.recordList);
    let timeNow = Math.round(parseInt(Date.now()) / 1000).toString();
    let scoresExist = this.props.highScores.length ? true : false;
    let portraitSize = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--normal-card-height'));
    return (
      <div id='hall-of-fame-screen' className={this.props.phase === 'showingHallOfFame' || 'obscured'}>
        <style jsx>{`
          #hall-of-fame-screen {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-y: scroll;
            flex-grow: 1;
            /* for Firefox! */
            min-height: 0;
          }
          #high-score-title {
            font-size: var(--med-large-font-size);
            min-height: calc(var(--header-height) * 1.5);
          }
          #high-score-area {
            display: flex;
            flex-direction: column;
            font-family: var(--main-font);
            font-size: 1rem;
          }
          #high-scores-list {
            overflow-y: scroll;
            min-height: 0;
            display: grid;
            grid-template-rows: auto;
            justify-items: center;
            grid-row-gap: 1rem;
            padding: calc(var(--micro-card-width) / 2);
          }
          #empty-list-message {
            box-sizing: border-box;
            padding: 2rem;
            font-size: 1.5rem;
            text-align: center;
          }
          .obscured {
            display: none !important;
            height: 0 !important;
            pointer-events: none;
          }
        `}</style>
        <div id='high-score-title' className='options-instructions-title shadowed-text'>
          Hall of Fame
        </div>
        <div id='high-scores-list' className='shadowed-text'>
          {this.props.readyToList &&
            scoresExist &&
            this.state.recordList.map((entry, i) => {
              return <HallOfFameEntry key={entry.id} now={timeNow} entry={entry} hidden={entry.offScreen} portraitSize={portraitSize} loggedInAs={this.props.userStatus.loggedInAs} />;
            })}
          {!scoresExist && <div id='empty-list-message'>updating records...</div>}
        </div>
      </div>
    );
  }
}

HallOfFameScreen.propTypes = {
  phase: PropTypes.string,
  readyToList: PropTypes.bool,
  highScores: PropTypes.array,
  userStatus: PropTypes.object,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

export default HallOfFameScreen;
