import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';


function CardBack(props) {
  let cardHeight = props.size.height;
  let cardBorderSize = props.size.borderSize;
  let arrowBorderSize = props.size.arrowBorderSize;
  let cardRadius = props.size.borderRadius;
  let bandRadius = props.size.bandRadius;
  let cardMargin = props.size.margin;
  let bubbleSize = props.size.bubbleSize;
  let backBubbleSize = props.size.backBubbleSize;
  return (
    <div className='card'>
      <style jsx>{`
        .card {
          width: ${props.size.width}px;
          height: ${cardHeight}px;
          margin-left: ${cardMargin};
          margin-right: ${cardMargin};
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
          // background-color: pink;
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
        .inner-band:nth-child(5) {
          height: 18%;
          position: absolute;
          border-top: none;
          border-bottom: none;
          border-radius: 0;
          top: 20%;
        }
      `}</style>
      <div className='number-badge back-badge'></div>
      <div className='inner-band'>
        <div className='corner-bubble'></div>
        <div className='band-arrow-up'></div>
      </div>
      <div className='inner-band'>
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