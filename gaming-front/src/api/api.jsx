import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// ========================= USERS =========================
export const getUsers = () => API.get("/api/users");
export const createUser = (data) => API.post("/api/users", data);

// ========================= GAMES =========================
export const getGames = () => API.get("/api/games");
export const createGame = (data) => API.post("/api/games", data);

// ========================= SCORES =========================
export const getScores = () => API.get("/api/score");
export const createScore = (data) => API.post("/api/score", data);

// ====================== TOURNAMENTS =======================
export const getTournaments = () => API.get("/api/tournaments");
export const getTournament = (id) => API.get(`/api/tournaments/${id}`);
export const createTournament = (data) => API.post("/api/tournaments", data);
export const updateTournament = (id, data) =>
  API.put(`/api/tournaments/${id}`, data);
export const deleteTournament = (id) =>
  API.delete(`/api/tournaments/${id}`);
