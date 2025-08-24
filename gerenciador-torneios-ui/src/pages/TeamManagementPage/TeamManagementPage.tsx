// src/pages/TeamManagementPage.tsx
import React, { useState, useEffect } from "react";

import "./TeamManagementPage.css";
import type { Team, TeamCategory } from "../../types";
import api, { addPlayerToTeam } from "../../services/api";

const TeamManagementPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [newTeamCategory, setNewTeamCategory] =
    useState<TeamCategory>("MASCULINO");

  // Estado para o formulário de jogador
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerNumber, setNewPlayerNumber] = useState("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Team[]>("/teams");
      setTeams(response.data);
    } catch (err) {
      setError("Falha ao carregar os times.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim() === "") return;
    try {
      const response = await api.post<Team>("/teams", {
        name: newTeamName,
        category: newTeamCategory,
      });
      setTeams([...teams, response.data]);
      setNewTeamName("");
    } catch (err) {
      setError("Falha ao adicionar o time.");
    }
  };

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedTeam ||
      newPlayerName.trim() === "" ||
      newPlayerNumber.trim() === ""
    )
      return;
    try {
      const shirtNumber = parseInt(newPlayerNumber, 10);
      if (isNaN(shirtNumber)) {
        alert("Número da camisa inválido.");
        return;
      }
      const newPlayer = await addPlayerToTeam(selectedTeam.id, {
        name: newPlayerName,
        shirtNumber,
      });

      // Atualiza a lista de times com o novo jogador
      const updatedTeams = teams.map((team) =>
        team.id === selectedTeam.id
          ? { ...team, players: [...team.players, newPlayer] }
          : team
      );
      setTeams(updatedTeams);
      setSelectedTeam((prev) =>
        prev ? { ...prev, players: [...prev.players, newPlayer] } : null
      );

      setNewPlayerName("");
      setNewPlayerNumber("");
    } catch (err) {
      setError("Falha ao adicionar jogador.");
    }
  };

  if (loading) return <p>Carregando times...</p>;

  return (
    <div className="management-container">
      <h1>Gerenciamento de Times e Jogadores</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="management-content">
        <div className="left-panel">
          <form className="add-form" onSubmit={handleAddTeam}>
            <h3>Cadastrar Novo Time</h3>
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Nome do time"
              required
            />
            <select
              value={newTeamCategory}
              onChange={(e) =>
                setNewTeamCategory(e.target.value as TeamCategory)
              }
            >
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </select>
            <button type="submit">Adicionar Time</button>
          </form>

          <div className="list-container">
            <h2>Times Cadastrados</h2>
            {teams.length === 0 ? (
              <p>Nenhum time cadastrado.</p>
            ) : (
              <ul>
                {teams.map((team) => (
                  <li
                    key={team.id}
                    onClick={() => setSelectedTeam(team)}
                    className={selectedTeam?.id === team.id ? "selected" : ""}
                  >
                    <span className="team-name">{team.name}</span>
                    <span className={`team-category ${team.category}`}>
                      {team.category}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="right-panel">
          {selectedTeam ? (
            <div>
              <h3>Jogadores de "{selectedTeam.name}"</h3>
              <form className="add-form" onSubmit={handleAddPlayer}>
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="Nome do Jogador"
                  required
                />
                <input
                  type="number"
                  value={newPlayerNumber}
                  onChange={(e) => setNewPlayerNumber(e.target.value)}
                  placeholder="Nº Camisa"
                  required
                />
                <button type="submit">Adicionar Jogador</button>
              </form>
              <div className="players-list">
                {selectedTeam.players.length === 0 ? (
                  <p>Nenhum jogador cadastrado.</p>
                ) : (
                  <ul>
                    {selectedTeam.players.map((player) => (
                      <li key={player.id}>
                        <span className="player-number">
                          {player.shirtNumber}
                        </span>
                        <span className="player-name">{player.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="placeholder">
              Selecione um time para ver os jogadores.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamManagementPage;
