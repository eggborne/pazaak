import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

function CardBack(props) {
  return (
    <div className='card'>
      <style jsx>{`
        .card {
          width: ${props.size.width};
          height: ${props.size.height};
        }
        .inner-band {
          background-color: grey;
          border-color: #444;
        }
        .corner-bubble, .back-bubble {
          background-color: #ccc;
          border-color: #444;
        }
        .back-bubble {
          border: none;
        }
        .number-badge {
          background-color: #ccc;
        }
        .band-arrow-up {
          border-bottom: 0.4rem solid #ccc;
        }
        .band-arrow-down {
          border-top: 0.4rem solid #ccc;
        }
        .band-arrow-up-bg {
          border-bottom: 0.65rem solid #ccc;
        }
        .band-arrow-down-bg {
          border-top: 0.65rem solid #ccc;
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
          border-bottom: 1px solid #444;
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