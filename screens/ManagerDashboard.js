import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../context/UserContext";
import { mockTeams } from "../models/teams";
import { mockUsers } from "../models/users";

export default function ManagerDashboard({ navigation }) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("teams"); // "teams" or "users"

  const getInitials = (user) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  const getRoleName = (role) => {
    const roles = {
      admin: "Admin",
      manager: "Manažér",
      trainer: "Tréner",
      player: "Hráč/Rodič",
    };
    return roles[role] || role;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🛡️</Text>
          <Text style={styles.title}>Dashboard manažéra</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "teams" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("teams")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "teams" && styles.tabTextActive,
              ]}
            >
              Tímy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "users" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("users")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "users" && styles.tabTextActive,
              ]}
            >
              Používatelia
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === "teams" ? (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {mockTeams.length} tímov
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Pridať tím</Text>
                </TouchableOpacity>
              </View>

              {mockTeams.map((team) => (
                <View key={team.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{team.name}</Text>
                    <Text style={styles.cardSubtitle}>{team.sport}</Text>
                    <Text style={styles.cardInfo}>
                      {team.members} členov • Tréner: Ján Tréner
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {mockUsers.length} používateľov
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Pridať používateľa</Text>
                </TouchableOpacity>
              </View>

              {mockUsers.map((userItem) => (
                <View key={userItem.id} style={styles.card}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>
                      {getInitials(userItem)}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>
                      {userItem.firstName} {userItem.lastName}
                    </Text>
                    <Text style={styles.cardSubtitle}>{userItem.email}</Text>
                    <View style={styles.userInfo}>
                      <View style={styles.roleTag}>
                        <Text style={styles.roleTagText}>
                          {getRoleName(userItem.role)}
                        </Text>
                      </View>
                      <Text style={styles.cardInfo}>
                        {userItem.age} rokov
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>

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
          onPress={() => navigation.navigate("ManagerDashboard")}
        >
          <Text style={styles.navIcon}>👥</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>
            Dashboard
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
  headerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "#f0f0f0",
  },
  tabActive: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#333",
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2196F3",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 12,
    color: "#999",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  roleTag: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  roleTagText: {
    fontSize: 12,
    color: "#2196F3",
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
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
