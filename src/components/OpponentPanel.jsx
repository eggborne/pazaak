import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
import Card from './Card';
import CardBack from './CardBack';

function OpponentPanel(props) {
  console.error('OpponentPanel rendering ---', props);
  let charName = props.character.name;
  let maxSkill = 10;
  if (props.character.skillLevel > 10) {
    maxSkill = props.character.skillLevel;
  }
  let skillArray = Array.apply(null, Array(maxSkill)).map(function() {});
  let portraitSize = window.innerWidth * 0.35;
  let wordsInName = props.character.displayName.split(' ').length;
  let totalLength = props.character.displayName.length;
  let nameFontSize = 'var(--medium-font-size)';
  let quoteLength = props.character.quotes.panel.length;
  let quoteTextSize;
  if (props.available) {
    if (quoteLength > 25) {
      // quoteTextSize = '1rem';
      quoteTextSize = 'var(--small-font-size)';
    }
    if (quoteLength > 50) {
      quoteTextSize = 'calc(var(--small-font-size) * 0.8)';
    }
    if ((wordsInName <= 2 && totalLength > 8) || (wordsInName > 2 && totalLength > 12)) {
      nameFontSize = 'var(--small-med-font-size)';
    }
    if (wordsInName > 2 && totalLength > 18) {
      nameFontSize = '1.75vh';
    }
  } else {
    quoteTextSize = 'calc(var(--small-font-size) * 0.75)';
  }
  if (document.getElementById(`${charName}-panel`) && document.getElementById(`${charName}-panel`).style.opacity) {
    document.getElementById(`${charName}-panel`).style.opacity = 0;
    document.getElementById(`${charName}-panel`).style.transform = `translateX(${props.slideAmount}%)  scale(0.9)`;
  }
  setTimeout(() => {
    document.getElementById(`${charName}-panel`).style.opacity = 1;
    document.getElementById(`${charName}-panel`).style.transform = 'none';
  }, 1);
  let panelQuote = props.available ? props.character.quotes.panel : '** unavailable **';
  return (
    <div id={`${charName}-panel`} className={`opponent-select-entry red-panel ${props.available || 'unavailable'}`}>
      <style jsx>
        {`
          .opponent-select-entry {
            --opponent-panel-padding: calc(var(--menu-border-width) * 2);
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 35vw 1fr;
            grid-column-gap: var(--opponent-panel-padding);
            will-change: transform;
            width: 90%;
            display: ${props.selected || 'none'};
            transition: transform 200ms ease-out, opacity 200ms ease-out;
            will-change: transform, opacity;
          }
          .left-opponent-panel {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: var(--mini-card-height) ${window.innerWidth * 0.35}px auto;
            align-items: start;
            grid-row-gap: var(--opponent-panel-padding);
          }
          .opponent-description {
            font-size: var(--small-font-size);
          }
          .opponent-quote {
            box-sizing: border-box;
            align-self: flex-start;
            display: flex;
            align-items: center;
            padding-left: var(--opponent-panel-padding);
            padding-right: var(--opponent-panel-padding);
            height: 100%;
          }
          .opponent-name-area {
            grid-column-start: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: yellow;
            padding: var(--opponent-panel-padding);
            height: 100%;
          }
          .opponent-stats-grid {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 0.5fr auto auto;
            width: 100%;
            height: 100%;
            grid-row-gap: var(--opponent-panel-padding);

          }
          .opponent-prize-area {
            display: flex;
            flex-direction: column;
          }
          .opponent-prize-body {
            display: inline-flex;
            padding: var(--opponent-panel-padding);
            line-height: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--dark-red-bg-color);
            border-top: 0;
            border-radius: 0 0 var(--menu-border-width) var(--menu-border-width);
          }   
          .opponent-prize-credits {
            font-family: var(--title-font);
            font-size: var(--medium-font-size);
            color: green;
          }
          .opponent-prize-cards {
            padding: var(--opponent-panel-padding);
            display: inline-flex;
            align-items: center;
            border: 1px solid var(--dark-red-bg-color);
            border-top: 0;
            border-radius: 0 0 var(--menu-border-width) var(--menu-border-width);
          }
          .opponent-prize-cards > .card {
            transform: scale(0.5) !important;
          }
          .difficulty-area {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          .difficulty-bar-body {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: var(--opponent-panel-padding);
            border: 1px solid var(--dark-red-bg-color);
            border-top: 0;
            border-radius: 0 0 var(--menu-border-width) var(--menu-border-width);
          }
          .difficulty-bar-segment {
            position: relative;
            background-color: var(--option-off-color);
            flex-grow: 1;
            height: calc(var(--micro-card-width) / 1.5);
            background-clip: padding-box;
            border: 1px solid transparent;
            opacity: 0.5;
            box-shadow: 0 0 2px #222;
          }
          .difficulty-bar-segment:nth-child(1) {
            margin-left: 0;
            //border-left: 0.35vw solid #111;
          }
          .difficulty-bar-segment:nth-last-child(1) {
            margin-right: 0;
          }
          .segment-filled {
            background-color: green;
            opacity: 1;
          }
          .opponent-prize-label,
          .skill-label {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            box-sizing: border-box;
            width: 100%;
            padding: var(--menu-border-width);
          }
          #${charName}-name-area {
            font-size: ${nameFontSize};
          }
          #${charName}-name-area::before {
            content: ${'\''+props.character.displayName+'\''};
          }
          #${charName}-quote {
            font-size: ${quoteTextSize};
          }
          .unavailable .opponent-prize-credits {
            color: red !important;
          }
          .unavailable .opponent-name-area::before {
            content: '???' !important;
          }
          .unavailable .player-portrait {
            opacity: 0.2 !important;
          }
          .short-description {
            font-size: 1.5vh;
            margin-top: var(--menu-border-width);
            margin-left: var(--menu-border-width);
          }
          #origin-description {
            margin-bottom: var(--opponent-panel-padding);
          }
          @keyframes big-throb {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.25);
            }
            100% {
              transform: scale(1);
            }
          }
          .big-throbbing {
            animation: big-throb 1200ms infinite;
          }
        `}
      </style>
      <div className='left-opponent-panel'>
        <div id={`${charName}-name-area`} className='opponent-name-area inner-red-panel'>
          {/* {props.character.displayName} */}
        </div>
        {props.selected &&
          <PlayerPortrait hidden={!props.available} size={portraitSize} cpu={true} spriteIndex={props.index} displayName={''} />
        }
        <div id={`${charName}-quote`} className='opponent-quote'>
          {panelQuote}
        </div>
        {/* <button id={`${charName}-select-button`} {...{ [props.clickFunction]: () => props.onClickPanel(charName) }} className={`select-button ${props.selected && 'disabled-select-button'}`}></button> */}
      </div>
      
      <div className='opponent-description'>
        <div className='opponent-stats-grid'>
          <div className='difficulty-area'>
            <div id='species-description' className='short-description'>Species: {props.character.species}</div>
            <div id='origin-description' className='short-description'>Origin: {props.character.placeOfOrigin}</div>
            <div className='skill-label inner-red-panel'>Skill Level</div>
            <div className='difficulty-bar-body'>
              {skillArray.map((entry, i) => {
                let barClass = 'difficulty-bar-segment segment-filled';
                if (i >= props.character.skillLevel) {
                  barClass = 'difficulty-bar-segment';
                }
                return <div key={i} className={barClass} />;
              })}
            </div>
          </div>
          <div className='opponent-prize-area'>
            <div className='opponent-prize-label inner-red-panel'>Minimum Wager</div>
            <div className={'opponent-prize-body'}>
              <div className={`opponent-prize-credits ${props.available || 'big-throbbing'}`}>{props.character.prize.credits}</div>
            </div>
          </div>
          <div className='opponent-prize-area'>
            <div className='opponent-prize-label inner-red-panel'>Prize</div>
            {props.selected &&
              <div className='opponent-prize-cards'>
                {props.character.prize.cards.map((card, i) => {
                  let key = i * (props.index + 1);
                  let displayCard = (<Card key={key} id={key} context={'opponent-prize'} size={'prize'} value={card.value} type={card.type} clickFunction={props.clickFunction} />);
                  if (!props.available) {
                    displayCard = (<CardBack key={key} id={key} context={'opponent-prize'} size={'prize'} />);
                  }
                  return displayCard;
                })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

OpponentPanel.propTypes = {
  index: PropTypes.number,
  selected: PropTypes.bool,
  available: PropTypes.bool,
  slideAmount: PropTypes.number,
  character: PropTypes.object,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return prevProps.selected === nextProps.selected;
}

// export default OpponentPanel;
export default React.memo(OpponentPanel, areEqual);
