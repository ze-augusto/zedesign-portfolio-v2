'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import './brutalist.css';

// 3D physics badge — client-only (three/rapier WASM), no SSR.
const Lanyard = dynamic(() => import('@/components/Lanyard'), { ssr: false });
import { useI18n } from '@/hooks/useI18n';
import { CONTACT } from '@/data/about';

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Ícones da seção "O que faço" — 72×72, recoloríveis via currentColor.
// Recortes (#0A0A0A) ficam fixos para vazar contra o fundo do card.
const WHAT_ICONS = [
  // Requisitos — file-signature
  <svg key="req" viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <path d="M7.21143 14.4C7.21143 10.4287 10.4402 7.2 14.4114 7.2H31.2302C33.1427 7.2 34.9764 7.95375 36.3264 9.30375L48.2964 21.2962C49.6464 22.6462 50.4002 24.48 50.4002 26.3925V37.3612L35.5502 52.2112H30.8139L29.0027 46.1812C28.4739 44.415 26.8539 43.2112 25.0089 43.2112C23.7377 43.2112 22.5452 43.785 21.7577 44.775L14.9964 53.2125C14.0627 54.3712 14.2539 56.0812 15.4127 57.0037C16.5714 57.9262 18.2814 57.7462 19.2039 56.5762L24.5027 49.9612L26.2127 55.665C26.5502 56.8125 27.6077 57.5887 28.8002 57.5887H32.3439C32.2427 57.9375 32.1527 58.2975 32.0852 58.6575L30.8589 64.7887H14.4114C10.4402 64.7887 7.21143 61.56 7.21143 57.5887V14.3887V14.4ZM30.6114 13.7812V24.3C30.6114 25.7962 31.8152 27 33.3114 27H43.8302L30.6114 13.7812ZM37.3839 59.7262C37.6652 58.3312 38.3514 57.0487 39.3527 56.0475L52.7289 42.6712L61.7289 51.6712L48.3527 65.0475C47.3514 66.0487 46.0689 66.735 44.6739 67.0162L37.9689 68.355C37.8677 68.3775 37.7552 68.3888 37.6427 68.3888C36.7427 68.3888 36.0002 67.6575 36.0002 66.7462C36.0002 66.6337 36.0114 66.5325 36.0339 66.42L37.3727 59.715L37.3839 59.7262ZM67.5114 45.8887L64.2714 49.1288L55.2714 40.1288L58.5114 36.8887C60.9977 34.4025 65.0252 34.4025 67.5114 36.8887C69.9977 39.375 69.9977 43.4025 67.5114 45.8887Z" fill="currentColor" />
  </svg>,
  // Fluxogramas — flow
  <svg key="flow" viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <path d="M63 60.75H49.5V58.5H63V60.75Z" fill="#0A0A0A" />
    <path d="M22.5 60.75H9V58.5H22.5V60.75Z" fill="#0A0A0A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M58.5 49.5H69.75C70.9942 49.5 72 50.508 72 51.75V67.5C72 68.742 70.9942 69.75 69.75 69.75H42.75C41.5058 69.75 40.5 68.742 40.5 67.5V51.75C40.5 50.508 41.5058 49.5 42.75 49.5H56.25V38.25H48.0262C48.006 38.2843 47.9864 38.319 47.9669 38.3537C47.8953 38.4807 47.8236 38.6079 47.7158 38.7158L37.5908 48.8408C37.152 49.2795 36.576 49.5 36 49.5C35.424 49.5 34.848 49.2795 34.4093 48.8408L24.2843 38.7158C24.1757 38.609 24.1054 38.4832 24.035 38.3574C24.0149 38.3214 23.9947 38.2855 23.9737 38.25H15.75V49.5H29.25C30.4942 49.5 31.5 50.508 31.5 51.75V67.5C31.5 68.742 30.4942 69.75 29.25 69.75H2.25C1.00575 69.75 0 68.742 0 67.5V51.75C0 50.508 1.00575 49.5 2.25 49.5H13.5V36H23.9737C23.994 35.9657 24.0136 35.9311 24.0331 35.8964C24.1047 35.7693 24.1764 35.6421 24.2843 35.5343L34.4093 25.4093C34.516 25.3007 34.6418 25.2304 34.7676 25.16C34.8036 25.1399 34.8395 25.1197 34.875 25.0987V22.5H22.5C21.2558 22.5 20.25 21.492 20.25 20.25V4.5C20.25 3.258 21.2558 2.25 22.5 2.25H49.5C50.7442 2.25 51.75 3.258 51.75 4.5V20.25C51.75 21.492 50.7442 22.5 49.5 22.5H37.125V25.0987C37.1417 25.1086 37.1585 25.1184 37.1754 25.128L37.2286 25.1581C37.3557 25.2297 37.4829 25.3014 37.5908 25.4093L47.7158 35.5343C47.8242 35.641 47.8946 35.7668 47.965 35.8926C47.9851 35.9286 48.0052 35.9645 48.0262 36H58.5V49.5ZM24.75 6.75V18H47.25V6.75H24.75ZM4.5 54V65.25H27V54H4.5ZM29.0565 37.125L36 44.0685L42.9435 37.125L36 30.1815L29.0565 37.125ZM45 54V65.25H67.5V54H45Z" fill="currentColor" />
    <path d="M29.25 11.25H42.75V13.5H29.25V11.25Z" fill="#0A0A0A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M27 65.25H4.5V54H27V65.25ZM9 60.75H22.5V58.5H9V60.75Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M67.5 65.25H45V54H67.5V65.25ZM49.5 60.75H63V58.5H49.5V60.75Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M24.75 18V6.75H47.25V18H24.75ZM42.75 11.25H29.25V13.5H42.75V11.25Z" fill="currentColor" />
  </svg>,
  // Wireframes — layout (Figma asset)
  <svg key="wire" viewBox="0 0 68.4 68.4" fill="none" aria-hidden="true">
    <path d="M68.4 68.4H0L3.60608e-06 0H68.4L68.4 68.4Z" fill="currentColor" />
    <path d="M62.9426 4.36597H5.45743C4.85452 4.36597 4.36597 4.85452 4.36597 5.45743V9.8234C4.36597 10.4263 4.85452 10.9149 5.45743 10.9149H62.9426C63.5455 10.9149 64.034 10.4263 64.034 9.8234V5.45743C64.034 4.85452 63.5455 4.36597 62.9426 4.36597ZM61.8511 8.73194H6.54889V6.54902H61.851L61.8511 8.73194Z" fill="#0A0A0A" />
    <path d="M62.9426 46.8127H5.45743C4.85452 46.8127 4.36597 47.3013 4.36597 47.9042V62.9425C4.36597 63.5454 4.85452 64.0339 5.45743 64.0339H62.9426C63.5455 64.0339 64.034 63.5454 64.034 62.9425V47.9042C64.034 47.3013 63.5455 46.8127 62.9426 46.8127ZM61.8511 61.851H6.54889V48.9957H61.851L61.8511 61.851Z" fill="#0A0A0A" />
    <path d="M42.3254 13.0979H26.0745C25.4716 13.0979 24.983 13.5865 24.983 14.1894V30.4405C24.983 31.0434 25.4716 31.532 26.0745 31.532H42.3255C42.9284 31.532 43.417 31.0434 43.417 30.4405V14.1894C43.417 13.5865 42.9284 13.0979 42.3254 13.0979ZM39.6901 15.2808L34.1999 20.7711L28.7096 15.2808H39.6901ZM27.166 16.8245L32.6563 22.3148L27.166 27.8051V16.8245ZM28.7098 29.3489L34.1999 23.8586L39.6902 29.3489H28.7098ZM41.2339 27.8051L35.7436 22.3148L41.2339 16.8245V27.8051Z" fill="#0A0A0A" />
    <path d="M62.9425 13.0979H46.6913C46.0884 13.0979 45.5999 13.5865 45.5999 14.1894V30.4405C45.5999 31.0434 46.0884 31.532 46.6913 31.532H62.9425C63.5454 31.532 64.0339 31.0434 64.0339 30.4405V14.1894C64.0339 13.5865 63.5454 13.0979 62.9425 13.0979ZM60.3072 15.2808L54.8169 20.7711L49.3266 15.2808H60.3072ZM47.7828 16.8245L53.2731 22.3148L47.7828 27.8051V16.8245ZM49.3264 29.3489L54.8169 23.8586L60.3072 29.3489H49.3264ZM61.851 27.8051L56.3607 22.3148L61.851 16.8245V27.8051Z" fill="#0A0A0A" />
    <path d="M42.3254 33.7148H26.0745C25.4716 33.7148 24.983 34.2034 24.983 34.8063C24.983 35.4092 25.4716 35.8978 26.0745 35.8978H42.3255C42.9284 35.8978 43.417 35.4092 43.417 34.8063C43.417 34.2034 42.9284 33.7148 42.3254 33.7148Z" fill="#0A0A0A" />
    <path d="M62.9425 33.7148H46.6913C46.0884 33.7148 45.5999 34.2034 45.5999 34.8063C45.5999 35.4092 46.0884 35.8978 46.6913 35.8978H62.9425C63.5454 35.8978 64.0339 35.4092 64.0339 34.8063C64.0339 34.2034 63.5454 33.7148 62.9425 33.7148Z" fill="#0A0A0A" />
    <path d="M21.7086 33.7148H5.45743C4.85452 33.7148 4.36597 34.2034 4.36597 34.8063C4.36597 35.4092 4.85452 35.8978 5.45743 35.8978H21.7086C22.3115 35.8978 22.8 35.4092 22.8 34.8063C22.8 34.2034 22.3115 33.7148 21.7086 33.7148Z" fill="#0A0A0A" />
    <path d="M42.3254 38.0808H26.0745C25.4716 38.0808 24.983 38.5694 24.983 39.1723C24.983 39.7752 25.4716 40.2637 26.0745 40.2637H42.3255C42.9284 40.2637 43.417 39.7752 43.417 39.1723C43.417 38.5694 42.9284 38.0808 42.3254 38.0808Z" fill="#0A0A0A" />
    <path d="M62.9425 38.0808H46.6913C46.0884 38.0808 45.5999 38.5694 45.5999 39.1723C45.5999 39.7752 46.0884 40.2637 46.6913 40.2637H62.9425C63.5454 40.2637 64.0339 39.7752 64.0339 39.1723C64.0339 38.5694 63.5454 38.0808 62.9425 38.0808Z" fill="#0A0A0A" />
    <path d="M21.7086 38.0808H5.45743C4.85452 38.0808 4.36597 38.5694 4.36597 39.1723C4.36597 39.7752 4.85452 40.2637 5.45743 40.2637H21.7086C22.3115 40.2637 22.8 39.7752 22.8 39.1723C22.8 38.5694 22.3115 38.0808 21.7086 38.0808Z" fill="#0A0A0A" />
    <path d="M34.2243 42.4468H26.0745C25.4716 42.4468 24.983 42.9353 24.983 43.5382C24.983 44.1411 25.4716 44.6297 26.0745 44.6297H34.2243C34.8272 44.6297 35.3157 44.1411 35.3157 43.5382C35.3157 42.9353 34.8272 42.4468 34.2243 42.4468Z" fill="#0A0A0A" />
    <path d="M54.8411 42.4468H46.6913C46.0884 42.4468 45.5999 42.9353 45.5999 43.5382C45.5999 44.1411 46.0884 44.6297 46.6913 44.6297H54.8411C55.444 44.6297 55.9325 44.1411 55.9325 43.5382C55.9325 42.9353 55.4441 42.4468 54.8411 42.4468Z" fill="#0A0A0A" />
    <path d="M13.6072 42.4468H5.45743C4.85452 42.4468 4.36597 42.9353 4.36597 43.5382C4.36597 44.1411 4.85452 44.6297 5.45743 44.6297H13.6072C14.2101 44.6297 14.6986 44.1411 14.6986 43.5382C14.6986 42.9353 14.2102 42.4468 13.6072 42.4468Z" fill="#0A0A0A" />
    <path d="M21.7086 13.0979H5.45743C4.85452 13.0979 4.36597 13.5865 4.36597 14.1894V30.4405C4.36597 31.0434 4.85452 31.532 5.45743 31.532H21.7086C22.3115 31.532 22.8 31.0434 22.8 30.4405V14.1894C22.8 13.5865 22.3115 13.0979 21.7086 13.0979ZM19.0733 15.2808L13.583 20.7711L8.0927 15.2808H19.0733ZM6.54889 16.8246L12.0392 22.3148L6.54889 27.8052V16.8246ZM8.09256 29.3489L13.5829 23.8586L19.0733 29.3489H8.09256ZM20.6171 27.8051L15.1268 22.3148L20.6171 16.8245V27.8051Z" fill="#0A0A0A" />
  </svg>,
  // Alta fidelidade e Prototipação — monitor
  <svg key="hifi" viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <path d="M59.1333 14.7333V45.6667H12.7333V14.7333H59.1333ZM12.7333 7C8.46792 7 5 10.4679 5 14.7333V45.6667C5 49.9321 8.46792 53.4 12.7333 53.4H30.1333L28.2 59.2H19.5C17.8929 59.2 16.6 60.4929 16.6 62.1C16.6 63.7071 17.8929 65 19.5 65H52.3667C53.9737 65 55.2667 63.7071 55.2667 62.1C55.2667 60.4929 53.9737 59.2 52.3667 59.2H43.6667L41.7333 53.4H59.1333C63.3987 53.4 66.8667 49.9321 66.8667 45.6667V14.7333C66.8667 10.4679 63.3987 7 59.1333 7H12.7333Z" fill="currentColor" />
    <path d="M33.7547 20.6046C34.0869 20.4364 34.4889 20.4733 34.7843 20.699L47.911 30.5399C48.2514 30.7942 48.3868 31.2372 48.2555 31.6392C48.1243 32.0412 47.7469 32.312 47.3203 32.312H41.0728L44.7196 39.6014C45.0436 40.2495 44.7811 41.0371 44.133 41.3612C43.4848 41.6852 42.6972 41.4227 42.3732 40.7746L38.7264 33.4852L34.9812 38.4815C34.7269 38.822 34.2838 38.9573 33.8818 38.8261C33.4798 38.6948 33.2091 38.3174 33.2091 37.8949V21.4866C33.2091 21.1133 33.4183 20.7728 33.7547 20.6046Z" fill="currentColor" />
  </svg>,
  // Testes de usabilidade — list-check
  <svg key="test" viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <rect x="6" y="6" width="60" height="60" rx="8" fill="currentColor" />
    <path d="M24.4726 15.0571C25.5008 15.774 25.7461 17.1889 25.0292 18.2077L19.7468 25.7539C19.3601 26.301 18.7564 26.65 18.0866 26.7066C17.4169 26.7632 16.7566 26.5368 16.2849 26.0652L12.5118 22.2921C11.6346 21.4054 11.6346 19.9716 12.5118 19.0849C13.3891 18.1982 14.8323 18.2077 15.719 19.0849L17.5867 20.9526L21.3221 15.6136C22.039 14.5854 23.4539 14.3402 24.4726 15.0571ZM24.4726 30.1496C25.5008 30.8665 25.7461 32.2814 25.0292 33.3002L19.7468 40.8464C19.3601 41.3936 18.7564 41.7426 18.0866 41.7992C17.4169 41.8558 16.7566 41.6294 16.2849 41.1577L12.5118 37.3846C11.6251 36.4979 11.6251 35.0641 12.5118 34.1869C13.3985 33.3096 14.8323 33.3002 15.7095 34.1869L17.5772 36.0546L21.3126 30.7156C22.0295 29.6874 23.4445 29.4422 24.4632 30.159L24.4726 30.1496ZM32.9811 20.6885C32.9811 19.0189 34.33 17.67 35.9996 17.67H57.1291C58.7987 17.67 60.1476 19.0189 60.1476 20.6885C60.1476 22.3581 58.7987 23.707 57.1291 23.707H35.9996C34.33 23.707 32.9811 22.3581 32.9811 20.6885ZM32.9811 35.781C32.9811 34.1114 34.33 32.7625 35.9996 32.7625H57.1291C58.7987 32.7625 60.1476 34.1114 60.1476 35.781C60.1476 37.4506 58.7987 38.7995 57.1291 38.7995H35.9996C34.33 38.7995 32.9811 37.4506 32.9811 35.781ZM26.944 50.8735C26.944 49.2039 28.2929 47.855 29.9626 47.855H57.1291C58.7987 47.855 60.1476 49.2039 60.1476 50.8735C60.1476 52.5432 58.7987 53.8921 57.1291 53.8921H29.9626C28.2929 53.8921 26.944 52.5432 26.944 50.8735ZM17.8885 47.1004C18.8892 47.1004 19.8489 47.4979 20.5565 48.2055C21.2641 48.9131 21.6617 49.8729 21.6617 50.8735C21.6617 51.8742 21.2641 52.834 20.5565 53.5416C19.8489 54.2492 18.8892 54.6467 17.8885 54.6467C16.8878 54.6467 15.9281 54.2492 15.2205 53.5416C14.5129 52.834 14.1154 51.8742 14.1154 50.8735C14.1154 49.8729 14.5129 48.9131 15.2205 48.2055C15.9281 47.4979 16.8878 47.1004 17.8885 47.1004Z" fill="#0A0A0A" />
  </svg>,
  // Validação com devs — code-circle
  <svg key="dev" viewBox="0 0 72 72" fill="none" aria-hidden="true">
    <rect x="6" y="6" width="60" height="60" rx="8" fill="currentColor" />
    <path d="M25.8325 43.8728C26.7025 43.0028 26.7025 41.5628 25.8325 40.6928L21.4225 36.2828L25.8325 31.8728C26.7025 31.0028 26.7025 29.5628 25.8325 28.6928C24.9625 27.8228 23.5225 27.8228 22.6525 28.6928L16.6525 34.6928C15.7825 35.5628 15.7825 37.0028 16.6525 37.8728L22.6525 43.8728C23.1025 44.3228 23.6725 44.5328 24.2425 44.5328C24.8125 44.5328 25.3825 44.3228 25.8325 43.8728Z" fill="#0A0A0A" />
    <path d="M35.3125 44.1728L41.3125 30.1628C41.7925 29.0228 41.2825 27.7028 40.1425 27.1928C39.0025 26.6828 37.6825 27.2228 37.2025 28.3628L31.2025 42.3728C30.6925 43.5428 31.2325 44.8628 32.3725 45.3428C32.6425 45.4628 32.9425 45.5228 33.2425 45.5228C34.1125 45.5228 34.9525 45.0128 35.3125 44.1728Z" fill="#0A0A0A" />
    <path d="M49.8325 43.8728L55.8325 37.8728C56.7025 37.0028 56.7025 35.5628 55.8325 34.6928L49.8325 28.6928C48.9625 27.8228 47.5225 27.8228 46.6525 28.6928C45.7825 29.5628 45.7825 31.0028 46.6525 31.8728L51.0625 36.2828L46.6525 40.6928C45.7825 41.5628 45.7825 43.0028 46.6525 43.8728C47.1025 44.3228 47.6725 44.5328 48.2425 44.5328C48.8125 44.5328 49.3825 44.3228 49.8325 43.8728Z" fill="#0A0A0A" />
  </svg>,
];

