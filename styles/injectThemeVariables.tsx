import { Theme } from "@mui/material";

export const injectThemeVariables = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;

    // Inject palette variables
    Object.entries(theme.palette).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            root.style.setProperty(`--mui-${key}-${subKey}`, subValue);
          }
        });
      } else if (typeof value === 'string') {
        root.style.setProperty(`--mui-${key}`, value);
      }
    });

    // Inject typography variables
    Object.entries(theme.typography).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--mui-typography-${key}`, value);
      }
    });
  }
};