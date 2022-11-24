import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/theme';

//fix typoos
const DarkThemeProvider = ({ children }: any) => {
  const activeLoader = () => {
    const themeMode = !isDarkThemeEnable ? lightTheme : darkTheme;
    return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>;
  };
  const isDarkThemeEnable = useSelector(
    (state: any) => state.theme.darkThemeEnabled,
  );
  // const isLoaderEnabled = useSelector(
  //   (state: any) => state.loader.isLoaderEnabled,
  // );
  return activeLoader();
};

export default DarkThemeProvider;