// Imagem da zona de mídia do card expandido, por etapa. Etapa sem imagem
// cai no ícone (WHAT_ICONS). bg = fundo do painel (varia por imagem no Figma).
// cover: imagem preenche a largura encostando nas bordas laterais (só padding
// vertical), com object-fit cover — como no Figma. Padrão: contain, com padding.
// w/h are the images' natural pixel sizes — passed to <img> so the browser
// reserves the aspect-ratio box before the pixels load, keeping the mobile
// accordion's measured height correct (no snap when the image finishes loading).
const WHAT_MEDIA: ({ src: string; bg: string; w: number; h: number; cover?: boolean; fillBottom?: boolean } | undefined)[] = [
  { src: '/images/Como_trabalho_Requisitos.png', bg: '#ececec', w: 3700, h: 2112 },
  { src: '/images/Como_trabalho_Fluxogramas.png', bg: '#ffffff', w: 1556, h: 1399 },
  { src: '/images/Como_trabalho_Wireframes.png', bg: '#e6e6e6', w: 1050, h: 944 },
  { src: '/images/Como_trabalho_Prototipos.png', bg: '#2b2b2b', w: 1607, h: 1473, fillBottom: true },
  { src: '/images/Como_trabalho_Testes.png', bg: '#ffffff', w: 1932, h: 1776, fillBottom: true },
  { src: '/images/Como_trabalho_Validacao.png', bg: '#28292a', w: 1470, h: 833, cover: true },
];

