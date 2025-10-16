// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// English constants
export const SITE_TITLE_EN = "EMO Lab";
export const SITE_DESCRIPTION_EN = "Eternal Matrix of Omniscience Laboratory - Exploring AI and Computer Vision research.";

// Chinese constants
export const SITE_TITLE_ZH = "EMO Lab | 全知永恆矩陣實驗室";
export const SITE_DESCRIPTION_ZH = "全知永恆矩陣實驗室 - 專注於人工智慧與電腦視覺研究的跨校際實驗室";

// Default constants (for backward compatibility)
export const SITE_TITLE = SITE_TITLE_EN;
export const SITE_DESCRIPTION = SITE_DESCRIPTION_EN;

// Optional: set this in env as PUBLIC_CF_ANALYTICS_TOKEN to enable Cloudflare Web Analytics
export const CF_ANALYTICS_TOKEN = import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN as
  | string
  | undefined;
