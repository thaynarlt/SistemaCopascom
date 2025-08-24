import React, { useState } from "react";
import type { Match } from "../../types";
import "./style.css";

interface ScoreModalProps {
  match: Match;
  onClose: () => void;
  onSave: (scoreA: number, scoreB: number) => void;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ match, onClose, onSave }) => {
  const [scoreA, setScoreA] = useState<string>(
    match.scoreTeamA?.toString() ?? ""
  );
  const [scoreB, setScoreB] = useState<string>(
    match.scoreTeamB?.toString() ?? ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalScoreA = parseInt(scoreA, 10);
    const finalScoreB = parseInt(scoreB, 10);

    if (
      isNaN(finalScoreA) ||
      isNaN(finalScoreB) ||
      finalScoreA < 0 ||
      finalScoreB < 0
    ) {
      alert("Por favor, insira placares válidos e positivos.");
      return;
    }
    if (finalScoreA === finalScoreB) {
      alert("O placar não pode ser um empate na fase de mata-mata.");
      return;
    }
    onSave(finalScoreA, finalScoreB);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Registrar Placar</h2>
        <form onSubmit={handleSubmit}>
          <div className="score-input-group">
            <label>{match.teamA?.name}</label>
            <input
              type="number"
              min="0"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="score-input-group">
            <label>{match.teamB?.name}</label>
            <input
              type="number"
              min="0"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoreModal;
