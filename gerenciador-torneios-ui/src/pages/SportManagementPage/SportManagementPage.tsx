// src/pages/SportManagementPage.tsx
import { CompetingTeamsPanel } from "../../components/CompetingTeamsPanel";
import "./style.css"; // Estilo simples

const SportManagementPage: React.FC = () => {
  return (
    <main className="dashboard-container">
      <h1 className="titulo1">Times em cada Esporte</h1>
      <section> 
        <CompetingTeamsPanel teams={[]} />
      </section>
    </main>
  );
};

export default SportManagementPage;
