const newMsgSound = () => {
  const sound = new Audio("/light.mp3");
  sound && sound.play();
};

export default newMsgSound;
