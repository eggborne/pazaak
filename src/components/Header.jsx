import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  return (
    <div className='shadowed-text' id='header'>
      <div id='header-link' onClick={props.onClickHeader}>Pazaak.online</div>
    </div>
  );
}

Header.propTypes = {
  onClickHeader: PropTypes.func
};


export default Header;