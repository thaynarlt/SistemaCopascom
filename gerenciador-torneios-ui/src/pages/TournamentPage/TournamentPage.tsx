import React, { useState, useMemo } from 'react';
import './style.css';
import type { Match, TeamCategory } from '../../types';
import { useTeams } from '../../hooks/useTeams';
import { generateRoundRobinMatches } from '../../utils/tournamentUtils';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

// --- COMPONENTES MOCKADOS POR ENQUANTO (Vamos criá-los depois) ---
const Bracket: React.FC<{ matches: Match[] }> = ({ matches }) => (
  <div className="bracket">
    <h3>Confrontos</h3>
    {matches.map((match, index) => (
      <div key={index} className="match-card">
        <span>{match.teamA?.name ?? 'A definir'}</span>
        <span> X </span>
        <span>{match.teamB?.name ?? 'A definir'}</span>
      </div>
    ))}
  </div>
);

// --- PÁGINA PRINCIPAL ---

const TournamentPage: React.FC = () => {
  const { teams, loading } = useTeams(); // Busca todos os times
  
  // Estados para controlar a seleção do usuário
  const [selectedSport, setSelectedSport] = useState<string>('Futsal'); // Exemplo
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory>('MASCULINO'); // Exemplo

  // Filtra os times com base na seleção do usuário
  const filteredTeams = useMemo(() => {
    return teams.filter(team => 
      team.category === selectedCategory && 
      team.sports?.some(s => s.name === selectedSport)
    );
  }, [teams, selectedSport, selectedCategory]);

  // Gera as partidas com base nos times filtrados
  const matches = useMemo(() => {
    // Adicionamos IDs temporários para usar como key no React
    return generateRoundRobinMatches(filteredTeams, selectedSport).map((match, index) => ({
      ...match,
      id: index,
    }));
  }, [filteredTeams, selectedSport]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="tournament-container">
      <h1>Chaveamento e Resultados</h1>
      
      {/* TODO: Criar um componente de seleção mais robusto */}
      <div className="selectors">
        <label>
          Esporte:
          <select value={selectedSport} onChange={e => setSelectedSport(e.target.value)}>
            {/* Você pode popular isso dinamicamente */}
            <option value="Futsal">Futsal</option>
            <option value="Vôlei">Vôlei</option>
            <option value="Baleado">Baleado</option>
          </select>
        </label>
        <label>
          Categoria:
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value as TeamCategory)}>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
            <option value="MISTO">Misto</option>
          </select>
        </label>
      </div>

      <div className="tournament-content">
        <Bracket matches={matches} />
        {/* Futuramente, o RankingTable virá aqui */}
      </div>
    </div>
  );
};

export default TournamentPage;