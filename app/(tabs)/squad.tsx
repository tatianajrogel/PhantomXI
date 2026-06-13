import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../../components/Gradient';
import ScreenHeader from '../../components/ScreenHeader';
import PitchPlayer from '../../components/PitchPlayer';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { colors, radius } from '../../constants/theme';
import { players, formations, Player } from '../../constants/data';

const gk = players.filter((p) => p.position === 'GKP');
const def = players.filter((p) => p.position === 'DEF');
const mid = players.filter((p) => p.position === 'MID');
const fwd = players.filter((p) => p.position === 'FWD');

// 4-3-3 starting XI
const lineGK = gk.slice(0, 1);
const lineDEF = def.slice(0, 4);
const lineMID = mid.slice(0, 3);
const lineFWD = fwd.slice(0, 3);
const bench = [gk[1], def[4], mid[4], fwd[3]].filter(Boolean) as Player[];

const captainId = lineFWD[0]?.id;
const startingIds = [...lineGK, ...lineDEF, ...lineMID, ...lineFWD].map((p) => p.id);

export default function Squad() {
  const { user } = useAuth();
  const [formation, setFormation] = useState('4-3-3');
  const [selected, setSelected] = useState<Player | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const value = 98.6;
  const bank = 1.4;

  // Load any previously saved squad for this manager.
  const loadSquad = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_squads')
      .select('formation')
      .eq('user_id', user.id)
      .maybeSingle();
    if (data?.formation) setFormation(data.formation);
  }, [user]);

  useEffect(() => {
    loadSquad();
  }, [loadSquad]);

  const saveSquad = async () => {
    if (!user) return;
    setSaveState('saving');
    await supabase.from('user_squads').upsert(
      {
        user_id: user.id,
        formation,
        picks: startingIds,
        captain_id: captainId,
        vice_captain_id: lineMID[0]?.id ?? null,
        bank,
        value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 2000);
  };

  const Line = ({ list, captainId }: { list: Player[]; captainId?: string }) => (
    <View style={styles.line}>
      {list.map((p) => (
        <PitchPlayer
          key={p.id}
          player={p}
          isCaptain={p.id === captainId}
          isVice={p.id === lineMID[0]?.id && captainId !== lineMID[0]?.id}
          onPress={() => setSelected(p)}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <ScreenHeader
          title="My Squad"
          subtitle="Spectral Squad"
          right={
            <Pressable style={styles.saveBtn} onPress={saveSquad} disabled={saveState === 'saving'}>
              {saveState === 'saving' ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons
                    name={saveState === 'saved' ? 'checkmark' : 'save'}
                    size={15}
                    color="#fff"
                  />
                  <Text style={styles.saveBtnText}>
                    {saveState === 'saved' ? 'Saved' : 'Save'}
                  </Text>
                </>
              )}
            </Pressable>
          }
        />

        {/* Budget bar */}
        <View style={styles.budgetRow}>
          <View style={styles.budgetCard}>
            <Text style={styles.budgetLabel}>SQUAD VALUE</Text>
            <Text style={styles.budgetVal}>£{value.toFixed(1)}m</Text>
          </View>
          <View style={styles.budgetCard}>
            <Text style={styles.budgetLabel}>IN BANK</Text>
            <Text style={[styles.budgetVal, { color: colors.gold }]}>£{bank.toFixed(1)}m</Text>
          </View>
          <View style={styles.budgetCard}>
            <Text style={styles.budgetLabel}>POINTS</Text>
            <Text style={styles.budgetVal}>1,809</Text>
          </View>
        </View>

        {/* Formation pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          style={{ marginTop: 16 }}
        >
          {formations.map((f) => (
            <Pressable
              key={f}
              onPress={() => setFormation(f)}
              style={[styles.formPill, formation === f && styles.formPillActive]}
            >
              <Text style={[styles.formPillText, formation === f && styles.formPillTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Pitch */}
        <View style={styles.pitchWrap}>
          <Gradient colors={[colors.pitch, colors.pitchDark, '#0b3d1f']} style={styles.pitch}>
            {/* pitch lines */}
            <View style={styles.centerCircle} />
            <View style={styles.centerLine} />
            <View style={styles.box} />
            <Line list={lineGK} captainId={lineFWD[0]?.id} />
            <Line list={lineDEF} />
            <Line list={lineMID} />
            <Line list={lineFWD} captainId={lineFWD[0]?.id} />
          </Gradient>
        </View>

        {/* Bench */}
        <Text style={styles.benchTitle}>SUBSTITUTES</Text>
        <View style={styles.bench}>
          {bench.map((p) => (
            <PitchPlayer key={p.id} player={p} small onPress={() => setSelected(p)} />
          ))}
        </View>

        {/* Chips */}
        <Text style={styles.benchTitle}>CHIPS</Text>
        <View style={styles.chips}>
          {[
            { name: 'Wildcard', icon: 'color-wand', used: false },
            { name: 'Free Hit', icon: 'refresh', used: false },
            { name: 'Bench Boost', icon: 'rocket', used: true },
            { name: 'Triple Cap', icon: 'star', used: false },
          ].map((c) => (
            <View key={c.name} style={[styles.chip, c.used && styles.chipUsed]}>
              <Ionicons name={c.icon as any} size={18} color={c.used ? colors.textMuted : colors.gold} />
              <Text style={[styles.chipText, c.used && { color: colors.textMuted }]}>{c.name}</Text>
              {c.used && <Text style={styles.chipUsedText}>USED</Text>}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action sheet modal */}
      <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
        <Pressable style={styles.modalBg} onPress={() => setSelected(null)}>
          <Pressable style={styles.sheet}>
            {selected && (
              <>
                <View style={styles.sheetHandle} />
                <Text style={styles.sheetName}>{selected.name}</Text>
                <Text style={styles.sheetTeam}>{selected.team} · {selected.position} · £{selected.price.toFixed(1)}m</Text>
                <View style={styles.sheetStats}>
                  {[
                    ['Points', selected.points],
                    ['Form', selected.form.toFixed(1)],
                    ['Goals', selected.goals],
                    ['Assists', selected.assists],
                  ].map(([l, v]) => (
                    <View key={l as string} style={styles.sheetStat}>
                      <Text style={styles.sheetStatVal}>{v}</Text>
                      <Text style={styles.sheetStatLabel}>{l}</Text>
                    </View>
                  ))}
                </View>
                {[
                  { label: 'Make Captain', icon: 'star' },
                  { label: 'Make Vice-Captain', icon: 'shield' },
                  { label: 'Substitute', icon: 'swap-vertical' },
                  { label: 'Transfer Out', icon: 'remove-circle' },
                ].map((a) => (
                  <Pressable key={a.label} style={styles.sheetAction} onPress={() => setSelected(null)}>
                    <Ionicons name={a.icon as any} size={20} color={colors.primaryLit} />
                    <Text style={styles.sheetActionText}>{a.label}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                  </Pressable>
                ))}
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface0 },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    height: 38,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primaryLit,
  },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  budgetRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20 },
  budgetCard: {
    flex: 1,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    padding: 12,
    alignItems: 'center',
  },
  budgetLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  budgetVal: { color: colors.textPrimary, fontSize: 18, fontWeight: '900', marginTop: 3 },
  formPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
  },
  formPillActive: { backgroundColor: colors.primary, borderColor: colors.primaryLit },
  formPillText: { color: colors.textMuted, fontWeight: '800', fontSize: 13 },
  formPillTextActive: { color: '#fff' },
  pitchWrap: { paddingHorizontal: 16, marginTop: 16 },
  pitch: {
    borderRadius: radius.lg,
    paddingVertical: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
    minHeight: 440,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  centerCircle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '42%',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  box: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    width: 140,
    height: 50,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  line: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: 8 },
  benchTitle: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginLeft: 20, marginTop: 22, marginBottom: 12 },
  bench: { flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  chipUsed: { opacity: 0.6 },
  chipText: { color: colors.textPrimary, fontWeight: '700', fontSize: 13 },
  chipUsedText: { color: colors.textMuted, fontSize: 9, fontWeight: '800', marginLeft: 2 },
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
  sheetName: { color: colors.textPrimary, fontSize: 22, fontWeight: '900' },
  sheetTeam: { color: colors.textMuted, fontSize: 13, marginTop: 3 },
  sheetStats: { flexDirection: 'row', gap: 10, marginVertical: 18 },
  sheetStat: { flex: 1, backgroundColor: colors.surface2, borderRadius: radius.md, padding: 12, alignItems: 'center' },
  sheetStatVal: { color: colors.gold, fontSize: 18, fontWeight: '900' },
  sheetStatLabel: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  sheetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.surface3,
  },
  sheetActionText: { color: colors.textPrimary, fontSize: 15, fontWeight: '600', flex: 1 },
});
