import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// USERS
export const getUsers = () => API.get("/api/users");
export const createUser = (data) => API.post("/api/users", data);

// GAMES
export const getGames = () => API.get("/api/games");
export const createGame = (data) => API.post("/api/games", data);

// SCORES
export const getScores = () => API.get("/api/score");
export const createScore = (data) => API.post("/api/score", data);
