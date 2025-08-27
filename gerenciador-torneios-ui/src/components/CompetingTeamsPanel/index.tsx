// src/components/CompetingTeamsPanel.tsx

import React, { useMemo } from "react";
import { AVAILABLE_SPORTS } from "../../constants";
import type { Team } from "../../types";
import "./style.css";

interface CompetingTeamsPanelProps {
  teams: Team[];
}

export const CompetingTeamsPanel: React.FC<CompetingTeamsPanelProps> = ({
  teams,
}) => {
  // Agrupa os times por esporte
  const teamsBySport = useMemo(() => {
    const grouped: Record<string, Team[]> = {};

    AVAILABLE_SPORTS.forEach((sportName) => {
      grouped[sportName] = teams.filter(
        (team) =>
          team.isCompeting &&
          team.sports?.some(
            (sport) => sport.name.toUpperCase() === sportName.toUpperCase()
          )
      );
    });

    return grouped;
  }, [teams]);

  return (
    <section className="bottom-panel">
      <h2>Times em Competição</h2>
      <div className="competing-teams-list">
        {AVAILABLE_SPORTS.map((sportName) => (
          <div key={sportName} className="sport-section">
            <h3>{sportName}</h3>
            {teamsBySport[sportName].length > 0 ? (
              <ul>
                {teamsBySport[sportName].map((team) => (
                  <li key={team.id} className="competing-team-item">
                    <span className="team-name">{team.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-teams">Nenhum time inscrito.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
