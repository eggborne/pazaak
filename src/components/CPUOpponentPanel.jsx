
import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

class CPUOpponentPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      portraitSource: 'https://pazaak.online/assets/images/opponentsheet.jpg',
      portraitSize: window.innerWidth * 0.35,
      quoteTextSize: '1rem',
      nameFontSize: '1.2rem'
    };
    let quoteLength = this.props.character.quotes.panel.length;
    if (quoteLength > 28) {
      this.state.quoteTextSize = '1rem';
    }
    if (quoteLength > 50) {
      this.state.quoteTextSize = '0.85rem';
    }
  }

  render() {
    let extraClasses = ['', ''];
    if (this.props.selected) {
      extraClasses[0] = 'panel-selected';
      extraClasses[1] = 'disabled-select-button';
    }
    let skillArray = Array.apply(null, Array(10)).map(function () { });
    let source = this.state.portraitSource;
    let quoteTextSize = this.state.quoteTextSize;
    let cardHeight = this.props.cardSize.height;
    let portraitSize = this.state.portraitSize;
    let nameFontSize = this.state.nameFontSize;
    // if (this.props.character.quotes.panel.length > 64) {
    //   quoteTextSize = '0.65rem';
    // }
    return (
      <div id={`${this.props.character.name}-panel`} className={`opponent-select-entry ${extraClasses[0]}`}>
        <style jsx>{`
          .opponent-select-entry {
            box-sizing: border-box;
            position: relative;
            margin-bottom: 0.5vh;
            margin-left: 0;
            border: 1px groove #333;
            display: flex;
            //align-items: stretch;
            //justify-content: flex-end;
            border-radius: 0.5rem !important;
            background-color: var(--trans-blue-bg-color);
            transform: scale(0.96);
            transition: transform 300ms ease, background-color 50ms ease;
          }
          .left-opponent-panel {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: ${portraitSize}px auto ${portraitSize / 2}px;
            align-items: start;
            width: 37.5%;
            min-width: 120px;
            padding: 3vmin;
          }
          .opponent-quote {
            box-sizing: border-box;
            font-size: ${quoteTextSize};
            padding: 0.5rem;
            align-self: center;
            height: 80%;
            max-width: ${portraitSize}px;
            border-radius: 0.35rem;
            border: 0.35vw solid rgb(67, 78, 67);
            background: rgba(0, 0, 0, 0.1);
          }
          .opponent-select-entry:nth-child(2n) {
            background-color: var(--trans-red-bg-color);
          }
          .panel-selected {
            background-color: var(--option-on-color) !important;
            transform: scaleX(1) !important;
            border-radius: 0 !important;
          }
          .opponent-select-entry:nth-last-child(1) {
            // transform-origin: bottom;
            margin-bottom: 0;
          }
          .select-button {
            height: ${cardHeight}px;
            font-size: 1.5rem;
            height: 100%;
            transition: all 300ms ease;
          }
          .select-button::before {
            content: "Select";
          }
          .disabled-select-button::before {
            content: "Selected";
            font-size: 0.8em !important;
          }
          .disabled-select-button {
            border-color: #050 !important;
            background-color: #010 !important;
            // color: #4f4 !important;
            pointer-events: none !important;
            opacity: 0.9;
          }
          .select-button::before {
            content: "Select";
          }
          .disabled-select-button::before {
            content: "Selected";
            font-size: 0.9em;
          }
          .left-side {
            min-width: 35vw;
            font-size: 5vw;
          }
          .name-area {
            border: 1px solid black;
            border-radius: ${cardHeight * 0.1}px;
            grid-column-start: 1;
            font-size: ${nameFontSize};
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            color: yellow;
          }
        `}
        </style>
        <div className='left-opponent-panel'>
          <PlayerPortrait size={portraitSize} source={source} spriteIndex={this.props.index} displayName={''} />
          <div className='opponent-quote'>{this.props.character.quotes.panel}</div>
          <button onClick={this.props.onClickPanel} id={`${this.props.character.name}-select-button`} className={`select-button left-side ${extraClasses[1]}`}></button>
        </div>
        <div className='opponent-description'>
          <div className='opponent-stats-grid'>
            <div className='name-area'>{this.props.character.displayName}</div>
            <div className='difficulty-area'>
              <div className='skill-label'>Skill Level</div>
              <div className='difficulty-bar-body'>
                {skillArray.map((entry, i) => {
                  let barClass = 'difficulty-bar-segment segment-filled';
                  if (i >= this.props.character.skillLevel) {
                    barClass = 'difficulty-bar-segment';
                  }
                  return <div key={i * (this.props.index + 1)} className={barClass}></div>;
                })}
              </div>
            </div>
            <div className='opponent-prize-area'>
              <div className='opponent-prize-label'>
                Minimum Wager
              </div>
              <div className='opponent-prize-body'>
                <div className='opponent-prize-credits'>{this.props.character.prize.credits}</div>&nbsp;<div>credits</div>
              </div>
            </div>
            {/* <div className='opponent-prize-cards'>
              {this.props.character.prize.cards.map((card, i) => {
                if (this.props.character.name !== 'theemperor') {
                  return <Card key={i * (this.props.index + 1)} id={i} size={this.props.cardSize} value={card.value} type={card.type} onClickCard={null} />;
                } else {
                  return <CardBack key={i * (this.props.index + 1)} id={i} size={this.props.cardSize} />;
                }
              })}
            </div> */}
            <div className='opponent-strategy-area'>
              <div className='opponent-strategy-label'>Strategy</div>
              <div className='opponent-strategy-list'>
                <div key={0} className='opponent-strategy-item'><div className='bullet'>•</div>{this.props.character.strategy.stand.description}</div>
                {this.props.character.strategy.stand.description !== '???' &&
                  <div>
                    <div key={1} className='opponent-strategy-item'><div className='bullet'>•</div>{this.props.character.strategy.handCards.description}</div>
                    <div key={2} className='opponent-strategy-item'><div className='bullet'>•</div>{this.props.character.strategy.tie.description}</div>
                  </div>
                }
              </div>
            </div>
          </div>
          {/* <div className='opponent-deck-preview'>
            <div className='opponent-deck-label'>Deck</div>
            <div className='opponent-deck-cards'>
              <div className='opponent-deck-row'>
                {props.character.deck.map((card, i) => {
                  if (i < 5) {
                    if (props.character.name !== 'theemperor') {
                      return <Card key={i*(props.index+1)} id={i*(props.index+1)} size={props.cardSize} value={card.value} type={card.type} onClickCard={null} />
                    } else {
                      return <CardBack key={i*(props.index+1)} id={i*(props.index+1)} size={props.cardSize} />
                    }
                  }
                })}
              </div>
              <div className='opponent-deck-row'>
                {props.character.deck.map((card, i) => {
                  if (i >= 5) {
                    if (props.character.name !== 'theemperor') {
                      return <Card key={i*(props.index+1)} id={i*(props.index+1)} size={props.cardSize} value={card.value} type={card.type} onClickCard={null} />
                    } else {
                      return <CardBack key={i * (props.index + 1)} id={i*(props.index+1)} size={props.cardSize} />
                    }
                  }
                })}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

CPUOpponentPanel.propTypes = {
  selected: PropTypes.bool,
  cardSize: PropTypes.object,
  index: PropTypes.number,
  character: PropTypes.object,
  onClickPanel: PropTypes.func
};

export default CPUOpponentPanel;




















