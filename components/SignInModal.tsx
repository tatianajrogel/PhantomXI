import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from './Logo';
import { colors, radius } from '../constants/theme';
import { useAuth } from '../app/lib/auth';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onGuest?: () => void;
}

export default function SignInModal({ visible, onClose, onSuccess, onGuest }: Props) {
  const { signInEmail, signUpEmail, signInOAuth, continueAsGuest } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const reset = () => {
    setError('');
    setInfo('');
  };

  const submit = async () => {
    reset();
    if (!email.includes('@')) return setError('Enter a valid email.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (mode === 'signup' && name.trim().length < 2) return setError('Enter your manager name.');

    setLoading(true);
    const res =
      mode === 'signin'
        ? await signInEmail(email, password)
        : await signUpEmail(email, password, name.trim());
    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }
    if (mode === 'signup') {
      setInfo('Account created! You can sign in now.');
      setMode('signin');
      setPassword('');
      return;
    }
    onSuccess?.();
  };

  const oauth = async (provider: 'google' | 'apple') => {
    reset();
    setLoading(true);
    const res = await signInOAuth(provider);
    setLoading(false);
    if (res.error) setError(res.error);
  };

  const guest = () => {
    reset();
    continueAsGuest();
    onGuest?.();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.bg}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={styles.handle} />
            <View style={styles.logoRow}>
              <Logo size={20} />
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <Text style={styles.title}>
              {mode === 'signin' ? 'Welcome back, manager' : 'Create your account'}
            </Text>
            <Text style={styles.subtitle}>
              {mode === 'signin'
                ? 'Sign in to save your squad and climb the ranks.'
                : 'Join PhantomXI and start your dynasty.'}
            </Text>

            {/* OAuth */}
            <Pressable style={styles.oauthBtn} onPress={() => oauth('apple')} disabled={loading}>
              <Ionicons name="logo-apple" size={20} color="#fff" />
              <Text style={styles.oauthText}>Continue with Apple</Text>
            </Pressable>
            <Pressable
              style={[styles.oauthBtn, styles.googleBtn]}
              onPress={() => oauth('google')}
              disabled={loading}
            >
              <Ionicons name="logo-google" size={18} color="#fff" />
              <Text style={styles.oauthText}>Continue with Google</Text>
            </Pressable>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or with email</Text>
              <View style={styles.dividerLine} />
            </View>

            {mode === 'signup' && (
              <TextInput
                style={styles.input}
                placeholder="Manager name"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {!!error && <Text style={styles.error}>{error}</Text>}
            {!!info && <Text style={styles.info}>{info}</Text>}

            <Pressable style={styles.cta} onPress={submit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.ctaText}>{mode === 'signin' ? 'Sign In' : 'Create Account'}</Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => {
                reset();
                setMode(mode === 'signin' ? 'signup' : 'signin');
              }}
              style={styles.switch}
            >
              <Text style={styles.switchText}>
                {mode === 'signin' ? "Don't have an account? " : 'Already a manager? '}
                <Text style={styles.switchLink}>
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </Text>
              </Text>
            </Pressable>

            <Pressable style={styles.guestBtn} onPress={guest} disabled={loading}>
              <Ionicons name="eye-outline" size={17} color={colors.textMuted} />
              <Text style={styles.guestBtnText}>Explore as guest — no sign up</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.65)' },
  sheet: {
    backgroundColor: colors.surface1,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
    maxHeight: '92%',
    borderWidth: 1,
    borderColor: colors.surface3,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: colors.surface3, alignSelf: 'center', marginBottom: 16 },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: '900', letterSpacing: -0.5, marginTop: 18 },
  subtitle: { color: colors.textMuted, fontSize: 13, marginTop: 6, marginBottom: 20, lineHeight: 18 },
  oauthBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    paddingVertical: 14,
    marginBottom: 10,
  },
  googleBtn: { backgroundColor: colors.surface2 },
  oauthText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 18 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.surface3 },
  dividerText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  input: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    height: 52,
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: 12,
  },
  error: { color: colors.danger, fontSize: 13, marginBottom: 10, fontWeight: '600' },
  info: { color: colors.pitch, fontSize: 13, marginBottom: 10, fontWeight: '600' },
  cta: {
    backgroundColor: colors.primaryLit,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  switch: { alignItems: 'center', marginTop: 18 },
  switchText: { color: colors.textMuted, fontSize: 13 },
  switchLink: { color: colors.primaryLit, fontWeight: '800' },
  guestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    paddingVertical: 13,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surface3,
  },
  guestBtnText: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
});
