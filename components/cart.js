import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import COLORS from '../constant';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
    const navigation = useNavigation();
  return (
    <View className="absolute bottom-5 w-full z-50">
        <TouchableOpacity
            onPress={() => navigation.navigate('Order')}
            style={{backgroundColor: COLORS.primary}}
            className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg">
                <View className="p-2 px-4 rounded-full" style={{backgroundColor: 'rgba(255,255,2550.3)'}}>
                    <Text className="font-extrabold text-white text-lg">
                        3
                    </Text>
                </View>
                <Text className="flex-1 text-center font-extrabold text-white text-lg">
                    View Order
                </Text>
                <Text className="font-extrabold text-white text-lg">
                    ₱{110.00.toFixed(2)}
                </Text>
        </TouchableOpacity>
    </View>
  );
}