// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./styles/global.css";
import "./styles/theme.css";
import SportManagementPage from "./pages/SportManagementPage/SportManagementPage";
import TeamManagementPage from "./pages/TeamManagementPage/TeamManagementPage";
import TournamentPage from "./pages/TournamentPage/TournamentPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-container">
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route
            path="/tournament/:tournamentId/sport/:sportId"
            element={<TournamentPage />}
          />
          <Route path="/TeamManagementPage" element={<TeamManagementPage />} />
          <Route path="/SportManagementPage" element={<SportManagementPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
