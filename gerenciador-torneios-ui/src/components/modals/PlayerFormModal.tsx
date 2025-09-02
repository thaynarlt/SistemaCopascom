/* eslint-disable no-irregular-whitespace */
// src/components/modals/PlayerFormModal.tsx
import React, { useState, useEffect } from "react";
import type { Player, Sport } from "../../types";

interface PlayerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    playerData: Omit<Player, "id" | "sports"> & { sports: string[] },
    id?: number
  ) => Promise<void>;
  initialData?: Player | null;
  teamSports: Sport[]; // Esportes disponíveis no time
}

export const PlayerFormModal: React.FC<PlayerFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  teamSports,
}) => {
  const [name, setName] = useState("");
  const [shirtNumber, setShirtNumber] = useState("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setShirtNumber(String(initialData.shirtNumber));
        setSelectedSports(initialData.sports?.map((s) => s.name) || []);
      } else {
        setName("");
        setShirtNumber("");
        setSelectedSports([]);
      }
      setError(null);
    }
  }, [initialData, isOpen]);

  const handleSportChange = (sportName: string) => {
    setSelectedSports((prev) =>
      prev.includes(sportName)
        ? prev.filter((s) => s !== sportName)
        : [...prev, sportName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(shirtNumber, 10);
    if (!name.trim() || isNaN(num)) {
      setError("Nome e número da camisa válidos são obrigatórios.");
      return;
    }
    if (selectedSports.length === 0) {
      setError("Selecione pelo menos um esporte para o jogador.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSave(
        { name, shirtNumber: num, sports: selectedSports },
        initialData?.id
      );
      onClose();
    } catch (err) {
      setError("Falha ao salvar jogador.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
           {" "}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
               {" "}
        <div className="modal-header">
                   {" "}
          <h3>{initialData ? "Editar Jogador" : "Adicionar Jogador"}</h3>       
           {" "}
          <button onClick={onClose} className="modal-close-button">
                        &times;          {" "}
          </button>
                 {" "}
        </div>
               {" "}
        <form onSubmit={handleSubmit} className="modal-form">
                   {" "}
          <input
            type="text"
            placeholder="Nome do Jogador"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
                   {" "}
          <input
            type="number"
            placeholder="Número da Camisa"
            value={shirtNumber}
            onChange={(e) => setShirtNumber(e.target.value)}
            required
          />
                   {" "}
          <div className="checkbox-group">
                        <label>Esportes do Jogador:</label>           {" "}
            {teamSports.map((sport) => (
              <div key={sport.name} className="checkbox-item">
                               {" "}
                <input
                  type="checkbox"
                  id={`player_${sport.name}`}
                  checked={selectedSports.includes(sport.name)}
                  onChange={() => handleSportChange(sport.name)}
                />
                               {" "}
                <label htmlFor={`player_${sport.name}`}>{sport.name}</label>   
                         {" "}
              </div>
            ))}
                     {" "}
          </div>
                    {error && <p className="error-message">{error}</p>}         {" "}
          <div className="modal-footer">
                       {" "}
            <button
              type="button"
              onClick={onClose}
              className="button-secondary"
            >
                            Cancelar            {" "}
            </button>
                       {" "}
            <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Salvando..." : "Salvar"}           {" "}
            </button>
                     {" "}
          </div>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
  );
};
