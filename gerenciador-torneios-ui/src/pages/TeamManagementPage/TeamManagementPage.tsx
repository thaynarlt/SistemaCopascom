// src/pages/TeamManagementPage.tsx

import React, { useState } from "react";
import "./style.css";
import type { Team, Player } from "../../types";
import { useTeams } from "../../hooks/useTeams";

// Importando os novos componentes
import { TeamList } from "../../components/TeamList";
import { ConfirmationModal } from "../../components/modals/ConfirmationModal";
import { PlayerFormModal } from "../../components/modals/PlayerFormModal";
import { TeamFormModal } from "../../components/modals/TeamFormModal";
import { CompetingTeamsPanel } from "../../components/CompetingTeamsPanel";
import { PlayerDetails } from "../../components/PlayerDetails";

const TeamManagementPage: React.FC = () => {
  // O hook gerencia a lógica de dados
  const { teams, loading, error, addTeam, updateTeam, deleteTeam, savePlayer } =
    useTeams();

  // Estado local para controle da UI
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Estado unificado para os modais
  const [modal, setModal] = useState<{
    type: "team" | "player" | "delete";
    data?: any;
  }>({ type: null });

  // Lógica de manipulação de times (agora bem mais simples)
  const handleSaveTeam = async (
    teamData: Omit<Team, "id" | "players">,
    id?: number
  ) => {
    if (id) {
      await updateTeam(id, teamData);
    } else {
      await addTeam(teamData);
    }
  };

  const handleDeleteTeam = async () => {
    if (modal.type === "delete" && modal.data) {
      await deleteTeam(modal.data.id);
      if (selectedTeam?.id === modal.data.id) {
        setSelectedTeam(null);
      }
      setModal({ type: null }); // Fecha o modal
    }
  };

  // Lógica de manipulação de jogadores
  const handleSavePlayer = async (
    playerData: Omit<Player, "id">,
    id?: number
  ) => {
    if (selectedTeam) {
      await savePlayer(selectedTeam.id, playerData, id);
    }
  };

  // Atualiza o time selecionado quando a lista de times muda
  React.useEffect(() => {
    if (selectedTeam) {
      const updatedSelectedTeam = teams.find((t) => t.id === selectedTeam.id);
      setSelectedTeam(updatedSelectedTeam || null);
    }
  }, [teams, selectedTeam]);

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard de Gerenciamento</h1>
          <button onClick={() => setModal({ type: "team" })}>
            Cadastrar Novo Time
          </button>
        </header>

        {error && <p className="error-message main-error">{error}</p>}

        <main className="dashboard-content">
          <TeamList
            teams={teams}
            selectedTeam={selectedTeam}
            onSelectTeam={setSelectedTeam}
            onEditTeam={(team) => setModal({ type: "team", data: team })}
            onDeleteTeam={(team) => setModal({ type: "delete", data: team })}
          />
          {/* O ideal seria criar um componente PlayerDetails para o painel direito */}
          <PlayerDetails
            team={selectedTeam}
            onAddPlayer={() => setModal({ type: "player" })}
          />
        </main>

        <section className="bottom-panel">
          <CompetingTeamsPanel teams={teams} />
        </section>
      </div>

      <TeamFormModal
        isOpen={modal.type === "team"}
        onClose={() => setModal({ type: null })}
        onSave={handleSaveTeam}
        initialData={modal.type === "team" ? modal.data : null}
      />

      <PlayerFormModal
        isOpen={modal.type === "player"}
        onClose={() => setModal({ type: null })}
        onSave={handleSavePlayer}
        initialData={modal.type === "player" ? modal.data : null}
      />

      <ConfirmationModal
        isOpen={modal.type === "delete"}
        onClose={() => setModal({ type: null })}
        onConfirm={handleDeleteTeam}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o time "${modal.data?.name}"?`}
      />
    </>
  );
};

export default TeamManagementPage;
