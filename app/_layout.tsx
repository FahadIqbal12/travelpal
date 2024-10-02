import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect,useState} from 'react';
import 'react-native-reanimated';
import { Main,Booking,Profile,Flight, GloboAI } from '@/context';
import { useRouter } from 'expo-router';
import Authentication from '@/components/authentication';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()
  const [cntxt,setCntxt] = useState()
  const [profile,setProfile] = useState(null)
  const [flight,setFlight] = useState()
  const [globoAi,setGloboAi] = useState(null)
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
 



  return (

    <Profile.Provider value={{profile:profile,setProfile:setProfile}}>
        <Main.Provider value={{context:cntxt,setContext:setCntxt}}>
{profile==null?<Authentication/>:
        <GloboAI.Provider value={{globoAi:globoAi,setGloboAi:setGloboAi}}>
        <Flight.Provider value={{flight:flight,setFlight:setFlight}}>
        <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(bookings)"  options={{ headerShown: false }}/>
        <Stack.Screen name="(flight)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        
        <Stack.Screen name="+not-found" />
        </Stack>
        </Flight.Provider>
        </GloboAI.Provider>
        }

        </Main.Provider>
        
    </Profile.Provider> 
  );
}
