import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

function DialogContainer() {
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
          <Tooltip title="Copy" placement="top">
            <button
              id="copy-button"
              className="dialogue-button"
              meeting_link="meet.google.com/sij-dwa-zjm"
            >
              <ion-icon name="copy-outline"></ion-icon>
            </button>
          </Tooltip>
        </div>
        <p className="caption">Joined as varun</p>
      </div>
    </div>
  );
}

export default DialogContainer;
