// src/types.ts

// --- ENUMS E TIPOS ---

export const MatchStatus = {
  AGENDADO: "AGENDADO",
  EM_ANDAMENTO: "EM_ANDAMENTO",
  FINALIZADO: "FINALIZADO",
  CANCELADO: "CANCELADO",
} as const;

export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];

export type TeamCategory = "MASCULINO" | "FEMININO" | "MISTO";

export interface Sport {
  name: string;
}

// --- INTERFACES PRINCIPAIS ---

export interface Player {
  id: number;
  name: string;
  shirtNumber: number;
  sports: Sport[]; // <--- ALTERAÇÃO AQUI
}

export interface Team {
  id: number;
  name: string;
  category: TeamCategory;
  players: Player[];
  sports: Sport[];
  isCompeting: boolean;
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
  sport: Sport | null;
  nextMatch: Match | null;
}
