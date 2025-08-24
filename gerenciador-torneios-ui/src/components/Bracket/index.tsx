import React from 'react';
import './style.css';
import type { Match } from '../../types';
import MatchCard from '../MatchCard';

interface BracketProps {
    matches: Match[];
    onEditScore: (match: Match) => void;
}

const Bracket: React.FC<BracketProps> = ({ matches, onEditScore }) => {
    const rounds = matches.reduce((acc, match) => {
        const round = match.round;
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push(match);
        return acc;
    }, {} as Record<number, Match[]>);

    return (
        <div className="bracket-container">
            {Object.keys(rounds).sort((a,b) => Number(a) - Number(b)).map(roundKey => {
                const roundNumber = Number(roundKey);
                const roundMatches = rounds[roundNumber];

                // Lógica simples para nomear as rodadas
                let roundName = `Rodada ${roundNumber}`;
                if (roundMatches.length === 1) roundName = 'Final';
                else if (roundMatches.length === 2) roundName = 'Semifinais';
                else if (roundMatches.length === 4) roundName = 'Quartas de Final';

                return (
                    <div className="round" key={roundKey}>
                        <h3>{roundName}</h3>
                        {roundMatches.map(match => (
                            <MatchCard 
                                key={match.id} 
                                match={match} 
                                onEditScore={onEditScore} 
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Bracket;