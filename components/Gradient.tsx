import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

interface GradientProps {
  colors: string[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  horizontal?: boolean;
}

// Lightweight gradient without extra deps: stacks N interpolated bands.
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

export default function Gradient({ colors, style, children, horizontal }: GradientProps) {
  const bands = 14;
  const stops = colors.map((c) => hexToRgb(c));

  const bandViews = [];
  for (let i = 0; i < bands; i++) {
    const t = i / (bands - 1);
    const seg = t * (stops.length - 1);
    const idx = Math.min(Math.floor(seg), stops.length - 2);
    const localT = seg - idx;
    const a = stops[idx];
    const b = stops[idx + 1];
    const r = lerp(a.r, b.r, localT);
    const g = lerp(a.g, b.g, localT);
    const bl = lerp(a.b, b.b, localT);
    bandViews.push(
      <View
        key={i}
        style={{
          flex: 1,
          backgroundColor: `rgb(${r},${g},${bl})`,
        }}
      />
    );
  }

  return (
    <View style={style}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: horizontal ? 'row' : 'column',
        }}
      >
        {bandViews}
      </View>
      {children}
    </View>
  );
}
