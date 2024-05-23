import React from "react";
import Admin from "./AdminScreen";

export const DashboardScreen = ({navigation}) => <Screen navigation={navigation} name ="Dashboard" />
export const ProfileScreen = ({navigation}) => <Screen navigation={navigation} name ="Profile" />
export const InventoryScreen = ({navigation}) => <Screen navigation={navigation} name ="Inventory" />
export const UserScreen = ({navigation}) => <Screen navigation={navigation} name ="User" />
export const SalesScreen = ({navigation}) => <Screen navigation={navigation} name ="Sales" />
export const LogoutScreen = ({navigation}) => <Screen navigation={navigation} name ="Logout" />