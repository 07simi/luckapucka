import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";
import { mockUsers } from "../models/users";

export default function AdminDashboard({ navigation }) {
  const { user } = useUser();
  const managers = mockUsers.filter((u) => u.role === "manager");

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
        </View>

        <View style={styles.content}>
          {/* Manager Management */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Správa manažérov</Text>
              <Text style={styles.cardSubtitle}>{managers.length} manažérov</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Pridať</Text>
            </TouchableOpacity>

            {managers.map((manager) => (
              <View key={manager.id} style={styles.managerCard}>
                <View style={styles.managerInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {manager.firstName[0]}{manager.lastName[0]}
                    </Text>
                  </View>
                  <View style={styles.managerDetails}>
                    <Text style={styles.managerName}>
                      {manager.firstName} {manager.lastName}
                    </Text>
                    <Text style={styles.managerEmail}>{manager.email}</Text>
                    <View style={styles.roleTag}>
                      <Text style={styles.roleTagText}>Manažér</Text>
                    </View>
                    <Text style={styles.managerStats}>
                      {manager.age} rokov • {manager.teams} tímov
                    </Text>
                  </View>
                </View>
                <View style={styles.managerActions}>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                  <View style={{ width: 8 }} />
                  <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* System Statistics */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Štatistiky systému</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statColumn}>
                <Text style={styles.statLabel}>Celkom používateľov</Text>
                <Text style={styles.statValue}>{mockUsers.length}</Text>
                <Text style={styles.statLabel}>Trénerov</Text>
                <Text style={styles.statValue}>
                  {mockUsers.filter((u) => u.role === "trainer").length}
                </Text>
              </View>
              <View style={styles.statColumn}>
                <Text style={styles.statLabel}>Manažérov</Text>
                <Text style={styles.statValue}>{managers.length}</Text>
                <Text style={styles.statLabel}>Hráčov</Text>
                <Text style={styles.statValue}>
                  {mockUsers.filter((u) => u.role === "player").length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => navigation.navigate("AdminDashboard")}
        >
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Admin</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#9C27B0",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  managerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  managerInfo: {
    flexDirection: "row",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E1BEE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7B1FA2",
  },
  managerDetails: {
    flex: 1,
  },
  managerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  managerEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  roleTag: {
    alignSelf: "flex-start",
    backgroundColor: "#E1BEE7",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  roleTagText: {
    fontSize: 12,
    color: "#7B1FA2",
    fontWeight: "500",
  },
  managerStats: {
    fontSize: 12,
    color: "#999",
  },
  managerActions: {
    flexDirection: "row",
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 20,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statColumn: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
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
