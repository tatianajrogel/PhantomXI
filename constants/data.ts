export type Position = 'GKP' | 'DEF' | 'MID' | 'FWD';

export interface Player {
  id: string;
  name: string;
  team: string;
  teamShort: string;
  position: Position;
  price: number;
  points: number;
  form: number;
  selectedBy: number;
  photo: string;
  status: 'available' | 'doubtful' | 'unavailable';
  goals: number;
  assists: number;
  fdr: number; // fixture difficulty 1-5
  nextFix: string;
}

const photos = [
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381362802_b0cc11f5.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381356839_c55a5fd4.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381358696_5befa3cc.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381359424_37c77d2f.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381359902_89cb9d7c.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381360862_535fbf31.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381361869_33edd530.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381364906_483f8acf.png',
  'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381366511_b6bbefa9.png',
];

const p = (i: number) => photos[i % photos.length];

export const players: Player[] = [
  { id: 'p1', name: 'M. Halland', team: 'Manchester City', teamShort: 'MCI', position: 'FWD', price: 15.2, points: 218, form: 8.4, selectedBy: 64.1, photo: p(0), status: 'available', goals: 27, assists: 5, fdr: 2, nextFix: 'BUR (H)' },
  { id: 'p2', name: 'M. Sahir', team: 'Liverpool', teamShort: 'LIV', position: 'MID', price: 13.0, points: 211, form: 7.9, selectedBy: 58.7, photo: p(1), status: 'available', goals: 18, assists: 13, fdr: 3, nextFix: 'EVE (A)' },
  { id: 'p3', name: 'C. Palmar', team: 'Chelsea', teamShort: 'CHE', position: 'MID', price: 11.4, points: 196, form: 8.1, selectedBy: 49.2, photo: p(2), status: 'available', goals: 22, assists: 11, fdr: 2, nextFix: 'TOT (H)' },
  { id: 'p4', name: 'B. Saqa', team: 'Arsenal', teamShort: 'ARS', position: 'MID', price: 10.1, points: 178, form: 6.8, selectedBy: 41.3, photo: p(3), status: 'doubtful', goals: 14, assists: 12, fdr: 2, nextFix: 'WHU (H)' },
  { id: 'p5', name: 'A. Isaq', team: 'Newcastle', teamShort: 'NEW', position: 'FWD', price: 8.9, points: 164, form: 7.2, selectedBy: 32.6, photo: p(4), status: 'available', goals: 19, assists: 4, fdr: 3, nextFix: 'BHA (A)' },
  { id: 'p6', name: 'V. Vandyke', team: 'Liverpool', teamShort: 'LIV', position: 'DEF', price: 6.4, points: 152, form: 6.1, selectedBy: 28.9, photo: p(5), status: 'available', goals: 3, assists: 2, fdr: 3, nextFix: 'EVE (A)' },
  { id: 'p7', name: 'T. Alexand', team: 'Liverpool', teamShort: 'LIV', position: 'DEF', price: 7.2, points: 148, form: 5.9, selectedBy: 24.1, photo: p(6), status: 'available', goals: 2, assists: 9, fdr: 3, nextFix: 'EVE (A)' },
  { id: 'p8', name: 'E. Hadderson', team: 'Nottm Forest', teamShort: 'NFO', position: 'GKP', price: 5.3, points: 142, form: 5.4, selectedBy: 19.7, photo: p(7), status: 'available', goals: 0, assists: 0, fdr: 2, nextFix: 'LUT (H)' },
  { id: 'p9', name: 'D. Onana', team: 'Manchester Utd', teamShort: 'MUN', position: 'GKP', price: 5.0, points: 128, form: 4.8, selectedBy: 15.2, photo: p(8), status: 'available', goals: 0, assists: 0, fdr: 4, nextFix: 'MCI (A)' },
  { id: 'p10', name: 'B. Sernando', team: 'Manchester Utd', teamShort: 'MUN', position: 'MID', price: 9.6, points: 156, form: 6.3, selectedBy: 22.4, photo: p(0), status: 'available', goals: 10, assists: 8, fdr: 4, nextFix: 'MCI (A)' },
  { id: 'p11', name: 'P. Fodun', team: 'Manchester City', teamShort: 'MCI', position: 'MID', price: 9.8, points: 171, form: 7.0, selectedBy: 35.8, photo: p(1), status: 'available', goals: 15, assists: 9, fdr: 2, nextFix: 'BUR (H)' },
  { id: 'p12', name: 'G. Sika', team: 'Arsenal', teamShort: 'ARS', position: 'FWD', price: 7.8, points: 139, form: 5.7, selectedBy: 18.3, photo: p(2), status: 'available', goals: 13, assists: 6, fdr: 2, nextFix: 'WHU (H)' },
  { id: 'p13', name: 'W. Sahbi', team: 'Tottenham', teamShort: 'TOT', position: 'FWD', price: 8.2, points: 133, form: 6.0, selectedBy: 21.0, photo: p(3), status: 'available', goals: 16, assists: 3, fdr: 2, nextFix: 'CHE (A)' },
  { id: 'p14', name: 'R. Sames', team: 'Newcastle', teamShort: 'NEW', position: 'DEF', price: 5.8, points: 121, form: 5.1, selectedBy: 14.7, photo: p(4), status: 'available', goals: 1, assists: 4, fdr: 3, nextFix: 'BHA (A)' },
  { id: 'p15', name: 'P. Sorter', team: 'Aston Villa', teamShort: 'AVL', position: 'GKP', price: 5.1, points: 130, form: 5.6, selectedBy: 16.9, photo: p(5), status: 'available', goals: 0, assists: 0, fdr: 3, nextFix: 'FUL (H)' },
  { id: 'p16', name: 'O. Swatkin', team: 'Aston Villa', teamShort: 'AVL', position: 'FWD', price: 9.0, points: 158, form: 6.6, selectedBy: 30.1, photo: p(6), status: 'available', goals: 17, assists: 7, fdr: 3, nextFix: 'FUL (H)' },
  { id: 'p17', name: 'L. Saka', team: 'Brighton', teamShort: 'BHA', position: 'DEF', price: 4.9, points: 108, form: 4.6, selectedBy: 11.2, photo: p(7), status: 'available', goals: 2, assists: 3, fdr: 3, nextFix: 'NEW (H)' },
  { id: 'p18', name: 'J. Sara', team: 'Newcastle', teamShort: 'NEW', position: 'MID', price: 6.1, points: 119, form: 5.3, selectedBy: 13.4, photo: p(8), status: 'available', goals: 6, assists: 7, fdr: 3, nextFix: 'BHA (A)' },
  { id: 'p19', name: 'D. Sancos', team: 'Wolves', teamShort: 'WOL', position: 'MID', price: 5.5, points: 96, form: 4.1, selectedBy: 8.9, photo: p(0), status: 'unavailable', goals: 4, assists: 5, fdr: 4, nextFix: 'ARS (A)' },
  { id: 'p20', name: 'A. Sober', team: 'Chelsea', teamShort: 'CHE', position: 'DEF', price: 5.2, points: 114, form: 5.0, selectedBy: 12.6, photo: p(1), status: 'available', goals: 1, assists: 2, fdr: 2, nextFix: 'TOT (H)' },
];

