// src/components/PlayerDetails.tsx
import "./style.css";
import React from "react";
import type { Team } from "../../types";

interface PlayerDetailsProps {
  team: Team | null;
  // A interrogação torna a propriedade onAddPlayer opcional
  onAddPlayer?: () => void;
}

export const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  team,
  onAddPlayer, // Agora é opcional
}) => {
  if (!team) {
    return (
      <div className="right-panel">
        <div className="placeholder">
          <h3>Selecione um time para ver os jogadores.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="right-panel">
      <div>
        <header className="player-panel-header">
          <h3>Jogadores de "{team.name}"</h3>
          {/* O botão só será renderizado se a função onAddPlayer for fornecida */}
          {onAddPlayer && (
            <button onClick={onAddPlayer}>Adicionar Jogador</button>
          )}
        </header>
        <div className="players-list">
          {team.players.length === 0 ? (
            <p>Nenhum jogador cadastrado neste time.</p>
          ) : (
            <ul>
              {team.players.map((player) => (
                <li className="list" key={player.id}>
                  <div className="item-info">
                    <span className="player-name">{player.name}</span>
                    <div className="sport-badges">
                      {player.sports?.map((sport) => (
                        <span key={sport.name} className="sport-badge">
                          {sport.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="player-number">{player.shirtNumber}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
