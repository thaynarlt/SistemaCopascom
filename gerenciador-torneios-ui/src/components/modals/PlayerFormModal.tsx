// src/components/modals/PlayerFormModal.tsx
import React, { useState, useEffect } from "react";
import type { Player } from "../../types";

interface PlayerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (playerData: Omit<Player, "id">, id?: number) => Promise<void>;
  initialData?: Player | null;
}

export const PlayerFormModal: React.FC<PlayerFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [shirtNumber, setShirtNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setShirtNumber(String(initialData.shirtNumber));
      } else {
        setName("");
        setShirtNumber("");
      }
      setError(null);
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(shirtNumber, 10);
    if (!name.trim() || isNaN(num)) {
      setError("Nome e número da camisa válidos são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSave({ name, shirtNumber: num }, initialData?.id);
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? "Editar Jogador" : "Adicionar Jogador"}</h3>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Nome do Jogador"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Número da Camisa"
            value={shirtNumber}
            onChange={(e) => setShirtNumber(e.target.value)}
            required
          />
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
