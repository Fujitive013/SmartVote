import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../fonts/Montserrat-Medium.ttf'),
    'Inter-Regular': require('../fonts/Inter-Regular.ttf'),
  });

  return fontsLoaded;
};