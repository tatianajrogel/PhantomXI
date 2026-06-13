import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';
import { Match } from '../constants/data';

export default function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === 'LIVE' || match.status === 'HT';
  return (
    <View style={styles.card}>
      <View style={styles.statusRow}>
        {isLive ? (
          <View style={styles.liveBadge}>
            <View style={styles.livePulse} />
            <Text style={styles.liveText}>
              {match.status === 'HT' ? 'HT' : `${match.minute}'`}
            </Text>
          </View>
        ) : match.status === 'FT' ? (
          <Text style={styles.ftText}>FULL TIME</Text>
        ) : (
          <Text style={styles.upText}>{match.time}</Text>
        )}
      </View>

      <View style={styles.scoreRow}>
        <Text style={styles.team}>{match.home}</Text>
        {match.status === 'UPCOMING' ? (
          <Text style={styles.vs}>vs</Text>
        ) : (
          <View style={styles.score}>
            <Text style={styles.scoreText}>{match.homeScore}</Text>
            <Text style={styles.scoreDash}>-</Text>
            <Text style={styles.scoreText}>{match.awayScore}</Text>
          </View>
        )}
        <Text style={[styles.team, { textAlign: 'right' }]}>{match.away}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface1,
    borderRadius: radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.surface3,
    width: 160,
  },
  statusRow: { alignItems: 'center', marginBottom: 8 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  livePulse: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.danger },
  liveText: { color: colors.danger, fontSize: 11, fontWeight: '800' },
  ftText: { color: colors.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  upText: { color: colors.gold, fontSize: 11, fontWeight: '700' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  team: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', flex: 1 },
  score: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6 },
  scoreText: { color: colors.textPrimary, fontSize: 18, fontWeight: '900' },
  scoreDash: { color: colors.textMuted, fontSize: 14 },
  vs: { color: colors.textMuted, fontSize: 12, paddingHorizontal: 8 },
});
