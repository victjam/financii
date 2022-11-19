import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';

//fix typoos
const DarkThemeProvider = ({ children }: any) => {
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  const themeMode = !isDarkThemeEnable ? lightTheme : darkTheme;
  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
};

export default DarkThemeProvider;
