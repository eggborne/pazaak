import style from '../css/styles.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Card from './Card';
import CardBack from './CardBack';
import createGame from '../scripts/init';
let Util = require('../scripts/util')

let shorterDimension;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

let cardSize = {};

let cardHeight = (window.innerHeight / 6) * 0.75;

cardSize.width = (cardHeight / 1.66);
cardSize.height = cardHeight;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleClickEndTurn = this.handleClickEndTurn.bind(this);
    this.handleClickStand = this.handleClickStand.bind(this);
  }

  componentDidMount() {
    console.log('App mounted');

    createGame();
    document.getElementById('container').style.height = window.innerHeight + 'px';
  }

  handleClickCard(event) {
    event.preventDefault();
    console.log('clicked!', event.target.id);
  }
  handleClickEndTurn(event) {
    event.preventDefault();
    console.log('END TURN');
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');
  }
  handleClickStand(event) {
    event.preventDefault();
    console.log('STAND')
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');

  }

  render() {

    return (
      <div id='container'>
        <Header />
        <div id='game-board'>
          <div id='opponent-hand' className='hand'>
            <CardBack size={cardSize} />
            <CardBack size={cardSize} />
            <CardBack size={cardSize} />
            <CardBack size={cardSize} />
          </div>
          <div id='grids'>
            <div id='opponent-area' className='player-area'>
              <div className='deal-grid'>
                <div className='deal-row'>
                  <Card size={cardSize} value={2} type='house' />
                  <Card size={cardSize} value={5} type='house' />
                  <Card size={cardSize} value={8} type='house' />
                  <Card size={cardSize} value={6} type='house' />
                </div>
                <div className='deal-row'>
                  <Card size={cardSize} value={7} type='house' />
                  <Card size={cardSize} value={10} type='house' />
                  <Card size={cardSize} value={3} type='house' />
                  <Card size={cardSize} value={1} type='house' />
                </div>
              </div>
              <div className='total-display'>
                <div className='total-outline'>
                  <div id='opponent-total'>18</div>
                </div>
              </div>
            </div>
            <div id='user-area' className='player-area'>
              <div className='deal-grid'>
                <div className='deal-row'>
                  <Card size={cardSize} value={9} type='house' />
                  <Card size={cardSize} value={5} type='house' />
                  <Card size={cardSize} value={2} type='house' />
                  <Card size={cardSize} value={8} type='house' />
                </div>
                <div className='deal-row'>
                  <Card size={cardSize} value={6} type='house' />
                  <Card size={cardSize} value={1} type='house' />
                  <Card size={cardSize} value={10} type='house' />
                  <Card size={cardSize} value={2} type='house' />
                </div>
              </div>
              <div className='total-display'>
                <div className='total-outline'>
                  <div id='user-total'>16</div>
                </div>
              </div>
            </div>
          </div>

          <div id='player-hand' className='hand'>
            <Card id={0} size={cardSize} value={2} type='plus'
              onClickCard={this.handleClickCard} />
            <Card id={1} size={cardSize} value={4} type='plus'
              onClickCard={this.handleClickCard} />
            <Card id={2} size={cardSize} value={5} type='plus'
              onClickCard={this.handleClickCard} />
            <Card id={3} size={cardSize} value={3} type='minus'
              onClickCard={this.handleClickCard} />
          </div>

        </div>
        <Footer onClickEndTurn={this.handleClickEndTurn} onClickStand={this.handleClickStand} />
      </div>
    );
  }
}

export default App;