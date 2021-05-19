import React from "react";
import { SvgXml } from "react-native-svg";

export default function QRCodeIcon({ color }) {
  const svg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 6H28V11" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 26H4V21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 21V26H23" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 11V6H9" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 11V21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 11V21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 11V21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11V21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const SvgImg = () => <SvgXml xml={svg} width="58%" height="58%" />;

  return <SvgImg />;
}
