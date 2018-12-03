import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  let color;
  let cornerSymbol;
  if (props.type === 'plus') {
    color = 'blue';
    cornerSymbol = '+';
  } else if (props.type === 'minus') {
    color = 'red';
    cornerSymbol = '-';
  } else {
    color = 'yellow';
    cornerSymbol = '';
  }
  return (
    <div className='card'>
      <style jsx>{`
        .card {
          width: ${props.size.width};
          height: ${props.size.height};
        }
        .inner-band {
          background-color: ${color}
        }
        .corner-bubble {
          background-color: ${color};
        }
      `}</style>
      <div className='number-badge'>{props.value}</div>
      <div className='inner-band'>
        <div className='corner-bubble'>{cornerSymbol}</div>
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
  size: PropTypes.object,
  value: PropTypes.number,
  type: PropTypes.string
};


export default Card;