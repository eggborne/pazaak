
import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
import Card from './Card';

function OpponentPanel(props) {
  console.error('OpponentPanel rendering ---', props.character.displayName);
  let charName = props.character.name;
  let quoteLength = props.character.quotes.panel.length;
  let quoteTextSize;
  if (quoteLength > 28) {
    quoteTextSize = '1rem';
  }
  if (quoteLength > 50) {
    quoteTextSize = '0.85rem';
  }
  let skillArray = Array.apply(null, Array(10)).map(function () { });
  let cardHeight = 'var(--mini-card-height)';
  let portraitSize = window.innerWidth * 0.35;
  let nameFontSize = '1.2rem';
  return (
    <div id={`${charName}-panel`} className={`opponent-select-entry ${props.selected && 'panel-selected'}`}>
      <style jsx>{`
        #${charName}-name-area {
          font-size: ${nameFontSize};
        }
        #${charName}-quote {
          font-size: ${quoteTextSize};         
        }
        .select-button {

        }
        #${charName}-select-button {
          height: ${cardHeight};
        }        
        `}
      </style>
      <div className='left-opponent-panel'>
        <PlayerPortrait size={portraitSize} cpu={true} spriteIndex={props.index} displayName={''} />
        <div id={`${charName}-quote`} className='opponent-quote'>{props.character.quotes.panel}</div>
        <button id={`${charName}-select-button`} {...{ [props.clickFunction]: () => props.onClickPanel(charName) }} className={`select-button ${props.selected && 'disabled-select-button'}`}></button>
      </div>
      <div className='opponent-description'>
        <div className='opponent-stats-grid'>
          <div id={`${charName}-name-area`} className='opponent-name-area'>{props.character.displayName}</div>
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
              Minimum Wager
            </div>
            <div className='opponent-prize-body'>
              <div className='opponent-prize-credits'>{props.character.prize.credits}</div>&nbsp;<div>credits</div>
            </div>
          </div>
          <div className='opponent-prize-area'>
            <div className='opponent-prize-label'>
              Prize
            </div>
            <div className='opponent-prize-cards'>
              {props.character.prize.cards.map((card, i) => {
                let key = i * (props.index + 1);
                return <Card key={key} context={'opponent-prize'} size={'micro'} value={card.value} type={card.type} clickFunction={props.clickFunction} />;
              })}
            </div>
          </div>
        </div>    
      </div>
    </div>
  );
}

OpponentPanel.propTypes = {
  selected: PropTypes.bool,
  index: PropTypes.number,
  character: PropTypes.object,
  onClickPanel: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return (prevProps.selected === nextProps.selected);
}

export default React.memo(OpponentPanel, areEqual);



















