import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  let color;
  let cornerSymbol;
  let valueDisplay = props.value;
  if (props.type === 'plus') {
    color = '#0C00B2';
    cornerSymbol = '+';
    valueDisplay = `+${props.value}`;
  } else if (props.type === 'minus') {
    color = '#A70003';
    cornerSymbol = '-';
  } else {
    color = '#D3D300';
    cornerSymbol = '';
  }
  let cardHeight = props.size.height;
  return (
    <div id={`card-${props.id}`} onClick={() => props.onClickCard(props.value, props.type) } className='card'>
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
        .corner-bubble {
          background-color: ${color};
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
          border-bottom: ${cardHeight * 0.07}px solid white;
        }
        .band-arrow-up-bg {
          border-bottom: ${cardHeight * 0.1}px solid black;
        }
        .band-arrow-down {
          border-top: ${cardHeight * 0.07}px solid white;
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
  value: PropTypes.number,
  type: PropTypes.string,
  onClickCard: PropTypes.func
};


export default Card;