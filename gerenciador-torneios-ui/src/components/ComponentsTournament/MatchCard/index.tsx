import React from 'react';
import './style.css';
import type { Match } from '../../../types';

interface MatchCardProps {
  match: Match;
  // Função que será chamada quando um placar for alterado
  onScoreChange: (matchId: number, team: 'teamA' | 'teamB', score: number) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onScoreChange }) => {
  const handleScoreInputChange = (team: 'teamA' | 'teamB', value: string) => {
    // Converte o valor para número, tratando string vazia como 0
    const score = parseInt(value, 10);
    if (!isNaN(score)) {
      onScoreChange(match.id, team, score);
    }
  };

  return (
    <div className="match-card">
      <span className="team-name">{match.teamA?.name ?? 'A definir'}</span>
      <div className="score-inputs">
        <input
          type="number"
          min="0"
          className="score-input"
          value={match.scoreTeamA ?? ''}
          onChange={(e) => handleScoreInputChange('teamA', e.target.value)}
        />
        <span>X</span>
        <input
          type="number"
          min="0"
          className="score-input"
          value={match.scoreTeamB ?? ''}
          onChange={(e) => handleScoreInputChange('teamB', e.target.value)}
        />
      </div>
      <span className="team-name">{match.teamB?.name ?? 'A definir'}</span>
    </div>
  );
};