// src/components/modals/TeamFormModal.tsx
import React, { useState, useEffect } from "react";
import type { Team, TeamCategory, Sport } from "../../types";
import { AVAILABLE_SPORTS } from "../../constants";

interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    teamData: Omit<Team, "id" | "players">,
    id?: number
  ) => Promise<void>;
  initialData?: Team | null;
}

export const TeamFormModal: React.FC<TeamFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<TeamCategory>("MASCULINO");
  const [sports, setSports] = useState<Sport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setCategory(initialData.category);
        setSports(initialData.sports || []);
      } else {
        setName("");
        setCategory("MASCULINO");
        setSports([]);
      }
      setError(null);
    }
  }, [initialData, isOpen]);

  const handleSportChange = (sport: Sport) =>
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || sports.length === 0) {
      setError("Nome do time e pelo menos um esporte são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSave(
        { name, category, sports, isCompeting: true },
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
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
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
            {AVAILABLE_SPORTS.map((sport) => (
              <div key={sport} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`team_${sport}`}
                  checked={sports.includes(sport)}
                  onChange={() => handleSportChange(sport)}
                />
                <label htmlFor={`team_${sport}`}>{sport}</label>
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
