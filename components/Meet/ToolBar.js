import React from "react";

function ToolBar() {
  return (
    <>
      <div className="tool-bar-wrapper">
        <button id="peoples-count" className="tool-bar-button">
          <ion-icon name="people-outline"></ion-icon>
          <span className="user-number" id="user-number"></span>
        </button>

        <button
          id="message-box"
          className="tool-bar-button"
          onClick={() => {
            const chatPanel = document.getElementById("chat-panel");
            const toolBarWrapper = document.querySelector(".tool-bar-wrapper");
            toolBarWrapper.classList.toggle("hide-tool-bar");
            chatPanel.classList.toggle("display-chat-panel");
          }}
        >
          <ion-icon name="chatbox-ellipses-outline"></ion-icon>
        </button>

        <button id="time" className="tool-bar-button"></button>
      </div>
    </>
  );
}

export default ToolBar;
