if (window.location.pathname.includes("/meet/")) {
  //variables declaration
  const baseUrl = window.location.hostname;
  const protocol = window.location.protocol;
  const socket = io("/");
  const videoGrid = document.getElementById("video-grid");
  const myPeer = new Peer();
  const roomId = window.location.pathname.split("/")[2];
  const peers = {};
  const myVideo = document.createElement("video");
  myVideo.muted = true;

  var peerId;
  var roomData;
  var user;
  var myVideoStream;
  var myVideoTrack;
  var localAudioFXElement;

  const setTime = () => {
    const timeButton = document.getElementById("time");
    var time = new Date();
    timeButton.innerHTML = `${time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  };
  setTime();
  setInterval(() => {
    setTime();
  }, 500);

  //  Fetch the room data and user data
  const getRoomData = async () => {
    try {
      const res = await axios.get(
        `${protocol}//${baseUrl}/api/meet/${roomId}`,
        {
          headers: { Authorization: Cookies.get("token") },
        }
      );

      roomData = res.data.roomData;
      user = res.data.user;
    } catch (err) {
      console.log(err);
    }
  };
  getRoomData();

  myPeer.on("open", (id) => {
    peerId = id;
    changeCount(roomData.count + 1);
    socket.emit(
      "join-meet",
      roomData._id,
      peerId,
      user._id,
      user.name,
      false, // my audio off
      false // video off
    );
  });

  //connecting the user on a video call enabling audio and video
  const enableAudioVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      myVideoStream = stream;
      myVideoTrack = stream.getVideoTracks()[0];
      processStream(myVideoStream);
    } catch (err) {
      console.log(err);
    }
  };
  enableAudioVideo();

  function processStream(myVideoStream) {
    addVideoStream(myVideo, myVideoStream, null, {
      name: user.name,
      audio: false,
      video: false,
    });
    // recieve the other user's stream
    myPeer.on("call", (call) => {
      peers[call.peer] = call;
      call.answer(myVideoStream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        axios
          .get(`${protocol}//${baseUrl}/api/meet/user/${call.peer}`)
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            addVideoStream(video, userVideoStream, call.peer, data.user);
          });
      });
      call.on("close", () => {
        video.parentElement.remove();
      });
    });

    socket.on("user-connected", (userId, fname, audio, video, count) => {
      // socket.emit("user-callback");
      connectToNewUser(userId, myVideoStream);
      changeCount(count);
    });
  }

  //disconneting the user
  socket.on("user-disconnected", (userId, count) => {
    if (peers[userId]) {
      peers[userId].close();
      delete peers[userId];
      changeCount(count);
    }
  });

  // //updating participants number
  const changeCount = (count) => {
    const counter = document.getElementById("user-number");
    counter.innerHTML = count;
  };

  //connecting to new user
  function connectToNewUser(userId, stream) {
    // set others peerid and send my stream
    const call = myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      axios
        .get(`${protocol}//${baseUrl}/api/meet/user/${call.peer}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          addVideoStream(video, userVideoStream, call.peer, data.user);
        });
    });
    call.on("close", () => {
      video.parentElement.remove();
    });
    peers[userId] = call;
  }
  function addVideoStream(video, stream, peerId, user) {
    // create microphone button
    const micBtn = document.createElement("button");
    micBtn.classList.add("video-element");
    micBtn.classList.add("mic-button");
    micBtn.innerHTML = `<ion-icon name="mic-off-outline"></ion-icon>`;
    micBtn.classList.add("mic-off");

    // create audio FX
    const audioFX = new SE(stream);
    const audioFXElement = audioFX.createElement();
    audioFXElement.classList.add("mic-button");

    if (user.audio) micBtn.classList.add("off");
    else audioFXElement.classList.add("off");

    // video off element
    const videoOffIndicator = document.createElement("div");
    videoOffIndicator.classList.add("video-off-indicator");
    videoOffIndicator.innerHTML = `<ion-icon name="videocam-outline"></ion-icon>`;

    // create pin button
    const pinBtn = document.createElement("button");
    pinBtn.classList.add("video-element");
    pinBtn.classList.add("pin-button");
    pinBtn.innerHTML = `<ion-icon name="expand-outline"></ion-icon>`;

    // main wrapper
    const videoWrapper = document.createElement("div");
    videoWrapper.id = "video-wrapper";
    videoWrapper.classList.add("video-wrapper");

    // peer name
    const namePara = document.createElement("p");
    namePara.innerHTML = user.name;
    namePara.classList.add("video-element");
    namePara.classList.add("name");

    const elementsWrapper = document.createElement("div");
    elementsWrapper.classList.add("elements-wrapper");
    elementsWrapper.appendChild(namePara);
    // elementsWrapper.appendChild(optionBtn);
    elementsWrapper.appendChild(pinBtn);
    elementsWrapper.appendChild(micBtn);
    elementsWrapper.appendChild(audioFXElement);
    elementsWrapper.appendChild(videoOffIndicator);

    //  Set the attribute for video audio toggle

    video.srcObject = stream;
    video.setAttribute("peer", peerId);
    video.setAttribute("name", user.name);

    if (peerId == null) {
      // my videostream
      video.classList.add("mirror");
      myVideoStream.getAudioTracks()[0].enabled = false;
      myVideoStream.getVideoTracks()[0].enabled = false;
      localAudioFXElement = audioFX;
    }

    video.addEventListener("loadedmetadata", () => {
      video.play();
    });

    videoWrapper.appendChild(elementsWrapper);
    videoWrapper.appendChild(video);

    videoGrid.append(videoWrapper);

    if (user.video == false) {
      elementsWrapper.classList.add("video-disable");
    }

    //creates and returns a new observer which invokes a specified callback
    const observer = new MutationObserver((mutationsList, observer) => {
      const removeNodeLength = mutationsList[0].removedNodes.length;
      const targetNode = mutationsList[0].target;
      if (removeNodeLength > 0) {
        targetNode.remove();
        observer.disconnect();
      }
    });
    observer.observe(videoWrapper, {
      childList: true,
    });
    eventAdd(pinBtn);
  }
  const eventAdd = (element) => {
    element.addEventListener("click", (e) => {
      const videoWrapper = e.target.parentElement.parentElement;
      if (e.target.childNodes[0].getAttribute("name") == "expand-outline") {
        e.target.innerHTML = `<ion-icon name="contract-outline"></ion-icon>`;
      } else {
        e.target.innerHTML = `<ion-icon name="expand-outline"></ion-icon>`;
      }
      videoWrapper.classList.toggle("zoom-video");
    });
  };

  // Screen Sharing Feature
  const shareScreenBtn = document.getElementById("share-screen");
  shareScreenBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("true")) return;
    e.target.setAttribute("tool_tip", "You are already presenting screen");
    e.target.classList.add("true");
    navigator.mediaDevices
      .getDisplayMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })
      .then((stream) => {
        var videoTrack = stream.getVideoTracks()[0];
        myVideoTrack = myVideoStream.getVideoTracks()[0];
        replaceVideoTrack(myVideoStream, videoTrack);
        for (let peer in peers) {
          let sender = peers[peer].peerConnection
            .getSenders()
            .find(function (s) {
              return s.track.kind == videoTrack.kind;
            });
          sender.replaceTrack(videoTrack);
        }
        socket.emit("video-toggle", true);
        const elementsWrapper = document.querySelector(".elements-wrapper");
        const stopBtn = document.createElement("button");
        stopBtn.classList.add("video-element");
        stopBtn.classList.add("stop-presenting-button");
        stopBtn.innerHTML = "Stop Sharing";
        elementsWrapper.classList.add("screen-share");
        elementsWrapper.appendChild(stopBtn);
        videoTrack.onended = () => {
          elementsWrapper.classList.remove("screen-share");
          stopBtn.remove();
          stopPresenting(videoTrack);
        };
        stopBtn.onclick = () => {
          videoTrack.stop();
          elementsWrapper.classList.remove("screen-share");
          stopBtn.remove();
          stopPresenting(videoTrack);
        };
      });
  });
  //Stop Screen Sharing
  const stopPresenting = (videoTrack) => {
    shareScreenBtn.classList.remove("true");
    for (let peer in peers) {
      let sender = peers[peer].peerConnection.getSenders().find(function (s) {
        return s.track.kind == videoTrack.kind;
      });
      sender.replaceTrack(myVideoTrack);
    }
    socket.emit("video-toggle", false);

    replaceVideoTrack(myVideoStream, myVideoTrack);
  };
  //Zoom in the video of the user
  const crossBtnClickEvent = (e) => {
    const videoWrapper = e.target.parentElement;
    if (videoWrapper.classList.contains("zoom-video")) {
      videoWrapper.classList.remove("zoom-video");
      e.target.removeEventListener("click", crossBtnClickEvent);
      e.target.remove();
    }
  };

  // // External

  // // video toggle
  const videoToggleBtn = document.getElementById("video-toggle");
  videoToggleBtn.addEventListener("click", (e) => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    const currentElement = e.target;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      socket.emit("video-toggle", false);
      videoWrapperVideoToggle(myVideo, false);
      currentElement.innerHTML = `<ion-icon name="videocam-off-outline"></ion-icon>`;
      currentElement.setAttribute("tool_tip", "Video On");
    } else {
      myVideoStream.getVideoTracks()[0].enabled = true;
      socket.emit("video-toggle", true);
      videoWrapperVideoToggle(myVideo, true);
      currentElement.innerHTML = `<ion-icon name="videocam-outline"></ion-icon>`;
      currentElement.setAttribute("tool_tip", "Video Off");
    }
  });
  //Turn-Off the video
  const videoWrapperVideoToggle = (element, type) => {
    const videoWrapper = element.previousSibling;
    if (type) videoWrapper.classList.remove("video-disable");
    else videoWrapper.classList.add("video-disable");
  };

  //Mute the audio
  const micToggleButton = document.getElementById("mic-toggle");
  micToggleButton.addEventListener("click", (e) => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    const currentElement = e.target;
    if (enabled) {
      socket.emit("audio-toggle", false);
      videoWrapperMicToggle(myVideo, false);
      myVideoStream.getAudioTracks()[0].enabled = false;
      currentElement.innerHTML = `<ion-icon name="mic-off-outline"></ion-icon>`;
      currentElement.setAttribute("tool_tip", "Microphone On");
    } else {
      socket.emit("audio-toggle", true);
      videoWrapperMicToggle(myVideo, true);
      myVideoStream.getAudioTracks()[0].enabled = true;
      currentElement.innerHTML = `<ion-icon name="mic-outline"></ion-icon>`;
      currentElement.setAttribute("tool_tip", "Microphone Off");
    }
  });

  socket.on("user-audio-toggle", (id, type) => {
    videoWrapperMicToggle(document.querySelector(`video[peer="${id}"]`), type);
  });

  socket.on("user-video-toggle", (id, type) => {
    videoWrapperVideoToggle(
      document.querySelector(`video[peer="${id}"]`),
      type
    );
  });

  const videoWrapperMicToggle = (element, type) => {
    const videoWrapper = element.previousSibling;
    const micButtons = videoWrapper.childNodes;
    if (type) {
      micButtons[3].classList.remove("off");
      micButtons[2].classList.add("off");
    } else {
      micButtons[2].classList.remove("off");
      micButtons[3].classList.add("off");
    }
  };

  const replaceVideoTrack = (stream, videoTrack) => {
    stream.removeTrack(stream.getVideoTracks()[0]);
    stream.addTrack(videoTrack);
  };

  const scrollDown = (query) => {
    var objDiv = document.querySelector(query);
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  //Send Message
  const addMessage = (sender, userName, message) => {
    const messageBoxButton = document.getElementById("message-box");
    const chatPanel = document.getElementById("chat-panel");
    if (
      !chatPanel.classList.contains("display-chat-panel") &&
      !messageBoxButton.classList.contains("dot")
    )
      messageBoxButton.classList.add("dot");
    const time = new Date();
    const chatBox = document.querySelector(".chat-box");
    const chat = document.createElement("div");
    chat.classList.add("chat");
    chat.classList.add(sender);
    chat.innerHTML = `<p class="name">${userName} <span class="time"> ${time.toLocaleString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )} </span> </p><p class="message">${message}</p>`;
    chatBox.appendChild(chat);
  };

  const chatForm = document.querySelector(".chat-input-wrapper");
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const chatInput = document.getElementById("chat-input");
    if (chatInput.value == "") return;
    socket.emit("client-send", chatInput.value);
    addMessage("me", name, chatInput.value);
    scrollDown(".chat-box");
    chatInput.value = "";
  });

  //Scroll Down in Chatbox
  socket.on("client-podcast", (data, userName) => {
    addMessage("user", userName, data);
    scrollDown(".chat-box");
  });

  class SE {
    constructor(mediaStream) {
      this.mediaStream = mediaStream;
    }
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("effect-container");
      const a1 = document.createElement("div");
      a1.classList.add("o1");
      const a2 = document.createElement("div");
      a2.classList.add("o2");
      const a3 = document.createElement("div");
      a3.classList.add("o1");
      this.element.appendChild(a1);
      this.element.appendChild(a2);
      this.element.appendChild(a3);

      this.audioCTX = new AudioContext();
      this.analyser = this.audioCTX.createAnalyser();
      const source = this.audioCTX.createMediaStreamSource(this.mediaStream);
      source.connect(this.analyser);

      const frameLoop = () => {
        window.requestAnimationFrame(frameLoop);
        let fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(fbc_array);
        let o1 = fbc_array[20] / 300;
        let o2 = fbc_array[50] / 200;
        o1 = o1 < 0.5 ? 0.19 : o1 > 1 ? 1 : o1;
        o2 = o2 < 0.4 ? 0.19 : o2 > 1 ? 1 : o2;
        a1.style.height = `${o1 * 100}%`;
        a3.style.height = `${o1 * 100}%`;
        a2.style.height = `${o2 * 100}%`;
      };
      frameLoop();
      return this.element;
    }
    replaceStream(stream) {
      this.mediaStream = stream;
      this.audioCTX.close().then((e) => {});
      this.element = this.createElement();
    }
    deleteElement() {
      this.audioCTX.close().then((e) => {});
      this.element.remove();
    }
  }
}
