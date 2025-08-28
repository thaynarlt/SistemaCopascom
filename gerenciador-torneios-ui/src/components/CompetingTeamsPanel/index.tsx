// src/components/CompetingTeamsPanel.tsx

import React, { useMemo } from "react";
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
    const sportNames = new Set<string>();
// Primeiro, encontre todos os esportes únicos que os times estão competindo
    teams.forEach(team => {
      if (team.isCompeting && team.sports) {
        team.sports.forEach(sport => sportNames.add(sport.name));
      }
    });
    // Agora, agrupe os times para cada esporte encontrado
    sportNames.forEach(sportName => {
      grouped[sportName] = teams.filter(team =>
        team.isCompeting && team.sports?.some(s => s.name === sportName)
      );
    });
    return { grouped, sportNames: Array.from(sportNames) };
  }, [teams]);


  return (
    <section className="bottom-panel">
      <h2>Times em Competição</h2>
      <div className="competing-teams-list">
        {teamsBySport.sportNames.map((sportName) => (
          <div key={sportName} className="sport-section">
            <h3>{sportName}</h3>
            {teamsBySport.grouped[sportName].length > 0 ? (
              <ul>
                {teamsBySport.grouped[sportName].map((team) => (
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
