import React, { useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";

function DialogContainer() {
  //  Share link dialogue
  useEffect(() => {
    const copyButton = document.querySelector("#copy-button");
    const shareLink = document.querySelector(".share-link");
    shareLink.innerHTML = window.location.href;
    copyButton.setAttribute("meeting_link", window.location.href);
    const dialogueCloseButton = document.querySelector("#close-dialogue");
    dialogueCloseButton.addEventListener("click", (e) => {
      const dialogue = document.querySelector(".dialogue-container");
      dialogue.classList.toggle("dialogue-active");
    });
    copyButton.addEventListener("mousedown", (e) => {
      const copyText = e.target.getAttribute("meeting_link");
      navigator.clipboard.writeText(copyText); // copy link to clipboard
      e.target.setAttribute("tool_tip", "copied");
    });
    copyButton.addEventListener("mouseout", (e) => {
      e.target.setAttribute("tool_tip", "copy");
    });
  }, []);

  return (
    <div className="dialogue-container">
      <div className="dialogue-head">
        <p className="dialogue-title">Your meeting's ready</p>
        <button id="close-dialogue" className="dialogue-button">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>
      <div className="dialogue-body">
        <p>Share this meeting link with others you want in the meeting</p>
        <div className="share-container">
          <p className="share-link">meet.google.com/sij-dwa-zjm</p>
          <button
            id="copy-button"
            className="dialogue-button"
            meeting_link="meet.google.com/sij-dwa-zjm"
          >
            <ion-icon name="copy-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogContainer;
