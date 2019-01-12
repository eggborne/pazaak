import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

function MessageCenter(props) {
  console.error('messagecenter props', props);
  return (
    <div id='message-center' className='shadowed-text'>
      <style jsx>{`
        #message-center {
          width: 100%;
          height: 50vh;
          max-height: 80vh;
          box-sizing: border-box;
          padding: 4vw 8vw 4vw 8vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--dark-red-bg-color);
          border-radius: 0.5rem;
          background: rgba(0, 0, 0, 0.1);
        }
        #chat-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        #message-area {
          flex-grow: 1;
        }
        #chat-title-area {
          width: 100%;
          height: 4rem;
          font-size: 1.2rem;
        }
        #chat-input-area {
          align-self: center;
          height: 3rem;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
        }
        #chat-message-input {
          font-family: 'Nova Square';
          font-size: var(--main-text-size);
          background-color: var(--name-input-color);
          color: var(--name-input-text-color);
          box-sizing: border-box;
          height: 100%;
          -webkit-user-select: text;  /* Chrome all / Safari all */
          -moz-user-select: text;     /* Firefox all */
          -ms-user-select: text;      /* IE 10+ */
          user-select: text;
        }
        #send-message-button {
          margin: 0;
          height: 100%;
          font-size: 1.5rem;
        }

      `}</style>
      {props.chatObject.chatId && props.chatObject.messages.map &&

        <div id='chat-container'>

          <div id='chat-title-area'>
            Chatting with {props.chatObject.partnerId}
          </div>
          <div id='message-area'>
            {props.chatObject.messages.map((message, i) => {
              let messageStyle = {};
              if (message.unread) {
                messageStyle = { color: 'green' };
                message.unread = false;
              }
              return (<div style={messageStyle} key={i}>{message.sender + ' - ' + message.bodyText}</div>);
            })}
          </div>
        </div>
      }
      <div id='chat-input-area'>
        <form onSubmit={props.onSubmitChatMessage} id='chat-message-form'>
          <input id='chat-message-input' name='chat-message-input' type='text' placeholder='Type your message...' />
          <button id='send-message-button'>Send</button>
        </form>
      </div>
    </div>
  );
}

MessageCenter.propTypes = {
  chatObject: PropTypes.object,
  cardSize: PropTypes.object,
  onSubmitChatMessage: PropTypes.func,
  onClickCloseButton: PropTypes.func,
};


export default MessageCenter;