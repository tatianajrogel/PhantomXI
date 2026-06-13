import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import PlayerCard from '../../components/PlayerCard';
import { colors, radius } from '../../constants/theme';
import { players, Position, Player } from '../../constants/data';

const positions: (Position | 'ALL')[] = ['ALL', 'GKP', 'DEF', 'MID', 'FWD'];
const sorts = [
  { key: 'points', label: 'Points' },
  { key: 'form', label: 'Form' },
  { key: 'price', label: 'Price' },
  { key: 'selectedBy', label: 'Owned' },
] as const;

export default function Players() {
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState<Position | 'ALL'>('ALL');
  const [sort, setSort] = useState<typeof sorts[number]['key']>('points');

  const filtered = useMemo(() => {
    let list = [...players];
    if (pos !== 'ALL') list = list.filter((p) => p.position === pos);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q));
    }
    list.sort((a, b) => (b[sort] as number) - (a[sort] as number));
    return list;
  }, [query, pos, sort]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader title="Transfers" subtitle={`${filtered.length} players available`} />

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.search}
          placeholder="Search players or teams..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      {/* Position filter */}
      <FlatList
        horizontal
        data={positions}
        keyExtractor={(i) => i}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingBottom: 4 }}
        style={{ flexGrow: 0, marginTop: 4 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setPos(item)}
            style={[styles.filterPill, pos === item && styles.filterPillActive]}
          >
            <Text style={[styles.filterText, pos === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        )}
      />

      {/* Sort */}
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort:</Text>
        {sorts.map((s) => (
          <Pressable key={s.key} onPress={() => setSort(s.key)}>
            <Text style={[styles.sortItem, sort === s.key && styles.sortItemActive]}>{s.label}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30, gap: 10 }}
        renderItem={({ item }: { item: Player }) => <PlayerCard player={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={40} color={colors.surface3} />
            <Text style={styles.emptyText}>No players found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface0 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 14,
  },
  search: { flex: 1, color: colors.textPrimary, fontSize: 15 },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
  },
  filterPillActive: { backgroundColor: colors.primary, borderColor: colors.primaryLit },
  filterText: { color: colors.textMuted, fontWeight: '800', fontSize: 13 },
  filterTextActive: { color: '#fff' },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 20, marginTop: 14 },
  sortLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  sortItem: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  sortItemActive: { color: colors.primaryLit, fontWeight: '800' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { color: colors.textMuted, fontSize: 15 },
});
