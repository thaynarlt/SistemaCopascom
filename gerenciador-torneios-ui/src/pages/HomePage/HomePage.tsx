// src/pages/HomePage.tsx
import "./style.css";
import React from "react";

const HomePage: React.FC = () => {
  return (
    // O container principal que ocupará toda a tela
    <div className="home-page">
      {/* O painel que ficará centralizado */}
      <div className="welcome-panel">
        <h1>Bem-vindo ao Sistema de Gerenciamento da Copascom!</h1>
        <p>
          Aqui, você pode criar, organizar e acompanhar a <strong>COPASCOM 2025</strong> de forma
          simples e eficiente. Gerencie os times, esportes e todos os detalhes
          do campeonato em um só lugar, garantindo <strong>praticidade e controle</strong> em
          cada etapa do torneio.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
