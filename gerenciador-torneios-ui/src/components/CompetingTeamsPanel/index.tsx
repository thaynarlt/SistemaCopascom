import React, { useMemo } from "react";
import type { Team } from "../../types";
import "./style.css";

// As props agora são um título e uma lista de times pré-filtrada
interface CompetingTeamsPanelProps {
  title: string;
  teams: Team[];
}

export const CompetingTeamsPanel: React.FC<CompetingTeamsPanelProps> = ({
  title,
  teams,
}) => {
  // A lógica de agrupamento foi simplificada. Agora ela apenas agrupa por esporte.
  const teamsBySport = useMemo(() => {
    const grouped: Record<string, Team[]> = {};
    const sportNames = new Set<string>();

    teams.forEach(team => {
      if (team.isCompeting && team.sports) {
        team.sports.forEach(sport => sportNames.add(sport.name));
      }
    });

    sportNames.forEach(sportName => {
      grouped[sportName] = teams.filter(team =>
        team.isCompeting && team.sports?.some(s => s.name === sportName)
      );
    });
    return { grouped, sportNames: Array.from(sportNames) };
  }, [teams]);

  // Se não houver times na lista fornecida, não renderiza nada.
  if (teams.length === 0) {
    return null;
  }

  return (
    // O título agora é dinâmico, vindo das props
    <section className="bottom-panel">
      <h2>{title}</h2> 
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