import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { QuestionScreen } from './pages/QuestionScreen';
import { AnswerKeyScreen } from './pages/AnswerKeyScreen';
import { ResultScreen } from './pages/ResultScreen';
import { useFonts } from 'expo-font';


const Stack = createNativeStackNavigator();


export default function App() {

  const [fontsLoaded] = useFonts({
    'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'), 
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-ExtraLight': require('./assets/fonts/Nunito-ExtraLight.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"QuestionScreen"}>
        <Stack.Screen options={{ headerShown: false }} name="QuestionScreen" component={QuestionScreen} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="AnswerKeyScreen" component={AnswerKeyScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ResultScreen" component={ResultScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}