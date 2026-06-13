import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export default function Logo({ size = 22, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.mark,
          { width: size * 1.6, height: size * 1.6, borderRadius: size * 0.45 },
        ]}
      >
        <Text style={[styles.markText, { fontSize: size * 0.85 }]}>XI</Text>
      </View>
      {showText && (
        <Text style={[styles.brand, { fontSize: size }]}>
          Phantom<Text style={{ color: colors.gold }}>XI</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLit,
  },
  markText: {
    color: colors.textPrimary,
    fontWeight: '900',
    letterSpacing: -1,
  },
  brand: {
    color: colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
