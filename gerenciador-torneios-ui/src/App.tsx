// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./styles/global.css";
import "./styles/theme.css";
import SportManagementPage from "./pages/SportManagementPage/SportManagementPage";
import TeamManagementPage from "./pages/TeamManagementPage/TeamManagementPage";
import TournamentPage from "./pages/TournamentPage/TournamentPage";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-container">
        <Routes>
          <Route
            path="/"
            element={<div style={{ textAlign: "center" }}></div>}
          />
          <Route
            path="/tournament/:tournamentId/sport/:sportId"
            element={<TournamentPage />}
          />
          <Route path="/admin/teams" element={<TeamManagementPage />} />
          <Route path="/admin/sports" element={<SportManagementPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
