// Mock data pre tímy
export const mockTeams = [
  {
    id: 1,
    name: "Futbal U16",
    sport: "Futbal",
    members: 2,
    trainerId: 2, // Ján Tréner
  },
  {
    id: 2,
    name: "Futbal U18",
    sport: "Futbal",
    members: 0,
    trainerId: 2,
  },
  {
    id: 3,
    name: "Basketbal Ženy",
    sport: "Basketbal",
    members: 0,
    trainerId: 2,
  },
];

// Funkcie pre prácu s tímami
export const getTeamById = (id) => {
  return mockTeams.find((t) => t.id === id) || null;
};

export const getTeamsByTrainer = (trainerId) => {
  return mockTeams.filter((t) => t.trainerId === trainerId);
};
