import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
import Card from './Card';
import CardBack from './CardBack';
import { prizeCards } from '../scripts/characters';

function OpponentPanel(props) {
  console.error('OpponentPanel rendering ---', props);
  let charName = props.character.name;
  let maxSkill = 10;
  if (props.character.skillLevel > 10) {
    maxSkill = props.character.skillLevel;
  }
  let displayName = props.available ? props.character.displayName : '???';
  let skillArray = Array.apply(null, Array(maxSkill)).map(function () { });
  let portraitSize = window.innerWidth * 0.35;
  let wordsInName = displayName.split(' ').length;
  let totalLength = displayName.length;
  let nameFontSize = '6.5vw';
  if ((wordsInName <= 2 && totalLength > 8) || (wordsInName > 2 && totalLength > 12)) {
    nameFontSize = '5vw';
  }
  if (wordsInName > 2 && totalLength > 18) {
    nameFontSize = '4vw';
  }
  let quoteLength = props.character.quotes.panel.length;
  let quoteTextSize = '4.5vw';
  if (props.available) {
    if (quoteLength > 30) {
      quoteTextSize = '4vw';
    }
    if (quoteLength > 55) {
      quoteTextSize = '3.5vw';
    }
  } else {
    quoteTextSize = '4vw';
  }
  if (document.getElementById(`${charName}-panel`)) {
  }
  let panelQuote = props.available ? props.character.quotes.panel : '(transmission unavailable)';
  let wagerDisplay = props.character.prize.credits;
  if (parseInt(props.currentWager) > wagerDisplay) {
    wagerDisplay = props.currentWager;
  }
  let creditFontSize = ((window.innerWidth / 5) / props.currentWager.toString().length);
  if (creditFontSize < window.innerWidth / 26) {
    creditFontSize = window.innerWidth / 26;
  }
  if (creditFontSize > window.innerWidth / 15) {
    creditFontSize = window.innerWidth / 15;
  }
  creditFontSize = creditFontSize + 'px';
  return (
    <div id={`${charName}-panel`} className={`opponent-select-entry red-panel ${props.available || 'unavailable'}`}>
      <style jsx>
        {`
          .opponent-select-entry {
            --opponent-panel-padding: calc(var(--menu-border-width) * 2);
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 35vw 45vw;
            justify-content: space-around;
            will-change: transform;
            width: 90%;
            display: ${props.selected || 'none'};
            opacity: ${props.selected || '0'};
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
            font-size: 3.5vw;
          }
          .opponent-quote {
            box-sizing: border-box;
            align-self: flex-start;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: var(--opponent-panel-padding);
            padding-right: var(--opponent-panel-padding);
            height: var(--normal-card-height);
            min-height: var(--normal-card-height);
            text-align: ${props.available || 'center'};
            width: ${props.available || '100%'};
            font-size: ${quoteTextSize};
          }
          .opponent-name-area {
            grid-column-start: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align:center;
            color: yellow;
            padding: var(--opponent-panel-padding);
            height: 100%;
            font-size: ${nameFontSize};
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
            padding-left: 0;
            line-height: 100%;            
            height: 100%;
            align-items: center;
            justify-content: space-between;
            border: 1px solid var(--dark-red-bg-color);
            border-top: 0;
            border-radius: 0 0 var(--menu-border-width) var(--menu-border-width);
          }   
          #wager-more-button {
            font-size: 3vw;
            max-width: 18vw;
            padding-top: 1vw;
            padding-bottom: 1vw;
          }
          .opponent-prize-credits {
            font-family: var(--title-font);
            font-size: ${creditFontSize};
            color: green;
            text-align: center;
            width: 100%;
          }
          .opponent-prize-cards {
            padding: var(--opponent-panel-padding);  
            display: grid;
            grid-template-rows: var(--prize-card-height);
            grid-template-columns: var(--prize-card-width) var(--prize-card-width) var(--prize-card-width);
            grid-column-gap: 0.5vw;
            border: 1px solid var(--dark-red-bg-color);
            border-top: 0;
            border-radius: 0 0 var(--menu-border-width) var(--menu-border-width);
            min-height: var(--prize-card-height)
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
    
          .unavailable .opponent-prize-credits {
            color: red !important;
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
              transform: scale(1.05);
            }
            50% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1.05);
            }
          }
          .big-throbbing {
            animation: big-throb 1200ms infinite;
          }   
          #portrait-area {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10%;      
            opacity: ${props.defeated && '0.65'};      
          }
          #defeated-message {
            position: absolute;
            font-family:var(--title-font);
            font-size: var(--medium-font-size);
            color: red;
            z-index: 12;
            transform-origin: 50% 50%;
            transform: rotate(-2deg);
            display: ${!props.defeated && 'none'};
          }
          #min-display {
            font-size: 0.9em;
          } 
        `}
      </style>
      <div className='left-opponent-panel'>
        <div id={`${charName}-name-area`} className='opponent-name-area inner-red-panel'>          
          {displayName}
        </div>
        {props.selected &&
          <div id='portrait-area'>
            <div id='defeated-message'>DEFEATED</div>
            <PlayerPortrait type='opponent-panel' hidden={!props.available} size={portraitSize} cpu={true} spriteIndex={props.available ? props.index : -1} displayName={''} />
          </div>
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
            <div className='opponent-prize-label inner-red-panel'>Wager <span id='min-display'>(min. {props.character.prize.credits})</span></div>
            <div className={'opponent-prize-body'}>
              <div className={`opponent-prize-credits ${props.available || 'big-throbbing'}`}>{wagerDisplay}</div>
              <button
                id='wager-more-button' 
                onClick={props.onClickWagerMore}
              >
                Change Wager
              </button>
            </div>
          </div>
          <div className='opponent-prize-area'>
            <div className='opponent-prize-label inner-red-panel'>Prize</div>
            {(props.selected && !props.defeated) ?                            
              <div className='opponent-prize-cards'>
                {props.character.prize.cards.map((card, i) => {
                  card = prizeCards[card];
                  let key = i * (props.index + 1);
                  let displayCard = (<Card key={key} id={key} context={'opponent-prize'} size={'prize'} value={card.value} type={card.type} clickFunction={props.clickFunction} />);
                  if (!props.available) {
                    displayCard = (<CardBack key={key} id={key} context={'opponent-prize'} size={'prize'} />);
                  }
                  return displayCard;
                })}
              </div>
              :
              <div className='opponent-prize-cards'>              
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
  defeated: PropTypes.bool,
  available: PropTypes.bool,
  slideAmount: PropTypes.number,
  character: PropTypes.object,
  currentWager: PropTypes.number,
  onClickWagerMore: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let equalTest = prevProps.selected == nextProps.selected 
  && prevProps.defeated == nextProps.defeated
  && prevProps.available == nextProps.available
    && (prevProps.currentWager == nextProps.currentWager);
  if (!prevProps.selected && !nextProps.selected) {
    equalTest = true;
  }
  console.log('equal?', equalTest);
  return equalTest;
}

// export default OpponentPanel;
export default React.memo(OpponentPanel, areEqual);
