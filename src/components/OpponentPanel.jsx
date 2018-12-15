
import React from 'react';
import PropTypes from 'prop-types';

function OpponentPanel(props) {
  let skillArray = Array.apply(null, Array(10)).map(function () { });
  return (
    <div id={`${props.character.name}-panel`} className='opponent-select-entry'>
      <div className='left-opponent-panel'>
        <div className='opponent-portrait left-side'>
          <div className='portrait-label'>{props.character.displayName}</div>
        </div>
        <div className='opponent-quote'>{props.character.quotes.panel}</div>
        <button onClick={props.onClickPanel} id={`${props.character.name}-select-button`} className={'select-button left-side'}></button>
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
  cardSize: PropTypes.object,
  index: PropTypes.number,
  character: PropTypes.object,
  onClickPanel: PropTypes.func
};

export default OpponentPanel;




















