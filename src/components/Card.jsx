import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  let color;
  let altColor;
  let cornerSymbol = props.type;
  let valueDisplay = `${props.type}${Math.abs(props.value)}`;
  if (props.type === '+') {
    color = altColor = 'var(--plus-card-color)';
  } else if (props.type === '-') {
    color = altColor = 'var(--minus-card-color)';
  } else if (props.type === '±') {
    color = 'var(--plus-card-color)';
    altColor = 'var(--minus-card-color)';
    valueDisplay = props.value;
  } else if (props.type==='house') {
    color = altColor = 'var(--house-card-color)';
    cornerSymbol = '';
    valueDisplay = props.value;
  }
  let cardHeight = props.size.height;
  return (
    <div id={`card-${props.id}`} onClick={(event) => props.onClickCard(event, props.value, props.type) } className='card'>
      <style jsx>{`
        .card {
          width: ${props.size.width}px;
          height: ${cardHeight}px;
          margin-left: ${cardHeight * 0.03}px;
          margin-right: ${cardHeight * 0.03}px;
        }
        .inner-band {
          background-color: ${color}
        }
        .inner-band:nth-child(3) {
          background-color: ${altColor}
        }
        .corner-bubble {
          background-color: ${altColor};
          width: ${cardHeight * 0.16}px;
          height: ${cardHeight * 0.16}px;
        }
        .band-arrow-up, .band-arrow-down {
          border-left: ${cardHeight * 0.07}px solid transparent;
          border-right: ${cardHeight * 0.07}px solid transparent;
        }
        .band-arrow-up-bg, .band-arrow-down-bg {
          border-left: ${cardHeight * 0.1}px solid transparent;
          border-right: ${cardHeight * 0.1}px solid transparent;
        }
        .band-arrow-up {
          border-bottom: ${cardHeight * 0.07}px solid;
        }
        .band-arrow-up-bg {
          border-bottom: ${cardHeight * 0.1}px solid black;
        }
        .band-arrow-down {
          border-top: ${cardHeight * 0.07}px solid;
        }
        .band-arrow-down-bg {
          border-top: ${cardHeight * 0.1}px solid black;
        }
        .number-badge, .corner-bubble {
          font-size: ${cardHeight * 0.2}px;
        }
      `}</style>
      <div className='number-badge'>{valueDisplay}</div>
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
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  size: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.string,
  onClickCard: PropTypes.func
};


export default Card;