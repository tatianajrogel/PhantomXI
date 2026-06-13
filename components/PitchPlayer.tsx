import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../constants/theme';
import { Player } from '../constants/data';

interface Props {
  player: Player;
  isCaptain?: boolean;
  isVice?: boolean;
  onPress?: () => void;
  small?: boolean;
}

export default function PitchPlayer({ player, isCaptain, isVice, onPress, small }: Props) {
  const size = small ? 42 : 50;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, pressed && { opacity: 0.8 }]}>
      <View>
        <Image
          source={{ uri: player.photo }}
          style={[styles.photo, { width: size, height: size, borderRadius: size / 2 }]}
          contentFit="cover"
        />
        {isCaptain && (
          <View style={[styles.badge, { backgroundColor: colors.gold }]}>
            <Text style={styles.badgeText}>C</Text>
          </View>
        )}
        {isVice && (
          <View style={[styles.badge, { backgroundColor: colors.surface3 }]}>
            <Text style={styles.badgeText}>V</Text>
          </View>
        )}
      </View>
      <View style={styles.nameTag}>
        <Text style={styles.name} numberOfLines={1}>{player.name.split('. ').pop()}</Text>
      </View>
      <View style={styles.ptsTag}>
        <Text style={styles.pts}>{Math.round(player.form * (isCaptain ? 2 : 1))}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', width: 64 },
  photo: { backgroundColor: colors.surface2, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  badgeText: { color: '#000', fontSize: 10, fontWeight: '900' },
  nameTag: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginTop: 3,
    maxWidth: 64,
  },
  name: { color: '#fff', fontSize: 10, fontWeight: '700', textAlign: 'center' },
  ptsTag: {
    backgroundColor: colors.primaryLit,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginTop: 1,
  },
  pts: { color: '#fff', fontSize: 11, fontWeight: '800' },
});
