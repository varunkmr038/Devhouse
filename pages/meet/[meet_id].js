import React, { useEffect } from "react";
import ChatPanel from "../../components/Meet/ChatPanel";
import DialogContainer from "../../components/Meet/DialogContainer";
import MeetFooter from "../../components/Meet/MeetFooter";
import Video from "../../components/Meet/Video";
import ToolBar from "../../components/Meet/ToolBar";

function Meet() {
  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | Meet`;
    }, 0);
  });

  return (
    <>
      <Video />
      <MeetFooter />
      <ToolBar />
      <DialogContainer />
      <ChatPanel />

      <style jsx global>
        {`
          body {
            background-color: #1b2127;
            width: 100%;
            position: fixed;
          }
        `}
      </style>
    </>
  );
}

export default Meet;
