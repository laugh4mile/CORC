import React from "react";
import { SvgXml } from "react-native-svg";

export default function UserIcon({ color, size }) {
  const svg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" stroke="${color}" stroke-width="2.5" stroke-miterlimit="10"/>
  <path d="M3.87366 26.9988C5.10311 24.8708 6.87092 23.1037 8.99951 21.8752C11.1281 20.6467 13.5425 20 16.0002 20C18.4578 20 20.8722 20.6468 23.0008 21.8754C25.1294 23.1039 26.8971 24.871 28.1265 26.9991" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const SvgImg = () => <SvgXml xml={svg} width={size} height={size} />;

  return <SvgImg />;
}
