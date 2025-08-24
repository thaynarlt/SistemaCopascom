// src/pages/SportManagementPage.tsx
import React, { useState, useEffect } from "react";
import './SportManagementPage.css'; // Estilo simples
import api from "../../services/api";

interface Sport {
  id: number;
  name: string;
}

const SportManagementPage: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [newSportName, setNewSportName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Sport[]>("/sports");
      setSports(response.data);
    } catch (err) {
      setError("Falha ao carregar os esportes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSports(); }, []);

  const handleAddSport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSportName.trim() === "") return;
    try {
      const response = await api.post<Sport>("/sports", { name: newSportName });
      setSports([...sports, response.data]);
      setNewSportName("");
    } catch (err) {
      setError("Falha ao adicionar o esporte.");
    }
  };

  if (loading) return <p>Carregando esportes...</p>;

  return (
    <div className="sport-management-container">
      <h1>Gerenciamento de Esportes</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="add-sport-form" onSubmit={handleAddSport}>
        <input
          type="text"
          value={newSportName}
          onChange={(e) => setNewSportName(e.target.value)}
          placeholder="Nome do novo esporte (Ex: Futsal)"
          required
        />
        <button type="submit">Adicionar Esporte</button>
      </form>
      <div className="sports-list">
        <h2>Esportes Cadastrados</h2>
        {sports.length === 0 ? <p>Nenhum esporte cadastrado.</p> : (
          <ul>
            {sports.map((sport) => ( <li key={sport.id}>{sport.name}</li> ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SportManagementPage;