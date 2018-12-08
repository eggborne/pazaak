
import React from 'react';
import PropTypes from 'prop-types';

function InstructionsScreen(props) {
  let instructionsText = `${''}And what of the Rebellion? If the Rebels have obtained a complete technical readout of this station, it is possible, however unlikely, that they might find a weakness and exploit it. The plans you refer to will soon be back in our hands. Any attack made by the Rebels against this station would be a useless gesture, no matter what technical data they've obtained. This station is now the ultimate power in the universe. I suggest we use it! Are they away? They have just made the jump into hyperspace. You're sure the homing beacon is secure aboard their ship? I'm taking an awful risk, Vader. This had better work. Aren't you a little short to be a stormtrooper? What? Oh...the uniform. I'm Luke Skywalker. I'm here to rescue you. You're who? I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi. Ben Kenobi is here! Where is he? Come on! The ship's all yours. If the scanners pick up anything, report it immediately. All right, let's go. Hey down there, could you give us a hand with this? TX-four-one-two. Why aren't you at your post? TX-four-one-two, do you copy? Take over. We've got a bad transmitter. I'll see what I can do. You know, between his howling and your blasting everything in sight, it's a wonder the whole station doesn't know we're here. Bring them on! I prefer a straight fight to all this sneaking around. We found the computer outlet, sir. Plug in. He should be able to interpret the entire Imperial computer network. That malfunctioning little twerp. This is all his fault! He tricked me into going this way, but he'll do no better. Wait, what's that? A transport! I'm saved! Over here! Help! Please, help! Artoo-Detoo! It's you! It's you!`;
  return (
    <div style={props.style} id='instructions-screen'>
      <div className='options-instructions-title shadowed-text'>How to play</div>
      <div id='instructions' className='shadowed-text'>
        {instructionsText}
      </div>
      <button onClick={props.onClickBack} className='back-button' id='instructions-back-button'>Back</button>
    </div>
  );
}
InstructionsScreen.propTypes = {
  style: PropTypes.object,
  onClickBack: PropTypes.func,
};

export default InstructionsScreen;



















