import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  console.error('CARD', props.context, 'rendering')
  let color;
  let altColor;
  let cornerSymbol = props.type;
  let valueDisplay = `${cornerSymbol}${Math.abs(props.value)}`;
  if (cornerSymbol === '+') {
    color = altColor = 'var(--plus-card-color)';
  } else if (cornerSymbol === '-') {
    color = altColor = 'var(--minus-card-color)';
  } else if (cornerSymbol === '±') {
    color = 'var(--plus-card-color)';
    altColor = 'var(--minus-card-color)';
    valueDisplay = props.value;
  } else if (cornerSymbol === 'house') {
    color = altColor = 'var(--house-card-color)';
    cornerSymbol = '';
    valueDisplay = props.value;
  }
  let cardSize = props.size;
  if (typeof cardSize !== 'string') {
    cardSize = 'normal';
    console.error('cardSize was ', typeof cardSize);
  }
  let cardWidth = `var(--${cardSize}-card-width)`;
  let cardHeight = `var(--${cardSize}-card-height)`;
  let cardBorderSize = `calc(var(--${cardSize}-card-height) / 100)`;
  let arrowBorderSize = `calc(var(--${cardSize}-card-height) / 10)`;
  let cardRadius = `calc(var(--${cardSize}-card-height) / 18)`;
  let bandRadius = `calc(var(--${cardSize}-card-height) / 24)`;
  let badgeRadius = `calc(var(--${cardSize}-card-height) / 36)`;
  let bubbleSize = `calc(var(--${cardSize}-card-height) * 0.16)`;
  let fontSize = `calc(var(--${cardSize}-card-height) * 0.17)`;
  let clickAction = (props.context === 'deck-selected' || props.context === 'deck-selection-option' || props.context === 'user-hand')
    ? (event) => props.onClickCard(event, props.value, props.type, props.inDeck)
    : () => console.log('no click for this');
  let animated = (props.context !== 'deck-selection-option')
    && (props.context !== 'opponent-prize');
  if (animated) {
    useEffect(() => {
      let cardEl = document.getElementById(`${props.context}-card-${props.id}`);
      if (cardEl) {
        cardEl.style.opacity = 1;
        cardEl.style.transform = 'none';
      }
    });
  }
  return (
    <div id={`${props.context}-card-${props.id}`} {...{ [props.clickFunction]: clickAction }} className='card'>
      <style jsx>{`
        .card {
          border-color: var(--card-border-color);
          width: ${cardWidth};
          height: ${cardHeight};
          border-radius: ${cardRadius};
          border-width: ${cardBorderSize};
          opacity: ${animated ? 0.1 : 1};
          opacity: ${(props.context === 'deck-selection-option' && props.ownedCount === 0) && 0.1};
          transform: ${animated && 'scale(1.25)'};
          transition: ${animated && 'transform 210ms ease, opacity 210ms ease'};
          will-change: ${animated && 'transform, opacity'};
        }
        .card > * {
          pointer-events: none;
        }      
        .inner-band {
          background-color: ${color};
          border-radius: ${bandRadius};
        }
        .inner-band:nth-child(2) {
          background-color: ${altColor}
        }
        .inner-band:nth-child(3) {
          border-radius: ${bandRadius} ${bandRadius} 0 0;
        }
        .corner-bubble {
          border: ${cardBorderSize} solid black;
          background-color: ${altColor};
          width: ${bubbleSize};
          height: ${bubbleSize};
        }
        .no-corner-border {
          border-left: 0 none;
          border-bottom: 0 none;
        }
        .band-arrow-up, .band-arrow-down {
          border-left: ${arrowBorderSize} solid transparent;
          border-right: ${arrowBorderSize} solid transparent;
        }
        .band-arrow-up-bg, .band-arrow-down-bg {
          border-left: ${arrowBorderSize} solid transparent;
          border-right: ${arrowBorderSize} solid transparent;
        }
        .band-arrow-up {
          border-bottom: ${arrowBorderSize} solid;
        }
        .band-arrow-up-bg {
          border-bottom: ${arrowBorderSize} solid black;
        }
        .band-arrow-down {
          border-top: ${arrowBorderSize} solid;
        }
        .band-arrow-down-bg {
          border-top: ${arrowBorderSize} solid black;
        }
        .number-badge, .corner-bubble {
          font-size: ${fontSize};
        }
        .number-badge {
          border-radius: ${badgeRadius};
          color: var(--card-text-color);
        }
        .owned-card-count {
          position: absolute;
          width: var(--small-font-size);
          height: var(--small-font-size);
          font-size: var(--small-font-size);
          background: #00000099;
          color: white;
          display: ${props.ownedCount > 1 ? 'flex' : 'none'};
          align-content: center;
          justify-content: center;
          right: 0;
          bottom: 0;
          padding: calc(var(--small-font-size) / 6);
          border-top-left-radius: calc(var(--small-font-size) / 3);
        }
      `}</style>
      <div className='inner-band'>
        <div className='corner-bubble no-corner-border'>{cornerSymbol}</div>
        <div className='band-arrow-up-bg'></div>
        <div className='band-arrow-up'></div>
      </div>
      <div className='inner-band'>
        <div className='band-arrow-down-bg'></div>
        <div className='band-arrow-down'></div>
      </div>
      <div className='inner-band'>
      </div>
      <div className='number-badge'>{valueDisplay}</div>
      <div className='owned-card-count'>{props.ownedCount}</div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  context: PropTypes.string,
  ownedCount: PropTypes.number,
  size: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  inDeck: PropTypes.bool,
  type: PropTypes.string,
  onClickCard: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let equalTest = (
    prevProps.inDeck === nextProps.inDeck
    && prevProps.value === nextProps.value
    && prevProps.size.height === nextProps.size.height
    && prevProps.ownedCount === nextProps.ownedCount
  );
  return equalTest;
}
export default React.memo(Card, areEqual);