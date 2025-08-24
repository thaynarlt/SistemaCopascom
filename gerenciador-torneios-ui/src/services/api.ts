// src/services/api.ts
import axios from "axios";
import type { Player } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Verifique se a porta está correta
  headers: {
    "Content-Type": "application/json",
  },
});

export const addPlayerToTeam = async (
  teamId: number,
  playerData: { name: string; shirtNumber: number }
): Promise<Player> => {
  const response = await api.post<Player>(
    `/teams/${teamId}/players`,
    playerData
  );
  return response.data;
};

export default api;
