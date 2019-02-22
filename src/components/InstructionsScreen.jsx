import React from 'react';
import PropTypes from 'prop-types';

function InstructionsScreen(props) {
  console.big('InstructionsScreen rendering');
  if (props.phase === 'showingInstructions') {
    requestAnimationFrame(() => {
      document.getElementById('instructions-screen').style.transform = 'none';
      document.getElementById('instructions-screen').style.opacity = 1;
    });
  }
  return (
    <div id="instructions-screen" className='shadowed-text'>
      <style jsx>{`
        #instructions-screen {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          opacity: var(--starting-opacity);
          transform: translateX(var(--shift-distance));
          transition: opacity var(--shift-duration) ease-out, transform var(--shift-duration) ease-out;
          will-change: opacity, transform;
          font-size: var(--small-font-size);
          height: 100%;
          pointer-events: ${props.phase === 'showingInstructions' || 'none'};          
        }
        #instructions {
          font-family: var(--main-font);
          box-sizing: border-box;
          padding: var(--micro-card-width);
          padding-top: 0;
          padding-bottom: 0;
          overflow-y: scroll;
          min-height: 0;
        }
        #instructions > p {
          padding-bottom: calc(var(--top-margin) / 2);
        }
        #instructions > h3 {
          padding-top: calc(var(--top-margin) / 4);
        }
        h3 {
          color: var(--house-card-color);
        }
      `}</style>
      <div className="options-instructions-title">How to play</div>
      <div id="instructions">
        <h3>It looks like an Imperial cruiser.</h3>
        <p>
          Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more
          coming in, they're going to try to cut us off. Why don't you outrun them? I thought you said this thing was fast. Watch your mouth, kid, or you're going to find yourself floating home. We'll
          be safe enough once we make the jump to hyperspace. Besides, I know a few maneuvers. We'll lose them! Here's where the fun begins!
        </p>
        <h3>Those guys must really be desperate.</h3>
        <p>
          This could really save my neck. Get back to the ship and get her ready. You'll have to sell your speeder. That's okay. I'm never coming back to this planet again. Going somewhere, Solo? Yes,
          Greedo. As a matter of fact, I was just going to see your boss. Tell Jabba that I've got his money. It's too late. You should have paid him when you had the chance. Jabba's put a price on
          your head, so large that every bounty hunter in the galaxy will be looking for you. I'm lucky I found you first. Yeah, but this time I got the money. If you give it to me, I might forget I
          found you. I don't have it with me.
        </p>
        <h3>Cut in the sublight engines.</h3>
        <p>
          What the...? Aw, we've come out of hyperspace into a meteor shower. Some kind of asteroid collision. It's not on any of the charts. What's going on? Our position is correct, except...no,
          Alderaan! What do you mean? Where is it? Thats what I'm trying to tell you, kid. It ain't there. It's been totally blown away. What? How?
        </p>
        <h3>Where are those transmissions you intercepted?</h3>
        <p>
          The Death Star plans are not in the main computer. What have you done with those plans? We intercepted no transmissions. This is a
          consular ship. We're on a diplomatic mission. If this is a consular ship... where is the Ambassador? Commander, tear this ship apart until you've found those plans and bring me the Ambassador.
          I want her alive! There she is! Set for stun! She'll be all right. Inform Lord Vader we have a prisoner.
        </p>
        <h3>This ground sure feels strange.</h3>
        <p>
          It doesn't feel like rock at all. There's an awful lot of moisture in here. I don't know. I have a bad feeling about this. Yeah. Watch out! Yeah, that's what I thought. Mynock. Chewie, check
          the rest of the ship, make sure there aren't any more attached. They're chewing on the power cables. Mynocks? Go on inside. We'll clean them off if there are any more.
        </p>
      </div>
    </div>
  );
}
InstructionsScreen.propTypes = {
  phase: PropTypes.string,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let leaving = prevProps.phase == 'showingInstructions' && nextProps.phase != 'showingInstructions';
  let entering = prevProps.phase != 'showingInstructions' && nextProps.phase == 'showingInstructions';
  if (leaving) {
    document.getElementById('instructions-screen').style.transitionDuration = 'var(--shift-duration-out)';
    document.getElementById('instructions-screen').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('instructions-screen').style.transform = 'translateX(var(--shift-distance))';
    }, 300);
  }
  if (entering) {
    document.getElementById('instructions-screen').style.transitionDuration = 'var(--shift-duration)';
    document.getElementById('instructions-screen').style.opacity = 1;
  }
}

export default React.memo(InstructionsScreen, areEqual);
