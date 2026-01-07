import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../context/UserContext";
import { getTrainingById } from "../models/trainings";
import { getAttendanceByTraining } from "../models/attendance";
import { confirmAttendance, unconfirmAttendance } from "../models/attendance";
import { mockUsers } from "../models/users";

export default function TrainingDetailScreen({ navigation, route }) {
  const { user } = useUser();
  const { trainingId } = route.params;
  const training = getTrainingById(trainingId);
  const attendance = getAttendanceByTraining(trainingId);

  if (!training) {
    return (
      <View style={styles.container}>
        <Text>Tréning nebol nájdený</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "nedeľa",
      "pondelok",
      "utorok",
      "streda",
      "štvrtok",
      "piatok",
      "sobota",
    ];
    const months = [
      "januára",
      "februára",
      "marca",
      "apríla",
      "mája",
      "júna",
      "júla",
      "augusta",
      "septembra",
      "októbra",
      "novembra",
      "decembra",
    ];
    return `${days[date.getDay()]} ${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getRecurrenceText = (recurrence) => {
    const recurrences = {
      weekly: "Týždenne",
      daily: "Denne",
      monthly: "Mesačne",
      none: "Bez opakovania",
    };
    return recurrences[recurrence] || recurrence;
  };

  const getUserById = (id) => {
    return mockUsers.find((u) => u.id === id) || null;
  };

  const getInitials = (user) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  const handleConfirm = () => {
    if (user) {
      confirmAttendance(trainingId, user.id);
      navigation.goBack();
      navigation.navigate("TrainingList");
    }
  };

  const handleUnconfirm = () => {
    if (user) {
      unconfirmAttendance(trainingId, user.id);
      navigation.goBack();
      navigation.navigate("TrainingList");
    }
  };

  const confirmedUsers = attendance.confirmed.map((id) =>
    mockUsers.find((u) => u.id === id)
  );
  const notConfirmedUsers = attendance.notConfirmed.map((id) =>
    mockUsers.find((u) => u.id === id)
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{training.teamName}</Text>
        </View>

        {/* Training Info Card */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>{formatDate(training.date)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🕐</Text>
            <Text style={styles.infoText}>{training.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>{training.location}</Text>
          </View>
          {training.recurrence && training.recurrence !== "none" && (
            <View style={styles.recurrenceTag}>
              <Text style={styles.recurrenceText}>
                Opakuje sa: {getRecurrenceText(training.recurrence)}
              </Text>
            </View>
          )}
        </View>

        {/* Training Content Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Náplň tréningu</Text>
          <Text style={styles.description}>{training.description}</Text>
        </View>

        {/* Attendance Buttons (only for players/parents) */}
        {(user?.role === "player" || user?.role === "parent") && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Prídem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.unconfirmButton}
              onPress={handleUnconfirm}
            >
              <Text style={styles.unconfirmButtonText}>Neprídem</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Attendance List */}
        <View style={styles.card}>
          <View style={styles.attendanceHeader}>
            <Text style={styles.attendanceIcon}>👥</Text>
            <Text style={styles.cardTitle}>Účasť</Text>
          </View>

          {/* Confirmed */}
          <Text style={styles.attendanceSubtitle}>
            Prídu ({confirmedUsers.length})
          </Text>
          {confirmedUsers.map((user) => (
            <View key={user?.id} style={styles.userRow}>
              <View style={[styles.avatar, styles.avatarConfirmed]}>
                <Text style={styles.avatarText}>{getInitials(user)}</Text>
              </View>
              <Text style={styles.userName}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          ))}

          {/* Not Confirmed */}
          <Text style={[styles.attendanceSubtitle, { marginTop: 16 }]}>
            Nepotvrdili ({notConfirmedUsers.length})
          </Text>
          {notConfirmedUsers.map((user) => (
            <View key={user?.id} style={styles.userRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(user)}</Text>
              </View>
              <Text style={styles.userName}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => navigation.navigate("TrainingList")}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>
            Tréningy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Messages")}
        >
          <Text style={styles.navIcon}>💬</Text>
          <Text style={styles.navLabel}>Správy</Text>
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
  scrollView: {
    flex: 1,
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
    marginRight: 16,
  },
  backIcon: {
    fontSize: 24,
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  recurrenceTag: {
    alignSelf: "flex-start",
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
  },
  recurrenceText: {
    fontSize: 12,
    color: "#2196F3",
    fontWeight: "500",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: "row",
    margin: 20,
    marginTop: 16,
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  unconfirmButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  unconfirmButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  attendanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  attendanceIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  attendanceSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
    marginBottom: 8,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
  avatarConfirmed: {
    backgroundColor: "#C8E6C9",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2196F3",
  },
  userName: {
    fontSize: 16,
    color: "#333",
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
