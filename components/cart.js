import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constant';
import { useCart } from './CartContext'; // Import useCart hook

export default function Cart() {
    const navigation = useNavigation();
    const { cartItems } = useCart(); // Access cartItems from CartContext

    const totalQuantity = cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
    const totalPrice = cartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
    // const totalProduct = cartItems.

    return (
        <View style={{ position: 'absolute', bottom: 20, width: '100%', zIndex: 1}}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Order')}
                style={{ backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, padding: 15, borderRadius: 50, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)' }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>
                        {totalQuantity}
                    </Text>
                </View>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 18, color: 'white' }}>
                    View Order
                </Text>
                <Text style={{ fontSize: 18, color: 'white' }}>
                    ₱{totalPrice.toFixed(2)}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
