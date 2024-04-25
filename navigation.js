import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/homescreen';
import Login from './screens/Login';
import CartScreen from './screens/cartscreen';
const Stack = createNativeStackNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="Order" options={{presentation: 'modal'}} component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }
  