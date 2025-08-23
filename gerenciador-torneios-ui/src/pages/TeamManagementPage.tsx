// src/pages/TeamManagementPage.tsx
import React, { useState, useEffect } from "react";
import api from "../services/api"; // Importe nossa instância do axios

// A interface que define a estrutura de um Time
// Ela deve corresponder ao que a API retorna
interface Team {
  id: number;
  name: string;
  players: unknown[] | null; // Por enquanto, não nos preocupamos com os jogadores
}

const TeamManagementPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os times do backend
  const fetchTeams = async () => {
    try {
      setLoading(true);
      // Usamos um generic <Team[]> para dizer ao Axios (e ao TS)
      // que esperamos um array de objetos Team como resposta.
      const response = await api.get<Team[]>("/teams");
      setTeams(response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar times:", err);
      setError("Falha ao carregar os times.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect para buscar os dados assim que o componente for montado
  useEffect(() => {
    fetchTeams();
  }, []); // O array vazio garante que isso rode apenas uma vez

  // Função para adicionar um novo time
  const handleAddTeam = async () => {
    if (newTeamName.trim() === "") return;
    try {
      // Envia o novo time para o backend
      const response = await api.post<Team>("/teams", { name: newTeamName });
      // Adiciona o novo time retornado pela API na lista local
      setTeams([...teams, response.data]);
      setNewTeamName("");
    } catch (err) {
      console.error("Erro ao adicionar time:", err);
      setError("Falha ao adicionar o time.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTeamName(e.target.value);
  };

  if (loading) return <p>Carregando times...</p>;

  return (
    <div>
      <h1>Sistema de Gerenciamento de Torneios</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={newTeamName}
        onChange={handleInputChange}
        placeholder="Nome do novo time"
      />
      <button onClick={handleAddTeam}>Adicionar Time</button>
      <h2>Times Cadastrados</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManagementPage;
