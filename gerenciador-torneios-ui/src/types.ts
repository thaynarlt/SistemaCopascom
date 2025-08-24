// src/types.ts

// --- ENUMS E TIPOS ---

export const MatchStatus = {
  AGENDADO: "AGENDADO",
  EM_ANDAMENTO: "EM-ANDAMENTO",
  FINALIZADO: "FINALIZADO",
  CANCELADO: "CANCELADO",
} as const;

export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];

export type TeamCategory = "MASCULINO" | "FEMININO";

// --- INTERFACES PRINCIPAIS ---

export interface Team {
  id: number;
  name: string;
  category: TeamCategory;
  players: Player[]; // Atualizado para usar a interface Player
}
export interface Match {
  id: number;
  teamA: Team | null;
  teamB: Team | null;
  scoreTeamA: number | null;
  scoreTeamB: number | null;
  winner: Team | null;
  status: MatchStatus;
  round: number;
  sport: { id: number; name: string } | null;
  nextMatch: Match | null;
}

export interface Player {
  id: number;
  name: string;
  shirtNumber: number;
}
