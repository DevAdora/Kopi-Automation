import { Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Icon from "react-native-feather";
import Categories from '../components/categories';
import Menu from '../components/menu';
import { menus } from '../constant';

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-white'>
        <StatusBar barStyle='dark-content'/>
        <View className='flex-row items-center space-x-2 px-4 pb-2'>
            <View className='flex-row flex-1 p-3 rounded-full border border-gray-300'>
                <Icon.Search height="25" width="25" stroke="gray"/>
                <TextInput className="ml-2 flex-2" placeholder='Search'/>
            </View>
        </View>
        
        {/* main */}
        <Categories />
        {/* <ScrollView showsVerticalScrollIndicator={false} 
        contentContainerStyle={{
          paddingBottom: 20
        }}>
        </ScrollView> */}
        <View>
          {
            menus.map((item, index) => {
              return (
                <Menu 
                  key={index}
                  name={item.name}
                  image={item.image}
                />
              )
            })
          }
        </View>
    </SafeAreaView>
  );
}