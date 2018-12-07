import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

function CardBack(props) {
  let cardHeight = props.size.height;
  return (
    <div className='card'>
      <style jsx>{`
        .card {
          width: ${props.size.width}px;
          height: ${props.size.height}px;
          margin-left: ${cardHeight * 0.04}px;
          margin-right: ${cardHeight * 0.04}px;
        }
        .inner-band {
          background-color: var(--card-back-bg-color);
          border-color: var(--card-back-border-color);
        }
        .corner-bubble, .back-bubble {
          background-color: var(--card-back-color);
          border-color: var(--card-back-border-color);
        }
        .corner-bubble {
          width: ${cardHeight * 0.16}px;
          height: ${cardHeight * 0.16}px;
        }
        .back-bubble {
          width: ${cardHeight * 0.18}px;
          height: ${cardHeight * 0.18}px;
        }
        .back-bubble {
          border-bottom: 1px solid black;
        }
        .number-badge {
          background-color: var(--card-back-color);
          border: 1px solid black;
          border-top: none;
          border-bottom: none;
          top: 27%;
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
          border-bottom: ${cardHeight * 0.07}px solid var(--card-back-color);
        }
        .band-arrow-up-bg {
          border-bottom: ${cardHeight * 0.1}px solid var(--card-back-color);
        }
        .band-arrow-down {
          border-top: ${cardHeight * 0.07}px solid var(--card-back-color);
        }
        .band-arrow-down-bg {
          border-top: ${cardHeight * 0.1}px solid var(--card-back-color);
        }
        .inner-band:nth-child(2) {
          border-bottom: none;
          border-radius: 12% 12% 0 0;
        }
        .inner-band:nth-child(3) {
          border-top: none;
          border-radius: 0 0 12% 12%;
        }
        .inner-band:nth-child(4) {
          border-bottom: 1px solid var(--card-back-border-color);
        }
        .inner-band:nth-child(5) {
          height: 15%;
          position: absolute;
          border-top: none;
          border-bottom: none;
          border-radius: 0;
          top: 20%;
        }
      `}</style>
      <div className='number-badge'></div>
      <div className='inner-band'>
        <div className='corner-bubble'></div>
        <div className='band-arrow-up-bg'></div>
        <div className='band-arrow-up'></div>
      </div>
      <div className='inner-band'>
        <div className='band-arrow-down-bg'></div>
        <div className='band-arrow-down'></div>
      </div>
      <div className='inner-band'>
        <div className='back-bubble'></div>
      </div>
      <div className='inner-band'></div>
    </div>
  );
}

CardBack.propTypes = {
  size: PropTypes.object,
};


export default CardBack;