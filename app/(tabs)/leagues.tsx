import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../../components/Gradient';
import ScreenHeader from '../../components/ScreenHeader';
import { colors, radius } from '../../constants/theme';
import { leagueTable, LeagueRow } from '../../constants/data';

const myLeagues = [
  { id: 'l1', name: 'Spectral Squad', type: 'Classic', members: 12, rank: 3, icon: 'people' },
  { id: 'l2', name: 'Office Rivals', type: 'H2H', members: 8, rank: 1, icon: 'briefcase' },
  { id: 'l3', name: 'Overall Rankings', type: 'Global', members: 2100000, rank: 184201, icon: 'globe' },
];

function Movement({ row }: { row: LeagueRow }) {
  const diff = row.lastRank - row.rank;
  if (diff === 0) return <Ionicons name="remove" size={14} color={colors.textMuted} />;
  if (diff > 0) return <Ionicons name="caret-up" size={14} color={colors.pitch} />;
  return <Ionicons name="caret-down" size={14} color={colors.danger} />;
}

export default function Leagues() {
  const [tab, setTab] = useState<'mine' | 'table'>('mine');
  const [joinOpen, setJoinOpen] = useState(false);
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenHeader
        title="Leagues"
        subtitle="Compete & dominate"
        right={
          <Pressable style={styles.joinBtn} onPress={() => setJoinOpen(true)}>
            <Ionicons name="add" size={20} color="#fff" />
          </Pressable>
        }
      />

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, tab === 'mine' && styles.tabActive]} onPress={() => setTab('mine')}>
          <Text style={[styles.tabText, tab === 'mine' && styles.tabTextActive]}>My Leagues</Text>
        </Pressable>
        <Pressable style={[styles.tab, tab === 'table' && styles.tabActive]} onPress={() => setTab('table')}>
          <Text style={[styles.tabText, tab === 'table' && styles.tabTextActive]}>Standings</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {tab === 'mine' ? (
          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            {myLeagues.map((l) => (
              <Pressable key={l.id} onPress={() => setTab('table')}>
                <Gradient colors={[colors.surface2, colors.surface1]} style={styles.leagueCard}>
                  <View style={styles.leagueIcon}>
                    <Ionicons name={l.icon as any} size={22} color={colors.primaryLit} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.leagueName}>{l.name}</Text>
                    <Text style={styles.leagueMeta}>
                      {l.type} · {l.members.toLocaleString()} managers
                    </Text>
                  </View>
                  <View style={styles.rankBox}>
                    <Text style={styles.rankLabel}>RANK</Text>
                    <Text style={styles.rankVal}>{l.rank.toLocaleString()}</Text>
                  </View>
                </Gradient>
              </Pressable>
            ))}

            <Pressable style={styles.createCard} onPress={() => setJoinOpen(true)}>
              <Ionicons name="add-circle" size={24} color={colors.gold} />
              <Text style={styles.createText}>Create or Join a League</Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.tableHeader}>
              <Text style={[styles.thRank]}>#</Text>
              <Text style={[styles.thName]}>Team</Text>
              <Text style={styles.thGw}>GW</Text>
              <Text style={styles.thTotal}>Total</Text>
            </View>
            {leagueTable.map((r) => (
              <View key={r.rank} style={[styles.tableRow, r.you && styles.tableRowYou]}>
                <View style={styles.rankCell}>
                  <Movement row={r} />
                  <Text style={[styles.rankText, r.rank <= 3 && { color: colors.gold }]}>{r.rank}</Text>
                </View>
                <View style={styles.nameCell}>
                  <Text style={[styles.teamName, r.you && { color: colors.primaryLit }]} numberOfLines={1}>
                    {r.name}
                  </Text>
                  <Text style={styles.mgrName}>{r.manager}</Text>
                </View>
                <Text style={styles.gwCell}>{r.gw}</Text>
                <Text style={styles.totalCell}>{r.total.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal visible={joinOpen} transparent animationType="slide" onRequestClose={() => setJoinOpen(false)}>
        <Pressable style={styles.modalBg} onPress={() => setJoinOpen(false)}>
          <Pressable style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Join a League</Text>
            <Text style={styles.sheetSub}>Enter a private league invite code</Text>
            <TextInput
              style={styles.codeInput}
              placeholder="e.g. a1b2c3d4"
              placeholderTextColor={colors.textMuted}
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
            />
            <Pressable style={styles.joinCta} onPress={() => { setJoinOpen(false); setCode(''); setTab('table'); }}>
              <Text style={styles.joinCtaText}>Join League</Text>
            </Pressable>
            <Pressable style={styles.createCta} onPress={() => { setJoinOpen(false); setTab('mine'); }}>
              <Ionicons name="add-circle-outline" size={18} color={colors.gold} />
              <Text style={styles.createCtaText}>Create new league instead</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface0 },
  joinBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: colors.surface1, borderRadius: radius.md, padding: 4, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: radius.sm },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: colors.textMuted, fontWeight: '800', fontSize: 13 },
  tabTextActive: { color: '#fff' },
  leagueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.surface3,
    overflow: 'hidden',
  },
  leagueIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(124,58,237,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leagueName: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  leagueMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  rankBox: { alignItems: 'flex-end' },
  rankLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '700' },
  rankVal: { color: colors.gold, fontSize: 16, fontWeight: '900' },
  createCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.surface3,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: 18,
    marginTop: 4,
  },
  createText: { color: colors.gold, fontWeight: '800', fontSize: 14 },
  tableHeader: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.surface3 },
  thRank: { width: 50, color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  thName: { flex: 1, color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  thGw: { width: 40, textAlign: 'center', color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  thTotal: { width: 56, textAlign: 'right', color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.surface1 },
  tableRowYou: { backgroundColor: 'rgba(124,58,237,0.1)', borderRadius: radius.sm, marginHorizontal: -8, paddingHorizontal: 8 },
  rankCell: { width: 50, flexDirection: 'row', alignItems: 'center', gap: 4 },
  rankText: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' },
  nameCell: { flex: 1 },
  teamName: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  mgrName: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  gwCell: { width: 40, textAlign: 'center', color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  totalCell: { width: 56, textAlign: 'right', color: colors.gold, fontSize: 14, fontWeight: '800' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface1,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 24,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: colors.surface3,
  },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: colors.surface3, alignSelf: 'center', marginBottom: 18 },
  sheetTitle: { color: colors.textPrimary, fontSize: 22, fontWeight: '900' },
  sheetSub: { color: colors.textMuted, fontSize: 13, marginTop: 4, marginBottom: 18 },
  codeInput: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    height: 52,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  joinCta: { backgroundColor: colors.primaryLit, borderRadius: radius.md, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  joinCtaText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  createCta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 },
  createCtaText: { color: colors.gold, fontWeight: '700', fontSize: 14 },
});
