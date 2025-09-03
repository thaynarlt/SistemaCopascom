import React from "react";
import type { Team, Player } from "../../../types";
import "./style.css";

// As props continuam as mesmas
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
  // Removemos o estado 'selectedTeam' e o useEffect, pois não são mais necessários
  
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
          <button onClick={onClose} className="modal-close-button">&times;</button>
        </div>
        
        {/* O corpo do modal agora é uma lista direta */}
        <div className="modal-body">
          {teams.length === 0 ? (
            <p>Nenhum time inscrito nesta modalidade.</p>
          ) : (
            teams.map((team) => {
              const participatingPlayers = getPlayersForSport(team.players);

              if (participatingPlayers.length === 0) {
                return null;
              }

              return (
                <div key={team.id} className="team-participants-section">
                  <h4>{team.name}</h4>
                  {/* Tabela de jogadores para este time */}
                  <table className="participants-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Camisa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participatingPlayers.map((player) => (
                        <tr key={player.id}>
                          <td>{player.name}</td>
                          <td>{player.shirtNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};