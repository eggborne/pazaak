import React from 'react';

function Header() {
  return (
    <div id='header'>
      <style jsx>{`
        #header {
          font-family: 'Bungee';
          min-height: var(--header-height);
          max-height: var(--header-height);
          background-color: var(--red-bg-color);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: var(--header-text-size);
          transform: translateY(-100%);
          color: white;
          transition: all 300ms, letter-spacing 400ms, color 800ms, text-shadow 1000ms;
        }
      `}</style>
      <div id='header-link'>Pazaak.online</div>
    </div>
  );
}

export default Header;