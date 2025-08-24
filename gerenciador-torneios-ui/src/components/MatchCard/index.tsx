import React from 'react';
import { MatchStatus, type Match } from '../../types';
import './style.css';

interface MatchCardProps {
    match: Match;
    onEditScore: (match: Match) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onEditScore }) => {
    const isCompleted = match.status === MatchStatus.FINALIZADO;

    const getTeamClass = (team: 'A' | 'B') => {
        if (!isCompleted || !match.winner) return '';
        const isWinner = team === 'A' ? match.winner.id === match.teamA?.id : match.winner.id === match.teamB?.id;
        return isWinner ? 'winner' : 'loser';
    };
    
    // O botão de editar só aparece se a partida tiver 2 times e não estiver finalizada
    const canEdit = match.teamA && match.teamB && !isCompleted;

    return (
        <div className="match-card">
            <div className={`team ${getTeamClass('A')}`}>
                <span>{match.teamA?.name ?? 'A definir'}</span>
                <span className="score">{match.scoreTeamA ?? '-'}</span>
            </div>
            <div className={`team ${getTeamClass('B')}`}>
                <span>{match.teamB?.name ?? 'A definir'}</span>
                <span className="score">{match.scoreTeamB ?? '-'}</span>
            </div>
            
            {canEdit && (
                <button onClick={() => onEditScore(match)} className="edit-button" title="Registrar Placar">
                    ✏️
                </button>
            )}
        </div>
    );
};

export default MatchCard;