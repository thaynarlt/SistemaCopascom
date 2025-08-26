// src/pages/SportManagementPage.tsx
import { CompetingTeamsPanel } from "../../components/CompetingTeamsPanel";
import "./style.css"; // Estilo simples

const SportManagementPage: React.FC = () => {
  return (
    <main className="dashboard-container">
      <section className="bottom-panel">
        <CompetingTeamsPanel teams={[]}/>
      </section>
    </main>
  );
};

export default SportManagementPage;
