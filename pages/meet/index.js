import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import { toast } from "react-toastify";

function MeetHome() {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | Meet`;
    }, 0);
  });

  const createNewMeet = async () => {
    const href = window.location.href;

    try {
      const res = await axios.post(
        `${baseUrl}/api/meet/new-meeting`,
        {},
        {
          headers: { Authorization: cookie.get("token") },
        }
      );
      //  redirect to meet page
      window.location.assign(`${href}/${res.data}`);
    } catch (error) {
      console.error(error);
      toast.error("Error creating Meet try After some time");
    }
  };

  const joinMeet = async (e) => {
    e.preventDefault();
    if (roomId === "") return;

    try {
      const res = await axios.get(`${baseUrl}/api/meet/${roomId}`, {
        headers: { Authorization: cookie.get("token") },
      });

      //  redirect to meet page
      window.location.assign(`${baseUrl}/meet/${roomId}`);
    } catch (error) {
      console.error(error);
      toast.info("No Meet Found. Create a new one");
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row g-3">
          <div className="col-md-6">
            <h1 className="mb-3">
              Meet, Chat, Call and Collaborate in just one place.
            </h1>
            <p style={{ color: "#5F6368" }}>
              Premium Quality Video Conferencing
            </p>
            <div className="a123 my-5" style={{ display: "flex" }}>
              <button
                className="btn btn-success new-meeting"
                style={{ width: "180px" }}
                role="button"
                onClick={createNewMeet}
              >
                New Meeting
              </button>
              <form style={{ marginLeft: "1rem" }}>
                <div className="input-group ">
                  <input
                    name="roomId"
                    type="text"
                    className="form-control"
                    placeholder="Enter  code"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    id="button-addon2"
                    onClick={joinMeet}
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ boxShadow: " 0 0 5px #b8b8b8" }}>
              <div className="card-body">
                <img
                  src="/img/meet.png"
                  width="100%"
                  className="rounded"
                  alt="meet"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MeetHome;
