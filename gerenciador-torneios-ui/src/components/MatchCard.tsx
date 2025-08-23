// src/components/MatchCard.tsx
import React from 'react';
import { MatchStatus, type Match } from '../types'; // Importe o tipo Match
import './MatchCard.css'; // Crie um CSS para estilizar

// Definindo os tipos das props que o componente espera receber
interface MatchCardProps {
    match: Match;
    onEditScore: (matchId: number) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onEditScore }) => {
    const isCompleted = match.status === MatchStatus.COMPLETED;

    // Função para determinar a classe CSS do vencedor/perdedor
    const getTeamClass = (teamScore: number | null, opponentScore: number | null) => {
        if (!isCompleted || teamScore === null || opponentScore === null) return '';
        return teamScore > opponentScore ? 'winner' : 'loser';
    };

    return (
        <div className="match-card">
            <div className={`team ${getTeamClass(match.scoreTeamA, match.scoreTeamB)}`}>
                <span>{match.teamA?.name ?? 'A definir'}</span>
                <span>{match.scoreTeamA ?? '-'}</span>
            </div>
            <div className={`team ${getTeamClass(match.scoreTeamB, match.scoreTeamA)}`}>
                <span>{match.teamB?.name ?? 'A definir'}</span>
                <span>{match.scoreTeamB ?? '-'}</span>
            </div>
            {/* O botão pode ser condicional (ex: só para admin) */}
            <button onClick={() => onEditScore(match.id)} className="edit-button">
                ✏️
            </button>
        </div>
    );
};

export default MatchCard;