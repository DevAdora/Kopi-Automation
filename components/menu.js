import { Text, FlatList, SafeAreaView, View } from 'react-native';
import React from 'react';
import { menus } from '../constant';

export default function Menu() {

    // const oneItem = ({ item }) => {
    //     <Text>
    //         {item.name}
    //     </Text>
    // }

        return (
            <View>
                 {/* <FlatList
                    data = { menus }
                    renderItem = { oneItem }
                 /> */}
                 <Text>MENU</Text>
            </View>
        );
}