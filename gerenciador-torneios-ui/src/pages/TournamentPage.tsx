// src/pages/TournamentPage.tsx
import React, { useState, useEffect } from 'react';
import type { Match } from '../types';
import Bracket from '../components/Bracket';
import api from '../services/api';
// Futuramente, você terá um ScoreModal aqui
// import ScoreModal from '../components/ScoreModal';

const TournamentPage: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

    useEffect(() => {
        const fetchBracketData = async () => {
            try {
                // Exemplo: buscando dados do torneio 1, esporte 1
                const response = await api.get<Match[]>('/tournaments/1/sports/1/bracket');
                setMatches(response.data);
            } catch (error) {
                console.error("Falha ao buscar dados da chave:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBracketData();
    }, []);

    const handleOpenScoreModal = (matchId: number) => {
        console.log("Abrir modal para a partida:", matchId);
        // setSelectedMatchId(matchId);
        // Aqui você controlaria a visibilidade de um modal de placar
    };

    if (loading) return <p>Carregando chaveamento...</p>;

    return (
        <div>
            <h1>Chave do Torneio</h1>
            <Bracket matches={matches} onEditScore={handleOpenScoreModal} />

            {/* {selectedMatchId && (
                <ScoreModal 
                    matchId={selectedMatchId} 
                    onClose={() => setSelectedMatchId(null)}
                    onSave={handleUpdateScore} // Essa função chamaria a API PUT /api/matches/{id}
                />
            )}
            */}
        </div>
    );
};

export default TournamentPage;