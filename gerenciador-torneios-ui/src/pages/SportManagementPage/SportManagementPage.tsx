// src/pages/SportManagementPage.tsx

import React from "react"; // Adicione o import do React
import { CompetingTeamsPanel } from "../../components/CompetingTeamsPanel";
import { useTeams } from "../../hooks/useTeams"; // 1. Importe o hook useTeams
import "./style.css";

const SportManagementPage: React.FC = () => {
  // 2. Chame o hook para buscar os times, o estado de loading e erros
  const { teams, loading, error } = useTeams();

  // 3. Adicione uma verificação de carregamento para uma melhor experiência do usuário
  if (loading) {
    return <p className="loading-message">Carregando times...</p>;
  }

  // 4. Adicione uma verificação de erro
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <main className="dashboard-container">
      <h1 className="titulo1">Times em cada Esporte</h1>
      <section>
        {/* 5. Passe a lista de 'teams' (que veio da API) para o componente */}
        <CompetingTeamsPanel teams={teams} />
      </section>
    </main>
  );
};

export default SportManagementPage;
