import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import COLORS, { menus } from '../constant';
import * as Icon from 'react-native-feather';

export default function CartScreen() {
  return (
    <View className='bg-white flex-1'>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        className="bg-white pt-5">
          {
            menus.map((menu, index) => {
              return (
                <View key={index}
                className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-lg">
                  <Text className="font-bold" style={{color: COLORS.primary}}>
                    2 x
                  </Text>
                  <Image className="h-14 w-14 rounded-full" source={menu.image} />
                  <Text className="flex-1 font-bold text-gray-700">{menu.name}</Text>
                  <Text className="font-semibold text-base">₱{menu.price}</Text>
                  <TouchableOpacity
                    className="p-1 rounded-full"
                    style={{backgroundColor: COLORS.primary}}>
                      <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                    </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
        <View style={{backgroundColor: COLORS.primary}} className="p-6 px-8 rounded-t-3xl space-y-4 text-white">
          <View className="flex-row justify-between">
            <Text className="font-extrabold text-white text-lg">Total</Text>
            <Text className="font-extrabold text-white text-lg">₱550.00</Text>
          </View>
          <View>
            <TouchableOpacity 
              style={{backgroundColor: COLORS.primary2}}
              className="p-3 rounded-full"
            >
              <Text className="font-bold text-center text-black text-lg">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}