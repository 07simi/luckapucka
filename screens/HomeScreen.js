import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useUser();

  const getRoleName = (role) => {
    const roles = {
      admin: "Administrátor",
      manager: "Manažér",
      trainer: "Tréner",
      player: "Hráč",
    };
    return roles[role] || role;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Vitajte, {user?.firstName}!</Text>
          <Text style={styles.subtitle}>Role: {getRoleName(user?.role)}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Hlavná obrazovka</Text>
          <Text style={styles.info}>
            Tu bude zoznam tréningov a ďalšie funkcie podľa vašej role.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("TrainingList")}
          >
            <Text style={styles.buttonText}>Tréningy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Messages")}
          >
            <Text style={styles.buttonText}>Správy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.buttonText}>Profil</Text>
          </TouchableOpacity>

          {user?.role === "admin" && (
            <TouchableOpacity
              style={[styles.button, styles.adminButton]}
              onPress={() => navigation.navigate("AdminDashboard")}
            >
              <Text style={styles.buttonText}>Admin Dashboard</Text>
            </TouchableOpacity>
          )}

          {user?.role === "manager" && (
            <TouchableOpacity
              style={[styles.button, styles.managerButton]}
              onPress={() => navigation.navigate("ManagerDashboard")}
            >
              <Text style={styles.buttonText}>Manažér Dashboard</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={() => {
              logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          >
            <Text style={styles.buttonText}>Odhlásiť sa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: "#2196F3",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#E3F2FD",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  adminButton: {
    backgroundColor: "#9C27B0",
  },
  managerButton: {
    backgroundColor: "#FF9800",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