export interface Match {
  id: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: 'LIVE' | 'FT' | 'HT' | 'UPCOMING';
  time?: string;
}

export const liveMatches: Match[] = [
  { id: 'm1', home: 'MCI', away: 'BUR', homeScore: 3, awayScore: 0, minute: 67, status: 'LIVE' },
  { id: 'm2', home: 'LIV', away: 'EVE', homeScore: 2, awayScore: 1, minute: 71, status: 'LIVE' },
  { id: 'm3', home: 'CHE', away: 'TOT', homeScore: 1, awayScore: 1, minute: 45, status: 'HT' },
  { id: 'm4', home: 'ARS', away: 'WHU', homeScore: 0, awayScore: 0, minute: 23, status: 'LIVE' },
  { id: 'm5', home: 'NEW', away: 'BHA', homeScore: 0, awayScore: 0, minute: 0, status: 'UPCOMING', time: '17:30' },
  { id: 'm6', home: 'AVL', away: 'FUL', homeScore: 0, awayScore: 0, minute: 0, status: 'UPCOMING', time: '20:00' },
  { id: 'm7', home: 'MUN', away: 'NFO', homeScore: 2, awayScore: 2, minute: 90, status: 'FT' },
  { id: 'm8', home: 'WOL', away: 'LUT', homeScore: 1, awayScore: 0, minute: 90, status: 'FT' },
];

export interface LeagueRow {
  rank: number;
  lastRank: number;
  name: string;
  manager: string;
  gw: number;
  total: number;
  you?: boolean;
}

export const leagueTable: LeagueRow[] = [
  { rank: 1, lastRank: 2, name: 'Ghost Protocol', manager: 'A. Mensah', gw: 84, total: 1842 },
  { rank: 2, lastRank: 1, name: 'Phantom Menace', manager: 'J. Okafor', gw: 62, total: 1831 },
  { rank: 3, lastRank: 3, name: 'Spectral Squad', manager: 'You', gw: 78, total: 1809, you: true },
  { rank: 4, lastRank: 6, name: 'Invisible XI', manager: 'L. Bianchi', gw: 71, total: 1788 },
  { rank: 5, lastRank: 4, name: 'Wraith Warriors', manager: 'T. Nguyen', gw: 55, total: 1772 },
  { rank: 6, lastRank: 5, name: 'Shadow Strikers', manager: 'M. Silva', gw: 59, total: 1761 },
  { rank: 7, lastRank: 9, name: 'Eclipse FC', manager: 'D. Park', gw: 66, total: 1740 },
  { rank: 8, lastRank: 7, name: 'Nightfall United', manager: 'R. Costa', gw: 51, total: 1728 },
  { rank: 9, lastRank: 8, name: 'Mirage Masters', manager: 'S. Ahmed', gw: 58, total: 1715 },
  { rank: 10, lastRank: 11, name: 'Veil Vanguard', manager: 'K. Olsen', gw: 63, total: 1702 },
  { rank: 11, lastRank: 10, name: 'Cipher City', manager: 'B. Lee', gw: 49, total: 1690 },
  { rank: 12, lastRank: 12, name: 'Obscura Owls', manager: 'F. Rossi', gw: 54, total: 1677 },
];

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

export const badges: Badge[] = [
  { id: 'b1', name: 'Hat-trick Hunter', icon: 'football', unlocked: true },
  { id: 'b2', name: 'Clean Sheet King', icon: 'shield-checkmark', unlocked: true },
  { id: 'b3', name: 'Top 1K', icon: 'trophy', unlocked: true },
  { id: 'b4', name: 'Captain Fantastic', icon: 'star', unlocked: false },
  { id: 'b5', name: 'Transfer Guru', icon: 'swap-horizontal', unlocked: true },
  { id: 'b6', name: 'Century Club', icon: 'ribbon', unlocked: false },
];

export const formations = ['3-4-3', '4-3-3', '4-4-2', '3-5-2', '5-3-2', '5-4-1'];
