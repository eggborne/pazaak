
import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

function OpponentPanel(props) {
  let extraClasses = ['', ''];
  if (props.selected) {
    extraClasses[0] = 'panel-selected';
    extraClasses[1] = 'disabled-select-button';
  }
  let skillArray = Array.apply(null, Array(10)).map(function () { });
  let source = 'https://pazaak.online/assets/images/opponentssheet.jpg';
  return (
    <div id={`${props.character.name}-panel`} className={`opponent-select-entry ${extraClasses[0]}`}>
      <style jsx>{`
        .opponent-select-entry {
          box-sizing: border-box;
          position: relative;
          margin-bottom: 0.5vh;
          margin-left: 0;
          border: 1px groove #333;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          border-radius: 0.5rem;
          background-color: var(--trans-blue-bg-color);
          transform: scale(0.96);
          transition: transform 300ms ease, background-color 50ms ease;
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
          height: 10vmax;
          font-size: 1.5rem;
          padding: 0.5rem 1rem 0.5rem 1rem;
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
      `} 
      </style>
      <div className='left-opponent-panel'>
        <PlayerPortrait size={window.innerWidth * 0.35} source={source} spriteIndex={props.index} displayName={props.character.displayName} />
        <div className='opponent-quote'>{props.character.quotes.panel}</div>
        <button onClick={props.onClickPanel} id={`${props.character.name}-select-button`} className={`select-button left-side ${extraClasses[1]}`}></button>
      </div>
      <div className='opponent-description'>
        <div className='opponent-stats-grid'>
          <div className='difficulty-area'>
            <div className='skill-label'>Skill Level</div>
            <div className='difficulty-bar-body'>
              {skillArray.map((entry, i) => {
                let barClass = 'difficulty-bar-segment segment-filled';
                if (i >= props.character.skillLevel) {
                  barClass = 'difficulty-bar-segment';
                }
                return <div key={i * (props.index + 1)} className={barClass}></div>;
              })}
            </div>
          </div>
          <div className='opponent-prize-area'>
            <div className='opponent-prize-label'>
              Prize
            </div>
            <div className='opponent-prize-body'>
              <div className='opponent-prize-credits'>{props.character.prize.credits}</div>&nbsp;<div>credits</div>
            </div>
          </div>
          {/* <div className='opponent-prize-cards'>
            {props.character.prize.cards.map((card, i) => {
              if (props.character.name !== 'theemperor') {
                return <Card key={i * (props.index + 1)} id={i} size={props.cardSize} value={card.value} type={card.type} onClickCard={null} />;
              } else {
                return <CardBack key={i * (props.index + 1)} id={i} size={props.cardSize} />;
              }
            })}
          </div> */}
          <div className='opponent-strategy-area'>
            <div className='opponent-strategy-label'>Strategy</div>
            <div className='opponent-strategy-list'>
              <div key={0} className='opponent-strategy-item'><div className='bullet'>•</div>{props.character.strategy.stand.description}</div>
              <div key={1} className='opponent-strategy-item'><div className='bullet'>•</div>{props.character.strategy.handCards.description}</div>
              <div key={2} className='opponent-strategy-item'><div className='bullet'>•</div>{props.character.strategy.tie.description}</div>
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
OpponentPanel.propTypes = {
  selected: PropTypes.bool,
  cardSize: PropTypes.object,
  index: PropTypes.number,
  character: PropTypes.object,
  onClickPanel: PropTypes.func
};

export default OpponentPanel;




















