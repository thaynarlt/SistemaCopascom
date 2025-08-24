// src/components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="\src\assets\Copascom25.svg" alt="Logo COPASCOM" />
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Início
            </NavLink>
          </li>
          <li className="nav-item">
            {/* Link de exemplo para um torneio específico */}
            <NavLink
              to="/tournament/1/sport/1"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Chaveamento
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/teams"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Gerenciar Times
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/sports"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
            >
              Gerenciar Esportes
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
