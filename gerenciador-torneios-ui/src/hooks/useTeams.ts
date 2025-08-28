// src/hooks/useTeams.ts

import { useState, useEffect, useCallback } from "react";
import type { Team, Player } from "../types";
import api from "../services/api";

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Team[]>("/teams");
      setTeams(response.data);
    } catch (err) {
      setError("Falha ao carregar os times. O backend está online?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const addTeam = async (teamData: Omit<Team, "id" | "players" | "sports"> & { sports: string[] }) => {
    const response = await api.post<Team>("/teams", teamData);
    // A API retorna o time completo, com o objeto Sport. O estado local ficará correto.
    setTeams((prevTeams) => [...prevTeams, response.data]);
  };

  const updateTeam = async (id: number, teamData: Omit<Team, "id" | "players" | "sports"> & { sports: string[] }) => {
    const response = await api.put<Team>(`/teams/${id}`, teamData);
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.id === id ? response.data : team))
    );
  };
  
  const deleteTeam = async (teamId: number) => {
    await api.delete(`/teams/${teamId}`);
    setTeams((prevTeams) => prevTeams.filter((t) => t.id !== teamId));
  };
  
  const savePlayer = async (teamId: number, playerData: Omit<Player, "id">, playerId?: number) => {
    let updatedPlayer: Player;
    
    if (playerId) {
      // Editar jogador
      const response = await api.put<Player>(`/players/${playerId}`, playerData);
      updatedPlayer = response.data;
    } else {
      // Adicionar novo jogador
      const response = await api.post<Player>(`/teams/${teamId}/players`, playerData);
      updatedPlayer = response.data;
    }

    // Atualiza o estado dos times de forma imutável
    setTeams((prevTeams) => 
      prevTeams.map((team) => {
        if (team.id !== teamId) return team;
        
        const playerExists = team.players.some(p => p.id === updatedPlayer.id);
        const updatedPlayers = playerExists
          ? team.players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p)
          : [...team.players, updatedPlayer];
          
        return { ...team, players: updatedPlayers };
      })
    );
  };

  return { teams, loading, error, fetchTeams, addTeam, updateTeam, deleteTeam, savePlayer };
}