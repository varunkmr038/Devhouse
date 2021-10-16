import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

function MeetFooter() {
  return (
    <>
      <footer className="footer">
        <div className="footer-wrapper">
          <div className="footer-elements-wrapper">
            <Tooltip title="Share Meeting link" placement="top">
              <button id="share-toggle" className="footer-elements">
                <ion-icon name="paper-plane-outline"></ion-icon>
              </button>
            </Tooltip>

            <Tooltip title="Video" placement="top">
              <button id="video-toggle" className="footer-elements">
                <ion-icon name="videocam-outline"></ion-icon>
              </button>
            </Tooltip>

            <Tooltip title="Microphone" placement="top">
              <button id="mic-toggle" className="footer-elements">
                <ion-icon name="mic-outline"></ion-icon>
              </button>
            </Tooltip>

            <Tooltip title="Start Recording" placement="top">
              <button id="recording-toggle" className="footer-elements">
                <ion-icon name="recording-outline"></ion-icon>
              </button>
            </Tooltip>

            <Tooltip title="Present Screen" placement="top">
              <button id="share-screen" className="footer-elements">
                <ion-icon name="tv-outline"></ion-icon>
              </button>
            </Tooltip>

            <Tooltip title="Leave the Meeting" placement="top">
              <button
                id="meeting-toggle"
                className="footer-elements call-end-button"
              >
                <ion-icon name="call-outline"></ion-icon>
              </button>
            </Tooltip>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MeetFooter;
