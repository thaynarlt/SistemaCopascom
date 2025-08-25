// src/components/CompetingTeamsPanel.tsx

import React, { useState, useMemo } from "react";
import { AVAILABLE_SPORTS } from "../../constants";
import type { Team, TeamCategory } from "../../types";

interface CompetingTeamsPanelProps {
  teams: Team[];
}

export const CompetingTeamsPanel: React.FC<CompetingTeamsPanelProps> = ({
  teams,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<TeamCategory | "TODOS">(
    "TODOS"
  );
  const [sportFilter, setSportFilter] = useState<string | "TODOS">("TODOS"); // Alterado para string para corresponder ao valor do select

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      if (!team.isCompeting) {
        console.log(`-> REJEITADO (motivo: isCompeting é ${team.isCompeting})`);
        return false;
      }
      // 1. Comparação de Categoria (insensível a maiúsculas/minúsculas)
      const categoryMatch =
        categoryFilter === "TODOS" ||
        team.category.toUpperCase() === categoryFilter.toUpperCase();

      // 2. Comparação de Esporte (insensível a maiúsculas/minúsculas)
      const sportMatch =
        sportFilter === "TODOS" ||
        team.sports?.some(
          (sport) => sport.name.toUpperCase() === sportFilter.toUpperCase()
        );

      // ============================================================================

      // Log para cada time para ajudar a ver o que está acontecendo
      console.log(
        `Time: "${team.name}" | Categoria Match: ${categoryMatch} | Esporte Match: ${sportMatch}`
      );
    });
  }, [teams, categoryFilter, sportFilter]);

  return (
    <section className="bottom-panel">
      <h2>Times em Competição</h2>
      <div className="filter-bar">
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as TeamCategory | "TODOS")
          }
        >
          <option value="TODOS">Todas as Categorias</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMININO">Feminino</option>
          <option value="MISTO">Misto</option>
        </select>
        <select
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
        >
          <option value="TODOS">Todos os Esportes</option>
          {AVAILABLE_SPORTS.map((sportName) => (
            <option key={sportName} value={sportName}>
              {sportName}
            </option>
          ))}
        </select>
      </div>
      <div className="competing-teams-list">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div key={team.id} className="competing-team-item">
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
          ))
        ) : (
          <p className="no-competing-teams">
            Nenhum time em competição com os filtros selecionados.
          </p>
        )}
      </div>
    </section>
  );
};
