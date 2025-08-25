// src/components/PlayerDetails.tsx
import "./style.css";
import React from "react";
import type { Team } from "../../types";

interface PlayerDetailsProps {
  team: Team | null;
  onAddPlayer: () => void;
}

export const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  team,
  onAddPlayer,
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
          <button onClick={onAddPlayer}>Adicionar Jogador</button>
        </header>
        <div className="players-list">
          {team.players.length === 0 ? (
            <p>Nenhum jogador cadastrado neste time.</p>
          ) : (
            <ul>
              {team.players.map((player) => (
                <li className="list" key={player.id}>
                  <span className="player-name">{player.name}</span>
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
