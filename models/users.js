// Mock data pre používateľov
export const mockUsers = [
  {
    id: 1,
    email: "admin@ta.sk",
    password: "admin123",
    firstName: "Admin",
    lastName: "Hlavný",
    age: 45,
    role: "admin",
    teams: 0,
  },
  {
    id: 2,
    email: "trener@ta.sk",
    password: "trener123",
    firstName: "Ján",
    lastName: "Tréner",
    age: 35,
    role: "trainer",
    teams: 2,
  },
  {
    id: 3,
    email: "manazer@ta.sk",
    password: "manazer123",
    firstName: "Eva",
    lastName: "Manažérová",
    age: 38,
    role: "manager",
    teams: 3,
  },
  {
    id: 4,
    email: "hrac@ta.sk",
    password: "hrac123",
    firstName: "Peter",
    lastName: "Hráč",
    age: 18,
    role: "player",
    teams: 1,
  },
  {
    id: 5,
    email: "rodic@ta.sk",
    password: "rodic123",
    firstName: "Mária",
    lastName: "Rodičová",
    age: 42,
    role: "player",
    teams: 1,
  },
];

// Funkcia na overenie prihlasovacích údajov
export const authenticateUser = (email, password) => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
};

// Funkcia na získanie používateľa podľa emailu
export const getUserByEmail = (email) => {
  return mockUsers.find((u) => u.email === email) || null;
};
