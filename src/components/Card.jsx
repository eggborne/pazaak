import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  console.error('RENDERING CARD ---------------- ', props.value, props.type);
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
  let cardHeight = props.size.height;
  let cardBorderSize = props.size.borderSize;
  let arrowBorderSize = props.size.arrowBorderSize;
  let cardRadius = props.size.borderRadius;
  let bandRadius = props.size.bandRadius;
  let badgeRadius = props.size.badgeRadius;
  let bubbleSize = props.size.bubbleSize;
  let fontSize = props.size.fontSize;

  function handleCardClick(event) {
    props.onClickCard(props.elementId, props.value, props.type, props.inDeck);
  }

  return (
    // <div id={props.elementId} {...{ [props.clickFunction]: () => props.onClickCard(props.elementId, props.value, props.type, props.inDeck) }} className='card'>
    <div id={props.elementId} {...{ [props.clickFunction]: handleCardClick }} className='card'>
      <style jsx>{`
        .card {
          width: ${props.size.width}px;
          height: ${cardHeight}px;
          border-radius: ${cardRadius};
          border-width: ${cardBorderSize};
          opacity: 1;
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
    </div>
  );
}

Card.defaultProps = {
  onClickCard: () => null,
  elementId: ''
};
Card.propTypes = {
  id: PropTypes.number,
  size: PropTypes.object,
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
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  let equalTest = (
    prevProps.inDeck === nextProps.inDeck
    && prevProps.value === nextProps.value
    && prevProps.size.height === nextProps.size.height
  );
  // console.warn('---------- Card equal? ----> ', equalTest, prevProps, nextProps)
  return false;
  // return true;
}
export default React.memo(Card, areEqual);
// export default Card;