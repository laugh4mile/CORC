import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function CoffeeIcon({ color, size }) {
  const svg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11 3V7" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 3V7" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 3V7" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 27H26" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.4121 27.0005C8.4983 26.122 6.87684 24.7127 5.74025 22.9401C4.60365 21.1674 3.99966 19.1058 4 17V11H26V17C26.0003 19.1058 25.3963 21.1674 24.2597 22.9401C23.1231 24.7128 21.5016 26.122 19.5879 27.0005" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M26 11C27.0609 11 28.0783 11.4214 28.8284 12.1716C29.5786 12.9217 30 13.9391 30 15V16C30 17.0609 29.5786 18.0783 28.8284 18.8284C28.0783 19.5786 27.0609 20 26 20H25.5777" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const SvgImg = () => <SvgXml xml={svg} width={size} height={size} />;

  return <SvgImg />;
}
