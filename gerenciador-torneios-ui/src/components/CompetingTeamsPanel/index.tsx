import React, { useMemo, useState } from "react"; // 1. Importar useState
import type { Team } from "../../types";
import "./style.css";
import { ParticipantsModal } from "../modals/ParticipantsModal/ParticipantsModal";

interface CompetingTeamsPanelProps {
  title: string;
  teams: Team[];
}

export const CompetingTeamsPanel: React.FC<CompetingTeamsPanelProps> = ({
  title,
  teams,
}) => {
  // 2. Adicionar estado para controlar qual modal está aberto
  // Guardamos o NOME do esporte para saber qual modal abrir. Se for `null`, nenhum está aberto.
  const [modalSport, setModalSport] = useState<string | null>(null);

  const teamsBySport = useMemo(() => {
    const grouped: Record<string, Team[]> = {};
    const sportNames = new Set<string>();

    teams.forEach((team) => {
      if (team.isCompeting && team.sports) {
        team.sports.forEach((sport) => sportNames.add(sport.name));
      }
    });

    sportNames.forEach((sportName) => {
      grouped[sportName] = teams.filter(
        (team) =>
          team.isCompeting && team.sports?.some((s) => s.name === sportName)
      );
    });
    return { grouped, sportNames: Array.from(sportNames) };
  }, [teams]);

  if (teams.length === 0) {
    return null;
  }

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalSport(null);
  };

  return (
    <>
      <section className="bottom-panel">
        <h2>{title}</h2>
        <div className="competing-teams-list">
          {teamsBySport.sportNames.map((sportName) => (
            <div key={sportName} className="sport-section">
              <div className="sport-section-header">
                <h3>{sportName}</h3>
                {/* 3. Adicionar o botão "Ver Participantes" */}
              </div>
              {teamsBySport.grouped[sportName].length > 0 ? (
                <ul>
                  {teamsBySport.grouped[sportName].map((team) => (
                    <li key={team.id} className="competing-team-item">
                      <span className="team-name">{team.name}</span>
                      <button
                        onClick={() => setModalSport(sportName)}
                        className="button-view-participants"
                      >
                        Ver Participantes
                      </button>
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

      {/* 4. Renderizar o Modal condicionalmente */}
      <ParticipantsModal
        isOpen={modalSport !== null}
        onClose={handleCloseModal}
        // Passa o nome do esporte e a lista de times filtrada para o modal
        sportName={modalSport || ""}
        teams={modalSport ? teamsBySport.grouped[modalSport] : []}
      />
    </>
  );
};
