// Mock data pre správy
export const mockChats = [
  {
    id: 1,
    name: "Futbal U16",
    type: "group",
    lastMessage: "Dobrý deň!",
    lastMessageTime: "13:02",
    avatar: "T",
  },
];

export const mockMessages = {
  1: [
    {
      id: 1,
      senderId: 2,
      senderName: "Ján Tréner",
      senderInitials: "JT",
      text: "Ahoj všetci! V stredu bude tréning o 17:00.",
      time: "10:30",
      isOwn: false,
    },
    {
      id: 2,
      senderId: 4,
      senderName: "Peter Hráč",
      senderInitials: "PH",
      text: "Prídem, ďakujem!",
      time: "10:35",
      isOwn: false,
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Admin Hlavný",
      senderInitials: "AH",
      text: "Dobrý deň!",
      time: "13:02",
      isOwn: true,
    },
  ],
};

// Funkcie pre prácu so správami
export const getChatById = (id) => {
  return mockChats.find((c) => c.id === id) || null;
};

export const getMessagesByChatId = (chatId) => {
  return mockMessages[chatId] || [];
};

export const addMessage = (chatId, message) => {
  if (!mockMessages[chatId]) {
    mockMessages[chatId] = [];
  }
  const newMessage = {
    ...message,
    id: mockMessages[chatId].length + 1,
  };
  mockMessages[chatId].push(newMessage);
  return newMessage;
};
