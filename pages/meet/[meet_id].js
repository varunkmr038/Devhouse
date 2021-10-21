import React, { useEffect } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import ChatPanel from "../../components/Meet/ChatPanel";
import DialogContainer from "../../components/Meet/DialogContainer";
import MeetFooter from "../../components/Meet/MeetFooter";
import ToolBar from "../../components/Meet/ToolBar";

function Meet() {
  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | Meet`;
    }, 0);
  });

  return (
    <>
      <div className="main-wrapper">
        <div id="video-grid"></div>
      </div>
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

Meet.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const { meet_id } = ctx.query;

    const res = await axios.get(`${baseUrl}/api/meet/${meet_id}`, {
      headers: { Authorization: token },
    });

    return {};
  } catch (error) {
    ctx.res.writeHead(302, { Location: "/meet" });
    ctx.res.end();
  }
};

export default Meet;
