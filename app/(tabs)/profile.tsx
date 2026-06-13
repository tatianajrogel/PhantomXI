import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, TextInput, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../../components/Gradient';
import SignInModal from '../../components/SignInModal';
import { useAuth } from '../lib/auth';
import { colors, radius } from '../../constants/theme';
import { badges } from '../../constants/data';

const AVATAR = 'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381408389_428fa281.jpg';

const seasonHistory = [
  { season: '2024/25', points: 2341, rank: '92,104' },
  { season: '2023/24', points: 2198, rank: '241,887' },
  { season: '2022/23', points: 2056, rank: '510,332' },
];

export default function Profile() {
  const router = useRouter();
  const { user, isGuest, signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifs, setNotifs] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [authOpen, setAuthOpen] = useState(false);

  const managerName = isGuest
    ? 'Guest Manager'
    : (user?.user_metadata?.display_name as string) ||
      user?.email?.split('@')[0] ||
      'Spectre';

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  const subscribe = async () => {
    if (!email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    try {
      await fetch('https://famous.ai/api/crm/6a2db829f8f09ae75bf84a22/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: phone.trim() ? phone.trim() : undefined,
          sms_opt_in: smsOptIn === true,
          source: 'newsletter',
          tags: ['newsletter', 'phantomxi-app'],
        }),
      });
      setStatus('done');
      setEmail('');
      setPhone('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile header */}
        <Gradient colors={[colors.primary, colors.heroMid, colors.surface0]} style={styles.headerCard}>
          <View style={styles.avatarRing}>
            <Image source={{ uri: AVATAR }} style={styles.avatar} contentFit="cover" />
          </View>
          <Text style={styles.name}>{managerName}</Text>
          <Text style={styles.handle}>
            {isGuest ? 'Browsing as guest' : user?.email ?? '@spectral_squad'}
          </Text>
          {isGuest ? (
            <Pressable style={styles.guestSignUpBadge} onPress={() => setAuthOpen(true)}>
              <Ionicons name="person-add" size={11} color="#fff" />
              <Text style={styles.guestSignUpText}>Sign up to save your squad</Text>
            </Pressable>
          ) : (
            <View style={styles.proBadge}>
              <Ionicons name="star" size={11} color="#000" />
              <Text style={styles.proBadgeText}>PHANTOM PRO</Text>
            </View>
          )}
        </Gradient>

        {/* Stat cards */}
        <View style={styles.statRow}>
          {[
            { label: 'Total Points', value: '1,809' },
            { label: 'Overall Rank', value: '184K' },
            { label: 'Best GW', value: '94' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Badges */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.badgeGrid}>
          {badges.map((b) => (
            <View key={b.id} style={[styles.badge, !b.unlocked && styles.badgeLocked]}>
              <View style={[styles.badgeIcon, b.unlocked && { backgroundColor: 'rgba(245,158,11,0.18)' }]}>
                <Ionicons name={b.icon as any} size={22} color={b.unlocked ? colors.gold : colors.surface3} />
              </View>
              <Text style={[styles.badgeName, !b.unlocked && { color: colors.surface3 }]} numberOfLines={2}>
                {b.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Season history */}
        <Text style={styles.sectionTitle}>Season History</Text>
        <View style={styles.historyWrap}>
          {seasonHistory.map((h) => (
            <View key={h.season} style={styles.historyRow}>
              <Text style={styles.historySeason}>{h.season}</Text>
              <Text style={styles.historyPts}>{h.points} pts</Text>
              <Text style={styles.historyRank}>Rank {h.rank}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Ionicons name="moon" size={20} color={colors.primaryLit} />
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: colors.primary, false: colors.surface3 }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.settingDivider} />
          <View style={styles.settingRow}>
            <Ionicons name="notifications" size={20} color={colors.primaryLit} />
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifs}
              onValueChange={setNotifs}
              trackColor={{ true: colors.primary, false: colors.surface3 }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.settingDivider} />
          {isGuest ? (
            <Pressable style={styles.settingRow} onPress={() => setAuthOpen(true)}>
              <Ionicons name="log-in" size={20} color={colors.primaryLit} />
              <Text style={[styles.settingLabel, { color: colors.primaryLit }]}>Sign In / Sign Up</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </Pressable>
          ) : (
            <Pressable style={styles.settingRow} onPress={handleSignOut}>
              <Ionicons name="log-out" size={20} color={colors.danger} />
              <Text style={[styles.settingLabel, { color: colors.danger }]}>Sign Out</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        {/* Newsletter signup */}
        <Text style={styles.sectionTitle}>Gameweek Briefing</Text>
        <View style={styles.newsletter}>
          <Text style={styles.newsTitle}>Get the weekly edge</Text>
          <Text style={styles.newsSub}>Transfer tips, injury news & deadline reminders straight to your inbox.</Text>

          {status === 'done' ? (
            <View style={styles.successRow}>
              <Ionicons name="checkmark-circle" size={22} color={colors.pitch} />
              <Text style={styles.successText}>You're in. Watch your inbox.</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={(t) => { setEmail(t); setStatus('idle'); }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Phone number (optional)"
                placeholderTextColor={colors.textMuted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Pressable style={styles.smsRow} onPress={() => setSmsOptIn(!smsOptIn)}>
                <View style={[styles.checkbox, smsOptIn && styles.checkboxOn]}>
                  {smsOptIn && <Ionicons name="checkmark" size={14} color="#000" />}
                </View>
                <Text style={styles.smsText}>
                  Text me updates. Msg & data rates may apply. Reply STOP to unsubscribe.
                </Text>
              </Pressable>
              {status === 'error' && <Text style={styles.errorText}>Please enter a valid email.</Text>}
              <Pressable style={styles.newsCta} onPress={subscribe} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.newsCtaText}>Subscribe</Text>
                )}
              </Pressable>
            </>
          )}
        </View>

        <Text style={styles.footer}>PhantomXI v1.0 · Not affiliated with the Premier League</Text>
      </ScrollView>

      <SignInModal
        visible={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => setAuthOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface0 },
  headerCard: { alignItems: 'center', paddingTop: 30, paddingBottom: 28, overflow: 'hidden' },
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: colors.gold,
    padding: 3,
  },
  avatar: { width: '100%', height: '100%', borderRadius: 44, backgroundColor: colors.surface2 },
  name: { color: colors.textPrimary, fontSize: 24, fontWeight: '900', marginTop: 14 },
  handle: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginTop: 12,
  },
  proBadgeText: { color: '#000', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  guestSignUpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLit,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    marginTop: 10,
  },
  guestSignUpText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  statRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: -16 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    padding: 14,
    alignItems: 'center',
  },
  statVal: { color: colors.gold, fontSize: 20, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
  sectionTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '800', letterSpacing: -0.5, paddingHorizontal: 20, marginTop: 28, marginBottom: 14 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  badge: {
    width: '31%',
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    padding: 12,
    alignItems: 'center',
  },
  badgeLocked: { opacity: 0.5 },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeName: { color: colors.textPrimary, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  historyWrap: { paddingHorizontal: 20, gap: 8 },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    padding: 14,
  },
  historySeason: { color: colors.textPrimary, fontSize: 14, fontWeight: '800', flex: 1 },
  historyPts: { color: colors.gold, fontSize: 14, fontWeight: '700', marginRight: 16 },
  historyRank: { color: colors.textMuted, fontSize: 12 },
  settingsCard: {
    marginHorizontal: 20,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
  },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16 },
  settingLabel: { color: colors.textPrimary, fontSize: 15, fontWeight: '600', flex: 1 },
  settingDivider: { height: 1, backgroundColor: colors.surface3 },
  newsletter: {
    marginHorizontal: 20,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.lg,
    padding: 18,
  },
  newsTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  newsSub: { color: colors.textMuted, fontSize: 12, marginTop: 4, marginBottom: 14, lineHeight: 17 },
  input: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 48,
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 10,
  },
  smsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  smsText: { color: colors.textMuted, fontSize: 11, flex: 1, lineHeight: 16 },
  errorText: { color: colors.danger, fontSize: 12, marginBottom: 8 },
  newsCta: { backgroundColor: colors.primaryLit, borderRadius: radius.md, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  newsCtaText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  successRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  successText: { color: colors.pitch, fontSize: 14, fontWeight: '700' },
  footer: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: 36 },
});
