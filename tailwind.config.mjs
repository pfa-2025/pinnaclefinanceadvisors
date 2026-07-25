const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        line: "var(--line)",
        primary: "var(--primary)",
        "primary-deep": "var(--primary-deep)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        gold: "var(--gold)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
      },
      boxShadow: {
        soft: "0 12px 32px rgba(7, 28, 44, 0.08)",
        premium: "0 18px 60px rgba(7, 28, 44, 0.18)",
        glow: "0 16px 44px rgba(0, 166, 166, 0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(circle at top, rgba(103, 213, 209, 0.2), transparent 35%), radial-gradient(circle at 85% 15%, rgba(200, 169, 107, 0.1), transparent 24%)",
        "panel-glow":
          "linear-gradient(135deg, rgba(0, 166, 166, 0.18), rgba(10, 41, 66, 0.02))",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseLine: {
          "0%": { opacity: "0.25", transform: "scaleX(0.92)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
          "100%": { opacity: "0.25", transform: "scaleX(0.92)" },
        },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-line": "pulseLine 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
