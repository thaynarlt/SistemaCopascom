// src/components/Bracket.tsx
import React from 'react';
import type { Match } from '../types';
import MatchCard from './MatchCard';
import './Bracket.css'; // Crie um CSS para o layout (usando flexbox)

interface BracketProps {
    matches: Match[];
    onEditScore: (matchId: number) => void;
}

const Bracket: React.FC<BracketProps> = ({ matches, onEditScore }) => {
    // Agrupa as partidas por rodada (round)
    const rounds = matches.reduce((acc, match) => {
        const round = `Rodada ${match.round}`;
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push(match);
        return acc;
    }, {} as Record<string, Match[]>); // Tipagem do acumulador

    return (
        <div className="bracket-container">
            {Object.entries(rounds).map(([roundName, roundMatches]) => (
                <div className="round" key={roundName}>
                    <h3>{roundName}</h3>
                    {roundMatches.map(match => (
                        <MatchCard 
                            key={match.id} 
                            match={match} 
                            onEditScore={onEditScore} 
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Bracket;