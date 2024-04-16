import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/homescreen';
import RestaurantScreen from './screens/restaurantscreen';
import Login from './screens/Login';
const Stack = createNativeStackNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Rastaurant" component={RestaurantScreen} />
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
  }
  