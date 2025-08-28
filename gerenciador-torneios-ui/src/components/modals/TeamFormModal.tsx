// src/components/modals/TeamFormModal.tsx
import React, { useState, useEffect } from "react";
import type { Team, TeamCategory, Sport } from "../../types";

interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
   // Ajuste o tipo para corresponder ao DTO do backend
    teamData: Omit<Team, "id" | "players" | "sports"> & { sports: string[] },
    id?: number
  ) => Promise<void>;
  initialData?: Team | null;
  // Adicione a prop para receber os esportes dinamicamente
  availableSports: Sport[];
}

export const TeamFormModal: React.FC<TeamFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  availableSports,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<TeamCategory>("MASCULINO");
  // O estado agora guarda APENAS OS NOMES (string) dos esportes selecionados
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [isCompeting, setIsCompeting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setCategory(initialData.category);
        setIsCompeting(initialData.isCompeting);
        // Extrai apenas os nomes dos esportes para o estado
        setSelectedSports(initialData.sports?.map(s => s.name) || []);
      } else {
        setName("");
        setCategory("MASCULINO");
        setIsCompeting(true);
        setSelectedSports([]);
      }
      setError(null);
    }
  }, [initialData, isOpen]);

  // A lógica agora manipula strings (nomes dos esportes)
  const handleSportChange = (sportName: string) => {
    setSelectedSports((prev) =>
      prev.includes(sportName)
        ? prev.filter((s) => s !== sportName)
        : [...prev, sportName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selectedSports.length === 0) {
      setError("Nome do time e pelo menos um esporte são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Envia os dados no formato que o backend espera: { sports: ["FUTSAL", "VOLEI"] }
      await onSave(
        { name, category, sports: selectedSports, isCompeting },
        initialData?.id
      );
      onClose();
    } catch (err) {
      setError("Falha ao salvar. Verifique o backend.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? "Editar Time" : "Cadastrar Novo Time"}</h3>
          <button onClick={onClose} className="modal-close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do time"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TeamCategory)}
          >
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
            <option value="MISTO">Misto</option>
          </select>
          <div className="checkbox-group">
            <label>Esportes:</label>
            {availableSports.map((sport) => (
              <div key={sport.name} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`team_${sport.name}`}
                  checked={selectedSports.includes(sport.name)}
                  onChange={() => handleSportChange(sport.name)}
                />
                <label htmlFor={`team_${sport.name}`}>{sport.name}</label>
              </div>
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="button-secondary"
            >
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
