import { StatusBar } from "expo-status-bar";
import { Dimensions, Text, View } from "react-native";
import Navigation from "./navigation";
import axios from "axios";
import React from 'react';
import { CartProvider } from "./components/CartContext"; // Import CartProvider

axios.defaults.baseURL = "http://192.168.1.8:5000";

export default function App() {
  return (
    <CartProvider>
 
      <Navigation />
    </CartProvider>
  );
}
