import React from 'react';


function Footer() {
  let ppButtonSrc = 'https://pazaak.online/assets/images/ppbutton.gif';
  return (
    <div id='footer'>
      <style jsx>{`
        #footer {
          position: fixed;
          box-sizing: border-box;
          width: 100vw;
          bottom: 0;
          font-family: sans-serif;
          /* height: 3rem; */
          min-height: 6vh;
          max-height: 6vh;
          min-width: 320px;
          background-color: var(--red-bg-color);
          display: inline-flex;
          align-items: center;
          font-size: 1.5vmax;
          transform: translateY(100%);
          transition: all 300ms;
        }
        #footer-contents {
          display: inline-flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          transition: all 300ms;
        }
        #footer-contents > div {
          text-align: center;
          width: calc(100vw / 3);
        }
      `}
      </style>
      <div id='footer-contents'>
        <div><a href='https://github.com/eggborne'>GitHub</a></div>
        <div><a href='mailto:mike@eggborne.com'>Contact</a></div>
        <div>
          <form id='donate-button' action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type='hidden' name='cmd' value='_s-xclick' />
            <input type='hidden' name='hosted_button_id' value='GHAXRA5JU4Y2J' />
            <input id='pp-button' src={ppButtonSrc} type='image' border='0' title='PayPal - The safer, easier way to pay online!' alt='Donate with PayPal button' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;