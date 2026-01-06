import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/homescreen";
import Login from "./screens/Login";
import CartScreen from "./screens/cartscreen";
import AdminScreen from "./screens/admin/AdminScreen";
import Inventory from "./screens/admin/Inventory";
import AddProduct from "./screens/admin/functions/AddProduct";
import DisplayProducts from "./screens/admin/functions/DisplayProducts";
import DisplayOrders from "./screens/admin/functions/DisplayOrders";
import OrderConfirmationScreen from "./screens/OrderConfirmation";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          options={{ presentation: "modal" }}
          component={CartScreen}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DisplayProducts"
          component={DisplayProducts}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DisplayOrders"
          component={DisplayOrders}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
