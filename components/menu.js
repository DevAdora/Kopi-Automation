import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { menus } from "../constant";
import COLORS from "../constant";
import * as Icon from "react-native-feather";
import axios from "axios";
import MealsMenu from './MealsMenu';
import BeveragesMenu from './BeveragesMenu';
import SnacksMenu from './SnacksMenu';
import placeholderImage from '../assets/images/Beverages/americano.png'; // Import placeholder image


export default function Menu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get("/getproducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.avatarContainer}>
        <Image source={item.image ? { uri: item.image } : placeholderImage} style={styles.avatar} />
        </View>
        <Text style={styles.name}>{item.prodname}</Text>
        <Text style={styles.price}>₱{item.price?.toFixed(2)}</Text>
        <View className="flex flex-col items-center">
          <TouchableOpacity
            className="p-1 rounded-full"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Icon.Plus
              strokeWidth={2}
              height={20}
              width={20}
              stroke={"white"}
            />
          </TouchableOpacity>
          <Text className="px-3">{2}</Text>
          <TouchableOpacity
            className="p-1 rounded-full"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Icon.Minus
              strokeWidth={2}
              height={20}
              width={20}
              stroke={"white"}
            />
          </TouchableOpacity>
          
        </View>
        
      </View>
    );
  };
  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <FlatList
      data={products} // Use products data from the state
      renderItem={renderItem}
      ItemSeparatorComponent={itemSeparator}
    />
  );
}
const styles = StyleSheet.create({
  listHeader: {
    marginTop: 20,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  item: {
    justifyContent: "space-between",
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  avatarContainer: {
    backgroundColor: COLORS.primary2,
    borderRadius: 100,
    height: 89,
    width: 89,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    height: 55,
    width: 55,
  },

  name: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 13,
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },

  price: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 13,
  },
});
