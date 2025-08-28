import type { Team, Match } from '../types';

// Função para gerar partidas no formato Round Robin (todos contra todos)
export const generateRoundRobinMatches = (teams: Team[], sportName: string): Omit<Match, 'id'>[] => {
  const matches: Omit<Match, 'id'>[] = [];
  
  // Se tivermos menos de 2 times, não há partidas.
  if (teams.length < 2) {
    return [];
  }

  // Loop para garantir que cada time jogue contra todos os outros uma vez
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const match: Omit<Match, 'id'> = {
        teamA: teams[i],
        teamB: teams[j],
        scoreTeamA: null,
        scoreTeamB: null,
        winner: null,
        status: 'AGENDADO',
        round: 1, // Em round-robin simples, podemos considerar tudo como uma grande rodada
        sport: { name: sportName },
        nextMatch: null,
      };
      matches.push(match);
    }
  }
  
  return matches;
};