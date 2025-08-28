import React, { useMemo } from 'react';
import './style.css';
import type { Match, Team } from '../../../types';

interface RankingTableProps {
  matches: Match[];
  teams: Team[];
}

interface TeamStats {
  teamId: number;
  teamName: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export const RankingTable: React.FC<RankingTableProps> = ({ matches, teams }) => {
  const sortedStats = useMemo(() => {
    const statsMap = new Map<number, TeamStats>();

    // 1. Inicializa as estatísticas para todos os times
    teams.forEach(team => {
      statsMap.set(team.id, {
        teamId: team.id,
        teamName: team.name,
        points: 0, played: 0, wins: 0, draws: 0, losses: 0,
        goalsFor: 0, goalsAgainst: 0, goalDifference: 0,
      });
    });

    // 2. Itera sobre as partidas para calcular os pontos
    matches.forEach(match => {
      const scoreA = match.scoreTeamA;
      const scoreB = match.scoreTeamB;

      // Só processa partidas com placar preenchido
      if (scoreA === null || scoreB === null || !match.teamA || !match.teamB) {
        return;
      }

      const statsA = statsMap.get(match.teamA.id)!;
      const statsB = statsMap.get(match.teamB.id)!;
      
      // Atualiza estatísticas gerais
      statsA.played += 1;
      statsB.played += 1;
      statsA.goalsFor += scoreA;
      statsB.goalsFor += scoreB;
      statsA.goalsAgainst += scoreB;
      statsB.goalsAgainst += scoreA;

      // Determina vencedor e atribui pontos
      if (scoreA > scoreB) { // Vitória do Time A
        statsA.wins += 1;
        statsA.points += 2; // Vitória = 2 pontos
        statsB.losses += 1;
      } else if (scoreB > scoreA) { // Vitória do Time B
        statsB.wins += 1;
        statsB.points += 2; // Vitória = 2 pontos
        statsA.losses += 1;
      } else { // Empate
        statsA.draws += 1;
        statsB.draws += 1;
        statsA.points += 1; // Empate = 1 ponto
        statsB.points += 1;
      }
    });

    // 3. Converte o Map para Array e ordena
    const statsArray = Array.from(statsMap.values());
    statsArray.forEach(s => s.goalDifference = s.goalsFor - s.goalsAgainst);
    
    statsArray.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points; // Pontos
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference; // Saldo de gols
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor; // Gols pró
      return a.teamName.localeCompare(b.teamName); // Ordem alfabética
    });
    
    return statsArray;
  }, [matches, teams]);

  if (teams.length < 2) {
    return <h4>Adicione ao menos 2 times para gerar a classificação.</h4>
  }

  return (
    <div className="ranking-container">
      <h3>Classificação</h3>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Time</th>
            <th>P</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>GP</th>
            <th>GC</th>
            <th>SG</th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map((stat, index) => (
            <tr key={stat.teamId}>
              <td>{index + 1}</td>
              <td className="team-name-cell">{stat.teamName}</td>
              <td>{stat.points}</td>
              <td>{stat.played}</td>
              <td>{stat.wins}</td>
              <td>{stat.draws}</td>
              <td>{stat.losses}</td>
              <td>{stat.goalsFor}</td>
              <td>{stat.goalsAgainst}</td>
              <td>{stat.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};