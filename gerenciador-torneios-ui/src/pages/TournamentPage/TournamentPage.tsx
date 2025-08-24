// src/pages/TournamentPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Match } from '../../types';
import Bracket from '../../components/Bracket';
import ScoreModal from '../../components/ScoreModal';
import api from '../../services/api';

const TournamentPage: React.FC = () => {
    const { tournamentId, sportId } = useParams<{ tournamentId: string; sportId: string }>();
    const [matches, setMatches] = useState<Match[]>([]);
    const [sportName, setSportName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    const fetchBracketData = async () => {
        try {
            setLoading(true);
            setError(null);
            // Idealmente, seu backend retornaria o nome do esporte junto com as partidas
            const response = await api.get<Match[]>(`/tournaments/${tournamentId}/sports/${sportId}/bracket`);
            setMatches(response.data);
            if (response.data.length > 0 && response.data[0].sport) {
                setSportName(response.data[0].sport.name);
            }
        } catch (error) {
            console.error("Falha ao buscar dados da chave:", error);
            setError("Não foi possível carregar os dados do torneio. Verifique se o backend está rodando.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tournamentId && sportId) {
            fetchBracketData();
        }
    }, [tournamentId, sportId]);

    const handleOpenScoreModal = (match: Match) => {
        setSelectedMatch(match);
    };

    const handleCloseModal = () => {
        setSelectedMatch(null);
    };

    const handleSaveScore = async (scoreA: number, scoreB: number) => {
        if (!selectedMatch) return;
        try {
            await api.post(`/matches/${selectedMatch.id}/result`, { scoreTeamA: scoreA, scoreTeamB: scoreB });
            handleCloseModal();
            fetchBracketData(); // Recarrega os dados para atualizar a UI
        } catch (error) {
            console.error("Erro ao salvar placar:", error);
            alert("Não foi possível salvar o placar. Verifique se o placar não é um empate.");
        }
    };

    if (loading) return <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Carregando chaveamento...</p>;
    if (error) return <p style={{ color: "red", textAlign: 'center', fontSize: '1.2rem' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Chave do Torneio - {sportName}</h1>
            <Bracket matches={matches} onEditScore={handleOpenScoreModal} />

            {selectedMatch && (
                <ScoreModal 
                    match={selectedMatch} 
                    onClose={handleCloseModal}
                    onSave={handleSaveScore}
                />
            )}
        </div>
    );
};

export default TournamentPage;