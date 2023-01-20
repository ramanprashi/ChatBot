import React from 'react';


const ChatMessage = ({message}) => {
    return (
        <div className={`chat-msg ${message.user === "gpt" && "bot" }`} >
            <div className={`avatar ${message.user === "gpt" && "bot" }`}></div>
            <div className="message">{message.message}</div>
        </div>
    )
}

export default ChatMessage;