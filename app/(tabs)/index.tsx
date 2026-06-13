import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../../components/Gradient';
import ScreenHeader, { HeaderBell } from '../../components/ScreenHeader';
import MatchCard from '../../components/MatchCard';
import { colors, radius } from '../../constants/theme';
import { liveMatches, players } from '../../constants/data';

export default function Home() {
  const topPerformers = [...players].sort((a, b) => b.form - a.form).slice(0, 3);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <ScreenHeader title="Hey, Spectre" subtitle="Gameweek 31 · Live now" right={<HeaderBell />} />

        {/* Points hero card */}
        <View style={styles.heroWrap}>
          <Gradient colors={[colors.primary, colors.heroMid]} style={styles.pointsCard}>
            <View style={styles.pointsTop}>
              <Text style={styles.pointsLabel}>GAMEWEEK POINTS</Text>
              <View style={styles.liveTag}>
                <View style={styles.liveDot} />
                <Text style={styles.liveTagText}>LIVE</Text>
              </View>
            </View>
            <Text style={styles.pointsBig}>78</Text>
            <View style={styles.pointsMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="trending-up" size={14} color={colors.goldLight} />
                <Text style={styles.metaText}>Avg 52</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="globe" size={14} color={colors.goldLight} />
                <Text style={styles.metaText}>Rank 184,201</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="people" size={14} color={colors.goldLight} />
                <Text style={styles.metaText}>9/11 played</Text>
              </View>
            </View>
          </Gradient>
        </View>

        {/* Quick stats */}
        <View style={styles.quickRow}>
          {[
            { icon: 'wallet', label: 'In Bank', value: '£2.4m' },
            { icon: 'swap-horizontal', label: 'Transfers', value: '1 Free' },
            { icon: 'flash', label: 'Chip', value: 'TC Live' },
          ].map((q) => (
            <View key={q.label} style={styles.quickCard}>
              <Ionicons name={q.icon as any} size={18} color={colors.primaryLit} />
              <Text style={styles.quickVal}>{q.value}</Text>
              <Text style={styles.quickLabel}>{q.label}</Text>
            </View>
          ))}
        </View>

        {/* Live matches */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Matches</Text>
          <Text style={styles.sectionLink}>Gameweek 31</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {liveMatches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </ScrollView>

        {/* Deadline banner */}
        <View style={styles.deadline}>
          <View style={styles.deadlineIcon}>
            <Ionicons name="time" size={20} color={colors.gold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.deadlineTitle}>Next deadline</Text>
            <Text style={styles.deadlineTime}>Sat 13 Jun · 11:00 · in 2d 4h</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </View>

        {/* Top performers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>In Form</Text>
          <Text style={styles.sectionLink}>Your XI</Text>
        </View>
        <View style={{ paddingHorizontal: 20, gap: 10 }}>
          {topPerformers.map((p) => (
            <View key={p.id} style={styles.formRow}>
              <View style={[styles.formPos, { backgroundColor: colors.primary }]}>
                <Text style={styles.formPosText}>{p.position}</Text>
              </View>
              <Text style={styles.formName}>{p.name}</Text>
              <View style={styles.formForm}>
                <Ionicons name="flame" size={13} color={colors.gold} />
                <Text style={styles.formVal}>{p.form.toFixed(1)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface0 },
  heroWrap: { paddingHorizontal: 20 },
  pointsCard: {
    borderRadius: radius.xl,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primaryLit,
  },
  pointsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pointsLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger },
  liveTagText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  pointsBig: { color: '#fff', fontSize: 64, fontWeight: '900', letterSpacing: -2, marginVertical: 4 },
  pointsMeta: { flexDirection: 'row', gap: 16, marginTop: 4, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '600' },
  quickRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginTop: 16 },
  quickCard: {
    flex: 1,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  quickVal: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' },
  quickLabel: { color: colors.textMuted, fontSize: 10 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 19, fontWeight: '800', letterSpacing: -0.5 },
  sectionLink: { color: colors.primaryLit, fontSize: 13, fontWeight: '700' },
  deadline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginTop: 22,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.lg,
    padding: 14,
  },
  deadlineIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(245,158,11,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deadlineTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  deadlineTime: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    padding: 12,
  },
  formPos: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  formPosText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  formName: { color: colors.textPrimary, fontSize: 14, fontWeight: '700', flex: 1 },
  formForm: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  formVal: { color: colors.gold, fontSize: 14, fontWeight: '800' },
});
