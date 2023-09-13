import { useTheme } from "@replit/extensions-react";
import { useEffect } from "react";

const useThemeTokens = () => {
  const theme = useTheme();
  const { global: tokens } = theme?.values || {};

  useEffect(() => {
    if (tokens) {
      let css = ":root {";
      for (const color in tokens) {
        const kebabCaseColor = color
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .toLowerCase();
        css += `--${kebabCaseColor}: ${tokens[color]};`;
      }
      css += "}";
      const styleElement = document.createElement("style");
      styleElement.textContent = css;
      document.head.append(styleElement);
    }
  }, [theme, tokens]);

  return theme;
};

export default useThemeTokens;
