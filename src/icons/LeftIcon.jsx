import { useTheme } from "../contexts/ThemeContext";

export const LeftIcon = () => {
  const { tokens } = useTheme();

  return (
    <div
      style={{
        width: tokens.sizing.s,
        height: tokens.sizing.s,
        borderRadius: "100%",
        border: `${tokens.borderWidth.s} solid ${tokens.content.secondary}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: tokens.bg.default,
          fontSize: tokens.fontSizes.xs,
          lineHeight: 1,
        }}
      >
        !
      </span>
    </div>
  );
};
