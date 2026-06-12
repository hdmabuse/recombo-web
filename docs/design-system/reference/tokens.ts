/**
 * TRAMA-TAR · Design Tokens (JS)
 * Usar para configurar Tailwind, styled-components, ou passar como props.
 * Fonte da verdade: tokens.css — este arquivo espelha os valores.
 */

export const colors = {
  amber: {
    900: "#7A5500",
    700: "#B8860B", // primary brand
    500: "#D4A017",
    200: "#F5DFA0",
    50: "#FDF8EC",
  },
  wine: {
    900: "#3D0B10",
    700: "#722F37", // secondary brand
    500: "#9B3A44",
    200: "#D9A0A6",
    50: "#F9ECED",
  },
  neutral: {
    900: "#1A1A1A",
    700: "#3D3D3D",
    500: "#6B6B6B",
    300: "#ADADAD",
    100: "#E8E8E8",
    50: "#F5F5F5",
  },
  white: "#FFFFFF",
} as const;

export const fonts = {
  display: "'Bricolage Grotesque', 'Inter', sans-serif",
  body: "'Bricolage Grotesque', 'Inter', sans-serif",
  mono: "'Fira Code', 'JetBrains Mono', monospace",
} as const;

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export const borderRadius = {
  sm: "2px",
  base: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px",
} as const;

/** Configuração pronta para tailwind.config.ts */
export const tailwindExtend = {
  colors: {
    primary: {
      DEFAULT: colors.amber[700],
      dark: colors.amber[900],
      light: colors.amber[200],
      surface: colors.amber[50],
    },
    secondary: {
      DEFAULT: colors.wine[700],
      dark: colors.wine[900],
      light: colors.wine[200],
      surface: colors.wine[50],
    },
  },
  fontFamily: {
    display: fonts.display.split(","),
    body: fonts.body.split(","),
    mono: fonts.mono.split(","),
  },
  boxShadow: {
    focus: "0 0 0 3px rgba(184, 134, 11, 0.30)",
  },
} as const;
