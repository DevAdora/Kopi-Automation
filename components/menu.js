import { Text, FlatList, TouchableOpacity, View, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { menus } from '../constant';
import COLORS from '../constant';
import * as Icon from 'react-native-feather';

export default function Menu() {

    const oneItem = ( { item } ) => {
        return <View style={styles.item}>
                    <View style={styles.avatarContainer}>
                        <Image source={item.image} style={ styles.avatar } />
                    </View>
                    <Text style={styles.name}>{ item.name }</Text>
                    <Text style={styles.price}>₱{item.price.toFixed(2)}</Text>
                    <View className="flex flex-col items-center">
                        <TouchableOpacity
                            className="p-1 rounded-full"
                            style={{backgroundColor: COLORS.primary}}>
                            <Icon.Plus strokeWidth={2} height={20} width={20} stroke={'white'} />
                        </TouchableOpacity>
                        <Text className="px-3">
                            {2}
                        </Text>
                        <TouchableOpacity
                            className="p-1 rounded-full"
                            style={{backgroundColor: COLORS.primary}}>
                            <Icon.Minus strokeWidth={2} height={20} width={20} stroke={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
    }

    itemSeparator = () => {
        return <View style = { styles.separator } />
    }

    return (
            <FlatList 
                ListHeaderComponentStyle = { styles.listHeader }
                data = { menus }
                renderItem = { oneItem }
                ItemSeparatorComponent = { itemSeparator }
            />
    );

}

const styles = StyleSheet.create ({
    listHeader: {
        marginTop: 20,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    }, 

    item: {
        justifyContent: 'space-between',
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13
    },

    avatarContainer: {
        backgroundColor: COLORS.primary2,
        borderRadius: 100,
        height: 89,
        width: 89,
        justifyContent: 'center',
        alignItems: 'center'
    },

    avatar: {
        height: 55,
        width: 55
    },

    name: {
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 13
    },
    
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#CCC'
    },

    price: {
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 13
    }

});