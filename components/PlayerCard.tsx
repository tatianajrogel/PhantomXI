import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, positionColors } from '../constants/theme';
import { Player } from '../constants/data';

interface Props {
  player: Player;
  onPress?: () => void;
  selected?: boolean;
}

const statusDot: Record<string, string> = {
  available: colors.pitch,
  doubtful: colors.warning,
  unavailable: colors.danger,
};

export default function PlayerCard({ player, onPress, selected }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={styles.photoWrap}>
        <Image source={{ uri: player.photo }} style={styles.photo} contentFit="cover" transition={200} />
        <View style={[styles.posTag, { backgroundColor: positionColors[player.position] }]}>
          <Text style={styles.posTagText}>{player.position}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: statusDot[player.status] }]} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
        <Text style={styles.team}>{player.teamShort} · {player.nextFix}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValGold}>{player.points}</Text>
            <Text style={styles.statLabel}>PTS</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>{player.form.toFixed(1)}</Text>
            <Text style={styles.statLabel}>FORM</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>{player.selectedBy.toFixed(0)}%</Text>
            <Text style={styles.statLabel}>OWN</Text>
          </View>
        </View>
      </View>

      <View style={styles.priceCol}>
        <Text style={styles.price}>£{player.price.toFixed(1)}</Text>
        <View style={styles.fdr}>
          {[1, 2, 3, 4, 5].map((n) => (
            <View
              key={n}
              style={[
                styles.fdrDot,
                { backgroundColor: n <= player.fdr ? fdrColor(player.fdr) : colors.surface3 },
              ]}
            />
          ))}
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

function fdrColor(fdr: number) {
  if (fdr <= 2) return colors.pitch;
  if (fdr === 3) return colors.warning;
  return colors.danger;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface1,
    borderRadius: radius.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.surface3,
    gap: 12,
  },
  cardSelected: {
    borderColor: colors.primaryLit,
    backgroundColor: colors.surface2,
  },
  photoWrap: { width: 54, height: 54 },
  photo: {
    width: 54,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
  },
  posTag: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  posTagText: { color: '#000', fontSize: 9, fontWeight: '800' },
  statusDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.surface1,
  },
  info: { flex: 1 },
  name: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  team: { color: colors.textMuted, fontSize: 11, marginTop: 1, marginBottom: 6 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  stat: { alignItems: 'center', minWidth: 38 },
  statVal: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  statValGold: { color: colors.gold, fontSize: 13, fontWeight: '800' },
  statLabel: { color: colors.textMuted, fontSize: 8, fontWeight: '600', letterSpacing: 0.5 },
  divider: { width: 1, height: 18, backgroundColor: colors.surface3, marginHorizontal: 4 },
  priceCol: { alignItems: 'center', gap: 5 },
  price: { color: colors.textPrimary, fontSize: 14, fontWeight: '800' },
  fdr: { flexDirection: 'row', gap: 2 },
  fdrDot: { width: 5, height: 5, borderRadius: 3 },
});
