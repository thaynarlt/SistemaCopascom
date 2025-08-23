// src/types.ts

// 1. Crie um objeto constante com os valores
export const MatchStatus = {
    SCHEDULED: 'SCHEDULED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED',
} as const; // "as const" é a mágica aqui!

// 2. Crie um tipo a partir das chaves do objeto
export type MatchStatus = typeof MatchStatus[keyof typeof MatchStatus];

// ... resto do seu arquivo types.ts (Team, Match, etc.)
// A interface Match não precisa mudar em nada, ela vai usar o tipo criado acima.
export interface Match {
    id: number;
    teamA: Team | null;
    teamB: Team | null;
    scoreTeamA: number | null;
    scoreTeamB: number | null;
    winner: Team | null;
    status: MatchStatus; // Isso vai funcionar perfeitamente
    round: number;
    matchDateTime: string | null;
}

export interface Team {
    id: number;
    name: string;
}