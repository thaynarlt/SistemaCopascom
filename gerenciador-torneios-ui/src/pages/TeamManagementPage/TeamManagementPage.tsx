/* eslint-disable no-irregular-whitespace */
// src/pages/TeamManagementPage.tsx

import React, { useEffect, useState } from "react";
import "./style.css";
import "../../styles/global.css";

import type { Team, Player, Sport } from "../../types";
import { useTeams } from "../../hooks/useTeams";

import { TeamList } from "../../components/TeamList";
import { ConfirmationModal } from "../../components/modals/ConfirmationModal";
import { PlayerFormModal } from "../../components/modals/PlayerFormModal";
import { TeamFormModal } from "../../components/modals/TeamFormModal";
import { PlayerDetails } from "../../components/PlayerDetails";
import api from "../../services/api";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

type ModalState =
  | { type: "team"; data?: Team }
  | { type: "player"; data?: Player }
  | { type: "delete"; data: Team }
  | { type: null };

const TeamManagementPage: React.FC = () => {
  const { teams, loading, error, addTeam, updateTeam, deleteTeam, savePlayer } =
    useTeams();

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [modal, setModal] = useState<ModalState>({ type: null });
  const [availableSports, setAvailableSports] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await api.get<Sport[]>("/sports");
        setAvailableSports(response.data);
      } catch (err) {
        console.error("Falha ao carregar esportes:", err);
      }
    };
    fetchSports();
  }, []);

  const handleSaveTeam = async (
    teamData: Omit<Team, "id" | "players" | "sports"> & { sports: string[] },
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
      setModal({ type: null });
    }
  };

  const handleSavePlayer = async (
    playerData: Omit<Player, "id" | "sports"> & { sports: string[] }, // <--- ALTERAÇÃO AQUI
    id?: number
  ) => {
    if (selectedTeam) {
      await savePlayer(selectedTeam.id, playerData, id);
    }
  };

  React.useEffect(() => {
    if (selectedTeam) {
      const updatedSelectedTeam = teams.find((t) => t.id === selectedTeam.id);
      setSelectedTeam(updatedSelectedTeam || null);
    }
  }, [teams, selectedTeam]);

  if (loading) return <LoadingSpinner />;

  const teamToDelete = modal.type === "delete" ? modal.data : null;
  return (
    <>
           {" "}
      <div className="dashboard-container">
               {" "}
        <header className="dashboard-header">
                    <h1>Dashboard de Gerenciamento</h1>         {" "}
          <button onClick={() => setModal({ type: "team" })}>
                        Cadastrar Novo Time          {" "}
          </button>
                 {" "}
        </header>
                {error && <p className="error-message main-error">{error}</p>} 
             {" "}
        <main className="dashboard-content">
                   {" "}
          <TeamList
            teams={teams}
            selectedTeam={selectedTeam}
            onSelectTeam={setSelectedTeam}
            onEditTeam={(team) => setModal({ type: "team", data: team })}
            onDeleteTeam={(team) => setModal({ type: "delete", data: team })}
          />
                   {" "}
          <PlayerDetails
            team={selectedTeam}
            onAddPlayer={() => setModal({ type: "player" })}
          />
                 {" "}
        </main>
             {" "}
      </div>
           {" "}
      <TeamFormModal
        isOpen={modal.type === "team"}
        onClose={() => setModal({ type: null })}
        onSave={handleSaveTeam}
        initialData={modal.type === "team" ? modal.data : null}
        availableSports={availableSports}
      />
           {" "}
      <PlayerFormModal
        isOpen={modal.type === "player"}
        onClose={() => setModal({ type: null })}
        onSave={handleSavePlayer}
        initialData={modal.type === "player" ? modal.data : null}
        teamSports={selectedTeam?.sports || []} // <--- ALTERAÇÃO AQUI
      />
           {" "}
      <ConfirmationModal
        isOpen={modal.type === "delete"}
        onClose={() => setModal({ type: null })}
        onConfirm={handleDeleteTeam}
        title="Confirmar Exclusão"
        message={
          teamToDelete
            ? `Tem certeza que deseja excluir o time "${teamToDelete.name}"?`
            : ""
        }
      />
         {" "}
    </>
  );
};

export default TeamManagementPage;
