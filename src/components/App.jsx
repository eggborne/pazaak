import style from '../css/styles.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Card from './Card';
import createGame from '../scripts/init';

let shorterDimension;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

let cardSize = {
  width: '3rem',
  height: '5rem'
}

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
        <div id='game'>
          <div className='hand'>
            <Card size={cardSize}
              value={4}   
              type='house'
            />
            <Card size={cardSize}
              value={2}   
              type='plus'
            />
            <Card size={cardSize}
              value={3}   
              type='minus'
            />
            <Card size={cardSize}
              value={10}   
              type='plus'
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;