import React from "react";

function ChatPanel() {
  return (
    <div id="chat-panel" className="chat-box-wrapper">
      <div className="chat-box-header">
        <div className="chat-box-headline">
          <ion-icon name="chatbox-outline"></ion-icon>
          <span>Chat</span>
        </div>
        <button
          id="chat-close-button"
          className="cross-button"
          onClick={(e) => {
            if (e.target.classList.contains("dot"))
              e.target.classList.remove("dot");
            const chatPanel = document.getElementById("chat-panel");
            const toolBarWrapper = document.querySelector(".tool-bar-wrapper");
            toolBarWrapper.classList.toggle("hide-tool-bar");
            chatPanel.classList.toggle("display-chat-panel");
          }}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>
      <div className="chat-box"></div>
      <div className="chat-box-control">
        <form className="chat-input-wrapper">
          <div className="input-box-wrapper" chat-id="asdf">
            <input
              type="text"
              className="chat-input"
              id="chat-input"
              placeholder="Send Message"
            />
          </div>
          <button type="submit" className="chat-input-button">
            <ion-icon name="send-outline"></ion-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPanel;
