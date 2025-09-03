import React, { useState, useEffect } from "react";
import type { Team, Player } from "../../../types";
import { PlayerDetails } from "../../PlayerDetails"; // 1. Importar PlayerDetails
import "./style.css";

interface ParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  sportName: string;
}

export const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
  isOpen,
  onClose,
  teams,
  sportName,
}) => {
  // 2. Estado para guardar o time selecionado dentro do modal
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Efeito para resetar o time selecionado quando o modal for fechado/reaberto
  useEffect(() => {
    if (!isOpen) {
      setSelectedTeam(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const getPlayersForSport = (players: Player[]): Player[] => {
    return players.filter((player) =>
      player.sports.some((sport) => sport.name === sportName)
    );
  };

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

        {/* 3. Corpo do modal agora tem duas colunas */}
        <div className="modal-body two-columns">
          {/* Coluna da Esquerda: Lista de Times */}
          <div className="participants-list-panel">
            {teams.length === 0 ? (
              <p>Nenhum time inscrito nesta modalidade.</p>
            ) : (
              teams.map((team) => {
                const participatingPlayers = getPlayersForSport(team.players);
                if (participatingPlayers.length === 0) {
                  return null;
                }
                return (
                  // Seção de cada time agora é clicável
                  <div
                    key={team.id}
                    className={`team-participants-section ${
                      selectedTeam?.id === team.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTeam(team)} // 4. Atualiza o time selecionado
                  >
                    <h4>{team.name}</h4>
                    <p>{participatingPlayers.length} jogadores inscritos</p>
                  </div>
                );
              })
            )}
          </div>

          {/* Coluna da Direita: Detalhes do Time Selecionado */}
          <div className="participants-details-panel">
            <PlayerDetails team={selectedTeam} />
          </div>
        </div>
      </div>
    </div>
  );
};
