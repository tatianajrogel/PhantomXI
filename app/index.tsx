import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Gradient from '../components/Gradient';
import Logo from '../components/Logo';
import SignInModal from '../components/SignInModal';
import { useAuth } from './lib/auth';
import { colors, radius } from '../constants/theme';

const HERO = 'https://d64gsuwffb70l.cloudfront.net/6a2db829f8f09ae75bf84a22_1781381389040_62e73cdf.png';

const stats = [
  { value: '2.1M+', label: 'Managers' },
  { value: '38', label: 'Gameweeks' },
  { value: '60s', label: 'Live Scores' },
];

const features = [
  { icon: 'people', title: 'Squad Builder', desc: 'Draft your perfect 15-man squad under £100m.' },
  { icon: 'pulse', title: 'Live Points', desc: 'Watch your points climb in real-time every gameweek.' },
  { icon: 'trophy', title: 'Private Leagues', desc: 'Invite friends, talk trash, win the bragging rights.' },
  { icon: 'sparkles', title: 'AI Transfers', desc: 'Let AI recommend your next genius transfer move.' },
];

export default function Landing() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { isAuthenticated, continueAsGuest } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  // If already signed in (or browsing as guest), jump straight into the app.
  useEffect(() => {
    if (isAuthenticated) router.replace('/(tabs)');
  }, [isAuthenticated]);

  const enter = () => {
    if (isAuthenticated) router.push('/(tabs)');
    else setAuthOpen(true);
  };

  // Let visitors explore the whole app without creating an account.
  const exploreAsGuest = () => {
    continueAsGuest();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.root}>
      <Gradient
        colors={[colors.heroTop, colors.heroMid, colors.heroBottom, colors.surface0]}
        style={StyleSheet.absoluteFill}
      />
      <Image
        source={{ uri: HERO }}
        style={styles.heroImg}
        contentFit="cover"
        transition={400}
      />
      <View style={styles.heroOverlay} />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
          <View style={styles.header}>
            <Logo size={20} />
            <Pressable style={styles.signIn} onPress={enter}>
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
          </View>

          {/* Hero */}
          <View style={[styles.hero, { minHeight: 480 }]}>
            <View style={styles.tagPill}>
              <View style={styles.tagDot} />
              <Text style={styles.tagText}>EPL FANTASY · 2025/26 SEASON</Text>
            </View>
            <Text style={styles.h1}>
              Pick the unseen.{'\n'}
              <Text style={{ color: colors.gold }}>Win the unseeable.</Text>
            </Text>
            <Text style={styles.sub}>
              Draft your dream Premier League squad, dominate your league, and win with real-time data.
            </Text>

            <Pressable style={styles.cta} onPress={enter}>
              <Text style={styles.ctaText}>Start Your Squad</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </Pressable>

            <Pressable style={styles.guestCta} onPress={exploreAsGuest}>
              <Ionicons name="eye-outline" size={17} color={colors.textPrimary} />
              <Text style={styles.guestCtaText}>Explore as guest — no sign up</Text>
            </Pressable>

            <View style={styles.statsRow}>
              {stats.map((s) => (
                <View key={s.label} style={styles.statBox}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Built to dominate</Text>
            <View style={styles.featGrid}>
              {features.map((f) => (
                <View key={f.title} style={[styles.featCard, { width: (Math.min(width, 720) - 48) / 2 }]}>
                  <View style={styles.featIcon}>
                    <Ionicons name={f.icon as any} size={20} color={colors.primaryLit} />
                  </View>
                  <Text style={styles.featTitle}>{f.title}</Text>
                  <Text style={styles.featDesc}>{f.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* How it works */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How it works</Text>
            {['Create your free account', 'Pick your 15-man squad', 'Compete live & win'].map((step, i) => (
              <View key={step} style={styles.stepRow}>
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Pro upsell */}
          <View style={styles.section}>
            <View style={styles.proCard}>
              <View style={styles.proBadge}>
                <Ionicons name="star" size={12} color="#000" />
                <Text style={styles.proBadgeText}>PHANTOM PRO</Text>
              </View>
              <Text style={styles.proTitle}>£3.99<Text style={styles.proMo}>/mo</Text></Text>
              <Text style={styles.proDesc}>Unlimited leagues · AI suggestions · Advanced stats · Ad-free</Text>
              <Pressable style={styles.proCta} onPress={enter}>
                <Text style={styles.proCtaText}>Get Phantom Pro</Text>
              </Pressable>
              <Text style={styles.proNote}>No commitment. Cancel anytime.</Text>
            </View>
          </View>

          <Text style={styles.footer}>© 2026 PhantomXI. Not affiliated with the Premier League.</Text>
        </ScrollView>
      </SafeAreaView>

      <SignInModal
        visible={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => {
          setAuthOpen(false);
          router.replace('/(tabs)');
        }}
        onGuest={() => {
          setAuthOpen(false);
          router.replace('/(tabs)');
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface0 },
  heroImg: { position: 'absolute', top: 0, left: 0, right: 0, height: 560, opacity: 0.35 },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 560 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  signIn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: radius.pill,
  },
  signInText: { color: colors.textPrimary, fontWeight: '700', fontSize: 13 },
  hero: { paddingHorizontal: 24, paddingTop: 30, justifyContent: 'center' },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(124,58,237,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginBottom: 18,
  },
  tagDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold },
  tagText: { color: colors.goldLight, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  h1: { color: colors.textPrimary, fontSize: 44, fontWeight: '900', letterSpacing: -1.5, lineHeight: 46 },
  sub: { color: colors.textMuted, fontSize: 16, marginTop: 16, lineHeight: 23, maxWidth: 420 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primaryLit,
    paddingVertical: 16,
    borderRadius: radius.md,
    marginTop: 28,
    shadowColor: colors.primaryLit,
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  guestCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: radius.md,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  guestCtaText: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  statsRow: { flexDirection: 'row', marginTop: 32, gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(17,17,19,0.7)',
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: { color: colors.gold, fontSize: 22, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  section: { paddingHorizontal: 24, marginTop: 44 },
  sectionTitle: { color: colors.textPrimary, fontSize: 26, fontWeight: '900', letterSpacing: -0.8, marginBottom: 20 },
  featGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  featCard: {
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.lg,
    padding: 16,
  },
  featIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(124,58,237,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' },
  featDesc: { color: colors.textMuted, fontSize: 12, marginTop: 6, lineHeight: 17 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  stepNum: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.primaryLit,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { color: colors.primaryLit, fontWeight: '900', fontSize: 16 },
  stepText: { color: colors.textPrimary, fontSize: 16, fontWeight: '600', flex: 1 },
  proCard: {
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.xl,
    padding: 24,
    alignItems: 'center',
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  proBadgeText: { color: '#000', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  proTitle: { color: colors.textPrimary, fontSize: 44, fontWeight: '900', marginTop: 16 },
  proMo: { color: colors.textMuted, fontSize: 18, fontWeight: '600' },
  proDesc: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 19 },
  proCta: {
    backgroundColor: colors.gold,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: radius.md,
    marginTop: 20,
  },
  proCtaText: { color: '#000', fontWeight: '900', fontSize: 15 },
  proNote: { color: colors.textMuted, fontSize: 11, marginTop: 12 },
  footer: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: 48, paddingHorizontal: 24 },
});
