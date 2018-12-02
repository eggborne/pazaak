import style from '../css/styles.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import createGame from '../scripts/init';

let shorterDimension;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

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
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;