export type ThemeColors = {
  text_color: string;
  highlight_text_color: string;
  neutral_text_color: string;

  background_color: string;
  highlight_background_color: string;
  opacity_highlight_background_color: string;
  neutral_background_color: string;
};

interface Theme {
  light: ThemeColors;
  dark: ThemeColors;
};

export const theme: Theme = {
  light: {
    background_color: '#f5f5f5',
    highlight_background_color: '#f06f06',
    opacity_highlight_background_color: 'rgba(240, 111, 6, .5)',
    neutral_background_color: '#ffffff',

    text_color: '#333333',
    highlight_text_color: '#f06f06',
    neutral_text_color: '#818181'
  },
  dark: {
    background_color: '#333333',
    highlight_background_color: '#fb8c01',
    opacity_highlight_background_color: 'rgba(65, 57, 135, .5)',
    neutral_background_color: '#666666',

    text_color: '#f5f5f5',
    highlight_text_color: '#fb8c01',
    neutral_text_color: '#fff'
  }
};