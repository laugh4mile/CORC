import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function GearIcon() {
  const svg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z" stroke="#D7D7D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.3589 5.5192L13.0002 3.75071C12.8737 3.65551 12.7263 3.59174 12.5703 3.56467C12.4142 3.5376 12.254 3.548 12.1028 3.595C11.3723 3.82376 10.6636 4.11699 9.98496 4.47124C9.84449 4.54492 9.72355 4.65095 9.63214 4.78058C9.54072 4.91022 9.48144 5.05973 9.45919 5.21679L9.04223 8.13565C8.88329 8.27654 8.72769 8.42307 8.57542 8.57525C8.4232 8.72747 8.27664 8.88311 8.13572 9.04218L8.13565 9.04223L5.2173 9.45956C5.0605 9.48173 4.91121 9.54085 4.78174 9.63204C4.65226 9.72323 4.54631 9.84388 4.47262 9.98405C4.11783 10.6624 3.82403 11.3708 3.59468 12.1012C3.54745 12.2526 3.53692 12.4131 3.56394 12.5694C3.59096 12.7257 3.65476 12.8733 3.75009 13.0001L5.5192 15.3589C5.50643 15.5709 5.50002 15.7846 5.49996 15.9998C5.49996 16.2151 5.50637 16.4288 5.51921 16.6409L5.5192 16.641L3.75071 18.9997C3.65551 19.1262 3.59174 19.2736 3.56467 19.4296C3.5376 19.5857 3.548 19.7459 3.595 19.8971C3.82376 20.6276 4.11699 21.3364 4.47124 22.0149C4.54492 22.1554 4.65095 22.2764 4.78058 22.3678C4.91022 22.4592 5.05973 22.5185 5.21679 22.5407L8.13565 22.9577C8.27653 23.1166 8.42307 23.2722 8.57524 23.4245C8.72746 23.5767 8.88311 23.7233 9.04217 23.8642L9.04222 23.8643L9.45956 26.7826C9.48173 26.9394 9.54084 27.0887 9.63203 27.2182C9.72322 27.3477 9.84387 27.4536 9.98405 27.5273C10.6623 27.8821 11.3708 28.1759 12.1012 28.4052C12.2526 28.4525 12.4131 28.463 12.5694 28.436C12.7257 28.409 12.8733 28.3451 13.0001 28.2498L15.3589 26.4807C15.5709 26.4935 15.7846 26.4999 15.9998 26.5C16.2151 26.5 16.4288 26.4935 16.6409 26.4807L16.641 26.4807L18.9997 28.2492C19.1262 28.3444 19.2736 28.4082 19.4296 28.4352C19.5857 28.4623 19.7459 28.4519 19.8971 28.4049C20.6276 28.1762 21.3364 27.8829 22.0149 27.5287C22.1554 27.455 22.2764 27.349 22.3678 27.2193C22.4592 27.0897 22.5185 26.9402 22.5407 26.7831L22.9577 23.8643C23.1166 23.7234 23.2722 23.5768 23.4245 23.4247C23.5767 23.2725 23.7233 23.1168 23.8642 22.9577L23.8643 22.9577L26.7826 22.5404C26.9394 22.5182 27.0887 22.4591 27.2182 22.3679C27.3477 22.2767 27.4536 22.156 27.5273 22.0159C27.8821 21.3376 28.1759 20.6291 28.4052 19.8988C28.4525 19.7473 28.463 19.5868 28.436 19.4305C28.409 19.2742 28.3451 19.1266 28.2498 18.9998L26.4807 16.641C26.4935 16.429 26.4999 16.2154 26.5 16.0001C26.5 15.7848 26.4935 15.5711 26.4807 15.359L26.4807 15.3589L28.2492 13.0002C28.3444 12.8737 28.4082 12.7263 28.4352 12.5703C28.4623 12.4142 28.4519 12.254 28.4049 12.1028C28.1762 11.3723 27.8829 10.6636 27.5287 9.98496C27.455 9.84449 27.349 9.72355 27.2193 9.63214C27.0897 9.54072 26.9402 9.48144 26.7831 9.45919L23.8643 9.04223C23.7234 8.88329 23.5768 8.72769 23.4247 8.57542C23.2725 8.4232 23.1168 8.27664 22.9577 8.13572L22.9577 8.13565L22.5404 5.2173C22.5182 5.0605 22.4591 4.91121 22.3679 4.78174C22.2767 4.65226 22.156 4.54631 22.0159 4.47262C21.3376 4.11783 20.6291 3.82403 19.8988 3.59468C19.7473 3.54745 19.5868 3.53692 19.4305 3.56394C19.2742 3.59096 19.1266 3.65476 18.9998 3.75009L16.641 5.5192C16.429 5.50643 16.2154 5.50002 16.0001 5.49996C15.7848 5.49996 15.5711 5.50637 15.359 5.51921L15.3589 5.5192Z" stroke="#D7D7D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const SvgImg = () => <SvgXml xml={svg} width="40%" height="40%" />;

  return <SvgImg />;
}
