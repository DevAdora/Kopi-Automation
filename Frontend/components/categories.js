import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { categories } from '../constant';
import { useState } from 'react';

export default function Categories() {
        const [activeCategory, setActiveCategor] = useState(null);

  return (
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center'
        }}>
            {
                categories.map((category, index) => {
                    // let isActive = category.id==activeCategory;
                    // let btnClass = isActive ? `bg-primary-600` : 'bg-primary2-200';
                    // let textClass = isActive ? `font-semibold text-primary2-800` : 'text-primary2-500';
                    return (
                        <View key={index} className="flex justify-center items-center mr-5">
                            <TouchableOpacity
                            onPress={() => {setActiveCategor(category.id)}}
                            className={"p-3 rounded-md shadow bg-primary-200 " + btnClass}
                            >
                                <Image 
                                    // style={{width: 55, height: 55}}
                                    // source={category.image}
                                >
                                </Image>
                            </TouchableOpacity>
                            <Text className={"text-sm " + textClass}>{category.name}</Text>
                        </View>
                    )
                })
            }
      </View>
  );
}