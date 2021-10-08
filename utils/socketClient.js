import newMsgSound from "./newMsgSound";
import getUserInfo from "./getUserInfo";

export const connectedUsersListener = async (users, setConnectedUsers) => {
  users.length > 0 && setConnectedUsers(users);
};

export const msgSentListener = async (
  newMsg,
  setMessages,
  setChats,
  openChatId
) => {
  //  If we are on the chat whom we sent the msg
  if (newMsg.receiver === openChatId.current) {
    setMessages((prev) => [...prev, newMsg]);

    //  For most recent msg to appear in chatlist
    setChats((prev) => {
      const previousChat = prev.find(
        (chat) => chat.messagesWith === newMsg.receiver
      );
      previousChat.lastMessage = newMsg.msg;
      previousChat.date = newMsg.date;

      return [...prev];
    });
  }
};

export const newMsgReceivedListener = async (
  newMsg,
  setMessages,
  chats,
  setChats,
  openChatId
) => {
  // WHEN CHAT WITH SENDER IS CURRENTLY OPENED INSIDE YOUR BROWSER
  if (newMsg.sender === openChatId.current) {
    setMessages((prev) => [...prev, newMsg]);

    setChats((prev) => {
      const previousChat = prev.find(
        (chat) => chat.messagesWith === newMsg.sender
      );
      previousChat.lastMessage = newMsg.msg;
      previousChat.date = newMsg.date;

      return [...prev];
    });
  }
  // chat is not open
  else {
    const ifPreviouslyMessaged =
      chats.filter((chat) => chat.messagesWith === newMsg.sender).length > 0;

    if (ifPreviouslyMessaged) {
      setChats((prev) => {
        const previousChat = prev.find(
          (chat) => chat.messagesWith === newMsg.sender
        );
        previousChat.lastMessage = newMsg.msg;
        previousChat.date = newMsg.date;

        return [
          previousChat,
          ...prev.filter((chat) => chat.messagesWith !== newMsg.sender),
        ];
      });
    }

    //IF NO PREVIOUS CHAT WITH THE SENDER
    else {
      const { name, profilePicUrl } = await getUserInfo(newMsg.sender);
      const newChat = {
        messagesWith: newMsg.sender,
        name,
        profilePicUrl,
        lastMessage: newMsg.msg,
        date: newMsg.date,
      };
      setChats((prev) => [newChat, ...prev]);
    }
  }

  newMsgSound();
};

export const messagesLoadedListener = async (
  chat,
  setMessages,
  setBannerData,
  openChatId,
  divRef,
  scrollDivToBottom
) => {
  setMessages(chat.messages);
  setBannerData({
    name: chat.messagesWith.name,
    profilePicUrl: chat.messagesWith.profilePicUrl,
  });

  openChatId.current = chat.messagesWith._id; // saving curent message value in url
  divRef.current && scrollDivToBottom(divRef);
};

export const noChatFoundListener = async (
  router,
  toast,
  setBannerData,
  setMessages,
  openChatId
) => {
  const userInfo = await getUserInfo(router.query.message);

  if (!userInfo) {
    router.push("/messages");
    toast.error("No User Found");
    return;
  }

  const { name, profilePicUrl } = userInfo;

  setBannerData({ name, profilePicUrl });
  setMessages([]);

  openChatId.current = router.query.message;
};
