import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useUser } from "../context/UserContext";
import { getChatById, getMessagesByChatId, addMessage } from "../models/messages";

export default function ChatDetailScreen({ navigation, route }) {
  const { user } = useUser();
  const { chatId } = route.params;
  const chat = getChatById(chatId);
  const [messages, setMessages] = useState(getMessagesByChatId(chatId));
  const [messageText, setMessageText] = useState("");

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text>Chat nebol nájdený</Text>
      </View>
    );
  }

  const getInitials = (name) => {
    if (name && name.length > 0) {
      return name[0].toUpperCase();
    }
    return "?";
  };

  const handleSend = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      senderId: user?.id || 1,
      senderName: user ? `${user.firstName} ${user.lastName}` : "User",
      senderInitials: user
        ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
        : "U",
      text: messageText,
      time: new Date().toLocaleTimeString("sk-SK", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    addMessage(chatId, newMessage);
    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(chat.avatar)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.chatTitle}>{chat.name}</Text>
          <Text style={styles.chatSubtitle}>
            {chat.type === "group" ? "Skupinový chat" : "Súkromný chat"}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isOwn ? styles.messageOwn : styles.messageOther,
            ]}
          >
            {!message.isOwn && (
              <View style={styles.messageAvatar}>
                <Text style={styles.messageAvatarText}>
                  {message.senderInitials}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                message.isOwn ? styles.messageBubbleOwn : styles.messageBubbleOther,
              ]}
            >
              {!message.isOwn && (
                <Text style={styles.messageSender}>{message.senderName}</Text>
              )}
              <Text
                style={[
                  styles.messageText,
                  message.isOwn ? styles.messageTextOwn : styles.messageTextOther,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  message.isOwn ? styles.messageTimeOwn : styles.messageTimeOther,
                ]}
              >
                {message.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Napíšte správu..."
          placeholderTextColor="#999"
          value={messageText}
          onChangeText={setMessageText}
          multiline={true}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendIcon}>✈️</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("TrainingList")}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>Tréningy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => navigation.navigate("Messages")}
        >
          <Text style={styles.navIcon}>💬</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Správy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: "#333",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2196F3",
  },
  headerInfo: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  chatSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  messageOwn: {
    justifyContent: "flex-end",
  },
  messageOther: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  messageAvatarText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2196F3",
  },
  messageBubble: {
    maxWidth: "70%",
    borderRadius: 16,
    padding: 12,
  },
  messageBubbleOwn: {
    backgroundColor: "#2196F3",
  },
  messageBubbleOther: {
    backgroundColor: "#E0E0E0",
  },
  messageSender: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageTextOwn: {
    color: "#fff",
  },
  messageTextOther: {
    color: "#333",
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  messageTimeOwn: {
    color: "#E3F2FD",
  },
  messageTimeOther: {
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navItemActive: {
    // Active state
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: "#666",
  },
  navLabelActive: {
    color: "#2196F3",
    fontWeight: "600",
  },
});