export default function HomePage() {
  const { lang, t, toggle } = useI18n('PT');
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [cols, setCols] = useState(3);
  const [bandIn, setBandIn] = useState(false);
  const stepCount = t.what.items.length;

  const topRef = useRef<HTMLElement>(null);
  const roleMarkRef = useRef<HTMLSpanElement>(null);
  const bandRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<{ top: number; left: number; width: number; height: number } | null>(null);
  const openingRef = useRef(false);
  // Mobile accordion height-morph: the open card's clip element, the last height
  // it settled at (so a step-change morphs from it, not from zero), and a flag so
  // the collapse-on-close transition isn't undone by the open effect's listener.
  const accClipRef = useRef<HTMLDivElement | null>(null);
  const prevAccH = useRef(0);
  // Compact card height captured at open — the morph grows from / collapses to it
  // so swapping compact↔expanded never jumps the layout by the compact's height.
  const accBaseH = useRef(0);
  const accClosing = useRef(false);
  const ACC_EASE = 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

  // Card geometry relative to the board (so the expanded element can morph
  // from the card's exact position/size to filling the whole board).
  const getRect = (card: Element) => {
    const b = boardRef.current!.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    return { top: c.top - b.top, left: c.left - b.left, width: c.width, height: c.height };
  };

  // Desktop uses a FLIP overlay that grows to fill the board; mobile expands the
  // tapped card inline (accordion) so the other cards stay visible.
  const isMobile = cols === 1;

  const openCard = (i: number, e: React.MouseEvent) => {
    if (isMobile) {
      // Grow from the tapped compact card's height so the slot doesn't jump.
      const h = (e.currentTarget as HTMLElement).getBoundingClientRect().height;
      accBaseH.current = h;
      if (openStep === null) prevAccH.current = h;
      setOpenStep((prev) => (prev === i ? null : i));
      return; // morph is driven by the mobile effect below
    }
    if (openStep !== null) return;
    originRef.current = getRect(e.currentTarget as Element);
    openingRef.current = true;
    setRevealed(false);
    setOpenStep(i);
  };

  // Step through while expanded — keep it filled, just re-anchor the origin
  // to the new card so a later close morphs back to the right place.
  const goToStep = (i: number) => {
    const card = boardRef.current?.querySelector(`[data-card="${i}"]`);
    if (card) originRef.current = getRect(card);
    setOpenStep(i);
  };

  const closeCard = () => {
    if (isMobile) {
      // Collapse the open card's clip height → 0, then unmount once done.
      const clip = accClipRef.current;
      const base = accBaseH.current;
      if (clip) {
        accClosing.current = true;
        const from = clip.getBoundingClientRect().height;
        clip.style.transition = 'none';
        clip.style.height = `${from}px`;
        void clip.offsetHeight;
        clip.style.transition = ACC_EASE;
        // Collapse only down to the compact card's height; unmounting then swaps
        // in the real compact card at the same size, so nothing jumps.
        clip.style.height = `${base}px`;
      }
      prevAccH.current = 0;
      window.setTimeout(() => { accClosing.current = false; setOpenStep(null); }, 620);
      return;
    }
    const el = expRef.current;
    const o = originRef.current;
    if (!el || !o) { setOpenStep(null); return; }
    setRevealed(false);
    setClosing(true);
    el.style.transition = ''; // restore the shared 0.5s CSS transition (open sets 1s)
    requestAnimationFrame(() => {
      el.style.top = `${o.top}px`;
      el.style.left = `${o.left}px`;
      el.style.width = `${o.width}px`;
      el.style.height = `${o.height}px`;
    });
    let fin = false;
    const finish = () => {
      if (fin) return;
      fin = true;
      el.removeEventListener('transitionend', done);
      clearTimeout(timer);
      setOpenStep(null);
      setClosing(false);
      originRef.current = null;
      // NB: keep the inline geometry (origin-card size) here. data-open flips
      // false on the next React commit and hides the element; wiping styles now
      // would snap it to its CSS default (top-left, 100% wide) for one frame
      // while still display:block -> visible flicker. The open effect re-seeds
      // geometry before painting, so stale inline styles are harmless.
    };
    const done = (ev: TransitionEvent) => { if (ev.propertyName === 'width') finish(); };
    el.addEventListener('transitionend', done);
    const timer = setTimeout(finish, 600); // fallback when transitions are off
  };

  // Mobile accordion: morph the clip height from where it last settled (0 on a
  // fresh open, the previous card's height when stepping) to the new content's
  // height. Runs in a layout effect so the pinned start height paints before the
  // browser shows the freshly-mounted card at its natural size (no flash). After
  // the morph, release to height:auto so late-loading images / resize can grow it.
  useIsoLayoutEffect(() => {
    if (!isMobile || openStep === null) return;
    const clip = accClipRef.current;
    if (!clip) return;
    accClosing.current = false;
    const target = clip.scrollHeight; // natural height of the new content
    const from = prevAccH.current;
    prevAccH.current = target;
    clip.style.transition = 'none';
    clip.style.height = `${from}px`;
    void clip.offsetHeight; // reflow so the start height sticks
    clip.style.transition = ACC_EASE;
    clip.style.height = `${target}px`;
    const done = (ev: TransitionEvent) => {
      if (ev.propertyName !== 'height' || accClosing.current) return;
      clip.style.transition = 'none';
      clip.style.height = 'auto';
      prevAccH.current = clip.getBoundingClientRect().height;
    };
    clip.addEventListener('transitionend', done);
    return () => clip.removeEventListener('transitionend', done);
  }, [openStep, isMobile, lang]);

  // FLIP expand: place the element on the card, then animate it to fill the board.
  useIsoLayoutEffect(() => {
    if (!openingRef.current || openStep === null) return;
    openingRef.current = false;
    const el = expRef.current;
    const board = boardRef.current;
    const o = originRef.current;
    if (!el || !board || !o) return;
    el.style.transition = 'none';
    el.style.top = `${o.top}px`;
    el.style.left = `${o.left}px`;
    el.style.width = `${o.width}px`;
    el.style.height = `${o.height}px`;
    void el.offsetWidth; // force reflow so the start frame sticks
    // Open grows at 1s — twice the shared 0.5s CSS transition (close resets it).
    el.style.transition =
      'top 1s cubic-bezier(0.22, 1, 0.36, 1), left 1s cubic-bezier(0.22, 1, 0.36, 1), width 1s cubic-bezier(0.22, 1, 0.36, 1), height 1s cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.top = '0px';
    el.style.left = '0px';
    el.style.width = '100%';
    el.style.height = `${board.offsetHeight}px`;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener('transitionend', reveal);
      clearTimeout(timer);
      setRevealed(true);
    };
    const reveal = (ev: TransitionEvent) => { if (ev.propertyName === 'width') finish(); };
    el.addEventListener('transitionend', reveal);
    const timer = setTimeout(finish, 1120); // fallback when transitions are off
    return () => { el.removeEventListener('transitionend', reveal); clearTimeout(timer); };
  }, [openStep]);

  // Keep the expanded height in sync if the viewport resizes while open.
  useEffect(() => {
    if (openStep === null || closing) return;
    const onResize = () => {
      const el = expRef.current;
      const board = boardRef.current;
      if (el && board) el.style.height = `${board.offsetHeight}px`;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [openStep, closing]);

  // Grid columns drive how steps chunk into rows. 3 cols ≥768px, 1 col on mobile.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setCols(mq.matches ? 1 : 3);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Publish the sticky topbar's height as --top-h so the hero can fill exactly
  // the viewport below it (calc(100dvh - --top-h)). Height shifts per breakpoint,
  // on resize and after fonts load, so track it live.
  useIsoLayoutEffect(() => {
    const el = topRef.current;
    if (!el) return;
    const apply = () =>
      document.documentElement.style.setProperty('--top-h', `${el.offsetHeight}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Publish the "product designer" mark's left offset (viewport px) as
  // --mark-left. On mobile the yellow rectangle grows only rightward to 66vw,
  // so its width = 66vw minus whatever space sits to its left.
  useIsoLayoutEffect(() => {
    const el = roleMarkRef.current;
    if (!el) return;
    const apply = () =>
      el.style.setProperty('--mark-left', `${el.getBoundingClientRect().left}px`);
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [lang]);

  // Reveal the manifesto marks when the band scrolls into view (one-shot).
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBandIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keyboard control while a step is expanded: Esc closes, ← → navigate.
  useEffect(() => {
    if (openStep === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCard();
      else if (e.key === 'ArrowRight') goToStep((openStep + 1) % stepCount);
      else if (e.key === 'ArrowLeft') goToStep((openStep - 1 + stepCount) % stepCount);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openStep, stepCount]);

  // On open (and when stepping between cards), scroll the expanded content into
  // view: on mobile the opened card's top aligns just below the sticky topbar;
  // on tablet/desktop the board is centered in the viewport.
  useEffect(() => {
    if (openStep === null || closing) return;
    const id = requestAnimationFrame(() => {
      if (isMobile) {
        const card = boardRef.current?.querySelector(`[data-card="${openStep}"]`) as HTMLElement | null;
        if (!card) return;
        const topH = topRef.current?.offsetHeight ?? 0;
        // 24px breathing room between the sticky topbar and the card's top edge.
        const y = window.scrollY + card.getBoundingClientRect().top - topH - 24;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        const board = boardRef.current;
        if (!board) return;
        const r = board.getBoundingClientRect();
        const y = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [openStep, closing, isMobile]);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Inner content of an expanded step (media + controls + text). Shared by the
  // desktop FLIP overlay and the mobile inline accordion.
  const renderExpContent = (step: number) => {
    const media = WHAT_MEDIA[step];
    return (
      <div className="fexp-body">
        {/* Media zone — image when the step has one, else the icon */}
        <div
          className={`fexp-media${media?.cover ? ' fexp-media-cover' : ''}${media?.fillBottom ? ' fexp-media-fillbottom' : ''}`}
          style={media ? { background: media.bg } : undefined}
        >
          {media ? (
            <img className="fexp-img" src={media.src} width={media.w} height={media.h} alt="" draggable={false} />
          ) : (
            <span className="fexp-ico" aria-hidden="true">{WHAT_ICONS[step]}</span>
          )}
        </div>
        {/* Text zone — controls, meta/title/body and disclaimer */}
        <div className="fexp-text">
          <div className="fexp-ctrl">
            <button
              className="fexp-btn"
              onClick={() => goToStep((step - 1 + stepCount) % stepCount)}
              aria-label={lang === 'PT' ? 'Etapa anterior' : 'Previous step'}
            >
              <svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              className="fexp-btn"
              onClick={() => goToStep((step + 1) % stepCount)}
              aria-label={lang === 'PT' ? 'Próxima etapa' : 'Next step'}
            >
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              className="fexp-btn fexp-close"
              onClick={closeCard}
              aria-label={lang === 'PT' ? 'Fechar' : 'Close'}
            >
              <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="fexp-text-body">
            <div className="fexp-text-main">
              <span className="fexp-count">{`0${step + 1} / 0${stepCount}`}</span>
              <div className="fexp-heading">
                <h3 className="fexp-title">{t.what.items[step].k}</h3>
                <p className="fexp-desc">{t.what.items[step].v}</p>
              </div>
            </div>
            {step === 1 && (
              <p className="fexp-note">
                {lang === 'PT'
                  ? 'Este fluxo de jornada de usuário possui informações de negócio restritas. Entre em contato para ver outros exemplos.'
                  : 'This user journey flow contains restricted business information. Get in touch to see other examples.'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="br">
      {/* Topbar */}
      <header className="top" ref={topRef}>
        <button
          className="burger"
          onClick={() => setMenuOpen(true)}
          aria-label={lang === 'PT' ? 'Abrir menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="lhs">
          <div className="mark">Zé - Product Designer</div>
          <nav className="nav">
            <Link href="/" className="on">{t.nav.home}</Link>
            <Link href="/sobre">{t.nav.about}</Link>
          </nav>
        </div>
        <div className="lang">
          <button
            className={lang === 'PT' ? 'on' : ''}
            onClick={() => lang !== 'PT' && toggle()}
            aria-pressed={lang === 'PT'}
            aria-label="Mudar para português"
          >
            <span className="flag" aria-hidden="true">
              <svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="14" fill="#009C3B" />
                <polygon points="10,1.4 18.6,7 10,12.6 1.4,7" fill="#FFDF00" />
                <circle cx="10" cy="7" r="2.8" fill="#002776" />
              </svg>
            </span>
            PT
          </button>
          <button
            className={lang === 'EN' ? 'on' : ''}
            onClick={() => lang !== 'EN' && toggle()}
            aria-pressed={lang === 'EN'}
            aria-label="Switch to English"
          >
            <span className="flag" aria-hidden="true">
              <svg viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="15" fill="#012169" />
                <path d="M0 0 L20 15 M20 0 L0 15" stroke="#FFFFFF" strokeWidth="3" />
                <path d="M0 0 L20 15 M20 0 L0 15" stroke="#C8102E" strokeWidth="1.5" />
                <path d="M10 0 V15 M0 7.5 H20" stroke="#FFFFFF" strokeWidth="5" />
                <path d="M10 0 V15 M0 7.5 H20" stroke="#C8102E" strokeWidth="2.5" />
              </svg>
            </span>
            EN
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`drawer-bd${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`drawer${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label={lang === 'PT' ? 'Navegação' : 'Navigation'}
      >
        <button
          className="drawer-close"
          onClick={() => setMenuOpen(false)}
          aria-label={lang === 'PT' ? 'Fechar menu' : 'Close menu'}
        >
          ×
        </button>
        <nav>
          <Link href="/" onClick={() => setMenuOpen(false)}>{t.nav.home}</Link>
          <Link href="/sobre" onClick={() => setMenuOpen(false)}>{t.nav.about}</Link>
        </nav>
      </aside>

      {/* Hero */}
      <section className="hero">
        <div className="top-row">
          <div className="left">
            <div className="headline">
              <p className="subtitle">{t.hero.subtitle}</p>
              <h1 className="name">{t.hero.nameShort}</h1>
            </div>
            <div className="desc">
              <p className="role">
                <span className="role-arrow" aria-hidden="true">↳</span>
                <span className="role-mark" ref={roleMarkRef}>{t.hero.role}</span>
              </p>
              <div className="intro">
                {t.hero.intro.map((p, i) => (
                  <p key={i} className={`intro-p intro-p${i + 1}`}>
                    <span className="lead">{p.lead}</span>
                    <span className="em">{p.em}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="badge-col" aria-hidden="true">
            <Lanyard lang={lang} />
          </div>
        </div>
      </section>

      {/* Manifesto band */}
      <section className={`portband${bandIn ? ' in' : ''}`} ref={bandRef}>
        <h2>
          {lang === 'PT' ? (
            <>
              Quando se foca no processo de design,<br />
              <mark>a interface é só o resultado final.</mark><br />
              Não existem telas sem <mark>requisitos, fluxos, estudos</mark><br />
              e, principalmente, <mark>usuários.</mark>
            </>
          ) : (
            <>
              When you focus on the design process,<br />
              <mark>the interface is just the end result.</mark><br />
              There are no screens without <mark>requirements, flows, studies</mark><br />
              and, most importantly, <mark>users.</mark>
            </>
          )}
        </h2>
      </section>

      {/* How I work — interactive flowchart */}
      <section className="sec flow">
        <div className="head">
          <h2>{t.what.title}</h2>
        </div>
        <div className="fboard" data-open={openStep !== null} data-closing={closing} ref={boardRef}>
          {/* Grid of step nodes — faded behind the FLIP overlay on desktop; on
              mobile it stays visible and the open step expands inline (accordion) */}
          <div className="fgrid" aria-hidden={openStep !== null && !isMobile}>
            {Array.from({ length: Math.ceil(stepCount / cols) }, (_, r) => {
              const start = r * cols;
              const row = t.what.items.slice(start, start + cols);
              return (
                <div className="frow" key={r}>
                  {row.map((item, j) => {
                    const i = start + j;
                    const accOpen = isMobile && openStep === i;
                    // Mobile: the open step shows only its expanded card (the
                    // compact node is replaced, not stacked above it).
                    if (accOpen) {
                      return (
                        <div className="facc" key={i} data-card={i}>
                          <div className="facc-clip" ref={accClipRef}>
                            <div className="fexp-card">
                              <span className="fexp-accent" aria-hidden="true" />
                              {renderExpContent(i)}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <button
                        key={i}
                        className="fcard"
                        data-card={i}
                        onClick={(e) => openCard(i, e)}
                        aria-expanded={openStep === i}
                        aria-controls="fexpanded"
                        tabIndex={openStep !== null && !isMobile ? -1 : 0}
                      >
                        <span className="fnum">{`0${i + 1}`}</span>
                        <span className="fcard-ico" aria-hidden="true">{WHAT_ICONS[i]}</span>
                        <span className="fcard-title">{item.k}</span>
                        <span className="ftog" aria-hidden="true">+</span>
                        {j < row.length - 1 && (
                          <span className="farrow" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Full-section expanded step — desktop only, the card grown via FLIP.
              (Mobile expands inline inside the grid above.) */}
          {!isMobile && (
            <div
              className={`fexpanded${revealed ? ' revealed' : ''}`}
              id="fexpanded"
              role="region"
              aria-hidden={openStep === null}
              ref={expRef}
            >
              {openStep !== null && (
                <div className="fexp-card">
                  {/* Thin paper accent bar across the top edge */}
                  <span className="fexp-accent" aria-hidden="true" />
                  {/* While closing, a replica of the grid card covers the box as it
                      collapses so it lands seamlessly on the real card underneath.
                      On open the real content is already present as the box grows. */}
                  {closing && (
                    <div className="fexp-preview" aria-hidden="true">
                      <span className="fnum">{`0${openStep + 1}`}</span>
                      <span className="fcard-ico">{WHAT_ICONS[openStep]}</span>
                      <span className="fcard-title">{t.what.items[openStep].k}</span>
                      <span className="ftog">+</span>
                    </div>
                  )}
                  {renderExpContent(openStep)}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Work — infinite marquee */}
      <section className="work">
        <div className="head">
          <h2>{lang === 'PT' ? 'Um pouco do que faço' : 'A bit of what I do'}</h2>
        </div>
        <div className="marquee">
          <div className="track">
            {[0, 1].flatMap((copy) =>
              [1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div className="card" key={`${copy}-${n}`} aria-hidden={copy === 1}>
                  <img
                    src={`/images/prototipo0${n}.png`}
                    alt={copy === 0 ? `Protótipo ${n}` : ''}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="marquee">
          <div className="track mobile reverse">
            {[0, 1].flatMap((copy) =>
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
                <div className="card mobile" key={`m-${copy}-${n}`} aria-hidden={copy === 1}>
                  <img
                    src={`/images/mobile${String(n).padStart(2, '0')}.png`}
                    alt={copy === 0 ? `Protótipo mobile ${n}` : ''}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="marquee">
          <div className="track docs">
            {[0, 1].map((copy) => (
              <div className="copy" key={`d-c-${copy}`} aria-hidden={copy === 1}>
                {([
                  { w: 1134, h: 1020 },
                  { w: 613, h: 1021 },
                  { w: 914, h: 1021 },
                  { w: 801, h: 1020 },
                  { w: 612, h: 1020 },
                  { w: 613, h: 1021 },
                  { w: 1041, h: 1021 },
                ] as const).map((d, i) => {
                  const n = i + 1;
                  return (
                    <div className="card doc" key={n}>
                      <img
                        src={`/images/documentacao0${n}.png`}
                        alt={copy === 0 ? `Documentação ${n}` : ''}
                        width={d.w}
                        height={d.h}
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="logos" aria-label={lang === 'PT' ? 'Empresas e instituições' : 'Companies and institutions'}>
          <img src="/images/logo01.png" alt="" className="lg-tall" loading="lazy" draggable={false} />
          <img src="/images/logo02.png" alt="" className="lg-tall" loading="lazy" draggable={false} />
          <img src="/images/logo03.png" alt="" className="lg-short" loading="lazy" draggable={false} />
          <img src="/images/logo04.png" alt="" className="lg-short" loading="lazy" draggable={false} />
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <h2 className="ctitle">
          {lang === 'PT' ? <>Vamos<br />conversar?</> : <>Let&rsquo;s<br />talk?</>}
        </h2>
        <div className="ccontent">
          <div className="cinfo">
            <div className="crows">
              {/* Email — click to copy */}
              <button
                className="crow"
                onClick={handleCopyEmail}
                aria-label={lang === 'PT' ? 'Copiar e-mail' : 'Copy email'}
              >
                <div className="ctext">
                  <span className="clabel">EMAIL</span>
                  <div className="cvalrow">
                    <span className="cval">{CONTACT.email}</span>
                    {copied ? (
                      <div className="ccopy">
                        <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M16.708 5.292a1 1 0 0 1 0 1.416l-8 8a1 1 0 0 1-1.416 0l-4-4a1.001 1.001 0 0 1 1.416-1.416L8 12.584l7.292-7.292a1 1 0 0 1 1.416 0Z" />
                        </svg>
                        <span>{lang === 'PT' ? 'copiado para a área de transferência' : 'copied to clipboard'}</span>
                      </div>
                    ) : (
                      <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M11 16H4V9H5.5V7H4C2.89688 7 2 7.89688 2 9V16C2 17.1031 2.89688 18 4 18H11C12.1031 18 13 17.1031 13 16V14.5H11V16ZM9 13H16C17.1031 13 18 12.1031 18 11V4C18 2.89688 17.1031 2 16 2H9C7.89688 2 7 2.89688 7 4V11C7 12.1031 7.89688 13 9 13Z" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
              {/* LinkedIn — opens in new tab */}
              <a
                className="crow"
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ctext">
                  <span className="clabel">LINKEDIN</span>
                  <div className="cvalrow">
                    <span className="cval">{CONTACT.linkedin.replace('https://', '')}</span>
                    <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M11.075 2.61875C11.2312 2.24375 11.5969 2 12 2H17C17.5531 2 18 2.44687 18 3V8C18 8.40312 17.7563 8.76875 17.3813 8.925C17.0063 9.08125 16.5781 8.99375 16.2906 8.70937L14.5 6.91563L9.70625 11.7063C9.31563 12.0969 8.68125 12.0969 8.29063 11.7063C7.9 11.3156 7.9 10.6812 8.29063 10.2906L13.0844 5.5L11.2937 3.70625C11.0062 3.41875 10.9219 2.99063 11.0781 2.61563L11.075 2.61875ZM2 7.5C2 6.11875 3.11875 5 4.5 5H7C7.55313 5 8 5.44687 8 6C8 6.55313 7.55313 7 7 7H4.5C4.225 7 4 7.225 4 7.5V15.5C4 15.775 4.225 16 4.5 16H12.5C12.775 16 13 15.775 13 15.5V13C13 12.4469 13.4469 12 14 12C14.5531 12 15 12.4469 15 13V15.5C15 16.8813 13.8813 18 12.5 18H4.5C3.11875 18 2 16.8813 2 15.5V7.5Z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
            <div className="cbtns">
              <a className="cbtn" href="/documents/CV-JoseAugustoMarinho.pdf" download>
                <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4 2C2.89688 2 2 2.89688 2 4V16C2 17.1031 2.89688 18 4 18H6.5V14.5C6.5 13.3969 7.39688 12.5 8.5 12.5H14V7.32812C14 6.79688 13.7906 6.2875 13.4156 5.9125L10.0844 2.58438C9.70938 2.20938 9.20312 2 8.67188 2H4ZM12.1719 7.5H9.25C8.83437 7.5 8.5 7.16563 8.5 6.75V3.82812L12.1719 7.5ZM8.5 13.875C8.15625 13.875 7.875 14.1562 7.875 14.5V18.5C7.875 18.8438 8.15625 19.125 8.5 19.125C8.84375 19.125 9.125 18.8438 9.125 18.5V17.625H9.5C10.5344 17.625 11.375 16.7844 11.375 15.75C11.375 14.7156 10.5344 13.875 9.5 13.875H8.5ZM9.5 16.375H9.125V15.125H9.5C9.84375 15.125 10.125 15.4062 10.125 15.75C10.125 16.0938 9.84375 16.375 9.5 16.375ZM12.5 13.875C12.1562 13.875 11.875 14.1562 11.875 14.5V18.5C11.875 18.8438 12.1562 19.125 12.5 19.125H13.5C14.3969 19.125 15.125 18.3969 15.125 17.5V15.5C15.125 14.6031 14.3969 13.875 13.5 13.875H12.5ZM13.125 17.875V15.125H13.5C13.7062 15.125 13.875 15.2938 13.875 15.5V17.5C13.875 17.7062 13.7062 17.875 13.5 17.875H13.125ZM15.875 14.5V18.5C15.875 18.8438 16.1562 19.125 16.5 19.125C16.8438 19.125 17.125 18.8438 17.125 18.5V17.125H18C18.3438 17.125 18.625 16.8438 18.625 16.5C18.625 16.1562 18.3438 15.875 18 15.875H17.125V15.125H18C18.3438 15.125 18.625 14.8438 18.625 14.5C18.625 14.1562 18.3438 13.875 18 13.875H16.5C16.1562 13.875 15.875 14.1562 15.875 14.5Z" />
                </svg>
                Baixar CV (Português)
              </a>
              <a className="cbtn" href="/documents/CV-EN-JoseAugustoMarinho.pdf" download>
                <svg className="cicon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4 2C2.89688 2 2 2.89688 2 4V16C2 17.1031 2.89688 18 4 18H6.5V14.5C6.5 13.3969 7.39688 12.5 8.5 12.5H14V7.32812C14 6.79688 13.7906 6.2875 13.4156 5.9125L10.0844 2.58438C9.70938 2.20938 9.20312 2 8.67188 2H4ZM12.1719 7.5H9.25C8.83437 7.5 8.5 7.16563 8.5 6.75V3.82812L12.1719 7.5ZM8.5 13.875C8.15625 13.875 7.875 14.1562 7.875 14.5V18.5C7.875 18.8438 8.15625 19.125 8.5 19.125C8.84375 19.125 9.125 18.8438 9.125 18.5V17.625H9.5C10.5344 17.625 11.375 16.7844 11.375 15.75C11.375 14.7156 10.5344 13.875 9.5 13.875H8.5ZM9.5 16.375H9.125V15.125H9.5C9.84375 15.125 10.125 15.4062 10.125 15.75C10.125 16.0938 9.84375 16.375 9.5 16.375ZM12.5 13.875C12.1562 13.875 11.875 14.1562 11.875 14.5V18.5C11.875 18.8438 12.1562 19.125 12.5 19.125H13.5C14.3969 19.125 15.125 18.3969 15.125 17.5V15.5C15.125 14.6031 14.3969 13.875 13.5 13.875H12.5ZM13.125 17.875V15.125H13.5C13.7062 15.125 13.875 15.2938 13.875 15.5V17.5C13.875 17.7062 13.7062 17.875 13.5 17.875H13.125ZM15.875 14.5V18.5C15.875 18.8438 16.1562 19.125 16.5 19.125C16.8438 19.125 17.125 18.8438 17.125 18.5V17.125H18C18.3438 17.125 18.625 16.8438 18.625 16.5C18.625 16.1562 18.3438 15.875 18 15.875H17.125V15.125H18C18.3438 15.125 18.625 14.8438 18.625 14.5C18.625 14.1562 18.3438 13.875 18 13.875H16.5C16.1562 13.875 15.875 14.1562 15.875 14.5Z" />
                </svg>
                Download CV (English)
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>{t.footer.sig}</span>
      </footer>
    </div>
  );
}
