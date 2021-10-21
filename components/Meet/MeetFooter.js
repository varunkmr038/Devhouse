import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

function MeetFooter() {
  return (
    <>
      <footer className="footer">
        <div className="footer-wrapper">
          <div className="footer-elements-wrapper">
            <Tooltip title="Share Meeting link" placement="top">
              <button
                id="share-toggle"
                className="footer-elements"
                onClick={(e) => {
                  const dialogue = document.querySelector(
                    ".dialogue-container"
                  );
                  dialogue.classList.toggle("dialogue-active");
                }}
              >
                <ion-icon name="share-social-outline"></ion-icon>
              </button>
            </Tooltip>

            <Tooltip title="Video" placement="top">
              <button id="video-toggle" className="footer-elements">
                <ion-icon name="videocam-off-outline"></ion-icon>
              </button>
            </Tooltip>

            <Tooltip title="Microphone" placement="top">
              <button id="mic-toggle" className="footer-elements">
                <ion-icon name="mic-off-outline"></ion-icon>
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
                onClick={() => window.location.assign("/meet")}
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
