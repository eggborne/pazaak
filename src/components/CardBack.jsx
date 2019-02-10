import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';


function CardBack(props) {
  
  let cardSize = props.size;
  let cardWidth = `var(--${cardSize}-card-width)`;
  let cardHeight = `var(--${cardSize}-card-height)`;
  let cardBorderSize = `calc(var(--${cardSize}-card-height) / 100)`;
  let arrowBorderSize = `calc(var(--${cardSize}-card-height) / 10)`;
  let cardRadius = `calc(var(--${cardSize}-card-height) / 18)`;
  let bandRadius = `calc(var(--${cardSize}-card-height) / 24)`;
  let bubbleSize = `calc(var(--${cardSize}-card-height) * 0.16)`;
  let backBubbleSize = `calc(var(--${cardSize}-card-height) * 0.18)`;

  return (
    <div className='card'>
      <style jsx>{`
        .card {
          border-color: var(--card-border-color);
          width: ${cardWidth};
          height: ${cardHeight};
          border-radius: ${cardRadius};
          border-width: ${cardBorderSize};
        }
        .inner-band {
          background-color: var(--card-back-bg-color);
          border-color: var(--card-back-border-color);
          border-radius: ${bandRadius};          
        }
        .inner-band:nth-child(4) {
          border-radius: ${bandRadius} ${bandRadius} 0 0;
        }
        .corner-bubble, .back-bubble {
          background-color: var(--card-back-color);
          border-color: var(--card-back-border-color);
        }
        .corner-bubble {
          border: ${cardBorderSize} solid black;
          width: ${bubbleSize};
          height: ${bubbleSize};
        }
        .back-bubble {
          width: ${backBubbleSize};
          height: ${backBubbleSize};
        }
        .back-bubble {
          border-bottom: 1px solid black;
        }
        .number-badge {
          background-color: var(--card-back-color);
          border: ${cardBorderSize} solid black;
          border-top: none;
          border-bottom: none;
          // border: 0;
          top: 27%;
        }
        .back-badge {
          border-radius: ${bandRadius};
          width: 65%;
          height: 27%;
          position: absolute;
          // box-sizing: content-box;
        }
        .band-arrow-up, .band-arrow-down {
          border-left: ${arrowBorderSize} solid transparent;
          border-right: ${arrowBorderSize} solid transparent;
        }
        .band-arrow-up {
          border-bottom: ${arrowBorderSize} solid var(--card-back-color);
        }
        .band-arrow-down {
          border-top: ${arrowBorderSize} solid var(--card-back-color);
        }
        .band-arrow-down-bg {
          border-top: ${arrowBorderSize} solid var(--card-back-color);
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
          height: 18%;
          position: absolute;
          border-top: none;
          border-bottom: none;
          border-radius: 0;
          top: 20%;
        }
      `}</style>
      <div className='inner-band'>
        <div className='corner-bubble'></div>
        <div className='band-arrow-up'></div>
      </div>
      <div className='inner-band'>
        <div className='band-arrow-down'></div>
      </div>
      <div className='number-badge back-badge'></div>
      <div></div>
      <div className='inner-band'>
        <div className='back-bubble'></div>
      </div>
    </div>
  );
}

CardBack.propTypes = {
  size: PropTypes.string,
};

export default React.memo(CardBack);
// export default CardBack;