import { Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Categories from '../components/categories';
import Menu from '../components/menu';
import Cart from '../components/cart';

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-white' style={{flex: 1}}>
        <Cart />
        {/* main */}
        <Categories />
        {/* <ScrollView showsVerticalScrollIndicator={false} 
        contentContainerStyle={{
          paddingBottom: 20
        }}>
        </ScrollView> */}
        <Text style={{
        marginTop: 35,
        marginBottom: 25,
        color: '#333',
        fontSize: 21,
        fontWeight: 'bold',
        textAlign:'center'
        }} >Beverages</Text>
        
        <Menu />
    </SafeAreaView>
  );
}