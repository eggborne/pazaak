import style from '../css/styles.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Card from './Card';
import CardBack from './CardBack';
import createGame from '../scripts/init';

let shorterDimension;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

let cardSize = {
  width: '3rem',
  height: '5rem'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('App mounted');
    createGame();
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
                <Card size={cardSize} value={2} type='house' />
                <Card size={cardSize} value={5} type='house' />
                <Card size={cardSize} value={8} type='house' />
                <Card size={cardSize} value={6} type='house' />
                <Card size={cardSize} value={7} type='house' />
                <Card size={cardSize} value={10} type='house' />
                <Card size={cardSize} value={3} type='house' />
                <Card size={cardSize} value={1} type='house' />
              </div>
            </div>
            <div id='player-area' className='player-area'>
              <div className='deal-grid'>
                <Card size={cardSize} value={9} type='house' />
                <Card size={cardSize} value={5} type='house' />
                <Card size={cardSize} value={2} type='house' />
                <Card size={cardSize} value={8} type='house' />
                <Card size={cardSize} value={6} type='house' />
                <Card size={cardSize} value={1} type='house' />
                <Card size={cardSize} value={10} type='house' />
                <Card size={cardSize} value={2} type='house' />
              </div>
            </div>
          </div>

          <div id='player-hand' className='hand'>
            <Card size={cardSize} value={2} type='plus' />
            <Card size={cardSize} value={4} type='plus' />
            <Card size={cardSize} value={5} type='plus' />
            <Card size={cardSize} value={3} type='minus' />
          </div>

        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;