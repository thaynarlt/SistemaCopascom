// src/components/TeamList.tsx
import "./style.css";

import React from "react";
import type { Team } from "../../types";
import { PencilIcon, TrashIcon } from "../icons/Icons";

interface TeamListProps {
  teams: Team[];
  selectedTeam: Team | null;
  onSelectTeam: (team: Team) => void;
  onEditTeam: (team: Team) => void;
  onDeleteTeam: (team: Team) => void;
}

export const TeamList: React.FC<TeamListProps> = ({
  teams,
  selectedTeam,
  onSelectTeam,
  onEditTeam,
  onDeleteTeam,
}) => (
  <div className="left-panel">
    <h2>Times Cadastrados</h2>
    <div className="list-container">
      {teams.length === 0 ? (
        <p>Nenhum time cadastrado.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className={selectedTeam?.id === team.id ? "selected" : ""}
            >
              <div className="item-info">
                <span className="team-name">{team.name}</span>
                <div className="sport-badges">
                  {/* ======================= CORREÇÃO AQUI ======================= */}
                  {team.sports?.map((sport) => (
                    <span key={sport.name} className="sport-badge">
                      {sport.name}
                    </span>
                  ))}
                  {/* ============================================================= */}
                </div>
              </div>
              <div className="item-actions">
                <button
                  title="Editar time"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditTeam(team);
                  }}
                  className="action-button"
                >
                  <PencilIcon />
                </button>
                <button
                  title="Excluir time"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTeam(team);
                  }}
                  className="action-button action-button-danger"
                >
                  <TrashIcon />
                </button>
              </div>
              <span className={`team-category ${team.category}`}>
                {team.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
