import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickAction = this.props.onClickCard;
    if (!props.onClickCard) {
      this.clickAction = () => null;
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.clickAction(event, this.props.value, this.props.type);
  }
  render() {
    let color;
    let altColor;
    let cornerSymbol = this.props.type;
    let valueDisplay = `${cornerSymbol}${Math.abs(this.props.value)}`;
    if (cornerSymbol === '+') {
      color = altColor = 'var(--plus-card-color)';
    } else if (cornerSymbol === '-') {
      color = altColor = 'var(--minus-card-color)';
    } else if (cornerSymbol === '±') {
      color = 'var(--plus-card-color)';
      altColor = 'var(--minus-card-color)';
      valueDisplay = this.props.value;
    } else if (cornerSymbol === 'house') {
      color = altColor = 'var(--house-card-color)';
      cornerSymbol = '';
      valueDisplay = this.props.value;
    }
    let cardHeight = this.props.size.height;
    let cardBorderSize = this.props.size.borderSize;
    let arrowBorderSize = this.props.size.arrowBorderSize;
    let cardRadius = this.props.size.borderRadius;
    let bandRadius = this.props.size.bandRadius;
    let badgeRadius = this.props.size.badgeRadius;
    let bubbleSize = this.props.size.bubbleSize;
    let fontSize = this.props.size.fontSize;
    return (
      <div id={`card-${this.props.id}`} onClick={this.handleClick} className='card'>
        <style jsx>{`
        .card {
          width: ${this.props.size.width}px;
          height: ${cardHeight}px;
          border-radius: ${cardRadius};
          border-width: ${cardBorderSize};
        }
        .inner-band {
          background-color: ${color};
          border-radius: ${bandRadius};
        }
        .inner-band:nth-child(3) {
          background-color: ${altColor}
        }
        .inner-band:nth-child(4) {
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