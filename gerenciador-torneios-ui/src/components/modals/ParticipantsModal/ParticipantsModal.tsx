import React, { useState, useEffect, useMemo } from "react";
import type { Team, Player } from "../../../types";
import "./style.css";

interface ParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  sportName: string;
}

// 4. Helper movido para fora do componente para não ser recriado a cada renderização.
const getPlayersForSport = (players: Player[], sportName: string): Player[] => {
  return players.filter((player) =>
    player.sports.some((sport) => sport.name === sportName)
  );
};

export const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
  isOpen,
  onClose,
  teams,
  sportName,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedTeam(null);
    }
  }, [isOpen]);

  // 1. FILTRAGEM EFICIENTE: Calcula a lista de times participantes apenas quando 'teams' ou 'sportName' mudar.
  const teamsInSport = useMemo(() => {
    return (
      teams
        .map((team) => ({
          ...team,
          // Adicionamos uma propriedade temporária com os jogadores já filtrados
          participatingPlayers: getPlayersForSport(team.players, sportName),
        }))
        // Mantemos na lista apenas os times que têm jogadores no esporte
        .filter((team) => team.participatingPlayers.length > 0)
    );
  }, [teams, sportName]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-participants"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Participantes de {sportName}</h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>

        <div className="modal-body two-columns">
          {/* Coluna da Esquerda: Lista de Times */}
          <div className="participants-list-panel">
            {/* 2. VERIFICAÇÃO CORRETA: Checa a lista já filtrada */}
            {teamsInSport.length === 0 ? (
              <p>Nenhum time com jogadores inscritos nesta modalidade.</p>
            ) : (
              teamsInSport.map((team) => (
                <div
                  key={team.id}
                  className={`team-participants-section ${
                    selectedTeam?.id === team.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTeam(team)}
                >
                  <h4>{team.name}</h4>
                  <button className="inscritas">
                    {team.participatingPlayers.length} jogadores inscritos
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Coluna da Direita: Detalhes do Time Selecionado */}
          <div className="participants-details-panel">
            {/* 3. EXIBIÇÃO DOS DETALHES DO TIME SELECIONADO */}
            {!selectedTeam ? (
              <div className="placeholder">
                <p>Selecione um time para ver os jogadores.</p>
              </div>
            ) : (
              <div>
                <h4>Jogadores de "{selectedTeam.name}"</h4>
                <ul className="player-list-details">
                  {getPlayersForSport(selectedTeam.players, sportName).map(
                    (player) => (
                      <li key={player.id}>
                        <span className="player-name">{player.name}</span>
                        <span className="player-number">
                          {player.shirtNumber}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
