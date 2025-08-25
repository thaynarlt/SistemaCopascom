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

// CORRIGIDO: 'Sport' agora é uma interface/objeto, não mais uma string.
// Isso corresponde ao que a API retorna.
export interface Sport {
  name: string;
}

// --- INTERFACES PRINCIPAIS ---

export interface Player {
  id: number;
  name: string;
  shirtNumber: number;
}

export interface Team {
  id: number;
  name: string;
  category: TeamCategory;
  players: Player[];
  sports: Sport[]; // Agora espera um array de objetos Sport
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
  sport: Sport | null; // Simplificado para usar a nova interface Sport
  nextMatch: Match | null;
}
