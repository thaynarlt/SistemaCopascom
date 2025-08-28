import React, { useMemo } from "react"; // Importa o useMemo
import { CompetingTeamsPanel } from "../../components/CompetingTeamsPanel";
import { useTeams } from "../../hooks/useTeams";
import "./style.css";

const SportManagementPage: React.FC = () => {
  const { teams, loading, error } = useTeams();

  // Usamos useMemo para filtrar as listas de times por gênero.
  // Isso evita que o filtro seja re-executado em cada renderização.
  const maleTeams = useMemo(
    () => teams.filter(team => team.category === 'MASCULINO'),
    [teams]
  );
  
  const femaleTeams = useMemo(
    () => teams.filter(team => team.category === 'FEMININO'),
    [teams]
  );

  const mixedTeams = useMemo(
    () => teams.filter(team => team.category === 'MISTO'),
    [teams]
  );


  if (loading) {
    return <p className="loading-message">Carregando times...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <main className="dashboard-container">
      <h1 className="titulo1">Gerenciamento de Competições</h1>
      
      {/* Renderizamos o componente CompetingTeamsPanel três vezes, 
        uma para cada categoria de gênero, passando o título e a lista filtrada.
        O componente só será exibido se houver times na respectiva lista.
      */}
      
      <CompetingTeamsPanel 
        title="Competição Masculina"
        teams={maleTeams} 
      />

      <CompetingTeamsPanel 
        title="Competição Feminina"
        teams={femaleTeams} 
      />
      
      <CompetingTeamsPanel 
        title="Competição Mista"
        teams={mixedTeams} 
      />

    </main>
  );
};

export default SportManagementPage;